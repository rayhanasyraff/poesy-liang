import { cva } from "class-variance-authority";
import { brightGrotesk } from "./fonts";

export const textStyle = cva(brightGrotesk.className, {
    variants: {
        size: {
            micro: 'text-[6px]',
            tiny: 'text-[10px]',
            xs: 'text-[13px]',
            sm: 'text-[15px]',
            base: 'text-md',
            md: 'text-xl',
            lg: 'text-[20px]',
            xl: 'text-[25px]',
            xxl: 'text-[30px]',
            xxxl: 'text-6xl',
        },
        color: {
            base: 'text-white',
            selected: 'text-pink-yakuza',
        },
        weight: {
            light: 'font-light',
            normal: 'font-normal',
            semibold: 'font-semibold'
        },
        opacity: {
            base: 'opacity-75',
            selected: 'opacity-100',
            disabled: 'opacity-30'
        }
    },
    defaultVariants: {
        size: 'base',
        color: 'base',
        weight: 'normal',
        opacity: 'base'    
    },
})