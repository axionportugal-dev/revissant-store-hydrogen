export function isHomePath(pathname: string) {
  if (pathname === '/') return true;
  // cobre /pt-PT, /en-US, etc (rotas ($locale))
  return /^\/[a-z]{2}(?:-[A-Z]{2})?\/?$/.test(pathname);
}