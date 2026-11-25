const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'requests.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Helper functions ----------

// Read all requests from requests.json (returns [] if the file is missing or empty)
function readRequests() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  if (data.trim() === '') return [];
  return JSON.parse(data);
}

// Write the full requests array back to requests.json
function writeRequests(requests) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
}

// Returns an error message if the data is invalid, otherwise null
function validateRequest(body) {
  const { studentName, email, category, description, priority } = body;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const priorities = ['Low', 'Medium', 'High'];

  if (!studentName || !studentName.trim()) return 'Student name is required';
  if (!email || !emailPattern.test(email.trim())) return 'A valid email is required';
  if (!category || !category.trim()) return 'Category is required';
  if (!description || !description.trim()) return 'Description is required';
  if (!priority || !priorities.includes(priority)) return 'Priority must be Low, Medium or High';
  return null;
}

// ---------- API routes ----------

// GET all requests
app.get('/api/requests', (req, res) => {
  try {
    res.json(readRequests());
  } catch (error) {
    res.status(500).json({ message: 'Error reading requests file' });
  }
});

// GET one request
app.get('/api/requests/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid request ID' });

  try {
    const request = readRequests().find((r) => r.id === id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error reading requests file' });
  }
});

// POST - create a request
app.post('/api/requests', (req, res) => {
  const error = validateRequest(req.body);
  if (error) return res.status(400).json({ message: error });

  try {
    const requests = readRequests();
    // New ID = highest existing ID + 1 (stays unique even after deletes)
    const newId = requests.length > 0 ? Math.max(...requests.map((r) => r.id)) + 1 : 1;

    const newRequest = {
      id: newId,
      studentName: req.body.studentName.trim(),
      email: req.body.email.trim(),
      category: req.body.category,
      description: req.body.description.trim(),
      priority: req.body.priority
    };

    requests.push(newRequest);
    writeRequests(requests);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error saving request' });
  }
});

// PUT - update a request
app.put('/api/requests/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid request ID' });

  const error = validateRequest(req.body);
  if (error) return res.status(400).json({ message: error });

  try {
    const requests = readRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) return res.status(404).json({ message: 'Request not found' });

    requests[index] = {
      id: id,
      studentName: req.body.studentName.trim(),
      email: req.body.email.trim(),
      category: req.body.category,
      description: req.body.description.trim(),
      priority: req.body.priority
    };

    writeRequests(requests);
    res.json(requests[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request' });
  }
});

// DELETE - remove a request
app.delete('/api/requests/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ message: 'Invalid request ID' });

  try {
    const requests = readRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) return res.status(404).json({ message: 'Request not found' });

    requests.splice(index, 1);
    writeRequests(requests);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request' });
  }
});

// Handles invalid JSON sent in the request body
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({ message: 'Invalid JSON in request body' });
  }
  res.status(500).json({ message: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});