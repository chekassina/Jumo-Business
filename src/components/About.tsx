import React from 'react';
import { Users, Award, ShieldCheck, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang];

  return (
    <section id="about" className="relative py-20 bg-white border-y border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual element / Left Column */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/40 to-green-100/30 rounded-2xl filter blur-xl opacity-70"></div>
            
            <div className="relative bg-emerald-50/50 border border-emerald-100 p-8 sm:p-10 rounded-2xl shadow-sm">
              {/* Badge */}
              <div className="text-xs font-mono text-emerald-700 uppercase tracking-widest font-bold mb-4">{t.aboutTitle}</div>
              
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-950 leading-tight">
                {t.aboutSubtitle}
              </h3>
              
              <p className="mt-6 text-sm sm:text-base text-slate-700 leading-relaxed">
                {t.aboutParagraph1}
              </p>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {t.aboutParagraph2}
              </p>

              {/* Bullet checklist */}
              <ul className="mt-8 space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700 font-semibold">
                  <div className="flex items-center justify-center w-5 h-5 bg-emerald-600 text-white rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Ministry-approved Formulas (Homologués MINADER)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 font-semibold">
                  <div className="flex items-center justify-center w-5 h-5 bg-emerald-600 text-white rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Trained in modern bio-safety protocols</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700 font-semibold">
                  <div className="flex items-center justify-center w-5 h-5 bg-emerald-600 text-white rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>100% money-back guarantee if pests return</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Statistics & Values / Right Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold tracking-widest">
                Our Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-emerald-950 tracking-tight">
                {lang === 'en' ? "A Mission to Protect Health & Property" : "Protéger Votre Santé et Votre Cadre de Vie"}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'en' 
                  ? "We understand the biological patterns of tropical pests. From the humid climate of Douala to the hilly regions of Yaoundé, we adapt our techniques for maximum efficacy." 
                  : "Nous maîtrisons parfaitement le comportement des nuisibles tropicaux. Du climat chaud et humide de Douala aux collines de Yaoundé, nous adaptons nos méthodes pour une efficacité maximale."}
              </p>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-center hover:border-emerald-300 transition-all">
                <div className="flex justify-center mb-3">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">1,500+</div>
                <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider mt-1 font-bold">{t.aboutStatHappy}</div>
              </div>

              <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-center hover:border-emerald-300 transition-all">
                <div className="flex justify-center mb-3">
                  <Award className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">100%</div>
                <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider mt-1 font-bold">{t.aboutStatTrained}</div>
              </div>

              <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-center hover:border-emerald-300 transition-all">
                <div className="flex justify-center mb-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">MINADER</div>
                <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider mt-1 font-bold">{t.aboutStatEco}</div>
              </div>
            </div>

            {/* Quick trust quote banner */}
            <div className="p-4 border-l-2 border-emerald-600 bg-emerald-50 text-slate-800 rounded-r-xl">
              <p className="text-xs sm:text-sm italic text-slate-700 leading-relaxed">
                {lang === 'en' 
                  ? "“Our mission is simple: keep your home, your office, and your commercial premises clean, healthy, and completely free from disease-carrying intruders.”"
                  : "« Notre mission est simple : garantir un environnement sain, propre et sécurisé pour vos habitations, vos bureaux et vos commerces. »"}
              </p>
              <div className="text-[10px] text-emerald-700 font-mono mt-2 uppercase tracking-widest font-bold">— JUMO BUSINESS MANAGEMENT</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
