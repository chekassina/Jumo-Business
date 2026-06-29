import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Promo from './components/Promo';
import Estimator from './components/Estimator';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import HomeGallery from './components/HomeGallery';

import { Language, Lead } from './types';
import { Shield, Phone, MessageSquare, Heart } from 'lucide-react';

const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: "lead-mock-1",
    name: "Abel Tangu",
    phone: "699112233",
    city: "Yaoundé",
    pests: ["cockroaches", "rodents"],
    propertySize: "apartment",
    estimatedPrice: 73500,
    status: "completed",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    discountApplied: false
  },
  {
    id: "lead-mock-2",
    name: "Esther Doumbe",
    phone: "677445566",
    city: "Douala",
    pests: ["bedbugs"],
    propertySize: "villa",
    estimatedPrice: 69300,
    status: "contacted",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    discountApplied: true
  }
];

export default function App() {
  // Core application language - French & English for bilingual Cameroon
  const [lang, setLang] = useState<Language>('fr');

  // Lead state synced with localStorage
  const [leads, setLeads] = useState<Lead[]>([]);

  // Promo claim state
  const [isDiscountClaimed, setIsDiscountClaimed] = useState(false);
  const [claimedPhone, setClaimedPhone] = useState('');

  // Selected pest state for instant selection from services details click
  const [selectedPestId, setSelectedPestId] = useState<string | null>(null);

  // Active page selection
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Business Admin toggle
  const [isAdminVisible, setIsAdminVisible] = useState(false);

  // Initialize and load from local storage
  useEffect(() => {
    // 1. Load leads
    const storedLeads = localStorage.getItem('greenshield_leads');
    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch (e) {
        setLeads(INITIAL_MOCK_LEADS);
      }
    } else {
      setLeads(INITIAL_MOCK_LEADS);
      localStorage.setItem('greenshield_leads', JSON.stringify(INITIAL_MOCK_LEADS));
    }

    // 2. Load promo discount state
    const storedPromoPhone = localStorage.getItem('greenshield_promo_phone');
    if (storedPromoPhone) {
      setIsDiscountClaimed(true);
      setClaimedPhone(storedPromoPhone);
    }
  }, []);

  const handleClaimDiscount = (phone: string) => {
    setIsDiscountClaimed(true);
    setClaimedPhone(phone);
    localStorage.setItem('greenshield_promo_phone', phone);
  };

  const handleAddLead = (newLead: Lead) => {
    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('greenshield_leads', JSON.stringify(updated));
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: 'pending' | 'contacted' | 'completed') => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    setLeads(updated);
    localStorage.setItem('greenshield_leads', JSON.stringify(updated));
  };

  const handleDeleteLead = (leadId: string) => {
    if (window.confirm(lang === 'en' ? 'Are you sure you want to delete this lead?' : 'Voulez-vous vraiment supprimer ce prospect ?')) {
      const updated = leads.filter(l => l.id !== leadId);
      setLeads(updated);
      localStorage.setItem('greenshield_leads', JSON.stringify(updated));
    }
  };

  const handleScrollToEstimatorWithPest = (pestId: string) => {
    setSelectedPestId(pestId);
    setCurrentPage('estimator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToEstimatorDirect = () => {
    setCurrentPage('estimator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-16"
          >
            <Hero
              lang={lang}
              onEstimateClick={handleScrollToEstimatorDirect}
            />
            
            {/* Promo Section as a dynamic home callout */}
            <Promo
              lang={lang}
              onClaimDiscount={handleClaimDiscount}
              isClaimed={isDiscountClaimed}
              claimedPhone={claimedPhone}
            />

            {/* Quick Home Services highlight */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white border border-emerald-100 p-8 sm:p-12 rounded-3xl shadow-sm text-center space-y-6">
                <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  {lang === 'en' ? "Cameroon's Premium Service Suite" : "Suite de Services Premium au Cameroun"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto">
                  {lang === 'en' 
                    ? "Professional Disinfection, Fumigation & Pest Extermination" 
                    : "Désinfection, Fumigation et Extermination Professionnelle"}
                </h3>
                <p className="text-sm text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
                  {lang === 'en'
                    ? "Protecting schools, restaurants, offices, and residential spaces across Yaoundé and Douala with world-class, certified sanitization. View our interactive cost calculator or browse specialized services."
                    : "Protection des écoles, restaurants, bureaux et espaces résidentiels à Yaoundé et Douala avec des désinfections certifiées. Utilisez notre calculateur ou découvrez nos services."}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                  <button
                    onClick={() => handlePageChange('services')}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold text-sm shadow-sm transition-all cursor-pointer"
                  >
                    {lang === 'en' ? "Explore Services" : "Découvrir nos Prestations"}
                  </button>
                  <button
                    onClick={() => handlePageChange('estimator')}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-sm shadow-md transition-all cursor-pointer animate-pulse"
                  >
                    {lang === 'en' ? "Calculate Cost (30% OFF)" : "Calculer le Tarif (-30%)"}
                  </button>
                </div>
              </div>
            </div>

            <About lang={lang} />
            <HomeGallery lang={lang} onEstimateClick={handleScrollToEstimatorDirect} />
            <Testimonials lang={lang} />
          </motion.div>
        );
      case 'services':
        return (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-16 py-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
              <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {lang === 'en' ? "Specialized Anti-Nuisible Work" : "Traitements Anti-Nuisibles Spécialisés"}
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? "Our Pest Control Services" : "Nos Prestations Spécialisées"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
                {lang === 'en' 
                  ? "Select any pest to estimate your professional service quote in real-time. All treatments are eco-friendly and 100% certified." 
                  : "Sélectionnez un nuisible pour estimer votre devis professionnel en temps réel. Tous nos traitements sont éco-responsables et certifiés."}
              </p>
            </div>

            <Services
              lang={lang}
              onSelectPest={handleScrollToEstimatorWithPest}
            />

            {/* Quick transition to estimator */}
            <div className="max-w-3xl mx-auto px-4 pb-12">
              <div className="bg-emerald-950 text-white rounded-2xl p-8 text-center space-y-4 shadow-lg border border-emerald-800">
                <h3 className="text-xl font-display font-bold">
                  {lang === 'en' ? "Ready to get an exact calculation?" : "Prêt à obtenir un calcul exact ?"}
                </h3>
                <p className="text-xs text-emerald-300 max-w-md mx-auto">
                  {lang === 'en'
                    ? "Claim your 30% discount and get an instant professional quote based on your exact property size and pest choices."
                    : "Bénéficiez de 30% de réduction immédiate et obtenez un devis pro sur-mesure selon la taille exacte de votre propriété."}
                </p>
                <button
                  onClick={() => handlePageChange('estimator')}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  {lang === 'en' ? "Go to Price Estimator" : "Aller au Calculateur de Prix"}
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 'why-us':
        return (
          <motion.div
            key="why-us"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-16 py-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
              <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {lang === 'en' ? "Cameroon Certified Quality" : "Qualité Certifiée au Cameroun"}
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? "Why Cameroonians Choose Jumo Business" : "Pourquoi Nous Faire Confiance"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
                {lang === 'en'
                  ? "We combine premium European-standard equipment with active local expertise in Yaoundé and Douala to provide guaranteed relief."
                  : "Nous combinons des équipements haut de gamme certifiés européens avec une expertise locale solide à Yaoundé et Douala."}
              </p>
            </div>

            <WhyChooseUs lang={lang} />
            <About lang={lang} />
          </motion.div>
        );
      case 'estimator':
        return (
          <motion.div
            key="estimator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-16 py-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
              <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {lang === 'en' ? "Real-time Estimator" : "Estimateur en Temps Réel"}
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? "Instant Cost Calculation" : "Calculateur de Tarif Instantané"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
                {lang === 'en'
                  ? "Adjust options to estimate your disinfection & pest control services. Send to WhatsApp directly for priority service."
                  : "Ajustez vos options pour estimer votre traitement anti-nuisibles. Lancez directement la discussion WhatsApp."}
              </p>
            </div>

            <Estimator
              lang={lang}
              isDiscountClaimed={isDiscountClaimed}
              claimedPhone={claimedPhone}
              onAddLead={handleAddLead}
              selectedPestId={selectedPestId}
              clearSelectedPestId={() => setSelectedPestId(null)}
            />
          </motion.div>
        );
      case 'testimonials':
        return (
          <motion.div
            key="testimonials"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-16 py-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
              <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {lang === 'en' ? "Verified Local Reviews" : "Avis Locaux Vérifiés"}
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? "What Our Clients Say" : "Les Retours de Nos Clients"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
                {lang === 'en'
                  ? "Proudly serving homes and businesses across major neighborhoods in Yaoundé and Douala."
                  : "Fiers de protéger les foyers et les entreprises dans les principaux quartiers de Yaoundé et Douala."}
              </p>
            </div>

            <Testimonials lang={lang} />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-16 py-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
              <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {lang === 'en' ? "Yaoundé & Douala coverage" : "Couverture Yaoundé & Douala"}
              </span>
              <h1 className="mt-4 text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                {lang === 'en' ? "Contact Our Services" : "Contactez Nos Agences"}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
                {lang === 'en'
                  ? "Reach out directly for a custom corporate quote, emergency callout, or a free inspection diagnostic."
                  : "Contactez-nous directement pour un devis entreprise sur-mesure, une urgence ou un diagnostic gratuit."}
              </p>
            </div>

            <Contact lang={lang} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-500 selection:text-white pt-20">
      
      {/* 1. Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        openAdmin={() => setIsAdminVisible(!isAdminVisible)}
        isAdminVisible={isAdminVisible}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Pages Container with AnimatePresence */}
      <main className="min-h-[calc(100vh-280px)]">
        <AnimatePresence mode="wait">
          {renderPageContent()}
        </AnimatePresence>
      </main>

      {/* 10. Hidden Admin CRM Panel */}
      {isAdminVisible && (
        <AdminPanel
          lang={lang}
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onDeleteLead={handleDeleteLead}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-200">
            {/* Left */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold border border-emerald-100">
                  <Shield className="w-4.5 h-4.5 text-emerald-600 fill-emerald-600/10" />
                </div>
                <span className="text-lg font-display font-extrabold text-slate-900 tracking-tight">Jumo Business</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-semibold">
                {lang === 'en' 
                  ? "Professional pest control services in Yaoundé and Douala. Keeping your homes, offices, and restaurants safe, clean, and pest-free." 
                  : "Services professionnels anti-nuisibles à Yaoundé et Douala. Préservons la propreté et la sécurité de vos habitations, bureaux et commerces."}
              </p>
            </div>

            {/* Middle links */}
            <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-500 font-bold">
              <span className="hover:text-emerald-700 cursor-pointer" onClick={() => handlePageChange('home')}>Home</span>
              <span className="hover:text-emerald-700 cursor-pointer" onClick={() => handlePageChange('services')}>Services</span>
              <span className="hover:text-emerald-700 cursor-pointer" onClick={() => handlePageChange('estimator')}>Cost Calculator</span>
              <span className="hover:text-emerald-700 cursor-pointer" onClick={() => handlePageChange('contact')}>Contact</span>
            </div>

            {/* Call CTAs */}
            <div className="md:col-span-4 flex justify-start md:justify-end gap-3">
              <a
                href="tel:237652816882"
                className="p-3 bg-slate-50 border border-slate-200 hover:border-emerald-500 rounded-xl text-slate-600 hover:text-slate-900 transition-all shadow-sm"
                title="Call 652 81 68 82"
              >
                <Phone className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://wa.me/237652816882?text=Hello%20Jumo%20Business"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-50 border border-emerald-100 hover:border-emerald-500 rounded-xl text-emerald-600 hover:text-emerald-800 transition-all shadow-sm"
                title="Chat with Us on WhatsApp"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 space-y-4 sm:space-y-0 font-semibold">
            <p>&copy; {new Date().getFullYear()} Jumo Business Pest Control Cameroon. All Rights Reserved.</p>
            <p className="flex items-center gap-1 text-slate-400 font-semibold">
              Made for Yaoundé & Douala business conversion with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </p>
          </div>
        </div>
      </footer>

      {/* Persistent Floating WhatsApp button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
        <a
          href="https://wa.me/237652816882?text=Bonjour%20Jumo%20Business,%20je%20souhaite%20obtenir%20un%20devis%20gratuit%20pour%20un%20traitement."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white w-14 h-14 sm:w-auto sm:h-auto sm:px-4.5 sm:py-3 rounded-full font-extrabold shadow-[0_4px_24px_rgba(34,197,94,0.45)] border border-green-500 hover:scale-105 transition-all cursor-pointer text-sm"
        >
          {/* Ripple Effect ring */}
          <span className="absolute inset-0 rounded-full bg-green-500/20 group-hover:animate-ping -z-10"></span>
          <svg className="w-6 h-6 sm:w-5 sm:h-5 fill-white shrink-0" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.487 5.358 1.488 5.568 0 10.106-4.537 10.11-10.107.002-2.698-1.047-5.234-2.952-7.14C17.25 1.489 14.717.44 12.012.44c-5.56 0-10.096 4.536-10.1 10.1-.001 2.012.518 3.98 1.5 5.68L2.316 21.7l5.584-1.46c.21.115.426.223.647.314z" />
          </svg>
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider">{lang === 'en' ? "WhatsApp Chat" : "Discussion WhatsApp"}</span>
        </a>
      </div>

    </div>
  );
}
