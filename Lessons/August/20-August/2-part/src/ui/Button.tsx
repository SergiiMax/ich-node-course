import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';
type Size = 'sm' | 'md';

/**
 * Пропсы = все нативные пропсы <button> + наши собственные.
 * ComponentPropsWithoutRef<'button'> даёт onClick, disabled, type, aria-*
 * с правильными типами — описывать их руками не нужно.
 */
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return <button className={`btn btn--${variant} btn--${size} ${className ?? ''}`} {...rest} />;
}
