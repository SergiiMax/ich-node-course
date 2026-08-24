import type { ReactNode } from 'react';

/**
 * Generic-компонент списка: T выводится из items,
 * поэтому внутри renderItem уже известен точный тип элемента.
 *
 * keyof-ограничение на getKey не нужно — достаточно функции,
 * которая умеет достать ключ из элемента.
 */
type ListProps<T> = {
  items: readonly T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
  empty?: ReactNode;
};

export function List<T>({ items, getKey, renderItem, empty = null }: ListProps<T>) {
  if (items.length === 0) return <>{empty}</>;

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={getKey(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}
