"use client"

import {
  useRef, type InputHTMLAttributes, useContext, createContext, forwardRef, type HTMLAttributes,
  type RefObject,
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
} from "react"

import {
  Search, X,
} from "lucide-react"

import {
  useControllableState,
} from "@/app/hooks/use-controllable-state"
import {
  useUpdateEffect,
} from "@/app/hooks/use-update-effect"

import {
  chain,
} from "@/lib/chain"
import {
  mergeRefs,
} from "@/lib/merge-ref"

import {
  Button, ButtonSpin, type ButtonProps,
} from "@/components/ui/button"
import {
  cn,
} from "@/lib/utils"

type SearchBarValue = {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleClear?: () => void
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  handleSearch?: () => void
  inputRef?: RefObject<HTMLInputElement>
  value?: string
}

const SearchBarContext = createContext<SearchBarValue | undefined>(undefined)

const useSearchBar = () => {
  const context = useContext(SearchBarContext)
  if (!context) {
    throw new Error("useSearchBar must be used within a SearchBar")
  }
  return context
}

interface SearchBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onSearchChange?: (value?: string) => void
  onValueChange?: (value?: string) => void
  className?: string
}

const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>((
  {
    defaultValue, value: valueProp, onValueChange, onSearchChange, className, ...props
  }, ref
) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [
    value,
    setValue,
  ] = useControllableState<string | undefined>({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  })

  useUpdateEffect(
    () => {
      if (!defaultValue) {
        setValue(undefined)
      }
    }, [defaultValue]
  )

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue?.(e.target.value.toLowerCase())
    }, []
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        onSearchChange?.(value || undefined)
      }
    }, [value]
  )

  const handleClear = useCallback(
    () => {
      onSearchChange?.(undefined)
      setValue?.(undefined)
      inputRef.current?.focus()
    }, [
      inputRef.current,
      value,
      valueProp,
      defaultValue,
      onValueChange,
      onSearchChange,
    ]
  )

  const handleSearch = useCallback(
    () => {
      onSearchChange?.(value || undefined)
    }, [
      value,
      valueProp,
      defaultValue,
      onValueChange,
      onSearchChange,
    ]
  )

  return (
    <SearchBarContext.Provider
      value={
        {
          handleChange,
          handleKeyDown,
          handleClear,
          handleSearch,
          inputRef,
          value,
        }
      }
    >
      <div
        ref={ref}
        className={
          cn(
            "flex items-center gap-3", className
          )
        }
        {...props}
      />
    </SearchBarContext.Provider>
  )
})
SearchBar.displayName = "SearchBar"

const SearchBarBox = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>((
  {
    className, ...props
  }, ref
) => {
  return (
    <label
      ref={ref}
      className={
        cn(
          "flex items-center gap-1 h-9 w-full rounded-full border border-input pl-3 pr-2 py-1 text-sm shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring min-w-60 bg-background", className
        )
      }
      {...props}
    />
  )
})

SearchBarBox.displayName = "SearchBarBox"

const SearchBarInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((
  {
    onKeyDown, onChange, className, ...props
  }, ref
) => {
  const {
    value, inputRef, handleChange, handleKeyDown,
  } = useSearchBar()

  return (
    <input
      ref={
        mergeRefs(
          ref, inputRef
        )
      }
      value={value || ""}
      onChange={
        chain(
          onChange, handleChange
        )
      }
      onKeyDown={
        chain(
          onKeyDown, handleKeyDown
        )
      }
      className={
        cn(
          "focus-visible:outline-none flex-1 disabled:opacity-50 placeholder:text-muted-foreground disabled:cursor-not-allowed bg-transparent", className
        )
      }
      {...props}
    />
  )
})

SearchBarInput.displayName = "SearchBarInput"

const SearchBarClear = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>((
  {
    className, onClick, children, ...props
  }, ref
) => {
  const {
    value, handleClear,
  } = useSearchBar()

  return (
    <button
      ref={ref}
      tabIndex={-1}
      type="button"
      onClick={
        chain(
          onClick, handleClear
        )
      }
      className={
        cn(
          "size-6 rounded-full hover:bg-muted grid place-content-center [&_svg]:size-4 text-foreground/65 invisible",
          value && "visible",
          className
        )
      }
      {...props}
    >
      {
        children || <X />
      }
    </button>
  )
})

SearchBarClear.displayName = "SearchBarClear"

const SearchBarButton = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    className, onClick, children, ...props
  }, ref
) => {
  const { handleSearch } = useSearchBar()


  return (
    <Button
      ref={ref}
      onClick={
        chain(
          onClick, handleSearch
        )
      }
      size="icon"
      variant="outline"
      className={
        cn(
          "shrink-0", className
        )
      }
      {...props}
    >
      {children || <ButtonSpin as={<Search />} />}
    </Button>
  )
})

SearchBarButton.displayName = "SearchBarButton"

export {
  SearchBar, SearchBarBox, SearchBarInput, SearchBarButton, SearchBarClear,
}
