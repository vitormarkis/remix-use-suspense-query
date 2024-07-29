import { LoaderFunctionArgs } from "@remix-run/node"
import { ClientLoaderFunctionArgs, defer, useParams } from "@remix-run/react"
import { isServer } from "@tanstack/react-query"
import { Suspense } from "react"
import { ProfileInfo } from "~/components/profile"
import { ProfileStats } from "~/components/profile-stats"
import { queryOptionsProfile } from "~/components/query-options-profile"
import { Skeleton } from "~/components/skeleton"

export async function loader({ params }: LoaderFunctionArgs) {
  const profile = queryOptionsProfile(params.username!)

  return defer({
    // @ts-expect-error
    [profile.promiseKey]: profile.options.queryFn?.(),
  })
}

if (!isServer) {
  window.queriesLoading ??= new Set()
}
export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const serverData = await serverLoader<typeof loader>()
  for (const [promiseKey, promise] of Object.entries(serverData)) {
    window.queriesLoading.add(promiseKey)
    promise.finally(() => {
      window.queriesLoading.delete(promiseKey)
    })
  }

  return serverData
}

clientLoader.hydrate = true

export default function Home() {
  const params = useParams()

  return (
    <div className="flex gap-2">
      <Suspense
        key={Object.values(params).join(":")}
        fallback={<Skeleton />}
      >
        <ProfileInfo />
        <ProfileStats />
      </Suspense>
    </div>
  )
}
