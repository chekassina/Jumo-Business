import React, { useState } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  Phone, 
  Globe, 
  Home, 
  Layers, 
  Award, 
  Calculator, 
  MessageSquare, 
  Mail, 
  ChevronRight 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  openAdmin: () => void;
  isAdminVisible: boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ lang, setLang, openAdmin, isAdminVisible, currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const handlePageChange = (page: string) => {
    setIsOpen(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 border-b border-emerald-100/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 cursor-pointer shrink-0" onClick={() => handlePageChange('home')}>
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 bg-emerald-600 text-white rounded-xl font-bold border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] shrink-0">
              <Shield className="w-4.5 sm:w-6 h-4.5 sm:h-6 text-white fill-white/10" />
              <div className="absolute -bottom-1 -right-1 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-500 rounded-full border border-white animate-pulse"></div>
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-lg lg:text-sm xl:text-lg 2xl:text-2xl font-display font-bold tracking-tight text-emerald-950 flex flex-wrap items-center gap-1 sm:gap-1.5 leading-none">
                {t.brand} <span className="text-emerald-700 font-extrabold text-[8px] sm:text-[10px] bg-emerald-100 px-1 sm:px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wider shrink-0">30% OFF</span>
              </span>
              <span className="hidden sm:block lg:hidden xl:block text-[8px] sm:text-[10px] font-mono tracking-wider text-emerald-600 uppercase font-semibold mt-0.5">
                {t.brandSubtitle}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            <button
              onClick={() => handlePageChange('home')}
              className={`text-[11px] xl:text-xs 2xl:text-sm px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all cursor-pointer ${
                currentPage === 'home'
                  ? 'bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/40 shadow-sm'
                  : 'font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/20'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => handlePageChange('services')}
              className={`text-[11px] xl:text-xs 2xl:text-sm px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all cursor-pointer ${
                currentPage === 'services'
                  ? 'bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/40 shadow-sm'
                  : 'font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/20'
              }`}
            >
              {t.navServices}
            </button>
            <button
              onClick={() => handlePageChange('why-us')}
              className={`text-[11px] xl:text-xs 2xl:text-sm px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all cursor-pointer ${
                currentPage === 'why-us'
                  ? 'bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/40 shadow-sm'
                  : 'font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/20'
              }`}
            >
              {t.navWhyUs}
            </button>
            <button
              onClick={() => handlePageChange('estimator')}
              className={`text-[11px] xl:text-xs 2xl:text-sm px-2 xl:px-3.5 py-1.5 xl:py-2 rounded-lg transition-all cursor-pointer ${
                currentPage === 'estimator'
                  ? 'bg-emerald-600 text-white font-extrabold border border-emerald-500 shadow-md'
                  : 'font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/40'
              }`}
            >
              {t.navCalculator}
            </button>
            <button
              onClick={() => handlePageChange('testimonials')}
              className={`text-[11px] xl:text-xs 2xl:text-sm px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all cursor-pointer ${
                currentPage === 'testimonials'
                  ? 'bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/40 shadow-sm'
                  : 'font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/20'
              }`}
            >
              {t.navTestimonials}
            </button>
            <button
              onClick={() => handlePageChange('contact')}
              className={`text-[11px] xl:text-xs 2xl:text-sm px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200/40 shadow-sm'
                  : 'font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/20'
              }`}
            >
              {t.navContact}
            </button>
          </div>

          {/* Controls & CTA */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-50 p-0.5 xl:p-1 rounded-lg border border-slate-200 shrink-0">
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 xl:px-2 py-0.5 xl:py-1 rounded text-[10px] xl:text-xs font-bold transition-all ${lang === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-1.5 xl:px-2 py-0.5 xl:py-1 rounded text-[10px] xl:text-xs font-bold transition-all ${lang === 'fr' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                FR
              </button>
            </div>

            {/* Quick Phone Call */}
            <a
              href="tel:237652816882"
              className="flex items-center justify-center gap-1.5 px-2 xl:px-3.5 py-1.5 xl:py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg font-bold text-xs xl:text-sm border border-slate-200 shadow-sm transition-all transform hover:-translate-y-0.5 shrink-0"
              title="Call 652 81 68 82"
            >
              <Phone className="w-4 h-4 fill-slate-800 text-slate-800 shrink-0" />
              <span className="hidden xl:inline font-mono">652 81 68 82</span>
            </a>

            {/* Quick WhatsApp Chat */}
            <a
              href="https://wa.me/237652816882?text=Bonjour%20Jumo%20Business,%20je%20souhaite%20obtenir%20un%20devis%20gratuit%20pour%20un%20traitement."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-2.5 xl:px-4 py-1.5 xl:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs xl:text-sm shadow-[0_2px_10px_rgba(22,163,74,0.15)] transition-all transform hover:-translate-y-0.5 shrink-0"
              title="WhatsApp Chat"
            >
              <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.487 5.358 1.488 5.568 0 10.106-4.537 10.11-10.107.002-2.698-1.047-5.234-2.952-7.14C17.25 1.489 14.717.44 12.012.44c-5.56 0-10.096 4.536-10.1 10.1-.001 2.012.518 3.98 1.5 5.68L2.316 21.7l5.584-1.46c.21.115.426.223.647.314z" />
              </svg>
              <span className="hidden xl:inline">{t.btnWhatsApp || "WhatsApp"}</span>
            </a>

            {/* Simulated Admin Button */}
            <button
              onClick={openAdmin}
              className={`text-[10px] xl:text-xs font-mono px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg border transition-all shrink-0 cursor-pointer ${isAdminVisible ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700'}`}
              title="Toggle Business Admin view"
            >
              <span className="xl:hidden">CRM</span>
              <span className="hidden xl:inline font-bold">CRM Admin</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-1.5 sm:gap-3 lg:hidden">
            {/* Language switch on mobile directly */}
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="flex items-center gap-1 bg-slate-50 text-emerald-700 border border-slate-200 px-2 py-1.5 rounded-lg text-xs font-bold font-mono"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              {lang.toUpperCase()}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-emerald-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Quick Stats or Promo banner at top of mobile menu */}
          <div className="bg-emerald-600 text-white px-4 py-2 text-center text-[10px] font-mono tracking-wider uppercase font-bold flex items-center justify-center gap-1.5">
            <span>⚡ {lang === 'en' ? "Cameroon Anti-Pest Protocol" : "Protocole Anti-Nuisibles Cameroun"}</span>
            <span className="bg-white text-emerald-700 px-1.5 py-0.2 rounded font-extrabold text-[9px]">-30% OFF</span>
          </div>

          <div className="px-4 py-4 space-y-4">
            {/* Nav list */}
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'home', label: t.navHome, icon: Home },
                { id: 'services', label: t.navServices, icon: Layers },
                { id: 'why-us', label: t.navWhyUs, icon: Award },
                { id: 'estimator', label: t.navCalculator, icon: Calculator, highlight: true },
                { id: 'testimonials', label: t.navTestimonials, icon: MessageSquare },
                { id: 'contact', label: t.navContact, icon: Mail }
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all border text-left cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-200/60 text-emerald-800 font-extrabold shadow-sm'
                        : item.highlight
                          ? 'bg-emerald-600 border-emerald-500 text-white font-extrabold hover:bg-emerald-700 shadow-md'
                          : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/60 text-slate-700 font-bold hover:text-emerald-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-emerald-600' : item.highlight ? 'text-white' : 'text-slate-500'}`} />
                      <span className="text-sm tracking-tight">{item.label}</span>
                    </div>
                    
                    {!item.highlight && (
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-emerald-500 translate-x-0.5' : 'text-slate-400'}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Simulated Admin Toggle Dashboard */}
            <div className="pt-2">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                <span className="text-[11px] font-bold font-mono text-slate-500 uppercase tracking-wider">CRM Dashboard:</span>
                <button
                  onClick={() => { setIsOpen(false); openAdmin(); }}
                  className="text-xs font-mono font-extrabold text-emerald-700 hover:text-emerald-600 underline decoration-emerald-600/30 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/40 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                >
                  {isAdminVisible ? "Hide Panel" : "Show Panel"}
                </button>
              </div>
            </div>

            {/* Quick action buttons side-by-side or stacked depending on size */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href="tel:237652816882"
                className="flex items-center justify-center gap-1.5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm border border-slate-900 text-center"
              >
                <Phone className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                <span>{lang === 'en' ? "Call" : "Appeler"}</span>
              </a>

              <a
                href="https://wa.me/237652816882?text=Bonjour%20Jumo%20Business,%20je%20souhaite%20obtenir%20un%20devis%20gratuit%20pour%20un%20traitement."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3.5 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm border border-green-500 text-center"
              >
                <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.487 5.358 1.488 5.568 0 10.106-4.537 10.11-10.107.002-2.698-1.047-5.234-2.952-7.14C17.25 1.489 14.717.44 12.012.44c-5.56 0-10.096 4.536-10.1 10.1-.001 2.012.518 3.98 1.5 5.68L2.316 21.7l5.584-1.46c.21.115.426.223.647.314z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
