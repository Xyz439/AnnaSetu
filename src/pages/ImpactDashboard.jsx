import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useImpactData } from '../hooks/useImpactData';

export default function ImpactDashboard() {
  const { user, signOut } = useAuth();
  const impactData = useImpactData();

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen font-inter">

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section */}
        <header className="space-y-4 max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-[var(--color-primary)] leading-tight font-headline">Impact Dashboard</h1>
          <p className="text-xl text-[var(--color-on-surface-variant)] font-medium leading-relaxed font-body">See how your contributions are making a difference in the lives of our community members.</p>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl p-8 flex flex-col justify-between shadow-sm border border-[var(--color-outline-variant)]/10 group hover:bg-[var(--color-primary-fixed)]/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
              </div>
            </div>
            <div>
              <h3 className="text-[var(--color-on-surface-variant)] font-semibold text-sm uppercase tracking-wider font-label">Total Donations</h3>
              <p className="text-4xl font-extrabold text-[var(--color-primary)] mt-1 font-headline">{impactData.loading ? '...' : impactData.donationsCount.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl p-8 flex flex-col justify-between shadow-sm border border-[var(--color-outline-variant)]/10 md:col-span-1 hover:bg-[var(--color-secondary-container)]/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
              </div>
            </div>
            <div>
              <h3 className="text-[var(--color-on-surface-variant)] font-semibold text-sm uppercase tracking-wider font-label">Meals Served</h3>
              <p className="text-4xl font-extrabold text-[var(--color-on-secondary-container)] mt-1 font-headline">{impactData.loading ? '...' : impactData.mealsServed.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl p-8 flex flex-col justify-between shadow-sm border border-[var(--color-outline-variant)]/10 hover:bg-[var(--color-primary-fixed)]/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-full bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>church</span>
              </div>
            </div>
            <div>
              <h3 className="text-[var(--color-on-surface-variant)] font-semibold text-sm uppercase tracking-wider font-label">Active Parishes</h3>
              <p className="text-4xl font-extrabold text-[var(--color-primary)] mt-1 font-headline">{impactData.loading ? '...' : impactData.activeParishes.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl p-8 flex flex-col justify-between shadow-sm border border-[var(--color-outline-variant)]/10 hover:bg-[var(--color-secondary-container)]/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              </div>
            </div>
            <div>
              <h3 className="text-[var(--color-on-surface-variant)] font-semibold text-sm uppercase tracking-wider font-label">Verified Volunteers</h3>
              <p className="text-4xl font-extrabold text-[var(--color-on-secondary-container)] mt-1 font-headline">{impactData.loading ? '...' : impactData.volunteersCount.toLocaleString()}</p>
            </div>
          </div>
        </section>

        {/* Charts & Visuals Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[var(--color-surface-container-low)] rounded-xl p-8 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-on-surface)] font-headline">Donations over time</h2>
                <p className="text-[var(--color-on-surface-variant)] font-body">Growth of nourishment in the last 6 months</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="h-3 w-3 rounded-full bg-[var(--color-primary)]"></span>
                <span className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase font-label">Community Contributions</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4">
              {impactData.chartData && impactData.chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 gap-4">
                  <div className="w-full bg-[var(--color-primary-container)]/80 rounded-t-lg relative group hover:bg-[var(--color-primary)] transition-colors" style={{ height: data.height }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--color-on-surface)] text-[var(--color-surface)] text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{data.count} Donations</div>
                  </div>
                  <span className="text-xs font-bold text-[var(--color-on-surface-variant)] font-label">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-surface-container-low)] rounded-xl p-8 flex flex-col justify-between space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-on-surface)] font-headline">Donation Status</h2>
              <p className="text-[var(--color-on-surface-variant)] font-body">Efficiency tracking</p>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-body">
                  <span className="font-bold text-[var(--color-on-surface)]">Completed</span>
                  <span className="text-[var(--color-primary)] font-bold">{impactData.statusData ? impactData.statusData.completed : 0}%</span>
                </div>
                <div className="w-full h-3 bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-1000" style={{ width: `${impactData.statusData ? impactData.statusData.completed : 0}%` }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-body">
                  <span className="font-bold text-[var(--color-on-surface)]">In Transit</span>
                  <span className="text-[var(--color-secondary)] font-bold">{impactData.statusData ? impactData.statusData.transit : 0}%</span>
                </div>
                <div className="w-full h-3 bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-secondary)] rounded-full transition-all duration-1000" style={{ width: `${impactData.statusData ? impactData.statusData.transit : 0}%` }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-body">
                  <span className="font-bold text-[var(--color-on-surface)]">Pending</span>
                  <span className="text-[var(--color-tertiary)] font-bold">{impactData.statusData ? impactData.statusData.pending : 0}%</span>
                </div>
                <div className="w-full h-3 bg-[var(--color-surface-variant)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-tertiary)] rounded-full transition-all duration-1000" style={{ width: `${impactData.statusData ? impactData.statusData.pending : 0}%` }}></div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-[var(--color-outline-variant)]/30 text-xs text-[var(--color-on-surface-variant)] leading-relaxed font-body">
              Our stewardship goal is to maintain <strong>90%+ completion</strong> rate within 48 hours of donation logging.
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative overflow-hidden rounded-3xl h-[400px] flex items-center bg-[var(--color-primary)]">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-30 mix-blend-overlay" alt="community" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3H-9Bgt5iZ7FQi3F-dzGb09wuOx5un6Olf5uIWgTNjSlbIC-SiCpa0e1ayRRoi0Zp9Tb0AGEaBRiMscL4K7WuYlw6YZRWaDj1_bpk1oFiyDnkZshu-Je_eI_GLHR_Cl6e7tSgJ4sXgfwgewDQCGzWVToBGGVr5jP3nTdbvNrQvBwxCD1a6fRBBbI0I5Lkoqnavg_XS3U_XAms2qA-yXe-Xc2yeQj05VaRIPaLBME0CtkEbFWQjAKoqRM8pNJLKgfidfgCXreb1Po" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)]/80 to-transparent"></div>
          </div>
          <div className="relative z-10 px-12 max-w-2xl space-y-6">
            <h2 className="text-4xl font-extrabold text-[var(--color-surface)] font-headline">Your growth fuels their future.</h2>
            <div className="flex gap-4">
              <Link to="/signup" className="bg-white text-[var(--color-primary)] px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95 font-headline">Start a Donation</Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
