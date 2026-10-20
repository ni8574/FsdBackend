const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'requests.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Helper functions (fs module) ----------
async function readRequests() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

function writeRequests(data) {
  return fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

const PRIORITIES = ['Low', 'Medium', 'High'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body, partial = false) {
  const errors = [];
  const need = (f) => !partial || body[f] !== undefined;

  for (const f of ['name', 'email', 'category', 'description']) {
    if (need(f) && !String(body[f] ?? '').trim()) errors.push(`${f} is required`);
  }
  if (body.email && !EMAIL_RE.test(body.email)) errors.push('email is invalid');
  if (need('priority') && !PRIORITIES.includes(body.priority)) errors.push('priority must be Low, Medium or High');
  return errors;
}

// ---------- Routes ----------

// GET all requests
app.get('/api/requests', async (req, res) => {
  try {
    res.json(await readRequests());
  } catch {
    res.status(500).json({ error: 'Could not read data' });
  }
});

// GET one request
app.get('/api/requests/:id', async (req, res) => {
  try {
    const item = (await readRequests()).find((r) => r.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Request not found' });
    res.json(item);
  } catch {
    res.status(500).json({ error: 'Could not read data' });
  }
});

// POST - create a request
app.post('/api/requests', async (req, res) => {
  const errors = validate(req.body);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const all = await readRequests();
    const { name, email, category, description, priority } = req.body;

    const item = {
      id: all.reduce((max, r) => Math.max(max, r.id), 0) + 1,
      name: name.trim(),
      email: email.trim(),
      category,
      description: description.trim(),
      priority,
      createdAt: new Date().toISOString(),
    };

    all.push(item);
    await writeRequests(all);
    res.status(201).json(item);
  } catch {
    res.status(500).json({ error: 'Could not save data' });
  }
});

// PUT - update a request
app.put('/api/requests/:id', async (req, res) => {
  const errors = validate(req.body, true);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const all = await readRequests();
    const i = all.findIndex((r) => r.id === Number(req.params.id));
    if (i === -1) return res.status(404).json({ error: 'Request not found' });

    const allowed = ['name', 'email', 'category', 'description', 'priority'];
    for (const key of allowed) {
      if (req.body[key] !== undefined) all[i][key] = req.body[key].trim();
    }
    all[i].updatedAt = new Date().toISOString();

    await writeRequests(all);
    res.json(all[i]);
  } catch {
    res.status(500).json({ error: 'Could not save data' });
  }
});

// DELETE - remove a request
app.delete('/api/requests/:id', async (req, res) => {
  try {
    const all = await readRequests();
    const i = all.findIndex((r) => r.id === Number(req.params.id));
    if (i === -1) return res.status(404).json({ error: 'Request not found' });

    const [removed] = all.splice(i, 1);
    await writeRequests(all);
    res.json(removed);
  } catch {
    res.status(500).json({ error: 'Could not save data' });
  }
});

app.listen(PORT, () => {
  console.log(`Campus Help Desk running at http://localhost:${PORT}`);
});