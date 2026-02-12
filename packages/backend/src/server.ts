import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Paths to new data files
const userDataPath = path.join(__dirname, '..', '..', 'shared', 'data', 'user.json');
const skillsDataPath = path.join(__dirname, '..', '..', 'shared', 'data', 'skills.json');
const projectsDataPath = path.join(__dirname, '..', '..', 'shared', 'data', 'projects.json');

// Generic function to read and parse JSON files
const readJsonFile = <T>(filePath: string): T | null => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading or parsing ${filePath}:`, error);
    return null;
  }
};

// GET user data
app.get('/api/user', (req, res) => {
  const userData = readJsonFile(userDataPath);
  if (userData) {
    res.json(userData);
  } else {
    res.status(404).send('User data not found');
  }
});

// GET all skills
app.get('/api/skills', (req, res) => {
  const skillsData = readJsonFile(skillsDataPath);
  if (skillsData) {
    res.json(skillsData);
  } else {
    res.status(404).send('Skills data not found');
  }
});

// GET all projects
app.get('/api/projects', (req, res) => {
  const projectsData = readJsonFile(projectsDataPath);
  if (projectsData) {
    res.json(projectsData);
  } else {
    res.status(404).send('Projects data not found');
  }
});

// GET project by ID
app.get('/api/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const projectsData = readJsonFile<any[]>(projectsDataPath); // Cast to any[] for find method
  if (projectsData) {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).send('Project not found');
    }
  } else {
    res.status(404).send('Projects data not found');
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Portfolio Backend API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
