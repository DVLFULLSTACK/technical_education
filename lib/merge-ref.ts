
import {
  type ForwardedRef, type MutableRefObject,
} from "react"

export function mergeRefs<T>(...refs: Array<ForwardedRef<T> | MutableRefObject<T> | null | undefined>): ForwardedRef<T> {
  if (refs.length === 1 && refs[0]) {
    return refs[0]
  }

  return (value: T | null) => {
    refs.forEach((ref) => {
      // eslint-disable-next-line no-restricted-syntax
      if (ref instanceof Function) {
        ref(value)
      }
      // eslint-disable-next-line no-restricted-syntax
      else if (ref !== null && ref !== undefined) {
        ref.current = value
      }
    })
  }
}
