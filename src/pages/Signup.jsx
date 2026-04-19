import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('donor');
  const [parishId, setParishId] = useState('');
  const [parishes, setParishes] = useState([]);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchParishes = async () => {
      const { data, error } = await supabase.from('parishes').select('*');
      if (!error && data) {
        setParishes(data);
      }
    };
    fetchParishes();
  }, []);
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshUserDetails } = useAuth();


  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Manual Validations
    if (!name || !email || !password || !parishId) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    
    if (!agreed) {
      setError("You must agree to the Terms & Conditions.");
      setLoading(false);
      return;
    }
    
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw authError;

      // Prevent email enumeration silent failures
      if (data?.user?.identities && data.user.identities.length === 0) {
        throw new Error('An account with this email already exists.');
      }

      if (data?.user) {
        const { error: dbError } = await supabase.from('users').insert({
          id: data.user.id,
          name,
          role,
          parish_id: parishId || null,
          is_verified: role === 'donor'
        });
        
        if (dbError) throw dbError;
        await refreshUserDetails(data.user.id);
        
        // Post-signup navigation based on role
        if (role === 'donor') navigate('/donor');
        else if (role === 'volunteer') navigate('/volunteer');
        else if (role === 'admin') navigate('/admin');
        else navigate('/');
      }
    } catch (err) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-[var(--color-background)] px-6 py-12 relative overflow-hidden">
      {/* Form Section */}
      <div className="w-full max-w-xl bg-[var(--color-surface)] p-8 md:p-10 rounded-2xl shadow-sm border border-[var(--color-outline-variant)]/20 z-10">
          <div className="mb-10">
            <h1 className="text-4xl font-headline font-extrabold text-[var(--color-primary)] mb-2">Create Account</h1>
            <p className="text-[var(--color-on-surface-variant)] text-lg">Join AnnaSetu and start making an impact</p>
          </div>
          
          {error && (
            <div className="bg-[var(--color-error-container)] text-[var(--color-on-error-container)] p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-8" autoComplete="off">
            {/* Role Selection (The Pivot) */}
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer group relative">
                <input 
                  className="peer sr-only" 
                  name="role" 
                  type="radio" 
                  value="donor"
                  checked={role === 'donor'}
                  onChange={() => setRole('donor')}
                />
                <div className="p-6 h-full bg-[var(--color-surface-container-lowest)] rounded-xl shadow-sm border-2 border-transparent peer-checked:border-[var(--color-primary)] peer-checked:bg-[var(--color-primary-fixed)]/20 transition-all">
                  <span className="material-symbols-outlined text-[var(--color-primary)] mb-3 block text-3xl">volunteer_activism</span>
                  <span className="block font-headline font-bold text-lg text-[var(--color-on-surface)]">Donor</span>
                  <span className="block text-sm text-[var(--color-on-surface-variant)] mt-1 leading-snug">Share surplus food directly</span>
                </div>
              </label>
              <label className="cursor-pointer group relative">
                <input 
                  className="peer sr-only" 
                  name="role" 
                  type="radio" 
                  value="volunteer"
                  checked={role === 'volunteer'}
                  onChange={() => setRole('volunteer')}
                />
                <div className="p-6 h-full bg-[var(--color-surface-container-lowest)] rounded-xl shadow-sm border-2 border-transparent peer-checked:border-[var(--color-primary)] peer-checked:bg-[var(--color-primary-fixed)]/20 transition-all">
                  <span className="material-symbols-outlined text-[var(--color-primary)] mb-3 block text-3xl">handshake</span>
                  <span className="block font-headline font-bold text-lg text-[var(--color-on-surface)]">Volunteer</span>
                  <span className="block text-sm text-[var(--color-on-surface-variant)] mt-1 leading-snug">Help distribute and verify</span>
                </div>
              </label>
            </div>

            {/* Volunteer Note (Conditional in UI logic, static for layout) */}
            {role === 'volunteer' && (
              <div className="bg-[var(--color-surface-container-low)] p-4 rounded-lg flex gap-3 items-start" id="volunteer-notice">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-xl">info</span>
                <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                  <strong className="text-[var(--color-on-surface)]">Admin Approval Required:</strong> Volunteer accounts are manually verified by admin to maintain the safety and integrity.
                </p>
              </div>
            )}

            {/* Personal Details */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wide text-[var(--color-on-surface-variant)] px-1" htmlFor="name">Full Name</label>
                <input 
                  className="w-full px-5 py-4 bg-[var(--color-surface-container-lowest)] border-none rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-on-surface)] placeholder:text-[var(--color-outline-variant)]" 
                  id="name" 
                  placeholder="Enter your name" 
                  type="text"
                  required
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wide text-[var(--color-on-surface-variant)] px-1" htmlFor="email">Email Address</label>
                <input 
                  className="w-full px-5 py-4 bg-[var(--color-surface-container-lowest)] border-none rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-on-surface)] placeholder:text-[var(--color-outline-variant)]" 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-sm font-semibold tracking-wide text-[var(--color-on-surface-variant)] px-1" htmlFor="password">Password</label>
                <div className="relative">
                  <input 
                    className="w-full pl-5 pr-12 py-4 bg-[var(--color-surface-container-lowest)] border-none rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-on-surface)] placeholder:text-[var(--color-outline-variant)]" 
                    id="password" 
                    placeholder="" 
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-outline)] hover:text-[var(--color-on-surface)]"
                  >
                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold tracking-wide text-[var(--color-on-surface-variant)] px-1" htmlFor="parish">Select Parish</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none px-5 py-4 bg-[var(--color-surface-container-lowest)] border-none rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-on-surface)]" 
                    id="parish"
                    required
                    value={parishId}
                    onChange={(e) => setParishId(e.target.value)}
                  >
                    <option value="">Select your local parish...</option>
                    {parishes.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-on-surface-variant)]">expand_more</span>
                </div>
              </div>
            </div>

            {/* Terms & Submit */}
            <div className="space-y-6 pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)] bg-[var(--color-surface-container-low)] border-none" 
                  type="checkbox" 
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                  I agree to the Terms & Conditions and Privacy Policy.
                </span>
              </label>
              <button 
                className="w-full bg-[var(--color-primary)] text-[var(--color-on-primary)] font-headline font-bold text-lg py-5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-[var(--color-on-surface-variant)]">
            Already have an account? <Link className="text-[var(--color-primary)] font-bold hover:underline" to="/login">Log in</Link>
          </p>
      </div>
    </main>
  );
}
