import * as React from "react"

import {
  Slot,
} from "@radix-ui/react-slot"
import {
  cva, type VariantProps,
} from "class-variance-authority"
import {
  Loader,
} from "lucide-react"

import {
  cn,
} from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group/button",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-primary/20 text-primary hover:bg-primary hover:text-white shadow-sm",
        ghost: "hover:bg-light-primary hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  {
    className,
    variant,
    size,
    disabled,
    asChild = false,
    isLoading = false,
    ...props
  }, ref
) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      disabled={disabled || isLoading}
      data-loading={isLoading}
      className={
        cn(buttonVariants({
          variant,
          size,
          className,
        }),)
      }
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

interface ButtonSpinProps extends Omit<
  React.ButtonHTMLAttributes<HTMLSpanElement>,
  "children"
> {
  as?: React.ReactElement
}

const ButtonSpin = React.forwardRef<HTMLSpanElement, ButtonSpinProps>((
  {
    className, as, ...props
  }, ref
) => {
  return (
    <span
      ref={ref}
      className={
        cn(
          "shrink-0 inline-grid place-content-center",
          !as && "group-data-[loading=false]/button:hidden",
          className,
        )
      }
      {...props}
    >
      <span className="rotate-90 scale-0 transition-transform duration-500 ease-in-out group-data-[loading=true]/button:rotate-0 group-data-[loading=true]/button:scale-100">
        <Loader className="animate-spin text-current" />
      </span>

      {
        as
          ? (
            <span className="scale-100 absolute rotate-0 transition-transform duration-500 ease-in-out group-data-[loading=true]/button:-rotate-90 group-data-[loading=true]/button:scale-0">
              {as}
            </span>
          )
          : null
      }
    </span>
  )
},)

ButtonSpin.displayName = "ButtonSpin"

export {
  Button, buttonVariants, ButtonSpin,
}
