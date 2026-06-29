import React, { useState } from 'react';
import { Bug, Skull, ShieldAlert, Wind, Flame, ShieldCheck, ChevronRight, HelpCircle, AlertCircle, ArrowDown } from 'lucide-react';
import { Language, Pest } from '../types';
import { translations } from '../translations';
import { PESTS } from '../data';

interface ServicesProps {
  lang: Language;
  onSelectPest: (pestId: string) => void;
}

export default function Services({ lang, onSelectPest }: ServicesProps) {
  const [selectedPest, setSelectedPest] = useState<Pest | null>(null);
  const t = translations[lang];

  // Helper to map string to Lucide Icon
  const renderPestIcon = (iconName: string) => {
    const props = { className: "w-8 h-8 text-emerald-600 group-hover:scale-110 group-hover:text-emerald-700 transition-all" };
    switch (iconName) {
      case "Bug":
        return <Bug {...props} />;
      case "Skull":
        return <Skull {...props} />;
      case "ShieldAlert":
        return <ShieldAlert {...props} />;
      case "Wind":
        return <Wind {...props} />;
      case "Flame":
        return <Flame {...props} />;
      case "ShieldCheck":
        return <ShieldCheck {...props} />;
      default:
        return <Bug {...props} />;
    }
  };

  const handleServiceSelect = (pest: Pest) => {
    setSelectedPest(pest);
  };

  const handleRequestPestQuote = (pestId: string) => {
    setSelectedPest(null);
    onSelectPest(pestId);
    // Scroll to Estimator
    const estimatorSection = document.getElementById('estimator');
    if (estimatorSection) {
      estimatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-20 bg-emerald-50/40">
      
      {/* Visual background lights */}
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold tracking-widest">
            {t.navServices}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-emerald-950 tracking-tight">
            {t.servicesTitle}
          </h2>
          <p className="mt-4 text-base text-slate-600 font-semibold">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Grid of Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PESTS.map((pest) => {
            const isSelected = selectedPest?.id === pest.id;
            return (
              <div
                key={pest.id}
                id={`pest-card-${pest.id}`}
                onClick={() => handleServiceSelect(pest)}
                className={`group relative rounded-3xl bg-white border transition-all cursor-pointer hover:-translate-y-1 overflow-hidden flex flex-col justify-between shadow-sm ${
                  isSelected 
                    ? 'border-emerald-500 bg-white shadow-md ring-2 ring-emerald-500/20' 
                    : 'border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50/10'
                }`}
              >
                {/* Image Header with smooth zoom */}
                {pest.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={pest.imageUrl}
                      alt={lang === 'en' ? pest.nameEn : pest.nameFr}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>
                  </div>
                )}
                
                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Floating Service Icon above body */}
                    <div className="flex justify-between items-start -mt-12 relative z-10">
                      <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-md">
                        {renderPestIcon(pest.iconName)}
                      </div>
                      <span className="text-xs font-mono text-emerald-800 bg-emerald-100/95 px-2.5 py-1 rounded-full border border-emerald-200/50 font-bold shadow-sm">
                        XAF {pest.basePrice.toLocaleString()} +
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-display font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {lang === 'en' ? pest.nameEn : pest.nameFr}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed min-h-[60px]">
                      {lang === 'en' ? pest.descriptionEn : pest.descriptionFr}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                    <span className="flex items-center gap-1.5 font-mono">
                      <HelpCircle className="w-3.5 h-3.5" />
                      {t.servicesClickDetails}
                    </span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-emerald-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Modal/Drawer overlay when service is clicked */}
        {selectedPest && (
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-emerald-200 shadow-lg max-w-4xl mx-auto transition-all animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  {renderPestIcon(selectedPest.iconName)}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-slate-900">
                    {lang === 'en' ? selectedPest.nameEn : selectedPest.nameFr}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-0.5">
                    {t.basePriceLabel} <span className="text-emerald-700 font-bold">XAF {selectedPest.basePrice.toLocaleString()}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPest(null)}
                className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
              >
                {lang === 'en' ? "Close Details" : "Fermer les Détails"}
              </button>
            </div>

            <div className="grid md:grid-cols-12 gap-8 mt-6">
              {/* Photo Column */}
              {selectedPest.imageUrl && (
                <div className="md:col-span-4 rounded-2xl overflow-hidden border border-emerald-100 shadow-sm h-52 sm:h-64 md:h-full min-h-[200px]">
                  <img
                    src={selectedPest.imageUrl}
                    alt={lang === 'en' ? selectedPest.nameEn : selectedPest.nameFr}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info Columns */}
              <div className={`space-y-6 ${selectedPest.imageUrl ? 'md:col-span-8' : 'md:col-span-12'}`}>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Symptoms / Signs */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-mono text-red-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {t.symptomsTitle}
                    </h4>
                    <ul className="space-y-3">
                      {(lang === 'en' ? selectedPest.symptomsEn : selectedPest.symptomsFr).map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-red-500 font-bold shrink-0">•</span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment details */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-mono text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      {t.processTitle}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {lang === 'en' ? selectedPest.detailsEn : selectedPest.detailsFr}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct action CTA within Detail Modal */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-slate-500 font-medium">
                {lang === 'en' 
                  ? "*Final pricing depends on property size, selected at estimator" 
                  : "*Le tarif final dépend de la superficie, sélectionnable ci-dessous"}
              </span>

              <button
                onClick={() => handleRequestPestQuote(selectedPest.id)}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md cursor-pointer transform hover:-translate-y-0.5 transition-all border border-emerald-500"
              >
                <span>{t.btnRequestThis}</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-white" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
