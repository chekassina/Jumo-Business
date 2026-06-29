import React, { useState, useEffect } from 'react';
import { Flame, Lock, Unlock, Phone, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface PromoProps {
  lang: Language;
  onClaimDiscount: (phone: string) => void;
  isClaimed: boolean;
  claimedPhone: string;
}

export default function Promo({ lang, onClaimDiscount, isClaimed, claimedPhone }: PromoProps) {
  const [phone, setPhone] = useState('');
  const [spotsLeft, setSpotsLeft] = useState(4);
  const [error, setError] = useState('');
  const t = translations[lang];

  // Simulating random spot depletion to increase dynamic high-converting mockup feel
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev > 1 && Math.random() > 0.7) {
          return prev - 1;
        }
        return prev;
      });
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Cameroon numbers are 9 digits
    const cleaned = phone.replace(/\s+/g, '');
    if (!/^(237)?6[256789]\d{7}$/.test(cleaned) && !/^\d{9}$/.test(cleaned)) {
      setError(lang === 'en' ? 'Please enter a valid 9-digit phone number (e.g., 652816882)' : 'Veuillez saisir un numéro valide à 9 chiffres (ex: 652816882)');
      return;
    }

    onClaimDiscount(cleaned);
  };

  return (
    <section id="promo" className="relative py-16 bg-emerald-50/50 overflow-hidden border-t border-emerald-100">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white border-2 border-emerald-500/30 p-8 sm:p-12 shadow-lg">
          
          {/* Flame absolute background badge */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 animate-pulse text-emerald-500 opacity-10">
            <Flame className="w-24 h-24 stroke-[1]" />
          </div>

          <div className="relative">
            {/* Header / Urgency Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase rounded-md mb-6 shadow-sm">
              <Flame className="w-3.5 h-3.5 fill-emerald-400/20 text-emerald-600" />
              <span>{t.promoBannerTimer.replace('{spots}', spotsLeft.toString())}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-emerald-950 leading-tight">
              {t.promoBannerTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-semibold">
              {t.promoBannerSubtitle}
            </p>

            <div className="mt-8 grid md:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-100">
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Instant Validation / Validation Immédiate</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Claim now and the 30% discount gets stored in your browser session. It automatically reduces the calculator quotes below!</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg shrink-0 mt-0.5 shadow-sm">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">First 10 Customers Only / Réservé aux 10 premiers</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Only active for immediate bookings this week. Lock your slot now to avoid standard pricing.</p>
                  </div>
                </div>
              </div>

              {/* Interaction Form Box */}
              <div className="md:col-span-5">
                {!isClaimed ? (
                  <form onSubmit={handleSubmit} className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 space-y-4 shadow-sm">
                    <div className="text-center pb-2 border-b border-slate-100 flex justify-center items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-mono font-bold text-slate-600">{t.promoEnterPhone}</span>
                    </div>

                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 text-xs font-mono">
                          +237
                        </div>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t.promoPhonePlaceholder}
                          className="block w-full pl-14 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      {error && (
                        <p className="mt-1.5 text-[10px] text-red-500 font-mono">{error}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer flex justify-center items-center gap-1.5 border border-emerald-500"
                    >
                      <Unlock className="w-3.5 h-3.5 text-white" />
                      <span>{t.promoClaimBtn}</span>
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200 text-center space-y-4 animate-scaleUp shadow-sm">
                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto border border-emerald-500">
                      <Unlock className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <h4 className="text-sm font-display font-extrabold text-emerald-850">{t.promoLockedTitle}</h4>
                      <p className="text-[11px] text-slate-600 mt-1 font-mono font-medium">{t.promoLockedMsg}</p>
                    </div>

                    <div className="p-2.5 bg-white rounded-xl border border-emerald-100 font-mono text-center text-xs font-bold text-emerald-800 tracking-widest uppercase">
                      JUMO30 — <span className="text-emerald-600">-{claimedPhone.slice(-3)}</span>
                    </div>

                    <p className="text-[10px] text-slate-400 font-semibold italic">Saved: {claimedPhone}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
