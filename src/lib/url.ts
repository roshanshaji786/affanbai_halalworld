/** Base-aware internal link: u('/umrah-packages/') works on a root domain and under a sub-path. */
export function u(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}
