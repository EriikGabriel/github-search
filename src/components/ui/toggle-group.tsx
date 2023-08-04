"use client"

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleGroupVariants>
>({
  size: "default",
  variant: "default",
})

const toggleGroupVariants = cva(
  "inline-flex items-center justify-center  text-muted-foreground text-sm font-medium transition-colors data-[state=on]:bg-accent-foreground/5 dark:data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background hover:bg-muted hover:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "bg-transparent data-[state=on]:bg-muted",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
      space: {
        attached: "first:rounded-l last:rounded-r",
        separate: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      space: "attached",
    },
  }
)

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleGroupVariants>
>(({ className, variant, space, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50",
      variant === "outline" ? "border border-input bg-transparent" : "",
      space === "separate" ? "bg-transparent gap-3" : "bg-accent/50",
      className
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size, space }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupVariants({
          variant: context?.variant,
          size: context?.size,
          space: context?.space,
        }),
        className
      )}
      {...props}
    />
  )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
