import { LoaderFunctionArgs } from "@remix-run/node"
import { defer, useParams } from "@remix-run/react"
import { Suspense } from "react"
import { Profile } from "~/components/profile"
import { ProfileStats } from "~/components/profile-stats"
import { queryOptionsProfile } from "~/components/query-options-profile"
import { Skeleton } from "~/components/skeleton"

export async function loader({ params }: LoaderFunctionArgs) {
  const profile = queryOptionsProfile(params.username!)
  console.log("Server sending new promise to the client")
  return defer({
    // @ts-expect-error
    [profile.promiseKey]: profile.options.queryFn?.(),
  })
}

export default function Home() {
  const params = useParams()

  return (
    <div className="flex gap-2">
      <Suspense
        key={params.username}
        fallback={<Skeleton />}
      >
        <Profile />
        <ProfileStats />
      </Suspense>
    </div>
  )
}
