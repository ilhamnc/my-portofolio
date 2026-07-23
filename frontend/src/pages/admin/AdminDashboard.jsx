import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [data, setData] = useState({ profile: {}, experiences: [], educations: [], certifications: [], projects: [], skills: [], tools: [] });
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Bahasa Pemrograman', iconUrl: '' });
  const [newTool, setNewTool] = useState({ name: '', iconUrl: '' });

  const fetchData = () => {
    Promise.all([
      fetch('my-portofolio-api.vercel.app/api/profile').then(r => r.json()),
      fetch('my-portofolio-api.vercel.app/api/experiences').then(r => r.json()),
      fetch('my-portofolio-api.vercel.app/api/educations').then(r => r.json()),
      fetch('my-portofolio-api.vercel.app/api/certifications').then(r => r.json()),
      fetch('my-portofolio-api.vercel.app/api/projects').then(r => r.json()),
      fetch('my-portofolio-api.vercel.app/api/skills').then(r => r.json()),
      fetch('my-portofolio-api.vercel.app/api/tools').then(r => r.json())
    ]).then(([profile, experiences, educations, certifications, projects, skills, tools]) => {
      setData({ profile, experiences, educations, certifications, projects, skills, tools });
    });
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (endpoint, id) => {
    if (window.confirm('Yakin ingin menghapus?')) {
      await fetch(`my-portofolio-api.vercel.app/api/${endpoint}/${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if(!newSkill.name) return;
    await fetch('my-portofolio-api.vercel.app/api/skills', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSkill) });
    setNewSkill({ name: '', category: 'Bahasa Pemrograman', iconUrl: '' });
    fetchData();
  };

  const handleAddTool = async (e) => {
    e.preventDefault();
    if(!newTool.name) return;
    await fetch('my-portofolio-api.vercel.app/api/tools', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTool) });
    setNewTool({ name: '', iconUrl: '' });
    fetchData();
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-12 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto pt-8 px-4">
        <div className="bg-teal-600 text-white rounded-t-xl p-8 flex items-center gap-6 shadow-md">
          {data.profile.photoUrl ? (
            <img src={data.profile.photoUrl} alt="Admin" className="w-20 h-20 rounded-full object-cover border-2 border-white" />
          ) : (
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-inner">👨‍💻</div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{data.profile.name || 'Nama Anda'}</h1>
            <p className="text-teal-100">{data.profile.email || 'email@contoh.com'} • Administrator Panel</p>
          </div>
          <div className="ml-auto"><Link to="/" className="bg-teal-800 hover:bg-teal-900 text-white px-5 py-2 rounded-lg font-medium text-sm">Lihat Portofolio ↗</Link></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-6 space-y-6">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manajemen Profil</h2>
            <Link to="/admin/profile" className="bg-teal-500 text-white px-4 py-2 rounded text-sm">Edit Profil</Link>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manajemen Pengalaman</h2>
            <Link to="/admin/experience" className="bg-teal-500 text-white px-4 py-2 rounded text-sm">+ Tambah Pengalaman</Link>
          </div>
          <div className="space-y-3">
            {data.experiences.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded border">
                <div><p className="font-bold">{item.jobTitle}</p><p className="text-sm text-gray-600">{item.companyName}</p></div>
                <button onClick={() => handleDelete('experiences', item.id)} className="text-red-500 font-bold text-sm">Hapus</button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manajemen Proyek</h2>
            <Link to="/admin/project" className="bg-teal-500 text-white px-4 py-2 rounded text-sm">+ Tambah Proyek</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.projects.map(item => (
              <div key={item.id} className="bg-gray-50 p-4 rounded border flex justify-between items-start">
                <div><p className="font-bold">{item.name}</p></div>
                <button onClick={() => handleDelete('projects', item.id)} className="text-red-500 font-bold text-sm">Hapus</button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Pendidikan</h2>
              <Link to="/admin/education" className="bg-teal-500 text-white px-3 py-1.5 rounded text-sm">+ Tambah</Link>
            </div>
            {data.educations.map(item => (
              <div key={item.id} className="flex justify-between bg-gray-50 p-3 mb-2 rounded border text-sm">
                <span><strong>{item.institutionName}</strong> ({item.level})</span>
                <button onClick={() => handleDelete('educations', item.id)} className="text-red-500">Hapus</button>
              </div>
            ))}
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Sertifikasi</h2>
              <Link to="/admin/certification" className="bg-teal-500 text-white px-3 py-1.5 rounded text-sm">+ Tambah</Link>
            </div>
            {data.certifications.map(item => (
              <div key={item.id} className="flex justify-between bg-gray-50 p-3 mb-2 rounded border text-sm">
                <span><strong>{item.programName}</strong><br/><span className="text-xs text-gray-500">{item.institution}</span></span>
                <button onClick={() => handleDelete('certifications', item.id)} className="text-red-500">Hapus</button>
              </div>
            ))}
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Kemampuan (Skills)</h2>
            <form onSubmit={handleAddSkill} className="flex flex-col gap-2 mb-4">
              <div className="flex gap-2">
                <input type="text" placeholder="Nama Skill" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="border p-2 rounded w-1/2 text-sm" required />
                <input type="url" placeholder="URL Ikon" value={newSkill.iconUrl} onChange={e => setNewSkill({...newSkill, iconUrl: e.target.value})} className="border p-2 rounded w-1/2 text-sm" />
                <button type="submit" className="bg-teal-500 text-white px-4 rounded text-sm">Tambah</button>
              </div>
            </form>
            <div className="flex flex-wrap gap-2">
              {data.skills.map(item => (
                <span key={item.id} className="bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {item.iconUrl && <img src={item.iconUrl} alt="icon" className="w-4 h-4 object-contain" />}{item.name}
                  <button onClick={() => handleDelete('skills', item.id)} className="text-red-500 font-bold ml-1">×</button>
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Alat & Platform (Tools)</h2>
            <form onSubmit={handleAddTool} className="flex flex-col gap-2 mb-4">
              <div className="flex gap-2">
                <input type="text" placeholder="Nama Tool" value={newTool.name} onChange={e => setNewTool({...newTool, name: e.target.value})} className="border p-2 rounded w-1/2 text-sm" required />
                <input type="url" placeholder="URL Ikon" value={newTool.iconUrl} onChange={e => setNewTool({...newTool, iconUrl: e.target.value})} className="border p-2 rounded w-1/2 text-sm" />
                <button type="submit" className="bg-teal-500 text-white px-4 rounded text-sm">Tambah</button>
              </div>
            </form>
            <div className="flex flex-wrap gap-2">
              {data.tools.map(item => (
                <span key={item.id} className="bg-gray-100 border border-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {item.iconUrl && <img src={item.iconUrl} alt="icon" className="w-4 h-4 object-contain" />}{item.name}
                  <button onClick={() => handleDelete('tools', item.id)} className="text-red-500 font-bold ml-1">×</button>
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}