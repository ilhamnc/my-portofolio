import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditEducation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    institutionName: '', level: '', fieldOfStudy: '', gpa: '', startDate: '', endDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/educations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    navigate('/admin');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md my-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Tambah Pendidikan Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="institutionName" placeholder="Nama Institusi / Universitas" required onChange={handleChange} className="w-full border p-3 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="level" placeholder="Tingkat (mis. S1 Teknik Industri)" required onChange={handleChange} className="w-full border p-3 rounded" />
          <input type="text" name="fieldOfStudy" placeholder="Jurusan / Bidang Studi" required onChange={handleChange} className="w-full border p-3 rounded" />
        </div>
        <input type="number" step="0.01" name="gpa" placeholder="IPK / Nilai (Opsional, mis. 3.85)" onChange={handleChange} className="w-full border p-3 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tanggal Mulai</label>
            <input type="date" name="startDate" required onChange={handleChange} className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tanggal Lulus (Kosongi jika masih studi)</label>
            <input type="date" name="endDate" onChange={handleChange} className="w-full border p-3 rounded" />
          </div>
        </div>
        <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3 rounded hover:bg-teal-600">Simpan Pendidikan</button>
      </form>
    </div>
  );
}