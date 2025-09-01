
import { qs, on } from '../funtions/utils.js';
import { api } from '../funtions/api.js';

await api.init();

const form = qs('#loginForm');
on(form,'submit', async (e)=>{
  e.preventDefault();
  const username = qs('#username').value.trim();
  const password = qs('#password').value.trim();
  const user = await api.loginLocal(username,password);
  const msg = qs('#msg');
  if(!user){
    msg.textContent = 'Credenciales inválidas'; msg.style.color = '#f88'; return;
  }
  localStorage.setItem('auth', JSON.stringify({ id:user.id, name:user.name, role:user.role, username:user.username }));
  location.href = user.role==='admin' ? '../pages/admin.html' : '../pages/index.html';
});
