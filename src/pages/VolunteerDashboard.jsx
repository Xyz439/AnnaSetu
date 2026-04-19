import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function VolunteerDashboard() {
  const { userDetails, signOut } = useAuth();
  const [availableDonations, setAvailableDonations] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetails?.is_verified && userDetails?.parish_id) {
      fetchParishDonations();
    } else {
      setLoading(false);
    }
  }, [userDetails]);

  const fetchParishDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*, users!donations_created_by_fkey(name)')
        .eq('parish_id', userDetails.parish_id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      const available = data?.filter(d => d.status === 'Available') || [];
      const active = data?.filter(d => ['Accepted', 'Collected'].includes(d.status) && d.accepted_by === userDetails.id) || [];
      const past = data?.filter(d => ['Distributed', 'Rejected', 'Cancelled'].includes(d.status) && d.accepted_by === userDetails.id) || [];

      setAvailableDonations(available);
      setActiveTasks(active);
      setHistory(past);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDonationStatus = async (donationId, newStatus) => {
    try {
      const updates = { status: newStatus };
      if (newStatus === 'Accepted') {
        updates.accepted_by = userDetails.id;
      }

      let query = supabase
        .from('donations')
        .update(updates)
        .eq('id', donationId);

      if (newStatus === 'Accepted') {
        query = query.eq('status', 'Available');
      }

      const { error } = await query;
        
      if (error) throw error;
      fetchParishDonations();
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error.message);
    }
  };

  const getTimeLeft = (expiryTime) => {
    const hours = Math.max(0, Math.floor((new Date(expiryTime) - new Date()) / (1000 * 60 * 60)));
    return hours > 0 ? `${hours}h left` : 'Expired';
  };

  if (!userDetails?.is_verified) {
    return (
      <div className="py-20 text-center max-w-7xl mx-auto min-h-screen">
        <h2 className="text-2xl font-manrope font-bold mb-4">Account Pending Verification</h2>
        <p className="text-[var(--color-on-surface-variant)]">
          Your volunteer account is currently pending approval by the parish admin. 
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-on-surface)] min-h-screen flex flex-col">

      <main className="flex-grow max-w-screen-2xl mx-auto w-full px-6 py-12">
        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-[var(--color-primary)] tracking-tight mb-2 font-headline">Volunteer Dashboard</h1>
          <p className="text-lg text-[var(--color-on-surface-variant)] max-w-2xl font-medium font-body">Managing donations for {userDetails?.parishes?.name || 'Parish'}</p>
        </header>

        {/* Stats Overview (Editorial Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[var(--color-surface-container-low)] p-8 rounded-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]/60 block mb-2 font-label">Total Managed</span>
            <div className="text-4xl font-black text-[var(--color-primary)] font-headline">{history.length}</div>
            <p className="text-sm text-[var(--color-on-surface-variant)] mt-2 font-body">Completed donations</p>
          </div>
          <div className="bg-[var(--color-primary)] p-8 rounded-xl text-[var(--color-on-primary)]">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-primary)]/60 block mb-2 font-label">Active Tasks</span>
            <div className="text-4xl font-black font-headline">{activeTasks.length < 10 ? `0${activeTasks.length}` : activeTasks.length}</div>
            <p className="text-sm text-[var(--color-on-primary)]/80 mt-2 font-body">Pickups in progress</p>
          </div>
          <div className="bg-[var(--color-secondary-container)] p-8 rounded-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-on-secondary-container)]/60 block mb-2 font-label">Urgent Requests</span>
            <div className="text-4xl font-black text-[var(--color-on-secondary-container)] font-headline">
              {availableDonations.filter(d => (new Date(d.expiry_time) - new Date()) / (1000 * 60 * 60) < 2).length < 10 ? `0${availableDonations.filter(d => (new Date(d.expiry_time) - new Date()) / (1000 * 60 * 60) < 2).length}` : availableDonations.filter(d => (new Date(d.expiry_time) - new Date()) / (1000 * 60 * 60) < 2).length}
            </div>
            <p className="text-sm text-[var(--color-on-secondary-container)]/80 mt-2 font-body">Expiring within 2 hours</p>
          </div>
        </div>

        {/* Section 1: Available Donations */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-1 font-headline">Available Donations</h2>
              <p className="text-[var(--color-on-surface-variant)] text-sm font-body">Nearby surplus awaiting acceptance.</p>
            </div>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] text-xs font-bold uppercase tracking-wider font-label">
                    <th className="px-6 py-4">Food Name</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Expiry</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-surface-container)]">
                  {loading ? (
                    <tr><td colSpan="6" className="text-center py-4 font-body">Loading...</td></tr>
                  ) : availableDonations.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-4 font-body">No available donations.</td></tr>
                  ) : (
                    availableDonations.map(donation => {
                      const hoursLeft = Math.floor((new Date(donation.expiry_time) - new Date()) / (1000 * 60 * 60));
                      const isUrgent = hoursLeft < 2 && hoursLeft >= 0;
                      return (
                        <tr key={donation.id} className={`${isUrgent ? 'bg-[var(--color-error-container)]/20 hover:bg-[var(--color-error-container)]/30' : 'hover:bg-[var(--color-surface-container-low)]/50'} transition-colors`}>
                          <td className="px-6 py-5 font-semibold text-[var(--color-primary)] flex items-center gap-2 font-body">
                            {donation.title}
                            {isUrgent && <span className="bg-[var(--color-error)] text-[var(--color-on-error)] text-[10px] px-2 py-0.5 rounded font-black tracking-tighter">URGENT</span>}
                          </td>
                          <td className="px-6 py-5 text-sm font-medium font-body">{donation.description}</td>
                          <td className="px-6 py-5 text-sm font-medium font-body">Donor: {donation.users?.name}</td>
                          <td className={`px-6 py-5 text-sm font-bold font-body ${isUrgent ? 'text-[var(--color-error)]' : ''}`}>{getTimeLeft(donation.expiry_time)}</td>
                          <td className="px-6 py-5 font-body">
                            <span className="px-3 py-1 bg-[var(--color-secondary-fixed)] text-[var(--color-on-secondary-fixed)] text-xs font-bold rounded-full">Available</span>
                          </td>
                          <td className="px-6 py-5 text-right space-x-2 font-body">
                            <button onClick={() => updateDonationStatus(donation.id, 'Accepted')} className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-on-primary)] text-xs font-bold rounded-lg hover:opacity-90 transition-all scale-95 active:scale-90">Accept</button>
                            <button onClick={() => updateDonationStatus(donation.id, 'Rejected')} className="px-4 py-2 bg-[var(--color-error-container)] text-[var(--color-on-error-container)] text-xs font-bold rounded-lg transition-all scale-95 active:scale-90">Reject</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Accepted Donations */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-1 font-headline">Accepted Donations</h2>
              <p className="text-[var(--color-on-surface-variant)] text-sm font-body">Track your progress from collection to distribution.</p>
            </div>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] text-xs font-bold uppercase tracking-wider font-label">
                    <th className="px-6 py-4">Food Name</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-surface-container)]">
                  {loading ? (
                    <tr><td colSpan="5" className="text-center py-4 font-body">Loading...</td></tr>
                  ) : activeTasks.length === 0 ? (
                    <tr><td colSpan="5" className="text-center py-4 font-body">No active tasks.</td></tr>
                  ) : (
                    activeTasks.map(task => (
                      <tr key={task.id} className="hover:bg-[var(--color-surface-container-low)]/50 transition-colors">
                        <td className="px-6 py-5 font-semibold text-[var(--color-primary)] font-body">{task.title}</td>
                        <td className="px-6 py-5 text-sm font-body">{task.description}</td>
                        <td className="px-6 py-5 text-sm font-body">Donor: {task.users?.name}</td>
                        <td className="px-6 py-5 font-body">
                          {task.status === 'Accepted' && <span className="px-3 py-1 bg-[var(--color-secondary-fixed)] text-[var(--color-on-secondary-fixed)] text-xs font-bold rounded-full">Accepted</span>}
                          {task.status === 'Collected' && <span className="px-3 py-1 bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface-variant)] text-xs font-bold rounded-full">Collected</span>}
                        </td>
                        <td className="px-6 py-5 text-right font-body">
                          {task.status === 'Accepted' && (
                            <button onClick={() => updateDonationStatus(task.id, 'Collected')} className="px-4 py-2 bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] text-xs font-bold rounded-lg hover:opacity-90 transition-all scale-95 active:scale-90">Mark Collected</button>
                          )}
                          {task.status === 'Collected' && (
                            <button onClick={() => updateDonationStatus(task.id, 'Distributed')} className="px-4 py-2 bg-[var(--color-primary)] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all scale-95 active:scale-90">Mark Distributed</button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
