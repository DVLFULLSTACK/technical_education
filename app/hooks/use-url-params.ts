import {
  useCallback,
} from "react"

import {
  useRouter, useSearchParams,
} from "next/navigation"

export function useUrlParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleGet = useCallback(
    <T extends unknown>(name: string, defaultValue: T): T => {
      if (typeof name !== "string") {
        return defaultValue
      }
      if (typeof defaultValue === "number") {
        const result = searchParams.get(name)
        return result ? Number(result) as T : defaultValue
      }
      return searchParams.get(name) as T || defaultValue
    }, [searchParams]
  )

  const handleSet = useCallback(
    <T extends unknown>(value: T, name: string): void => {
      const params = new URLSearchParams(searchParams)

      const handle = () => {
        if (value) {
          params.set(
            name, String(value)
          )
        }
        else {
          params.delete(name)
        }
      }

      if (typeof value !== "object") {
        handle()
      }
      else {
        // eslint-disable-next-line no-console
        console.error("Không hỗ trợ các biến: object, array, function")
      }

      router.push(`?${params.toString()}`)
    }, [searchParams]
  )

  return [
    handleGet,
    handleSet,
  ] as const
}
