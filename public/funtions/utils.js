export const qs = (sel, root=document) => root.querySelector(sel);
export const qsa = (sel, root=document) => [...root.querySelectorAll(sel)];
export const on = (el, ev, fn) => el.addEventListener(ev, fn);
export const fmtDate = (d) => new Date(d).toLocaleDateString();
export const badge = (status='pending') => {
  const map = { pending:'Pendiente', approved:'Aprobada', rejected:'Rechazada' };
  return `<span class="badge ${status}">${map[status]||status}</span>`;
};
export const requireAuth = () => {
  const raw = localStorage.getItem('auth');
  if(!raw) { location.href = '../pages/login.html'; return null; }
  try { return JSON.parse(raw); } catch { localStorage.removeItem('auth'); location.href='../pages/login.html'; }
};
export const logout = () => { localStorage.removeItem('auth'); location.href='../pages/login.html'; };
