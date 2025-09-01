
import { qs, qsa, on, requireAuth, logout, fmtDate, badge } from '../funtions/utils.js';
import { api } from '../funtions/api.js';

requireAuth();
await api.init();

on(qs('#logout'), 'click', logout);

let all = await api.getRequests();
render(all);

on(qs('#q'), 'input', (e)=>{
  const v = e.target.value.toLowerCase();
  const filtered = all.filter(r => 
    r.username.toLowerCase().includes(v) ||
    r.deviceCode.toLowerCase().includes(v) ||
    (r.campus||'').toLowerCase().includes(v)
  );
  render(filtered);
});

function render(list){
  const tbody = qs('tbody');
  tbody.innerHTML = list.map(r => `
    <tr>
      <td>${r.username}</td>
      <td>${r.campus||'-'}</td>
      <td>${fmtDate(r.outDate)} → ${fmtDate(r.backDate)}</td>
      <td>${r.deviceCode}</td>
      <td>${badge(r.status)}</td>
    </tr>
  `).join('');

  // reduce: estadísticas por usuario
  const byUser = list.reduce((acc, r)=>{
    acc[r.username] = (acc[r.username]||0)+1;
    return acc;
  }, {});
  const stats = Object.entries(byUser).map(([u,c])=>`${u}: ${c}`).join(' | ') || '—';
  qs('#stats').textContent = stats;
}
