import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, userDetails } = useAuth();

  useEffect(() => {
    if (user && userDetails) {
      navigate(`/${userDetails.role}`);
    }
  }, [user, userDetails, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (authData.user) {
        // Fetch role immediately for faster redirect
        const { data: profileData } = await supabase
          .from('users')
          .select('role')
          .eq('id', authData.user.id)
          .single();
          
        if (profileData?.role) {
          navigate(`/${profileData.role}`);
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden bg-[var(--color-background)]">
      <div className="w-full max-w-md">
        {/* Brand Anchor */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-primary)] font-headline mb-2">AnnaSetu</h2>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--color-surface-container-lowest)] rounded-xl shadow-[0_8px_32px_rgba(25,28,27,0.04)] p-8 md:p-10 transition-all duration-300">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--color-on-surface)] font-headline mb-2">Welcome Back</h1>
            <p className="text-[var(--color-on-surface-variant)] text-sm">
              <span style={{ fontFamily: 'Inter', fontSize: '16px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                Login to continue your impact journey
              </span>
            </p>
          </div>
          
          {error && (
            <div className="bg-[var(--color-error-container)] text-[var(--color-on-error-container)] p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] font-label" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)] text-lg">mail</span>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-[var(--color-surface-container-low)] border-none rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-on-surface)] transition-all placeholder:text-[var(--color-outline-variant)]" 
                  id="email" 
                  name="email" 
                  placeholder="" 
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] font-label" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)] text-lg">lock</span>
                <input 
                  className="w-full pl-10 pr-12 py-3 bg-[var(--color-surface-container-low)] border-none rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-on-surface)] transition-all placeholder:text-[var(--color-outline-variant)]" 
                  id="password" 
                  name="password" 
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-outline)] hover:text-[var(--color-on-surface)]"
                >
                  <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button 
              className="w-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-[var(--color-on-primary)] font-bold py-4 rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-70" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-[var(--color-outline-variant)]/10 text-center">
            <p className="text-[var(--color-on-surface-variant)] text-sm">
              Don't have an account? 
              <Link className="text-[var(--color-primary)] font-bold ml-1 hover:underline decoration-2 underline-offset-4" to="/signup">Create an Account</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
