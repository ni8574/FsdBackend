const API = '/api/requests';
const $ = (id) => document.getElementById(id);
const form = $('requestForm'), list = $('list'), msg = $('message');

function say(text, ok = false) { msg.textContent = text; msg.className = ok ? 'ok' : ''; }

// GET all requests
async function loadRequests() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error();
    render(await res.json());
  } catch { list.innerHTML = '<p class="empty">Could not load requests.</p>'; }
}

function render(items) {
  $('count').textContent = items.length ? `(${items.length})` : '';
  list.innerHTML = '';
  if (!items.length) { list.innerHTML = '<p class="empty">No requests yet. Submit the first one above.</p>'; return; }
  items.slice().reverse().forEach((r) => {
    const el = document.createElement('article');
    el.className = 'req';
    el.innerHTML = `
      <div class="req-top"><h3></h3><span class="badge ${r.priority}">${r.priority}</span></div>
      <p class="meta"></p><p class="desc"></p>
      <div class="req-actions">
        <select aria-label="Status">${['Open','In Progress','Resolved'].map((s) => `<option ${s === r.status ? 'selected' : ''}>${s}</option>`).join('')}</select>
        <button class="small ghost edit">Edit</button>
        <button class="small danger del">Delete</button>
      </div>`;
    // textContent keeps user input safe from HTML injection
    el.querySelector('h3').textContent = `#${r.id} · ${r.category}`;
    el.querySelector('.meta').textContent = `${r.name} · ${r.email} · ${new Date(r.createdAt).toLocaleString()}`;
    el.querySelector('.desc').textContent = r.description;
    el.querySelector('select').onchange = (e) => updateRequest(r.id, { status: e.target.value });
    el.querySelector('.edit').onclick = () => startEdit(r);
    el.querySelector('.del').onclick = () => deleteRequest(r.id);
    list.appendChild(el);
  });
}

// POST (new) or PUT (edit)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    name: $('name').value, email: $('email').value, category: $('category').value,
    priority: $('priority').value, description: $('description').value,
  };
  const id = $('requestId').value;
  try {
    const res = await fetch(id ? `${API}/${id}` : API, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) return say((data.errors || [data.error]).join(', '));
    resetForm(); say(id ? 'Request updated.' : 'Request submitted.', true);
    loadRequests();
  } catch { say('Network error. Is the server running?'); }
});

// PUT (partial update, e.g. status)
async function updateRequest(id, changes) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changes),
  });
  if (!res.ok) say('Update failed.');
  loadRequests();
}

// DELETE
async function deleteRequest(id) {
  if (!confirm(`Delete request #${id}?`)) return;
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (!res.ok) say('Delete failed.');
  loadRequests();
}

function startEdit(r) {
  $('requestId').value = r.id; $('name').value = r.name; $('email').value = r.email;
  $('category').value = r.category; $('priority').value = r.priority; $('description').value = r.description;
  $('formTitle').textContent = `Edit Request #${r.id}`;
  $('submitBtn').textContent = 'Save Changes'; $('cancelBtn').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  form.reset(); $('requestId').value = ''; $('priority').value = 'Medium';
  $('formTitle').textContent = 'New Request'; $('submitBtn').textContent = 'Submit Request';
  $('cancelBtn').hidden = true;
}
$('cancelBtn').onclick = () => { resetForm(); say(''); };

loadRequests();