import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '', projectUrl: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://my-portofolio-api.vercel.app/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    navigate('/admin');
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md my-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Tambah Proyek Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Nama Proyek" required onChange={handleChange} className="w-full border p-3 rounded" />
        <textarea name="description" placeholder="Deskripsi Proyek" required rows="4" onChange={handleChange} className="w-full border p-3 rounded"></textarea>
        <input type="url" name="imageUrl" placeholder="URL Gambar Preview (Opsional)" onChange={handleChange} className="w-full border p-3 rounded" />
        <input type="url" name="projectUrl" placeholder="URL Tautan Proyek (Opsional)" onChange={handleChange} className="w-full border p-3 rounded" />
        <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3 rounded hover:bg-teal-600">Simpan Proyek</button>
      </form>
    </div>
  );
}