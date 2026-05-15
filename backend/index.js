const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET: Ambil semua proyek
app.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data proyek" });
  }
});

// POST: Tambah proyek baru
app.post('/', async (req, res) => {
  const { title, type, previewUrl, projectUrl, githubUrl, description } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: { title, type, previewUrl, projectUrl, githubUrl, description }
    });
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Gagal menyimpan proyek" });
  }
});

// PUT: Edit proyek
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, type, previewUrl, projectUrl, githubUrl, description } = req.body;
  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: { title, type, previewUrl, projectUrl, githubUrl, description }
    });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengupdate proyek" });
  }
});

// DELETE: Hapus proyek
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: { id: Number(id) }
    });
    res.json({ message: "Proyek berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus proyek" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});