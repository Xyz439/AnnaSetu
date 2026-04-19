import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, userDetails, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    if (!userDetails) {
      return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(userDetails.role)) {
      // If not authorized for this role, redirect to appropriate dashboard
      switch (userDetails.role) {
        case 'donor':
          return <Navigate to="/donor" replace />;
        case 'volunteer':
          return <Navigate to="/volunteer" replace />;
        case 'admin':
          return <Navigate to="/admin" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }

    if (allowedRoles.includes('volunteer') && userDetails.role === 'volunteer' && !userDetails.is_verified) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-[var(--color-surface-container-low)]">
          <div className="bg-[var(--color-surface-container-lowest)] p-8 rounded-xl shadow-md max-w-md">
            <span className="material-symbols-outlined text-5xl text-[var(--color-secondary)] mb-4">pending_actions</span>
            <h2 className="text-2xl font-bold font-headline text-[var(--color-primary)] mb-2">Account Pending</h2>
            <p className="text-[var(--color-on-surface-variant)] font-body">Your account is pending admin approval.</p>
            <Link to="/" className="mt-6 inline-block text-[var(--color-primary)] hover:underline font-bold">Return to Home</Link>
          </div>
        </div>
      );
    }
  }

  return children;
}
