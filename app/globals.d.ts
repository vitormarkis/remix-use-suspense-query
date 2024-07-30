import { QueryClient } from "@tanstack/react-query"

declare global {
  interface Window {
    queriesLoading: Set<string>
    queryClient: QueryClient
    isHydrating: boolean
  }
}

export {}
