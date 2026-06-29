import React from 'react';
import { Phone, CheckCircle2, Zap, Clock, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  lang: Language;
  onEstimateClick: () => void;
}

export default function Hero({ lang, onEstimateClick }: HeroProps) {
  const t = translations[lang];

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-emerald-50">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Dot Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Urgent Alert Bar */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-8 shadow-sm">
            <ShieldAlert className="w-4 h-4 text-emerald-600 fill-emerald-600/10" />
            <span>{t.heroInterventionBadge}</span>
          </div>

          {/* Big Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-emerald-950 tracking-tight leading-tight">
            {lang === 'en' ? (
              <>
                Stop <span className="text-emerald-600 underline decoration-emerald-500 decoration-wavy decoration-3">Cockroaches</span>, <span className="text-emerald-600">Rats</span>, <span className="text-emerald-600 font-bold">Ants</span> & <span className="text-emerald-600">Bedbugs</span> Today
              </>
            ) : (
              <>
                Éliminez <span className="text-emerald-600 underline decoration-emerald-500 decoration-wavy decoration-3">Cafards</span>, <span className="text-emerald-600">Rats</span>, <span className="text-emerald-600 font-bold">Punaises</span> & <span className="text-emerald-600">Fourmis</span> Aujourd'hui
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-700 font-sans max-w-3xl mx-auto leading-relaxed">
            {t.heroSubheadline}
          </p>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-600 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
              {t.heroDiagnosisBadge}
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <Zap className="w-4.5 h-4.5 text-emerald-600 fill-emerald-600/10" />
              100% Guaranteed Success / Garantie de Réussite
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <Clock className="w-4.5 h-4.5 text-emerald-600" />
              Rapid 30-min response / Réponse en 30 min
            </span>
          </div>

          {/* Direct Call to Action */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Call Button */}
            <a
              href="tel:237652816882"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-extrabold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(16,185,129,0.25)] border border-emerald-500"
            >
              <Phone className="w-5 h-5 fill-white text-white" />
              <span>{t.btnCallNow} : 652 81 68 82</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/237652816882?text=Bonjour%20Jumo%20Business,%20je%20souhaite%20obtenir%20un%20traitement%20anti-nuisibles."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-base font-extrabold rounded-xl transition-all transform hover:-translate-y-0.5 border border-green-500 shadow-[0_4px_20px_rgba(22,163,74,0.15)]"
            >
              {/* WhatsApp SVG path */}
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.487 5.358 1.488 5.568 0 10.106-4.537 10.11-10.107.002-2.698-1.047-5.234-2.952-7.14C17.25 1.489 14.717.44 12.012.44c-5.56 0-10.096 4.536-10.1 10.1-.001 2.012.518 3.98 1.5 5.68L2.316 21.7l5.584-1.46c.21.115.426.223.647.314z" />
              </svg>
              <span>{t.btnWhatsApp}</span>
            </a>

            {/* Quick Estimator Anchor */}
            <button
              onClick={onEstimateClick}
              className="flex items-center justify-center gap-1 text-emerald-800 hover:text-emerald-600 transition-colors py-2 text-sm font-bold underline decoration-dotted underline-offset-4 cursor-pointer"
            >
              {t.btnGetQuote}
            </button>
          </div>

          {/* Key Trust Stats Grid */}
          <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm">
            <div className="p-4 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-emerald-600">1,500+</div>
              <div className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider font-semibold">{t.heroStatsPests}</div>
            </div>
            <div className="p-4 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900">4.9/5 ★</div>
              <div className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider font-semibold">Client Rating</div>
            </div>
            <div className="p-4 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider font-semibold">Success Guarantee</div>
            </div>
            <div className="p-4 rounded-xl hover:bg-emerald-50 transition-colors">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">CAMEROON</div>
              <div className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider font-semibold">{t.heroStatsCities}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
