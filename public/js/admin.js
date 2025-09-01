import { qs, on, requireAuth, logout, fmtDate, badge } from '../funtions/utils.js';
import { api } from '../funtions/api.js';

const me = requireAuth();
if(me.role!=='admin'){ location.href='./pages/index.html'; }
await api.init();

on(qs('#logout'), 'click', logout);

async function load(){
  const list = await api.getRequests('pending');
  const container = qs('#list');
  if(list.length===0){ container.innerHTML = '<p>No hay solicitudes pendientes.</p>'; return; }
  container.innerHTML = list.map(r => `
    <div class="card" data-id="${r.id}">
      <div class="header">
        <h3>${r.username} — ${badge(r.status)}</h3>
        <small>${fmtDate(r.outDate)} → ${fmtDate(r.backDate)}</small>
      </div>
      <p><b>Sede:</b> ${r.campus||'-'} | <b>Equipo:</b> ${r.deviceCode}</p>
      <div class="grid grid-2">
        <button class="approve">Aprobar</button>
        <button class="reject">Rechazar</button>
      </div>
    </div>
  `).join('');
  bind();
}
function bind(){
  qs('#list').addEventListener('click', async (e)=>{
    const card = e.target.closest('.card'); if(!card) return;
    const id = Number(card.dataset.id);
    if(e.target.classList.contains('approve')){
      await api.updateRequest(id, { status:'approved' });
      await load();
    }
    if(e.target.classList.contains('reject')){
      await api.updateRequest(id, { status:'rejected' });
      await load();
    }
  });
}

await load();
