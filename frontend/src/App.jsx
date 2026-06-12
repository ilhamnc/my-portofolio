import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('home'); 
  
  // State untuk form input & mode edit
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'website',
    previewUrl: '',
    projectUrl: '',
    githubUrl: '',
    description: ''
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProjects = () => {
    axios.get(API_URL)
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error fetching projects:", err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi Submit (Bisa untuk Tambah Baru atau Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Mode Update
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert('Project berhasil diupdate!');
      } else {
        // Mode Tambah Baru
        await axios.post(API_URL, formData);
        alert('Project berhasil ditambahkan!');
      }
      resetForm();
      fetchProjects(); 
      setActiveTab('home'); 
    } catch (error) {
      console.error("Error saving project:", error);
      alert('Gagal menyimpan project. Pastikan backend menyala.');
    }
  };

  // Fungsi klik tombol Edit
  const handleEditClick = (project) => {
    setFormData({
      title: project.title,
      type: project.type,
      previewUrl: project.previewUrl || '',
      projectUrl: project.projectUrl,
      githubUrl: project.githubUrl || '',
      description: project.description || ''
    });
    setEditingId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas otomatis
  };

  // Fungsi klik tombol Hapus
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus portofolio ini?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProjects();
      } catch (error) {
        alert('Gagal menghapus project.');
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', type: 'website', previewUrl: '', projectUrl: '', githubUrl: '', description: '' });
    setEditingId(null);
  };

  const getImageUrl = (project) => {
    if (project.previewUrl) return project.previewUrl; 
    if (project.type === 'website' && project.projectUrl) {
      return `https://image.thum.io/get/width/800/crop/600/noanimate/${project.projectUrl}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16">
      
      {/* NAVBAR */}
      <nav className="bg-slate-800/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-wider text-emerald-400">PORTOFOLIO</div>
          <div className="space-x-6">
            <button 
              onClick={() => setActiveTab('home')}
              className={`font-medium transition-colors ${activeTab === 'home' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              My Portfolio
            </button>
            <button 
              onClick={() => { setActiveTab('settings'); resetForm(); }}
              className={`font-medium transition-colors ${activeTab === 'settings' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* KONTEN UTAMA */}
      <div className="p-8 md:px-16 pt-12">
        
        {/* VIEW: HOME / PORTFOLIO */}
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-500">
            <header className="mb-16 text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 pb-2">
                Ilham Nur Cahyo
              </h1>
              <h2 className="text-xl md:text-2xl text-slate-300 mt-2 font-medium">
                Industrial Engineering & Web Development
              </h2>
              <p className="mt-6 text-slate-400 leading-relaxed">
                Halo! Saya berdomisili di Yogyakarta dengan latar belakang di bidang Informatika. 
                Saya memiliki ketertarikan mendalam pada optimasi sistem terintegrasi, manajemen basis data, serta full-stack web development. 
                Berikut adalah beberapa eksplorasi teknis dan proyek yang telah saya kerjakan.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project) => {
                const imageUrl = getImageUrl(project);
                return (
                  <div key={project.id} className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="relative block aspect-video overflow-hidden bg-slate-700">
                      {imageUrl ? (
                        <img src={imageUrl} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-800">No Image</div>
                      )}
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                        {project.type === 'figma' ? <span className="text-pink-400">🎨</span> : <span className="w-2 h-2 rounded-full bg-blue-400"></span>}
                        {project.type === 'figma' ? 'UI Design' : 'Web App'}
                      </div>
                    </a>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                      {project.description && <p className="text-slate-400 text-sm mb-6 flex-1">{project.description}</p>}
                      <div className="mt-auto space-y-3 pt-4 border-t border-slate-700/50">
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                          <span>Kunjungi {project.type === 'figma' ? 'Figma' : 'Website'}</span> <span>↗</span>
                        </a>
                        {project.type === 'website' && project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-slate-700/50 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                            <span>Repository GitHub</span> <span>📂</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW: SETTINGS / MANAGE PROJECTS */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500 grid md:grid-cols-2 gap-12">
            
            {/* Bagian Form Kiri */}
            <div>
              <h2 className="text-3xl font-bold mb-2">{editingId ? 'Edit Project' : 'Tambah Project'}</h2>
              <p className="text-slate-400 mb-8">{editingId ? 'Ubah data portofolio yang sudah ada.' : 'Masukkan data portofolio baru.'}</p>
              
              <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Judul Project *</label>
                  <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tipe Project *</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                    <option value="website">Web / App Programming</option>
                    <option value="figma">UI/UX Design (Figma)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Link Tujuan *</label>
                  <input required type="url" name="projectUrl" value={formData.projectUrl} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">Link Gambar Preview (Opsional)</label>
                  <input type="url" name="previewUrl" value={formData.previewUrl} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="Penting jika auto-screenshot gagal" />
                </div>
                {formData.type === 'website' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Link Repository Github</label>
                    <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Deskripsi Singkat</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"></textarea>
                </div>

                <div className="pt-4 border-t border-slate-700 flex gap-3">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
                    {editingId ? 'Update Project' : 'Simpan Project'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-4 py-3 rounded-lg transition-colors">
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Bagian List Kanan (Manajemen Data) */}
            <div>
               <h2 className="text-xl font-bold mb-6 text-slate-300">Daftar Portofolio</h2>
               <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {projects.map(proj => (
                    <div key={proj.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-3">
                      <div>
                        <h4 className="font-bold text-white">{proj.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{proj.type === 'website' ? 'Web' : 'Figma'} • {proj.projectUrl}</p>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <button onClick={() => handleEditClick(proj)} className="text-sm bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1.5 rounded flex-1 transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteClick(proj.id)} className="text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded transition-colors">
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && <p className="text-slate-500 text-sm">Belum ada data.</p>}
               </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;
