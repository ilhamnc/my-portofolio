import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PublicPortfolio() {
  const [data, setData] = useState({ profile: {}, experiences: [], educations: [], certifications: [], projects: [], skills: [], tools: [] });

  useEffect(() => {
    Promise.all([
      fetch('https://my-portofolio-api.vercel.app/api/profile').then(r => r.json()),
      fetch('https://my-portofolio-api.vercel.app/api/experiences').then(r => r.json()),
      fetch('https://my-portofolio-api.vercel.app/api/educations').then(r => r.json()),
      fetch('https://my-portofolio-api.vercel.app/api/certifications').then(r => r.json()),
      fetch('https://my-portofolio-api.vercel.app/api/projects').then(r => r.json()),
      fetch('https://my-portofolio-api.vercel.app/api/skills').then(r => r.json()),
      fetch('https://my-portofolio-api.vercel.app/api/tools').then(r => r.json())
    ]).then(([profile, experiences, educations, certifications, projects, skills, tools]) => {
      setData({ profile, experiences, educations, certifications, projects, skills, tools });
    });
  }, []);

  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : 'Sekarang';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-teal-500 selection:text-white">
      
      {/* KIRI: Sidebar Profil */}
      <aside className="md:w-1/3 lg:w-1/4 bg-slate-950 md:fixed md:h-screen flex flex-col justify-between border-r border-slate-800 p-8 shadow-2xl z-10 overflow-y-auto">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-40 h-40 mb-6">
            <div className="absolute inset-0 bg-teal-500 rounded-full blur opacity-20"></div>
            {data.profile.photoUrl ? (
              <img 
                src={data.profile.photoUrl} 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover border-4 border-slate-800 shadow-xl relative z-10" 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-slate-500 text-4xl relative z-10">
                👨‍💻
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">{data.profile.name || 'Nama Anda'}</h1>
          <p className="text-teal-400 font-medium mb-6 uppercase tracking-wider text-sm">{data.profile.title || 'Posisi / Jabatan'}</p>
          
          <div className="w-full space-y-4 text-sm text-slate-400 mb-8 border-t border-slate-800 pt-6 text-left ml-4">
            {data.profile.location && (
              <div className="flex items-center gap-3"><span className="text-pink-600 text-lg">📍</span> {data.profile.location}</div>
            )}
            {data.profile.email && (
              <div className="flex items-center gap-3"><span className="text-slate-300 text-lg">✉️</span> {data.profile.email}</div>
            )}
            {data.profile.whatsapp && (
              <div className="flex items-center gap-3"><span className="text-pink-600 text-lg">📞</span> {data.profile.whatsapp}</div>
            )}
          </div>

          <div className="flex gap-4 mb-8">
            {data.profile.linkedinUrl && (
              <a href={data.profile.linkedinUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0077b5] text-slate-400 hover:text-white transition-all shadow-lg duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
            {data.profile.githubUrl && (
              <a href={data.profile.githubUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-white text-slate-400 hover:text-black transition-all shadow-lg duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="text-center mt-auto pt-8">
          <Link to="/admin" className="text-xs text-slate-500 hover:text-teal-400 transition-colors uppercase tracking-widest">
            Akses Panel Admin
          </Link>
        </div>
      </aside>

      {/* KANAN: Konten Utama */}
      <main className="md:ml-[33.33%] lg:ml-[25%] w-full bg-slate-900 p-6 md:p-12 lg:p-16">
        
        {/* Section: About Me */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-teal-500"></span> Tentang Saya
          </h2>
          <p className="text-slate-400 leading-relaxed whitespace-pre-line text-lg">
            {data.profile.bio || 'Belum ada deskripsi profil. Silakan tambahkan melalui panel admin.'}
          </p>
        </section>

        {/* Section: Skills & Tools Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-teal-500"></span> Keahlian & Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
              <h3 className="text-teal-400 font-bold mb-4 uppercase tracking-wider text-sm">Kemampuan Teknis (Skills)</h3>
              <div className="flex flex-wrap gap-2.5">
                {data.skills.map(skill => (
                  <span key={skill.id} className="bg-slate-900 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 flex items-center gap-2 hover:border-teal-500 transition-colors">
                    {skill.iconUrl && <img src={skill.iconUrl} alt="icon" className="w-5 h-5 object-contain" />} 
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
              <h3 className="text-teal-400 font-bold mb-4 uppercase tracking-wider text-sm">Alat & Perangkat Lunak (Tools)</h3>
              <div className="flex flex-wrap gap-2.5">
                {data.tools.map(tool => (
                  <span key={tool.id} className="bg-slate-900 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 flex items-center gap-2 hover:border-teal-500 transition-colors">
                    {tool.iconUrl && <img src={tool.iconUrl} alt="icon" className="w-5 h-5 object-contain" />} 
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Timeline Pengalaman */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-teal-500"></span> Pengalaman Profesional
          </h2>
          <div className="space-y-8 border-l-2 border-slate-700 ml-3 pl-8 relative">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="absolute w-4 h-4 bg-slate-900 border-2 border-teal-500 rounded-full -left-[41px] top-1.5 group-hover:bg-teal-500 transition-colors"></div>
                <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all">
                  <h3 className="text-xl font-bold text-white">{exp.jobTitle}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 mb-4 text-sm">
                    <span className="text-teal-400 font-semibold">{exp.companyName}</span>
                    <span className="text-slate-500 flex items-center gap-1">🗓️ {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                    <span className="text-slate-500 px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-xs">{exp.jobType}</span>
                  </div>
                  <p className="text-slate-400 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Pendidikan & Sertifikasi (2 Kolom) */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-teal-500"></span> Pendidikan
            </h2>
            <div className="space-y-6 border-l-2 border-slate-700 ml-2 pl-6">
              {data.educations.map((edu) => (
                <div key={edu.id} className="relative">
                  <div className="absolute w-3 h-3 bg-slate-900 border-2 border-teal-500 rounded-full -left-[31px] top-1.5"></div>
                  <h3 className="text-lg font-bold text-white">{edu.institutionName}</h3>
                  <p className="text-teal-400 text-sm font-medium my-1">{edu.level} - {edu.fieldOfStudy}</p>
                  <p className="text-slate-500 text-sm">Lulus: {formatDate(edu.endDate)} • IPK: {edu.gpa}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-teal-500"></span> Sertifikasi
            </h2>
            <div className="space-y-6">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                  <h3 className="text-lg font-bold text-white">{cert.programName}</h3>
                  <p className="text-slate-400 text-sm my-1">{cert.institution}</p>
                  <p className="text-slate-500 text-xs mb-3">Terbit: {formatDate(cert.issueDate)}</p>
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors">
                      Lihat Kredensial <span className="text-lg">→</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Etalase Proyek (Grid Cards) */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-teal-500"></span> Etalase Proyek
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((proj) => (
              <div key={proj.id} className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 group flex flex-col">
                {proj.imageUrl && (
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition duration-300 z-10"></div>
                    <img src={proj.imageUrl} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{proj.name}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{proj.description}</p>
                  {proj.projectUrl && (
                    <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="inline-block bg-slate-900 text-teal-400 border border-slate-700 hover:border-teal-500 text-center px-5 py-2.5 rounded-lg text-sm font-medium transition-colors w-full mt-auto">
                      Kunjungi Proyek
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}