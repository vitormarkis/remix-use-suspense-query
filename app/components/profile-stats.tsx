import { useParams } from "@remix-run/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { queryOptionsProfile } from "~/components/query-options-profile"

type ProfileStatsProps = {}

export function ProfileStats({}: ProfileStatsProps) {
  const params = useParams()
  const { data: profile } = useSuspenseQuery(
    queryOptionsProfile(params.username!).options
  )

  return (
    <div className="grow p-3 overflow-scroll bg-neutral-900 border border-neutral-950 text-white">
      <pre>{JSON.stringify({ profile }, null, 2)}</pre>
    </div>
  )
}
