import { useParams } from "@remix-run/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { queryOptionsProfile } from "~/components/query-options-profile"

export function ProfileInfo() {
  const params = useParams()
  const { data: profile } = useSuspenseQuery(
    queryOptionsProfile(params.username!).options
  )

  return (
    <div className="p-3 min-w-[320px] bg-white border border-neutral-200 text-black">
      <img
        src={profile.avatar_url}
        alt=""
      />
      <strong className="text-xl">{profile.name}</strong>
      <span>{profile.location}</span>
    </div>
  )
}
