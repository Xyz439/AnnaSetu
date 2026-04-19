import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const { user, signOut } = useAuth();
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const { error } = await supabase.from('messages').insert([{ name, email, message }]);
      
      if (error) throw error;
      
      setStatus('success');
      form.reset();
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus('error');
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[var(--color-surface)] text-[var(--color-on-surface)] selection:bg-[var(--color-primary-fixed)] selection:text-[var(--color-on-primary-fixed)] min-h-screen font-inter">


      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-8 text-center bg-[var(--color-surface-container-low)]">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold text-[var(--color-primary)] mb-6 tracking-tight font-headline">Contact Us</h1>
            <p className="text-lg text-[var(--color-on-surface-variant)] leading-relaxed font-body">
              Have questions or want to get in touch? We’d love to hear from you.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="max-w-6xl mx-auto px-8 -mt-12 mb-24">
          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl shadow-2xl shadow-[var(--color-primary)]/5 overflow-hidden flex flex-col md:flex-row">
            {/* Left Side: Contact Info */}
            <div className="md:w-5/12 bg-[var(--color-primary)] text-[var(--color-on-primary)] p-12 relative overflow-hidden">
              <div className="relative z-10 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-4 font-headline">Our Presence</h2>
                  <p className="text-white/90 leading-relaxed font-body">AnnaSetu is committed to bridging the gap between abundance and need through local community engagement.</p>
                </div>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[var(--color-primary-fixed)]" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-fixed)] opacity-80 font-label">Email</p>
                      <p className="text-lg font-medium font-body">annasetu00@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[var(--color-primary-fixed)]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-fixed)] opacity-80 font-label">Location</p>
                      <p className="text-lg font-medium font-body">Gomesali/Mardes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[var(--color-primary-fixed)]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-fixed)] opacity-80 font-label">Phone</p>
                      <p className="text-lg font-medium font-body">+91 9730692447</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="md:w-7/12 p-12 bg-[var(--color-surface-container-lowest)]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {status === 'success' && (
                  <div className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] p-4 rounded-lg font-semibold font-body">
                    👉 Message sent successfully!
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-[var(--color-error-container)] text-[var(--color-on-error-container)] p-4 rounded-lg font-semibold font-body">
                    👉 {errorMessage}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] ml-1 font-label" htmlFor="name">Full Name</label>
                  <input className="w-full px-4 py-3 bg-[var(--color-surface-container-low)] border-transparent focus:border-[var(--color-primary)] focus:ring-0 rounded-lg transition-all text-[var(--color-on-surface)]" id="name" placeholder="Enter your name" required type="text" disabled={status === 'loading'} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] ml-1 font-label" htmlFor="email">Email Address</label>
                  <input className="w-full px-4 py-3 bg-[var(--color-surface-container-low)] border-transparent focus:border-[var(--color-primary)] focus:ring-0 rounded-lg transition-all text-[var(--color-on-surface)]" id="email" placeholder="you@example.com" required type="email" disabled={status === 'loading'} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[var(--color-on-surface-variant)] ml-1 font-label" htmlFor="message">Your Message</label>
                  <textarea className="w-full px-4 py-3 bg-[var(--color-surface-container-low)] border-transparent focus:border-[var(--color-primary)] focus:ring-0 rounded-lg transition-all text-[var(--color-on-surface)] resize-none" id="message" placeholder="How can we help you?" required rows="5" disabled={status === 'loading'}></textarea>
                </div>
                <button 
                  className="w-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-[var(--color-on-primary)] font-bold py-4 rounded-lg shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 font-headline disabled:opacity-70 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  {status !== 'loading' && <span className="material-symbols-outlined text-sm">send</span>}
                </button>
              </form>
              <div className="mt-8 pt-8 border-t border-[var(--color-surface-container-high)]">
                <p className="text-sm text-[var(--color-on-surface-variant)] text-center font-body">
                  Our team typically responds within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
