import { isServer } from "@tanstack/react-query"

export function isLoadingThisQuerySSR(promiseKey: string) {
  return isServer ? false : window.queriesLoading.has(promiseKey)
}
