const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173', 'https://my-portofolio-hmnc.vercel.app'], // Masukkan URL Vercel di sini
    credentials: true
}));
app.use(express.json());

// Profil
app.get('/api/profile', async (req, res) => {
  const profile = await prisma.profile.findFirst();
  res.json(profile || {});
});
app.post('/api/profile', async (req, res) => {
  const data = req.body;
  const profile = await prisma.profile.upsert({
    where: { id: 1 }, update: data, create: { id: 1, ...data }
  });
  res.json(profile);
});

// Skills & Tools
app.get('/api/skills', async (req, res) => { res.json(await prisma.skill.findMany()); });
app.post('/api/skills', async (req, res) => { res.json(await prisma.skill.create({ data: req.body })); });
app.delete('/api/skills/:id', async (req, res) => { await prisma.skill.delete({ where: { id: parseInt(req.params.id) } }); res.json({ msg: "Dihapus" }); });

app.get('/api/tools', async (req, res) => { res.json(await prisma.tool.findMany()); });
app.post('/api/tools', async (req, res) => { res.json(await prisma.tool.create({ data: req.body })); });
app.delete('/api/tools/:id', async (req, res) => { await prisma.tool.delete({ where: { id: parseInt(req.params.id) } }); res.json({ msg: "Dihapus" }); });

// Experiences, Educations, Certifications, Projects
app.get('/api/experiences', async (req, res) => { res.json(await prisma.experience.findMany({ orderBy: { startDate: 'desc' } })); });
app.post('/api/experiences', async (req, res) => { 
  res.json(await prisma.experience.create({ data: { ...req.body, startDate: new Date(req.body.startDate), endDate: req.body.endDate ? new Date(req.body.endDate) : null }})); 
});
app.delete('/api/experiences/:id', async (req, res) => { await prisma.experience.delete({ where: { id: parseInt(req.params.id) } }); res.json({ msg: "Dihapus" }); });

app.get('/api/educations', async (req, res) => { res.json(await prisma.education.findMany({ orderBy: { startDate: 'desc' } })); });
app.post('/api/educations', async (req, res) => { 
  res.json(await prisma.education.create({ data: { ...req.body, gpa: parseFloat(req.body.gpa), startDate: new Date(req.body.startDate), endDate: req.body.endDate ? new Date(req.body.endDate) : null }})); 
});
app.delete('/api/educations/:id', async (req, res) => { await prisma.education.delete({ where: { id: parseInt(req.params.id) } }); res.json({ msg: "Dihapus" }); });

app.get('/api/certifications', async (req, res) => { res.json(await prisma.certification.findMany({ orderBy: { issueDate: 'desc' } })); });
app.post('/api/certifications', async (req, res) => { 
  res.json(await prisma.certification.create({ data: { ...req.body, issueDate: new Date(req.body.issueDate), expirationDate: req.body.expirationDate ? new Date(req.body.expirationDate) : null }})); 
});
app.delete('/api/certifications/:id', async (req, res) => { await prisma.certification.delete({ where: { id: parseInt(req.params.id) } }); res.json({ msg: "Dihapus" }); });

app.get('/api/projects', async (req, res) => { res.json(await prisma.project.findMany({ orderBy: { id: 'desc' } })); });
app.post('/api/projects', async (req, res) => { res.json(await prisma.project.create({ data: req.body })); });
app.delete('/api/projects/:id', async (req, res) => { await prisma.project.delete({ where: { id: parseInt(req.params.id) } }); res.json({ msg: "Dihapus" }); });

app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));