export function bad<const T = true>(error: T = true as T) {
  return [error] as [T]
}

export function nice<const T = undefined>(result?: T) {
  return [null, result] as [null, T]
}

export type LoaderDataPromiseRecord<T = any> = {
  [K: string]: Promise<T>
}
