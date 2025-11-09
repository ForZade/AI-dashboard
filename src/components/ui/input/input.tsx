import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputWrapperVariants = cva(
  "relative flex items-center w-full",
  {
    variants: {
      inputSize: {
        sm: "h-8",
        default: "h-9",
      }
    },
    defaultVariants: {
      inputSize: "default",
    }
  }
)

const inputVariants = cva(
  "w-full",
  {
    variants: {
      inputSize: {
        sm: "text-sm h-8",
        default: "text-base h-9",
      }
    },
    defaultVariants: {
      inputSize: "default",
    }
  }
)

interface InputProps extends 
  React.ComponentProps<"input">,
  VariantProps<typeof inputVariants> {
  startIcon?: React.ComponentType<{ className?: string }>;
  endIcon?: React.ComponentType<{ className?: string }>;
}

function Input({ 
  className, 
  type, 
  inputSize,
  startIcon: StartIcon, 
  endIcon: EndIcon,
  ...props 
}: InputProps) {
  return (
    <div className={inputWrapperVariants({ inputSize })}>
      {StartIcon && (
        <StartIcon className="absolute left-3 text-muted-foreground pointer-events-none" />
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          inputVariants({ inputSize }),
          "file:text-foreground placeholder:text-foreground/50 selection:bg-accent/50 border-foreground/10 min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-foreground/20 focus-visible:ring-accent/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-c-red/20 dark:aria-invalid:ring-c-red/40 aria-invalid:border-c-red",
          StartIcon && "pl-10",
          EndIcon && "pr-10",
          className
        )}
        {...props}
      />
      {EndIcon && (
        <EndIcon className="absolute right-3 text-muted-foreground pointer-events-none" />
      )}
    </div>
  )
}

export { Input }