import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Path to db.json
const dbPath = path.join(__dirname, '..', 'db.json');

// Function to read db.json
const readDb = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return { projects: [], skills: [] }; // Return empty data on error
  }
};

// GET all projects
app.get('/api/projects', (req, res) => {
  const db = readDb();
  res.json(db.projects);
});

// GET all skills
app.get('/api/skills', (req, res) => {
  const db = readDb();
  res.json(db.skills);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Portfolio Backend API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
