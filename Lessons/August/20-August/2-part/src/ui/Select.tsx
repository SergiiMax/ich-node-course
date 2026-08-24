import { useId } from 'react';

/**
 * Generic-компонент, ограниченный строковыми литералами (T extends string).
 * Благодаря этому onChange отдаёт наверх не string, а конкретный union —
 * например Priority ('low' | 'normal' | 'high').
 */
type SelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  getLabel: (option: T) => string;
  onChange: (value: T) => void;
};

export function Select<T extends string>({
  label,
  value,
  options,
  getLabel,
  onChange,
}: SelectProps<T>) {
  const id = useId();

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="input"
        value={value}
        // event.target.value — это string, поэтому сужаем до T.
        // Приведение безопасно: значения option мы взяли из options.
        onChange={(event) => onChange(event.target.value as T)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {getLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
