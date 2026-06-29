import React from 'react';
import { Zap, ShieldCheck, DollarSign, Award, ClipboardCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface WhyChooseUsProps {
  lang: Language;
}

export default function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const t = translations[lang];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: t.whyBenefit1Title,
      desc: t.whyBenefit1Desc,
      tag: "Express"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: t.whyBenefit2Title,
      desc: t.whyBenefit2Desc,
      tag: "Safe"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      title: t.whyBenefit3Title,
      desc: t.whyBenefit3Desc,
      tag: "Fair"
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      title: t.whyBenefit4Title,
      desc: t.whyBenefit4Desc,
      tag: "Expert"
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-emerald-600" />,
      title: t.whyBenefit5Title,
      desc: t.whyBenefit5Desc,
      tag: "Free"
    }
  ];

  return (
    <section id="why-us" className="relative py-20 bg-white border-t border-emerald-100/60">
      
      {/* Background Radial Light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold tracking-widest">
            {t.navWhyUs}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-emerald-950 tracking-tight">
            {t.whyTitle}
          </h2>
          <p className="mt-4 text-base text-slate-600 font-semibold">
            {t.whySubtitle}
          </p>
        </div>

        {/* Split Grid layout combining photography and bento cards */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Premium Photography Card */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-emerald-100 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between shadow-sm min-h-[400px]">
            {/* The photo of our professional technician */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/pest_tech_cameroon_1782760999760.jpg"
                alt="Jumo Business Cameroon Pest Control Team"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-500"
              />
              {/* Soft elegant gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-emerald-300 font-extrabold tracking-wider uppercase bg-slate-950/60 border border-emerald-500/30 px-2.5 py-1 rounded shadow-sm">
                Active in Cameroon
              </span>
            </div>

            <div className="relative z-10 text-white mt-auto">
              <h3 className="text-xl font-display font-extrabold tracking-tight">
                {lang === 'en' ? "Our Standard of Excellence" : "Notre Standard d'Excellence"}
              </h3>
              <p className="text-xs text-slate-200 mt-2 font-medium leading-relaxed">
                {lang === 'en'
                  ? "Every single service is backed by highly trained local specialists using eco-certified formulas safe for children and pets."
                  : "Chaque service est réalisé par des agents locaux formés, avec des produits éco-certifiés sans danger pour votre foyer."}
              </p>
            </div>
          </div>

          {/* Right Column: Bento Cards Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-2xl bg-emerald-50/30 border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/60 transition-all duration-300 shadow-sm"
              >
                {/* Corner Tag */}
                <span className="absolute top-4 right-4 text-[9px] font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200/30">
                  {benefit.tag}
                </span>

                {/* Icon Container */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 w-12 h-12 flex items-center justify-center mb-6 shadow-sm">
                  {benefit.icon}
                </div>

                {/* Heading */}
                <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                  {benefit.desc}
                </p>

                {/* Decorative Hover Dots */}
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-emerald-500/25 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}

            {/* Interactive Promo Block inside Why Us grid for asymmetrical beautiful Bento design */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 border border-emerald-500 relative flex flex-col justify-between overflow-hidden shadow-md text-white">
              {/* Ambient Background Glow */}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-2xl"></div>
              
              <div>
                <span className="text-[10px] font-mono text-white font-bold tracking-wider uppercase bg-white/20 border border-white/20 px-2 py-0.5 rounded">
                  Cameroon Exclusive
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-4">
                  {lang === 'en' ? "Serving Yaoundé & Douala Locally" : "Couverture Locale Yaoundé & Douala"}
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed mt-3 font-semibold">
                  {lang === 'en' 
                    ? "We operate dedicated rapid-response stations in Bastos, Odza, Tsinga (Yaoundé) and Akwa, Bonapriso, Deido (Douala) to guarantee 30-minute intervention arrivals." 
                    : "Nous disposons d'équipes basées à Bastos, Odza, Tsinga (Yaoundé) et Akwa, Bonapriso, Deido (Douala) pour garantir des interventions en moins de 30 minutes."}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-500/30 flex items-center justify-between text-xs font-mono font-bold text-white">
                <span>Ready to try us out?</span>
                <span className="underline cursor-pointer text-emerald-100 hover:text-white font-bold" onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })}>
                  {lang === 'en' ? "Open Estimator →" : "Calculateur →"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
