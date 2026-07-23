import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditExperience() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: '', companyName: '', jobType: 'Full-time', locationType: 'On-site', startDate: '', endDate: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://my-portofolio-api.vercel.app/api/experiences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    navigate('/admin');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md my-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Tambah Pengalaman Kerja</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="jobTitle" placeholder="Posisi / Jabatan" required onChange={handleChange} className="w-full border p-3 rounded" />
        <input type="text" name="companyName" placeholder="Nama Perusahaan" required onChange={handleChange} className="w-full border p-3 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <select name="jobType" onChange={handleChange} className="w-full border p-3 rounded bg-white">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
          <select name="locationType" onChange={handleChange} className="w-full border p-3 rounded bg-white">
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tanggal Mulai</label>
            <input type="date" name="startDate" required onChange={handleChange} className="w-full border p-3 rounded" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tanggal Selesai (Kosongi jika masih bekerja)</label>
            <input type="date" name="endDate" onChange={handleChange} className="w-full border p-3 rounded" />
          </div>
        </div>
        <textarea name="description" placeholder="Deskripsi Pekerjaan & Pencapaian" required rows="4" onChange={handleChange} className="w-full border p-3 rounded"></textarea>
        <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3 rounded hover:bg-teal-600">Simpan Pengalaman</button>
      </form>
    </div>
  );
}