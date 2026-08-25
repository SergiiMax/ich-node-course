// Описание данных, с которыми работает приложение.
// Один интерфейс на весь проект — его импортируют все компоненты.

export interface Post {
  id: number;
  title: string;
  body: string;
}
