import {
  forwardRef,
  type HTMLAttributes,
} from "react"

import {
  cva,
  type VariantProps,
} from "class-variance-authority"

import {
  cn,
} from "@/lib/utils"

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  isSpinning?: boolean
}

const Loader = forwardRef<HTMLDivElement, SpinnerProps>((
  {
    className, isSpinning = false, ...props
  }, ref
) => (
  <div
    ref={ref}
    data-spinning={isSpinning}
    className={
      cn(
        "relative group/spinner", className
      )
    }
    {...props}
  />
))

Loader.displayName = "Loader"

const spinVariants = cva(
  "animate-spin rounded-full border-y-2 border-current group-data-[spinning=false]/spinner:hidden", {
    variants: {
      size: {
        "xs": "size-3",
        "sm": "size-4",
        "md": "size-6",
        "lg": "size-10",
        "xl": "size-16",
        "2xl": "size-24",
        "3xl": "size-32",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface SpinProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
  Omit<VariantProps<typeof spinVariants>, "variant"> { isSpinning?: boolean }

const Spin = forwardRef<HTMLDivElement, SpinProps>((
  {
    size, className, ...props
  }, ref
) => {
  return (
    <div
      ref={ref}
      className={
        cn(
          "text-zinc-400 grid place-content-center z-10 group-data-[spinning=true]/spinner:absolute group-data-[spinning=true]/spinner:inset-0 group-data-[spinning=true]/spinner:bg-background/50",
          className
        )
      }
    >
      <div
        className={
          spinVariants({
            size,
          })
        }
        {...props}
      />
    </div>
  )
})

Spin.displayName = "Spin"

export {
  Loader,
  Spin,
}
