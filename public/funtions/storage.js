const LS_KEY = 'permits_fallback';
const DEFAULTS = { users:[], requests:[] };

const load = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || DEFAULTS; } catch { return DEFAULTS; }
};
const save = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data));

export const storage = {
  initDefaults(){
    const data = load();
    if(!data.users || data.users.length === 0){
      data.users = [
        { id:1, username:'admin', password:'admin123', role:'admin', name:'Administrador' },
        { id:2, username:'user1', password:'1111', role:'student', name:'Ana Student' },
        { id:3, username:'user2', password:'2222', role:'student', name:'Bran Student' },
      ];
    }
    if(!data.requests) data.requests = [];
    save(data);
  },
  getUsers(){ return load().users; },
  getRequests(){ return load().requests; },
  addRequest(req){
    const data = load();
    req.id = Date.now();
    data.requests.push(req);
    save(data);
    return req;
  },
  updateRequest(id, patch){
    const data = load();
    const i = data.requests.findIndex(r=>r.id==id);
    if(i>=0){ data.requests[i] = { ...data.requests[i], ...patch }; save(data); return data.requests[i]; }
    return null;
  }
};
