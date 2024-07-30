import { LoaderFunctionArgs } from "@remix-run/node"
import { ClientLoaderFunctionArgs, defer, useParams } from "@remix-run/react"
import { hashKey } from "@tanstack/react-query"
import { Suspense } from "react"
import { ProfileInfo } from "~/components/profile-info"
import { ProfileStats } from "~/components/profile-stats"
import { queryOptionsProfile } from "~/components/query-options-profile"
import { Skeleton } from "~/components/skeleton"
import { getQueryClient } from "~/root"

export async function loader({ params }: LoaderFunctionArgs) {
  const options = queryOptionsProfile({ username: params.username! })
  const profile = getQueryClient().fetchQuery(options)

  return defer({
    [hashKey(options.queryKey)]: new Promise(res => profile.then(res)),
  })
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const serverData = await serverLoader<typeof loader>()
  for (const [promiseKey, promise] of Object.entries(serverData)) {
    if (promise instanceof Promise) {
      window.queriesLoading.add(promiseKey)
      promise.then(data => console.log(promiseKey, data))
      promise.finally(() => {
        window.queriesLoading.delete(promiseKey)
      })
    }
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
