export function getLocalePathPrefix(locale?: string | null) {
  if (!locale) return '';
  return /^[a-z]{2}-[a-z]{2}$/i.test(locale) ? `/${locale}` : '';
}
