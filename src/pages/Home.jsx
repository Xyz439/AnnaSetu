import { Link } from 'react-router-dom';
import { useImpactData } from '../hooks/useImpactData';

export default function Home() {
  const impactData = useImpactData();
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-on-surface)] leading-[1.1] tracking-tighter mb-6 font-headline">
                Reduce Food Waste, <br/><span className="text-[var(--color-primary)]">Feed Lives</span>
              </h1>
              <p className="text-[var(--color-on-surface-variant)] max-w-lg leading-relaxed mb-10 text-lg">
                Connecting surplus food with those in need through trusted parish communities. Join us in our mission to eliminate hunger and waste.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/signup" className="px-8 py-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                  Donate Now
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link to="/impact" className="px-8 py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold rounded-lg hover:bg-[var(--color-primary)]/5 transition-all">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                <img alt="Fresh food surplus" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwXWB-dKe7sdgNPgKasY0Kf9aVrAIPNiFAPTLSkFc0ofl2e3Ly2crAHw5-732Aw1VYulnn3Bz4C60-iAsy8AruzIfkYbWfvxSUZqTOvpAsmQcH9uImhaBgRg4ana0mIcqoHQqaa3SnxLP8A8dw3NRtuDtJ0uU3dF7jRBlNiH5I9ygbesRIOL4fzjxCB2rdKYV__EvGECemVv1x15t270yv0E8QmkcBGRv9KNCwhYM3kxpmID2r2xhI07lDP55B9nPM19KCYMkjcq4" />
            </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-24 bg-[var(--color-surface-variant)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[var(--color-on-surface)] tracking-tighter font-headline">How AnnaSetu Works</h2>
              <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-10 rounded-xl shadow-sm border border-[var(--color-outline-variant)]/10 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">eco</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-on-surface)] mb-3 font-headline">Donate Food</h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">Businesses and individuals list surplus food through our portal for quick collection.</p>
              </div>
              {/* Card 2 */}
              <div className="bg-white p-10 rounded-xl shadow-sm border border-[var(--color-outline-variant)]/10 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">church</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-on-surface)] mb-3 font-headline">Parish Accepts</h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">Trusted local parishes verify food quality and manage temporary storage and logistics.</p>
              </div>
              {/* Card 3 */}
              <div className="bg-white p-10 rounded-xl shadow-sm border border-[var(--color-outline-variant)]/10 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">delivery_dining</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-on-surface)] mb-3 font-headline">Food Distributed</h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">Volunteers transport the food directly to those in need within our local communities.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-[var(--color-on-surface)] tracking-tighter font-headline">Our Impact</h2>
              <p className="text-[var(--color-on-surface-variant)] mt-2">Real numbers driving real change in our neighborhoods.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[var(--color-surface-variant)] p-8 rounded-xl text-center border border-[var(--color-outline-variant)]/10">
                <div className="text-4xl font-extrabold text-[var(--color-primary)] mb-2">
                  {impactData.loading ? '...' : `${impactData.donationsCount}+`}
                </div>
                <div className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest">Donations</div>
              </div>
              <div className="bg-[var(--color-surface-variant)] p-8 rounded-xl text-center border border-[var(--color-outline-variant)]/10">
                <div className="text-4xl font-extrabold text-[var(--color-primary)] mb-2">
                  {impactData.loading ? '...' : `${impactData.mealsServed}+`}
                </div>
                <div className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest">Meals Served</div>
              </div>
              <div className="bg-[var(--color-surface-variant)] p-8 rounded-xl text-center border border-[var(--color-outline-variant)]/10">
                <div className="text-4xl font-extrabold text-[var(--color-primary)] mb-2">
                  {impactData.loading ? '...' : impactData.activeParishes}
                </div>
                <div className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest">Active Parishes</div>
              </div>
              <div className="bg-[var(--color-surface-variant)] p-8 rounded-xl text-center border border-[var(--color-outline-variant)]/10">
                <div className="text-4xl font-extrabold text-[var(--color-primary)] mb-2">
                  {impactData.loading ? '...' : `${impactData.volunteersCount}+`}
                </div>
                <div className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest">Volunteers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-[var(--color-surface-variant)] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <img alt="Community Impact" className="rounded-2xl shadow-lg" src="/why_annasetu_illustration.png" />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-extrabold text-[var(--color-on-surface)] tracking-tighter mb-8 font-headline">Why AnnaSetu?</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-xl">verified_user</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-on-surface)]">Verified volunteers</h4>
                      <p className="text-[var(--color-on-surface-variant)] text-sm">Every volunteer is background-checked and trained for safe food handling.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-xl">account_balance</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-on-surface)]">Parish-based system</h4>
                      <p className="text-[var(--color-on-surface-variant)] text-sm">Leveraging trusted local institutions to ensure reliable collection and storage.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-xl">touch_app</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-on-surface)]">Easy process</h4>
                      <p className="text-[var(--color-on-surface-variant)] text-sm">Our intuitive platform makes listing and claiming donations seamless for everyone.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-xl">monitoring</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-on-surface)]">Transparent tracking</h4>
                      <p className="text-[var(--color-on-surface-variant)] text-sm">Real-time updates let donors see exactly where their contribution is helping.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-[var(--color-primary)] rounded-2xl p-12 md:p-20 text-center relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 font-headline">Make a Difference Today</h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Donate your surplus food and help feed someone in need. Every contribution counts toward a hunger-free community.
              </p>
              <Link to="/signup" className="inline-block px-10 py-4 bg-white text-[var(--color-primary)] text-lg font-bold rounded-lg shadow-xl hover:scale-105 transition-transform active:scale-95">
                Start Donating
              </Link>
            </div>
          </div>
        </section>
    </>
  );
}
