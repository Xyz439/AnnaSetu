import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function DonorDashboard() {
  const { user, userDetails, signOut } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parishes, setParishes] = useState([]);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [location, setLocation] = useState('');
  const [selectedParishId, setSelectedParishId] = useState('');

  useEffect(() => {
    fetchDonations();
    fetchParishes();
  }, []);

  const fetchParishes = async () => {
    const { data } = await supabase.from('parishes').select('*');
    if (data) setParishes(data);
  };

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*, parishes(name)')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDonation = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('donations').insert({
        title,
        description,
        expiry_time: new Date(expiryTime).toISOString(),
        parish_id: selectedParishId || userDetails.parish_id,
        created_by: user.id
      });
      
      if (error) throw error;
      setTitle('');
      setDescription('');
      setExpiryTime('');
      setLocation('');
      setSelectedParishId('');
      fetchDonations();
    } catch (error) {
      console.error('Error creating donation:', error);
      alert(error.message);
    }
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'available': return "bg-sky-100 text-sky-800";
      case 'accepted': return "bg-[var(--color-secondary-fixed)] text-[var(--color-on-secondary-fixed-variant)]";
      case 'collected': return "bg-[var(--color-tertiary-fixed)] text-[var(--color-on-tertiary-fixed-variant)]";
      case 'distributed': return "bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed-variant)]";
      case 'expired': return "bg-[var(--color-error-container)] text-[var(--color-on-error-container)]";
      default: return "bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)]";
    }
  };

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-on-surface)] selection:bg-[var(--color-primary-fixed)] selection:text-[var(--color-on-primary-fixed)] min-h-screen">

      <main className="max-w-screen-2xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-on-surface)] mb-2 font-headline">Donor Dashboard</h1>
          <p className="text-[var(--color-on-surface-variant)] text-lg max-w-2xl font-body">Manage your contributions and track the journey harvest through our local parishes.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-5 space-y-8">
            <section className="bg-[var(--color-surface-container-lowest)] rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--color-on-surface)] font-headline">Add Donation</h2>
              </div>
              <form onSubmit={handleCreateDonation} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] ml-1 font-label">Food Name</label>
                  <input 
                    required value={title} onChange={e => setTitle(e.target.value)}
                    className="w-full bg-[var(--color-surface-container-low)] border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-[var(--color-primary)] transition-all placeholder:text-[var(--color-outline-variant)] text-[var(--color-on-surface)]" 
                    placeholder="e.g. Organic Tomatoes" 
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] ml-1 font-label">Quantity</label>
                    <input 
                      required value={description} onChange={e => setDescription(e.target.value)}
                      className="w-full bg-[var(--color-surface-container-low)] border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-on-surface)]" 
                      placeholder="e.g. 5 kg" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] ml-1 font-label">Expiry Time</label>
                    <input 
                      required value={expiryTime} onChange={e => setExpiryTime(e.target.value)}
                      className="w-full bg-[var(--color-surface-container-low)] border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-on-surface)]" 
                      type="datetime-local"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] ml-1 font-label">Location</label>
                  <div className="relative">
                    <input 
                      required value={location} onChange={e => setLocation(e.target.value)}
                      className="w-full bg-[var(--color-surface-container-low)] border-none rounded-xl py-4 px-5 pr-12 focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-on-surface)]" 
                      placeholder="Pickup Address" 
                      type="text"
                    />
                    <span className="material-symbols-outlined absolute right-4 top-4 text-[var(--color-outline)]">location_on</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] ml-1 font-label">Parish Dropdown (Required)</label>
                  <select 
                    required value={selectedParishId} onChange={e => setSelectedParishId(e.target.value)}
                    className="w-full bg-[var(--color-surface-container-low)] border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-[var(--color-primary)] transition-all appearance-none text-[var(--color-on-surface)]"
                  >
                    <option disabled value="">Select a Parish</option>
                    {parishes.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <button className="w-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-[var(--color-on-primary)] font-bold py-5 rounded-xl shadow-lg hover:shadow-[var(--color-primary)]/20 active:scale-[0.98] transition-all text-lg font-headline" type="submit">
                  Submit Donation
                </button>
              </form>
            </section>
          </aside>
          
          <section className="lg:col-span-7 space-y-8">
            <div className="bg-[var(--color-surface-container-low)] rounded-xl p-8 h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--color-secondary)] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                  <h2 className="text-2xl font-bold tracking-tight text-[var(--color-on-surface)] font-headline">Your Donations</h2>
                </div>
                <button className="text-[var(--color-primary)] font-bold text-sm flex items-center gap-1 hover:underline font-label">
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-4">
                  <thead>
                    <tr className="text-[var(--color-outline)] text-xs font-bold uppercase tracking-widest font-label">
                      <th className="px-6 pb-2">Food</th>
                      <th className="px-6 pb-2">Quantity</th>
                      <th className="px-6 pb-2">Parish</th>
                      <th className="px-6 pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                    ) : donations.length === 0 ? (
                      <tr><td colSpan="4" className="text-center py-4 text-[var(--color-on-surface-variant)]">No donations found.</td></tr>
                    ) : (
                      donations.map(donation => (
                        <tr key={donation.id} className="bg-[var(--color-surface-container-lowest)] hover:bg-white transition-colors">
                          <td className="px-6 py-5 rounded-l-xl font-semibold text-[var(--color-on-surface)] font-body">{donation.title}</td>
                          <td className="px-6 py-5 text-[var(--color-on-surface-variant)] font-body">{donation.description}</td>
                          <td className="px-6 py-5 text-[var(--color-on-surface-variant)] font-body">{donation.parishes?.name || 'Unknown'}</td>
                          <td className="px-6 py-5 rounded-r-xl">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusStyles(donation.status)}`}>
                              {donation.status || 'Available'}
                            </span>
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
