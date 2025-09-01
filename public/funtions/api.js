import { storage } from './storage.js';

const API = 'http://localhost:3000';
const opts = { headers:{'Content-Type':'application/json'} };

async function tryFetch(url, init){
  try{
    const res = await fetch(url, init);
    if(!res.ok) throw new Error('HTTP '+res.status);
    return await res.json();
  }catch(e){
    return null; // fallback outside
  }
}

export const api = {
  async init(){
    storage.initDefaults();
  },
  async loginLocal(username, password){
    const users = storage.getUsers();
    return users.find(u=>u.username===username && u.password===password) || null;
  },
  async getRequests(status){
    const online = await tryFetch(`${API}/requests${status?`?status=${status}`:''}`);
    if(online) return online;
    let reqs = storage.getRequests();
    if(status) reqs = reqs.filter(r=>r.status===status);
    return reqs;
  },
  async createRequest(payload){
    const online = await tryFetch(`${API}/requests`, { method:'POST', ...opts, body:JSON.stringify(payload) });
    if(online) return online;
    return storage.addRequest(payload);
  },
  async updateRequest(id, patch){
    const online = await tryFetch(`${API}/requests/${id}`, { method:'PUT', ...opts, body:JSON.stringify(patch) });
    if(online) return online;
    return storage.updateRequest(id, patch);
  }
};
