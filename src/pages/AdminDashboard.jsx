import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useImpactData } from '../hooks/useImpactData';

export default function AdminDashboard() {
  const { userDetails, signOut } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    verifiedVolunteers: 0,
    completedDonations: 0
  });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const impactData = useImpactData();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [pendingRes, allDonationsRes] = await Promise.all([
        supabase.from('users').select('*, parishes(name)').eq('role', 'volunteer').eq('is_verified', false),
        supabase.from('donations').select('*, users!donations_created_by_fkey(name), parishes(name)').order('created_at', { ascending: false })
      ]);

      setPendingUsers(pendingRes.data || []);
      setAllDonations(allDonationsRes.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId, isVerified) => {
    try {
      if (!isVerified) {
        await supabase.from('users').delete().eq('id', userId);
      } else {
        await supabase.from('users').update({ is_verified: true }).eq('id', userId);
      }
      fetchDashboardData();
    } catch (error) {
      console.error('Error verifying user:', error);
      alert(error.message);
    }
  };

  const handleDeleteDonation = async (donationId) => {
    const donation = allDonations.find(d => d.id === donationId);
    const status = donation?.status?.toLowerCase() || 'available';
    
    if (['accepted', 'collected', 'distributed'].includes(status)) {
      alert("Cannot delete processed donations");
      return;
    }

    if (!window.confirm('Are you sure you want to delete this donation?')) return;
    
    // Optimistic UI update
    setAllDonations(prev => prev.filter(d => d.id !== donationId));
    
    try {
      const { error } = await supabase.from('donations').delete().eq('id', donationId);
      if (error) {
        // Revert on error
        fetchDashboardData();
        throw error;
      }
      alert("Donation deleted successfully");
    } catch (error) {
      console.error('Error deleting donation:', error);
      alert('Failed to delete donation. Please try again.');
    }
  };

  const getTimeLeft = (expiryTime) => {
    const hours = Math.max(0, Math.floor((new Date(expiryTime) - new Date()) / (1000 * 60 * 60)));
    if (hours > 24) {
      return `${Math.floor(hours / 24)} days Left`;
    }
    return hours > 0 ? `${hours}h Left` : 'Expired';
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'available': return "bg-[var(--color-secondary-fixed)] text-[var(--color-on-secondary-fixed-variant)]";
      case 'accepted': return "bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed-variant)]";
      case 'collected': return "bg-[var(--color-tertiary-fixed)] text-[var(--color-on-tertiary-fixed-variant)]";
      case 'distributed': return "bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface-variant)]";
      default: return "bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)]";
    }
  };

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-surface)] antialiased min-h-screen flex flex-col">

      <main className="flex-grow pt-32 pb-20 px-8 max-w-7xl mx-auto w-full">
        {/* Dashboard Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-2 font-headline">Admin Dashboard</h1>
          <p className="text-[var(--color-on-surface-variant)] text-lg font-body">Manage users and monitor platform activity</p>
        </header>

        {/* Section 3: System Stats (Top of Dashboard) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <div className="w-12 h-12 bg-[var(--color-primary-fixed)] rounded-full flex items-center justify-center text-[var(--color-on-primary-fixed-variant)]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-on-surface-variant)] font-body">Active Parishes</p>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] font-headline">{impactData.loading ? '...' : impactData.activeParishes}</h3>
            </div>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <div className="w-12 h-12 bg-[var(--color-secondary-fixed)] rounded-full flex items-center justify-center text-[var(--color-on-secondary-fixed-variant)]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-on-surface-variant)] font-body">Total Donations</p>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] font-headline">{impactData.loading ? '...' : impactData.donationsCount.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <div className="w-12 h-12 bg-[var(--color-primary-fixed)] rounded-full flex items-center justify-center text-[var(--color-on-primary-fixed-variant)]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-on-surface-variant)] font-body">Verified Volunteers</p>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] font-headline">{impactData.loading ? '...' : impactData.volunteersCount.toLocaleString()}</h3>
            </div>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <div className="w-12 h-12 bg-[var(--color-secondary-fixed)] rounded-full flex items-center justify-center text-[var(--color-on-secondary-fixed-variant)]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-on-surface-variant)] font-body">Meals Served</p>
              <h3 className="text-2xl font-bold text-[var(--color-primary)] font-headline">{impactData.loading ? '...' : impactData.mealsServed.toLocaleString()}</h3>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12">
          {/* Section 1: User Verification */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-on-surface)] flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-[var(--color-primary)]">how_to_reg</span>
                User Verification
              </h2>
              <span className="px-4 py-1 bg-[var(--color-surface-container-high)] rounded-full text-sm font-semibold text-[var(--color-on-surface-variant)] font-body">
                {pendingUsers.length} Pending Requests
              </span>
            </div>
            <div className="bg-[var(--color-surface-container-lowest)] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-surface-container-low)] border-b border-[var(--color-surface-variant)]">
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] font-label">Name</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] font-label">Parish</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] font-label">Status</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] text-right font-label">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-surface-container-low)]">
                    {loading ? (
                      <tr><td colSpan="5" className="text-center py-4 font-body">Loading...</td></tr>
                    ) : pendingUsers.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-4 font-body">No pending requests.</td></tr>
                    ) : (
                      pendingUsers.map(user => (
                        <tr key={user.id} className="hover:bg-[var(--color-surface-container-lowest)]/50 transition-colors">
                          <td className="px-6 py-5 font-medium text-[var(--color-on-surface)] font-body">{user.name}</td>
                          <td className="px-6 py-5 text-[var(--color-on-surface-variant)] font-body">{user.parishes?.name}</td>
                          <td className="px-6 py-5 font-body">
                            <span className="px-3 py-1 bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed-variant)] text-xs font-bold rounded-full">Pending</span>
                          </td>
                          <td className="px-6 py-5 text-right font-body">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleVerify(user.id, true)} className="p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary-fixed)] rounded-lg transition-colors">
                                <span className="material-symbols-outlined">check</span>
                              </button>
                              <button onClick={() => handleVerify(user.id, false)} className="p-2 text-[var(--color-error)] hover:bg-[var(--color-error-container)] rounded-lg transition-colors">
                                <span className="material-symbols-outlined">close</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 2: Donation Monitoring */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-on-surface)] flex items-center gap-2 font-headline">
                <span className="material-symbols-outlined text-[var(--color-primary)]">monitoring</span>
                Donation Monitoring
              </h2>
            </div>
            <div className="bg-[var(--color-surface-container-lowest)] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-surface-container-low)] border-b border-[var(--color-surface-variant)]">
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] font-label">Food Item</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] font-label">Donor</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] font-label">Parish</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] font-label">Status</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] font-label">Expiry</th>
                      <th className="px-6 py-4 text-sm font-semibold text-[var(--color-on-surface-variant)] text-right font-label">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-surface-container-low)]">
                    {loading ? (
                      <tr><td colSpan="6" className="text-center py-4 font-body">Loading...</td></tr>
                    ) : allDonations.length === 0 ? (
                      <tr><td colSpan="6" className="text-center py-4 font-body">No donations found.</td></tr>
                    ) : (
                      allDonations.map(donation => (
                        <tr key={donation.id} className="hover:bg-[var(--color-surface-container-lowest)]/50 transition-colors">
                          <td className="px-6 py-5 font-medium text-[var(--color-on-surface)] font-body">{donation.title}</td>
                          <td className="px-6 py-5 text-[var(--color-on-surface-variant)] font-body">{donation.users?.name}</td>
                          <td className="px-6 py-5 text-[var(--color-on-surface-variant)] font-body">{donation.parishes?.name}</td>
                          <td className="px-6 py-5 font-body">
                            <span className={`px-3 py-1 ${getStatusStyles(donation.status)} text-xs font-bold rounded-full`}>
                              {donation.status || 'Available'}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-[var(--color-on-surface-variant)] font-body">{getTimeLeft(donation.expiry_time)}</td>
                          <td className="px-6 py-5 text-right font-body">
                            <button 
                              onClick={() => handleDeleteDonation(donation.id)} 
                              disabled={['accepted', 'collected', 'distributed'].includes(donation.status?.toLowerCase())}
                              title={['accepted', 'collected', 'distributed'].includes(donation.status?.toLowerCase()) ? "Cannot delete processed donations" : "Delete donation"}
                              className="p-2 text-[var(--color-error)] hover:bg-[var(--color-error-container)] rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}
