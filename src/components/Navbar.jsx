import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, userDetails, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide navbar on login and signup as they have their own layouts in the new design
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm h-20 flex justify-between items-center px-6 md:px-12">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-extrabold font-headline text-[var(--color-primary)] tracking-tighter">
          AnnaSetu
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/" className="font-headline text-sm font-semibold text-[var(--color-on-surface)] hover:text-[var(--color-primary)] transition-colors">
            Home
          </Link>
          <Link to="/contact" className="font-headline text-sm font-semibold text-[var(--color-on-surface)]/70 hover:text-[var(--color-primary)] transition-colors">
            Contact
          </Link>
          <Link to="/impact" className="font-headline text-sm font-semibold text-[var(--color-on-surface)]/70 hover:text-[var(--color-primary)] transition-colors">
            Impact
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {!user ? (
          <Link 
            to="/login"
            className="px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold rounded-lg hover:bg-[var(--color-primary)]/90 transition-all active:scale-95 text-sm"
          >
            Login
          </Link>
        ) : (
          <>
            {userDetails?.role && (
              <Link 
                to={`/${userDetails?.role}`} 
                className="font-headline text-sm font-semibold text-[var(--color-on-surface)] hover:text-[var(--color-primary)] transition-colors hidden md:block"
              >
                Dashboard
              </Link>
            )}
            <span className="text-[var(--color-on-surface-variant)] text-sm px-4 border-l border-[var(--color-outline-variant)] hidden md:block">
              {userDetails?.name ? `${userDetails.name} (${userDetails.role})` : 'Loading...'}
            </span>
            <button 
              onClick={async () => {
                await signOut();
                navigate('/login');
              }}
              className="px-6 py-2.5 border border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)] font-bold rounded-lg hover:bg-[var(--color-surface-container-low)] transition-all active:scale-95 text-sm"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}
