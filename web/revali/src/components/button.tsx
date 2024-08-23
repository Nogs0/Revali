import { LogIn, ArrowRightToLine } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";


const buttonVariants = tv({
    base: "bg-[#63995B] text-white font-sans flex items-center gap-3 hover:bg-green-medium",

    variants: {
        variant: {
            primary: "rounded-2xl tall:rounded-2xl mt-3 tall:mt-7 font-raleway-bold text-lg tall:text-xl px-9 tall:px-9 py-3",
        }
    },

    defaultVariants: {
        variant: 'primary'
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
    children: ReactNode
    login: boolean
}

export function Button({children, variant, login, ...props}: ButtonProps) {
    return (
        <button {...props} className={buttonVariants({variant})}>
            {children}
            {login ? (<LogIn className="size-8 tall:size-12" />) : (<ArrowRightToLine className="size-12"/>)}
        </button>
    )
}