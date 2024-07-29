import { useLoaderData } from "@remix-run/react"
import { hashKey, isServer, queryOptions } from "@tanstack/react-query"
import { ProfileType } from "~/components/profile-type"
import { isLoadingThisQuerySSR } from "~/helpers"

export const queryOptionsProfile = (username: string) => {
  const queryKey = ["profile", username] as const
  const promiseKey = hashKey(queryKey)
  const loaderDataPromise = () =>
    useLoaderData<any>()?.[promiseKey] as ProfileType
  const loaderPromise = isServer ? null : loaderDataPromise() ?? null

  return {
    options: queryOptions({
      queryKey,
      queryFn() {
        const [, username] = queryKey
        if (loaderPromise && isLoadingThisQuerySSR(promiseKey)) {
          console.log("Has promise from server, returning loader promise.")
          return loaderPromise
        }
        console.log("No server promise found, kicking off a new promise on client.")
        return fetch(`https://api.github.com/users/${username}`)
          .then(res => res.json())
          .then(async r => {
            await new Promise(res => setTimeout(res, 4000))
            console.log("Resolved on ", isServer ? "server" : "client")
            return r as ProfileType
          })
      },
    }),
    promiseKey,
  }
}
