// ─── Доменные типы ────────────────────────────────────────────────────────────
export type Category = 'news' | 'guide'| 'note'
/** Источник правды для списка категорий: массив + выведенный из него тип. */
export const CATEGORIES = ['news', 'guide', 'note'] as const;
// export const CATEGORIES = ['news', 'guide', 'note'];
// export type Category = (typeof CATEGORIES)[number]; // 'news' | 'guide' | 'note'

export interface Post {
  id: number;
  title: string;
  body: string;
  category: Category;
  createdAt: string;
}

/** Record гарантирует, что подпись описана для КАЖДОЙ категории. */
export const CATEGORY_LABELS: Record<Category, string> = {
  news: 'Новость',
  guide: 'Инструкция',
  note: 'Заметка',
};
