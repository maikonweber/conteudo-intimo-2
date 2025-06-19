import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 no-select",
  {
    variants: {
      variant: {
        default: "bg-french-rose text-white shadow hover:bg-french-rose/90 hover:scale-105",
        destructive: "bg-red-500 text-white shadow-sm hover:bg-red-500/90",
        outline: "border border-french-rose bg-transparent shadow-sm hover:bg-french-rose hover:text-white",
        secondary: "bg-carnation-pink text-black shadow-sm hover:bg-carnation-pink/80 hover:scale-105",
        ghost: "hover:bg-french-rose/20 hover:text-french-rose",
        link: "text-french-rose underline-offset-4 hover:underline hover:animate-shake",
        gradient: "bg-gradient-pink text-white shadow-lg hover:bg-gradient-pink-animated hover:scale-105",
        brutalist: "bg-misty-rose text-black font-black uppercase tracking-wider brutal-shadow hover:scale-105 hover:animate-heartbeat",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-lg font-bold",
        xl: "h-16 rounded-xl px-12 text-xl font-black",
        icon: "h-9 w-9",
      },
      animation: {
        none: "",
        hover: "hover:animate-pulse",
        heartbeat: "animate-heartbeat",
        shake: "hover:animate-shake",
        float: "animate-float",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 