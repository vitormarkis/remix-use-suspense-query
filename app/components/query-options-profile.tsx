import { useLoaderData } from "@remix-run/react"
import { hashKey, isServer, queryOptions } from "@tanstack/react-query"
import { ProfileType } from "~/components/profile-type"
import { isLoadingThisQuerySSR } from "~/helpers"

export const queryOptionsProfile = (props: { username: string }) => {
  const queryKey = ["profile", props] as const
  const promiseKey = hashKey(queryKey)
  const loaderDataPromise = () =>
    useLoaderData<any>()?.[promiseKey] as ProfileType
  const loaderPromise = isServer ? null : loaderDataPromise() ?? null

  return queryOptions({
    queryKey,
    queryFn() {
      const [, { username }] = queryKey
      if (
        loaderPromise &&
        // isLoadingThisQuerySSR(promiseKey)
        (isLoadingThisQuerySSR(promiseKey) || window.isHydrating)
      ) {
        return loaderPromise
      }

      return fetch(`https://api.github.com/users/${username}`).then(
        res => res.json() as Promise<ProfileType>
      )
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  })
}
