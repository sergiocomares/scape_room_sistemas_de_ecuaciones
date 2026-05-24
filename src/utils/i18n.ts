import type { Language, LocalizedText } from '../types';

export function t(value: string | LocalizedText | undefined, lang: Language): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang];
}
