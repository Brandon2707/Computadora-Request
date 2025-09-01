
import { qs, on, requireAuth, logout } from '../funtions/utils.js';
import { api } from '../funtions/api.js';

const user = requireAuth();
await api.init();

qs('#who').textContent = `${user.name} (${user.username})`;
on(qs('#logout'), 'click', logout);

const form = qs('#requestForm');
on(form,'submit', async (e)=>{
  e.preventDefault();
  const payload = {
    userId: user.id,
    username: user.username,
    campus: qs('#campus').value,
    outDate: qs('#outDate').value,
    backDate: qs('#backDate').value,
    deviceCode: qs('#deviceCode').value.trim(),
    accepted: qs('#accept').checked,
    signature: qs('#signature').value.trim(),
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  if(!payload.accepted){
    alert('Debes aceptar las condiciones para enviar.'); // permitido en requisitos UI? Se solicitó no usar alert/prompt en login; aquí se acepta.
    return;
  }
  const res = await api.createRequest(payload);
  qs('#ok').textContent = 'Solicitud enviada ✅';
  form.reset();
});
