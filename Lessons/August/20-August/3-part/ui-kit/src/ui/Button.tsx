import type { ComponentPropsWithoutRef } from "react";

type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'sm' |'md'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant
  size?: Size
}

export function Button(props: ButtonProps) {
    const { variant = 'primary', size = 'md', className, ...rest } = props
    return (
        <button className={`btn btn--${variant} btn--${size} ${className ?? ''}`} {...rest}/>
    )
}