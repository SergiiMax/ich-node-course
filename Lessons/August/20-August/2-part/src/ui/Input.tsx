import { useId, type ComponentPropsWithRef } from 'react';

/**
 * Обёртка над <input>: добавляем подпись и текст ошибки,
 * всё остальное (value, onChange, placeholder, disabled…) — нативные пропсы.
 */
type InputProps = ComponentPropsWithRef<'input'> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className, ...rest }: InputProps) {
  // useId даёт стабильный уникальный id и связывает label с input.
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className={`input ${error ? 'input--invalid' : ''} ${className ?? ''}`}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}
