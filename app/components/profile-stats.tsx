import { useParams } from "@remix-run/react"
import {
  isServer,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { useEffect } from "react"
import { queryOptionsFetchProfile } from "~/components/query-options-profile"

type ProfileStatsProps = {}

export function ProfileStats({}: ProfileStatsProps) {
  const params = useParams()
  const queryClient = useQueryClient()
  const staleQueries = queryClient.getQueriesData({ stale: true })
  // useEffect(() =>
  //   console.log(
  //     `Running suspense query for ${params.username}, is server`,
  //     isServer,
  //     staleQueries
  //   )
  // )
  const { data: profile } = useSuspenseQuery(
    queryOptionsFetchProfile({ username: params.username! })
  )
  // console.log({ profile })
  useEffect(() => {
    Object.assign(window, {
      getStale: () => queryClient.getQueriesData({ stale: true }),
    })
  }, [])

  return (
    <div className="grow p-3 overflow-scroll bg-neutral-900 border border-neutral-950 text-white">
      <pre>{JSON.stringify({ profile }, null, 2)}</pre>
    </div>
  )
}
