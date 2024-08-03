import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import "./tailwind.css"

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useEffect } from "react"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000,
      },
    },
  })
}

if (!isServer) {
  Object.assign(window, { queryClient: undefined })
}

const serverClient = makeQueryClient()
export function getQueryClient(): QueryClient {
  if (isServer) return serverClient
  if (!window.queryClient) window.queryClient = makeQueryClient()
  return window.queryClient
}

export async function clientLoader() {
  getQueryClient().removeQueries({ type: "all" })
  return null
}

export function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  useEffect(() => {
    setTimeout(() => {
      console.log("Finished hydration")
      window.isHydrating = false
    }, 2000)
  }, [])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
