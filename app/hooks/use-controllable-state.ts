import React from "react"

const noop = () => {}

type UseControllableStateParams<T> = {
  prop?: T | undefined
  defaultProp?: T | undefined
  onChange?: (state: T) => void
}

type SetStateFn<T> = (prevState?: T) => T

function useCallbackRef<T extends (...args: unknown[]) => unknown>(callback: T | undefined): T {
  const callbackRef = React.useRef(callback)

  React.useEffect(() => {
    callbackRef.current = callback
  })

  // https://github.com/facebook/react/issues/19240
  return React.useMemo(
    () => ((...args) => callbackRef.current?.(...args)) as T, []
  )
}

function useUncontrolledState<T>({
  defaultProp, onChange,
}: Omit<UseControllableStateParams<T>, "prop">) {
  const uncontrolledState = React.useState<T | undefined>(defaultProp)
  const [value] = uncontrolledState
  const prevValueRef = React.useRef(value)
  const handleChange = useCallbackRef(onChange as (...args: unknown[]) => unknown)

  React.useEffect(
    () => {
      if (prevValueRef.current !== value) {
        handleChange(value as T)
        prevValueRef.current = value
      }
    }, [
      value,
      prevValueRef,
      handleChange,
    ]
  )

  return uncontrolledState
}
export function useControllableState<T>({
  prop, defaultProp, onChange = noop,
}: UseControllableStateParams<T>) {
  const [
    uncontrolledProp,
    setUncontrolledProp,
  ] = useUncontrolledState({
    defaultProp,
    onChange,
  })
  const isControlled = prop !== undefined
  const value = (isControlled ? prop : uncontrolledProp) as T
  const handleChange = useCallbackRef(onChange as (...args: unknown[]) => unknown)

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>
        const value = typeof nextValue === "function" ? setter(prop) : nextValue
        if (value !== prop) handleChange(value as T)
      }
      else {
        setUncontrolledProp(nextValue)
      }
    },
    [
      isControlled,
      prop,
      setUncontrolledProp,
      handleChange,
    ],
  )

  return [
    value,
    setValue,
  ] as const
}
