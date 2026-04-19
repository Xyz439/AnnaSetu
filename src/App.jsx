import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DonorDashboard from './pages/DonorDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ImpactDashboard from './pages/ImpactDashboard';
import Contact from './pages/Contact';
import Help from './pages/Help';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-surface)] flex flex-col font-inter">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full flex flex-col pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/impact" element={<ImpactDashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          
          <Route path="/donor" element={
            <ProtectedRoute allowedRoles={['donor']}>
              <DonorDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/volunteer" element={
            <ProtectedRoute allowedRoles={['volunteer']}>
              <VolunteerDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
