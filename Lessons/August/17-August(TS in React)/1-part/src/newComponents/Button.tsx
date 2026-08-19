import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "error"  
// Пропсы компонента расщиряют базовые пропсы кнопки(из Реакта).
// Это нужно для получения onClick, type, disabled в типизированном виде
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
function Button({ variant="primary", ...otherProps }: ButtonProps) {
  return (
    <button className={`btn btn--${variant}`} {...otherProps}/>
  );
}

export default Button;