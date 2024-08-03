import { LoaderFunctionArgs } from "@remix-run/node"
import {
  ClientActionFunction,
  ClientActionFunctionArgs,
  ClientLoaderFunction,
  ClientLoaderFunctionArgs,
  defer,
  useParams,
} from "@remix-run/react"
import { hashKey } from "@tanstack/react-query"
import { Suspense } from "react"
import { ProfileInfo } from "~/components/profile-info"
import { ProfileStats } from "~/components/profile-stats"
import { queryOptionsFetchProfile } from "~/components/query-options-profile"
import { Skeleton } from "~/components/skeleton"
import { getQueryClient } from "~/root"
import { bad, LoaderDataPromiseRecord, nice } from "~/utils"

export async function loader({ params }: LoaderFunctionArgs) {
  const optionsFetchProfile = queryOptionsFetchProfile({
    username: params.username!,
  })

  return defer({
    [hashKey(optionsFetchProfile.queryKey)]:
      getQueryClient().fetchQuery(optionsFetchProfile),
  })
}

export const clientLoader = factoryClientLoader(({ params, serverLoader }) => {
  return serverLoader()
})

export function factoryClientLoader(clientLoader?: ClientLoaderFunction) {
  return async (args: ClientLoaderFunctionArgs) => {
    const clientLoaderData = clientLoader
      ? await clientLoader(args)
      : args.serverLoader()

    const [noPrefetchesShape, prefetchs] = ensurePrefetches(clientLoaderData)
    if (noPrefetchesShape) return clientLoaderData

    for (const [promiseKey, promise] of Object.entries(prefetchs)) {
      if (promise instanceof Promise) {
        console.log("Adding promise ", promiseKey)
        window.queriesLoading.add(promiseKey)
        promise.finally(() => {
          window.queriesLoading.delete(promiseKey)
        })
      }
    }

    return clientLoaderData
  }
}

// @ts-ignore
clientLoader.hydrate = true

export default function Home() {
  const params = useParams()

  return (
    <div className="flex gap-2">
      <Suspense
        key={Object.values(params).join(":")}
        fallback={<Skeleton />}
      >
        <ProfileInfo />
        <ProfileStats />
      </Suspense>
    </div>
  )
}

export function ensurePrefetches(loaderData: unknown) {
  if (!loaderData) return bad()
  if (typeof loaderData !== "object") return bad()
  if (loaderData) return nice(loaderData as LoaderDataPromiseRecord)
  return bad()
}
