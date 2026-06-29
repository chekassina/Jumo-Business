import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, Check, ShieldCheck, Mail } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface ContactProps {
  lang: Language;
}

interface ServiceHub {
  id: string;
  name: string;
  city: 'Yaoundé' | 'Douala';
  location: string;
  techs: number;
  contact: string;
  status: 'active' | 'busy';
}

export default function Contact({ lang }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [activeHubId, setActiveHubId] = useState('yaounde-bastos');

  const t = translations[lang];

  // Professional service centers covering Yaoundé & Douala neighborhoods from flyer info
  const hubs: ServiceHub[] = [
    {
      id: 'yaounde-bastos',
      name: 'Bastos Main HQ',
      city: 'Yaoundé',
      location: 'Rue de Bastos, near pharmacy, Yaoundé',
      techs: 6,
      contact: '652 81 68 82',
      status: 'active'
    },
    {
      id: 'yaounde-odza',
      name: 'Odza-Simbock Hub',
      city: 'Yaoundé',
      location: 'Odza Third Entrance, Yaoundé',
      techs: 4,
      contact: '652 81 68 82',
      status: 'active'
    },
    {
      id: 'douala-akwa',
      name: 'Akwa Commercial Hub',
      city: 'Douala',
      location: 'Boulevard de la Liberté, Akwa, Douala',
      techs: 8,
      contact: '652 81 68 82',
      status: 'active'
    },
    {
      id: 'douala-bonapriso',
      name: 'Bonapriso Hub',
      city: 'Douala',
      location: 'Rue des Palmiers, Bonapriso, Douala',
      techs: 5,
      contact: '652 81 68 82',
      status: 'busy'
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Simulate sending message
    setIsSuccess(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setIsSuccess(false);
    }, 3000);
  };

  const selectedHub = hubs.find(h => h.id === activeHubId) || hubs[0];

  return (
    <section id="contact" className="relative py-20 bg-emerald-50/40 border-t border-emerald-100">
      
      {/* Background glowing particles */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold tracking-widest">
            {t.navContact}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-emerald-950 tracking-tight">
            {t.contactTitle}
          </h2>
          <p className="mt-4 text-base text-slate-600 font-semibold">
            {t.contactSubtitle}
          </p>
        </div>

        {/* 3-column layout: Info cards, interactive hubs locator, message form */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Info Cards / Span 4 */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            <div className="bg-white border border-emerald-100 p-6 rounded-2xl space-y-6 shadow-sm">
              
              {/* Phone item */}
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 shrink-0">
                  <Phone className="w-5 h-5 fill-emerald-600/10 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">{t.contactPhoneLabel}</h4>
                  <p className="text-lg font-extrabold text-slate-900 mt-1">652 81 68 82</p>
                  <p className="text-xs text-emerald-700 font-mono mt-0.5 font-bold">(Direct Call / WhatsApp)</p>
                </div>
              </div>

              {/* Working Hours item */}
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 shrink-0">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">{t.contactHoursLabel}</h4>
                  <p className="text-sm font-sans text-slate-700 mt-1 leading-relaxed font-semibold">
                    {t.contactHoursVal}
                  </p>
                </div>
              </div>

              {/* Email item */}
              <div className="flex gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 shrink-0">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Email Address</h4>
                  <p className="text-sm font-sans text-slate-700 mt-1 font-mono font-semibold">
                    contact@jumobusiness.cm
                  </p>
                </div>
              </div>

            </div>

            {/* Coverage neighborhoods list card */}
            <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl space-y-4 shadow-sm">
              <h4 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{t.contactAreasLabel}</span>
              </h4>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600 font-medium">
                <p>
                  <strong className="text-slate-900">Yaoundé:</strong> Bastos, Odza, Omnisports, Tsinga, Ngoa-Ekelle, Mendong, Essos, Messassi, Simbock, Nlongkak, etc.
                </p>
                <p>
                  <strong className="text-slate-900">Douala:</strong> Akwa, Bonapriso, Bali, Deido, Kotto, Bonamoussadi, Logbessou, Ndogpassi, Denver, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Service Hub Locator (Instead of heavy standard maps) / Span 4 */}
          <div className="lg:col-span-4 bg-white border border-emerald-100 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-display font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>{t.contactMapTitle}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">{t.contactMapDisclaimer}</p>
              </div>

              {/* Small Coverage Indicator representation map (Clean visual mockup layout) */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 h-44 relative overflow-hidden flex items-center justify-center">
                {/* Cameroon grid schematic */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                
                {/* Visual Representation of Douala (West) vs Yaounde (East) */}
                <div className="relative w-full h-full">
                  {/* Yaounde Group */}
                  <div className="absolute top-12 right-12 text-center">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping absolute left-1/2 -translate-x-1/2"></div>
                    <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full border border-white relative mx-auto"></div>
                    <span className="text-[10px] font-mono text-slate-600 font-bold mt-1 block">Yaoundé HQ</span>
                  </div>

                  {/* Douala Group */}
                  <div className="absolute bottom-12 left-12 text-center">
                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping absolute left-1/2 -translate-x-1/2"></div>
                    <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full border border-white relative mx-auto"></div>
                    <span className="text-[10px] font-mono text-slate-600 font-bold mt-1 block">Douala Hub</span>
                  </div>

                  {/* Connection link line */}
                  <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                    <line x1="20%" y1="70%" x2="70%" y2="25%" stroke="#059669" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
              </div>

              {/* Hub toggle buttons */}
              <div className="grid grid-cols-2 gap-2">
                {hubs.map(h => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHubId(h.id)}
                    className={`text-xs font-mono p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      activeHubId === h.id 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold' 
                        : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {h.name.split(' ')[0]} ({h.city.slice(0, 3)})
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Hub Details Panel */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-500">Service Center:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                  selectedHub.status === 'active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {selectedHub.status === 'active' ? '● Online & Ready' : '● High Activity'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-display">{selectedHub.name}</h4>
              <p className="text-xs text-slate-600 flex items-start gap-1.5 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{selectedHub.location}</span>
              </p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-mono text-slate-500 font-bold">
                <span>Active Techs: <strong className="text-slate-900">{selectedHub.techs}</strong></span>
                <span>Direct Contact: <strong className="text-slate-900">{selectedHub.contact}</strong></span>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Message Form / Span 4 */}
          <div className="lg:col-span-4 bg-white border border-emerald-100 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="border-b border-slate-100 pb-3 mb-5">
                <h3 className="text-base font-display font-bold text-slate-900">{t.contactFormTitle}</h3>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">{t.contactFormName} *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Samuel Eto'o"
                      className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">{t.contactFormPhone} *</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 652 81 68 82"
                      className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5 font-bold">{t.contactFormMessage}</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you need..."
                      rows={3}
                      className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer flex justify-center items-center gap-1.5 border border-emerald-500"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                    <span>{t.contactFormSubmit}</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto border border-emerald-400">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-800">{t.contactFormSuccess}</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-1">A manager will dial your phone number shortly.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
