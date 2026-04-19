import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Help() {
  const { user, signOut } = useAuth();

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] font-body antialiased min-h-screen">


      <main className="min-h-screen">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-[var(--color-surface-container-low)] pt-20 pb-16 px-8">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-left">
                <h1 className="font-headline text-5xl md:text-6xl font-black text-[var(--color-primary)] mb-6 tracking-tight">Help & FAQs</h1>
                <p className="font-body text-lg text-[var(--color-on-surface-variant)] max-w-xl leading-relaxed">
                  Find answers to common questions about using AnnaSetu.
                </p>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                  <img alt="Community volunteers" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVCMXdHhVV4vJ3njILof5IX6pvOU_75Ap-skp8iS5uLQJ8CRd2bLsByNT5TU5YLDRFCWJWrXvPdxY-PogYthqlZ1D_FqRd2rqQnc2mLx3NMGHA4GNpKfQaRfPfgOst_0s0aryjs1FsFopfJb74NcE7q1HZGy-MBuGKUpRry3aHwAMd4O5pr6KE4msjgdKSLCiPCJvM7-9yjSUudX-n7AdQXafkEKKigk0V5oquAmzqQgWjllUz0OK8LXHz2kKOwjiQY6bZ1JA7q9c" />
                  <div className="absolute inset-0 bg-[var(--color-primary)]/10 mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Element */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-primary-fixed)]/20 rounded-full blur-3xl"></div>
        </header>

        {/* FAQ Section */}
        <section className="py-24 px-8 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <details className="group bg-[var(--color-surface-container-low)] rounded-2xl overflow-hidden transition-all duration-300">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <h3 className="font-headline text-xl font-bold text-[var(--color-on-surface)] flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] rounded-lg text-sm">01</span>
                  How do I donate food?
                </h3>
                <span className="material-symbols-outlined text-[var(--color-primary)] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-8 pb-8 pt-2">
                <p className="font-body text-[var(--color-on-surface-variant)] leading-relaxed pl-12 border-l-2 border-[var(--color-primary-fixed)] ml-4">
                  Go to the donor dashboard, click “Add Donation,” fill in details, and submit. We recommend including clear photos and expiry details to help volunteers prioritize your contribution.
                </p>
              </div>
            </details>

            <details className="group bg-[var(--color-surface-container-low)] rounded-2xl overflow-hidden transition-all duration-300">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <h3 className="font-headline text-xl font-bold text-[var(--color-on-surface)] flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] rounded-lg text-sm">02</span>
                  Who collects the food?
                </h3>
                <span className="material-symbols-outlined text-[var(--color-primary)] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-8 pb-8 pt-2">
                <p className="font-body text-[var(--color-on-surface-variant)] leading-relaxed pl-12 border-l-2 border-[var(--color-primary-fixed)] ml-4">
                  Verified volunteers from your selected parish will collect and distribute the food. Every volunteer undergoes a rigorous identity verification process before they are allowed to manage collections.
                </p>
              </div>
            </details>

            <details className="group bg-[var(--color-surface-container-low)] rounded-2xl overflow-hidden transition-all duration-300">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <h3 className="font-headline text-xl font-bold text-[var(--color-on-surface)] flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] rounded-lg text-sm">03</span>
                  Can I track my donation?
                </h3>
                <span className="material-symbols-outlined text-[var(--color-primary)] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-8 pb-8 pt-2">
                <div className="pl-12 border-l-2 border-[var(--color-primary-fixed)] ml-4">
                  <p className="font-body text-[var(--color-on-surface-variant)] leading-relaxed mb-4">
                    Yes, you can track the status of your donation from your dashboard. Our tracking system provides real-time updates through four stages:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] rounded-full text-xs font-bold uppercase tracking-wider">Available</span>
                    <span className="px-3 py-1 bg-[var(--color-secondary-fixed)] text-[var(--color-on-secondary-fixed)] rounded-full text-xs font-bold uppercase tracking-wider">Accepted</span>
                    <span className="px-3 py-1 bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface-variant)] rounded-full text-xs font-bold uppercase tracking-wider">Collected</span>
                    <span className="px-3 py-1 bg-[var(--color-tertiary-fixed)] text-[var(--color-on-tertiary-fixed)] rounded-full text-xs font-bold uppercase tracking-wider">Distributed</span>
                  </div>
                </div>
              </div>
            </details>

            <details className="group bg-[var(--color-surface-container-low)] rounded-2xl overflow-hidden transition-all duration-300">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <h3 className="font-headline text-xl font-bold text-[var(--color-on-surface)] flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] rounded-lg text-sm">04</span>
                  How are volunteers verified?
                </h3>
                <span className="material-symbols-outlined text-[var(--color-primary)] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-8 pb-8 pt-2">
                <p className="font-body text-[var(--color-on-surface-variant)] leading-relaxed pl-12 border-l-2 border-[var(--color-primary-fixed)] ml-4">
                  Volunteers must be approved by the admin before they can access the system. Verification involves background checks and coordination with local parish leadership to ensure accountability and safety.
                </p>
              </div>
            </details>

            <details className="group bg-[var(--color-surface-container-low)] rounded-2xl overflow-hidden transition-all duration-300">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <h3 className="font-headline text-xl font-bold text-[var(--color-on-surface)] flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] rounded-lg text-sm">05</span>
                  What happens if no one accepts my donation?
                </h3>
                <span className="material-symbols-outlined text-[var(--color-primary)] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-8 pb-8 pt-2">
                <p className="font-body text-[var(--color-on-surface-variant)] leading-relaxed pl-12 border-l-2 border-[var(--color-primary-fixed)] ml-4">
                  If a donation is not accepted before its expiry time, it is marked as expired. This helps maintain food safety standards and ensures that only fresh produce and meals are distributed to those in need.
                </p>
              </div>
            </details>

            <details className="group bg-[var(--color-surface-container-low)] rounded-2xl overflow-hidden transition-all duration-300">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <h3 className="font-headline text-xl font-bold text-[var(--color-on-surface)] flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] rounded-lg text-sm">06</span>
                  Can I cancel my donation?
                </h3>
                <span className="material-symbols-outlined text-[var(--color-primary)] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="px-8 pb-8 pt-2">
                <p className="font-body text-[var(--color-on-surface-variant)] leading-relaxed pl-12 border-l-2 border-[var(--color-primary-fixed)] ml-4">
                  Yes, you can cancel your donation before it is accepted. Once a volunteer has accepted the request, we kindly ask you to contact them directly or through the dashboard if an urgent change occurs.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* Still need help? */}
        <section className="py-24 px-8 bg-[var(--color-surface-container-lowest)]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-3xl font-extrabold text-[var(--color-on-surface)] mb-4">Still have questions?</h2>
            <p className="font-body text-[var(--color-on-surface-variant)] mb-10 text-lg">Our team is ready to assist you in your mission to feed the community.</p>
            <div className="flex justify-center">
              <Link className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold font-headline transition-transform active:scale-95 flex items-center justify-center gap-2" to="/contact">
                <span className="material-symbols-outlined">mail</span>
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}
