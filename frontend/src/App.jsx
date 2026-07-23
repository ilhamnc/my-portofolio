import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicPortfolio from './pages/PublicPortfolio';
import AdminDashboard from './pages/admin/AdminDashboard';
import EditProfile from './pages/admin/EditProfile';
import EditExperience from './pages/admin/EditExperience';
import EditEducation from './pages/admin/EditEducation';
import EditCertification from './pages/admin/EditCertification';
import EditProject from './pages/admin/EditProject';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<PublicPortfolio />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<EditProfile />} />
          <Route path="/admin/experience" element={<EditExperience />} />
          <Route path="/admin/education" element={<EditEducation />} />
          <Route path="/admin/certification" element={<EditCertification />} />
          <Route path="/admin/project" element={<EditProject />} />
        </Routes>
      </div>
    </Router>
  );
}