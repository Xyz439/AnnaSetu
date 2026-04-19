import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  // Hide footer on login and signup as they have their own minimalist layouts
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <footer className="bg-[var(--color-surface-variant)] py-12 px-6 md:px-12 border-t border-[var(--color-outline-variant)]/15 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="col-span-1">
            <span className="text-2xl font-extrabold font-headline text-[var(--color-primary)] tracking-tighter block mb-4">AnnaSetu</span>
            <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">
              Bridging food surplus and hunger through community.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-[var(--color-on-surface)] mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              <li><Link className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors" to="/">Home</Link></li>
              <li><Link className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors" to="/signup">Donate</Link></li>
              <li><Link className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors" to="/impact">Impact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[var(--color-on-surface)] mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4">
              <li><Link className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors" to="/contact">Contact Us</Link></li>
              <li><Link className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors" to="/help">Help</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--color-outline-variant)]/20 gap-4">
          <p className="text-[var(--color-on-surface-variant)] text-sm">© 2026 AnnaSetu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
