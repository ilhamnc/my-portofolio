import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditCertification() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    programName: '', institution: '', issueDate: '', expirationDate: '', certificateUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('my-portofolio-api.vercel.app/api/certifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    navigate('/admin');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md my-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Tambah Sertifikasi Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="programName" placeholder="Nama Program / Sertifikasi" required onChange={handleChange} className="w-full border p-3 rounded" />
        <input type="text" name="institution" placeholder="Institusi Penerbit" required onChange={handleChange} className="w-full border p-3 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tanggal Terbit</label>
            <input type="date" name="issueDate" required onChange={handleChange} className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tanggal Berakhir (Opsional)</label>
            <input type="date" name="expirationDate" onChange={handleChange} className="w-full border p-3 rounded" />
          </div>
        </div>
        <input type="url" name="certificateUrl" placeholder="URL Sertifikat / Link Credential (Opsional)" onChange={handleChange} className="w-full border p-3 rounded" />
        <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3 rounded hover:bg-teal-600">Simpan Sertifikasi</button>
      </form>
    </div>
  );
}