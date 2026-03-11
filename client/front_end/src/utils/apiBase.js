export const API_BASE = (() => {
  // GitHub Pages (project site) has no proxy, so we must call the hosted backend.
  // Local dev can keep using relative "/api" with Vite proxy if you enable it.
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host.endsWith('github.io')) return 'https://landbook.onrender.com';
  }
  return '';
})();

