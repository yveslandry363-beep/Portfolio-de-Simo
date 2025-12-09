
const express = require('express');
const cors = require('cors');
const { experience, projects } = require('./data');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    data: projects,
    count: projects.length,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/experience', (req, res) => {
  res.json({
    success: true,
    data: experience,
    count: experience.length,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/project/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(p => p.id === id) || experience.find(p => p.id === id);
  
  if (project) {
    res.json({ success: true, data: project });
  } else {
    res.status(404).json({ success: false, message: "Project not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
