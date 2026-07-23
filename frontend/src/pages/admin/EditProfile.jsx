import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', title: '', bio: '', location: '', email: '', whatsapp: '', linkedinUrl: '', githubUrl: '', photoUrl: '' });

  useEffect(() => {
    fetch('my-portofolio-api.vercel.app/api/profile').then(res => res.json()).then(data => { if(data.id) setFormData(data); });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('my-portofolio-api.vercel.app/api/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    navigate('/admin');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md my-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Edit Data Diri & Sosmed</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="url" name="photoUrl" placeholder="URL Foto Profil (Contoh: Imgur/Google Drive)" value={formData.photoUrl || ''} onChange={handleChange} className="border p-2.5 rounded w-full mb-2" />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Nama Lengkap" value={formData.name} onChange={handleChange} className="border p-2.5 rounded w-full" required />
          <input type="text" name="title" placeholder="Pekerjaan / Jabatan" value={formData.title} onChange={handleChange} className="border p-2.5 rounded w-full" required />
        </div>
        <textarea name="bio" placeholder="Tuliskan profil singkat..." value={formData.bio} onChange={handleChange} className="border p-2.5 rounded w-full h-32" required></textarea>
        
        <h3 className="font-bold pt-4 text-teal-600 border-t">Kontak & Sosial Media</h3>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="location" placeholder="Lokasi (Kota)" value={formData.location} onChange={handleChange} className="border p-2.5 rounded w-full" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2.5 rounded w-full" required />
          <input type="text" name="whatsapp" placeholder="No WhatsApp" value={formData.whatsapp} onChange={handleChange} className="border p-2.5 rounded w-full" />
          <input type="url" name="linkedinUrl" placeholder="URL Profil LinkedIn" value={formData.linkedinUrl} onChange={handleChange} className="border p-2.5 rounded w-full" />
          <input type="url" name="githubUrl" placeholder="URL Profil GitHub" value={formData.githubUrl} onChange={handleChange} className="border p-2.5 rounded w-full" />
        </div>
        <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3 rounded hover:bg-teal-600 mt-4">Simpan Profil</button>
      </form>
    </div>
  );
}