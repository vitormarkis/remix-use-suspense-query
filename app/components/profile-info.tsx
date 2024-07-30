import { useParams } from "@remix-run/react"
import { isServer, useSuspenseQuery } from "@tanstack/react-query"
import { queryOptionsProfile } from "~/components/query-options-profile"

export function ProfileInfo() {
  const params = useParams()
  if (!isServer) console.log("Running suspense query on client")
  const { data: profile } = useSuspenseQuery(
    queryOptionsProfile({ username: params.username! })
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
