import { useLoaderData } from "@remix-run/react"
import { isServer, UseQueryOptions } from "@tanstack/react-query"
import { ensurePrefetches } from "~/routes/home.$username"

export function getLoaderDataPromise<T = any>(
  promiseKey: string
): Promise<T> | null {
  const loaderDataUnknown = useLoaderData<unknown>()
  const [noPrefetchesShape, loaderData] = ensurePrefetches(loaderDataUnknown)
  if (noPrefetchesShape) return null
  return loaderData[promiseKey]
}

export function queryOptionsDefaults() {
  return {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: true,
  } satisfies Partial<UseQueryOptions>
}

export function isLoadingThisQuerySSR(promiseKey: string) {
  if (!isServer) console.log("queriesLoading", window.queriesLoading)
  return isServer ? false : window.queriesLoading.has(promiseKey)
}
