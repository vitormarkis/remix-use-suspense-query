import { useLoaderData } from "@remix-run/react"
import { hashKey, isServer, queryOptions } from "@tanstack/react-query"
import { ProfileType } from "~/components/profile-type"

export const queryOptionsProfile = (username: string) => {
  const queryKey = ["profile", username] as const
  const promiseKey = hashKey(queryKey)
  const loaderPromise = isServer
    ? null
    : (useLoaderData<any>()[promiseKey] as ProfileType)
  return {
    options: queryOptions({
      queryKey: ["profile", username] as const,
      queryFn() {
        const [, username] = queryKey
        if (loaderPromise) {
          console.log("Has promise, returning loader promise.")
          return loaderPromise
        }
        console.log("Does not has promise, kicking off a promise.")
        return fetch(`https://api.github.com/users/${username}`)
          .then(res => res.json())
          .then(async r => {
            await new Promise(res => setTimeout(res, 1000))
            console.log("Resolved on ", isServer ? "server" : "client")
            return r as ProfileType
          })
      },
    }),
    promiseKey,
  }
}
