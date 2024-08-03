import { hashKey, isServer, queryOptions } from "@tanstack/react-query"
import {
  getLoaderDataPromise,
  isLoadingThisQuerySSR,
  queryOptionsDefaults,
} from "~/components/api-template"

type FetchProfileDeps = { username: string }
type FetchProfileData = {
  avatar_url: string
  name: string
  location: string
}

export async function fetchProfile(deps: FetchProfileDeps) {
  console.log("Fetching user ", deps.username)
  // await new Promise(res => setTimeout(res, 4000))
  // const response = {
  //   async json() {
  //     return {}
  //   },
  // }
  const response = await fetch(`https://api.github.com/users/${deps.username}`)
  const data: FetchProfileData = await response.json()
  return data
  // return [new Date().toISOString(), deps.username]
}

export function queryOptionsFetchProfile(deps: FetchProfileDeps) {
  const queryKey = ["profile", deps] as const
  const promiseKey = hashKey(queryKey)

  const loaderPromise = isServer
    ? null
    : getLoaderDataPromise<FetchProfileData>(promiseKey) ?? null

  return queryOptions({
    queryKey,
    async queryFn() {
      console.log(
        "Running queryFn",
        promiseKey,
        isLoadingThisQuerySSR(promiseKey)
      )
      if (
        loaderPromise &&
        (isLoadingThisQuerySSR(promiseKey) || window.isHydrating)
      ) {
        return loaderPromise
      }

      // if (!isServer) debugger
      return await fetchProfile(deps)
    },
    ...queryOptionsDefaults(),
  })
}
