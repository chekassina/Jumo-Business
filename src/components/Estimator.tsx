import React, { useState, useEffect } from 'react';
import { Calculator, Check, Info, Send, ShieldCheck, User, MapPin, MessageSquare, Phone } from 'lucide-react';
import { Language, Lead } from '../types';
import { translations } from '../translations';
import { PESTS, PROPERTY_SIZES } from '../data';

interface EstimatorProps {
  lang: Language;
  isDiscountClaimed: boolean;
  claimedPhone: string;
  onAddLead: (lead: Lead) => void;
  selectedPestId: string | null;
  clearSelectedPestId: () => void;
}

export default function Estimator({
  lang,
  isDiscountClaimed,
  claimedPhone,
  onAddLead,
  selectedPestId,
  clearSelectedPestId
}: EstimatorProps) {
  const t = translations[lang];

  // State for calculator parameters
  const [selectedPests, setSelectedPests] = useState<string[]>([]);
  const [propertySizeId, setPropertySizeId] = useState('apartment');
  const [city, setCity] = useState('Yaoundé');
  const [severity, setSeverity] = useState('medium'); // low, medium, or high

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(claimedPhone || '');
  const [details, setDetails] = useState('');

  // Submission response
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastLead, setLastLead] = useState<Lead | null>(null);

  // Sync claimed phone
  useEffect(() => {
    if (claimedPhone) {
      setPhone(claimedPhone);
    }
  }, [claimedPhone]);

  // Sync selected pest from Services click
  useEffect(() => {
    if (selectedPestId) {
      if (!selectedPests.includes(selectedPestId)) {
        setSelectedPests([selectedPestId]);
      }
      clearSelectedPestId();
    }
  }, [selectedPestId, selectedPests, clearSelectedPestId]);

  // Handle pest selection toggle
  const togglePest = (pestId: string) => {
    if (selectedPests.includes(pestId)) {
      setSelectedPests(selectedPests.filter(id => id !== pestId));
    } else {
      setSelectedPests([...selectedPests, pestId]);
    }
  };

  // Severity multiplier map
  const getSeverityMultiplier = (level: string) => {
    switch (level) {
      case 'low':
        return 1.0;
      case 'medium':
        return 1.4;
      case 'high':
        return 2.0;
      default:
        return 1.4;
    }
  };

  // Price calculation
  const subtotal = selectedPests.reduce((sum, id) => {
    const pest = PESTS.find(p => p.id === id);
    return sum + (pest ? pest.basePrice : 0);
  }, 0);

  const selectedProperty = PROPERTY_SIZES.find(size => size.id === propertySizeId);
  const sizeMultiplier = selectedProperty ? selectedProperty.multiplier : 1.5;
  const severityMultiplier = getSeverityMultiplier(severity);

  // Raw estimated subtotal before discount
  const rawSubtotalPrice = Math.round(subtotal * sizeMultiplier * severityMultiplier);

  // Promo discount
  const discountAmount = isDiscountClaimed ? Math.round(rawSubtotalPrice * 0.3) : 0;
  const finalEstimatedPrice = Math.max(0, rawSubtotalPrice - discountAmount);

  // Submit Quote Request
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedPests.length === 0) {
      alert(lang === 'en' ? 'Please select at least one pest type.' : 'Veuillez sélectionner au moins un type de nuisible.');
      return;
    }

    const lead: Lead = {
      id: "lead-" + Date.now(),
      name: name || (lang === 'en' ? "Anonymous Client" : "Client Anonyme"),
      phone: phone,
      city: city,
      pests: selectedPests,
      propertySize: propertySizeId,
      estimatedPrice: finalEstimatedPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      discountApplied: isDiscountClaimed
    };

    // Save lead to local app state
    onAddLead(lead);
    setLastLead(lead);
    setIsSubmitted(true);
  };

  // WhatsApp formatted text generation
  const getWhatsAppLink = () => {
    if (!lastLead) return '#';

    const pestsList = lastLead.pests.map(id => {
      const p = PESTS.find(p => p.id === id);
      return p ? (lang === 'en' ? p.nameEn : p.nameFr) : id;
    }).join(', ');

    const propSize = PROPERTY_SIZES.find(s => s.id === lastLead.propertySize);
    const sizeName = propSize ? (lang === 'en' ? propSize.nameEn : propSize.nameFr) : lastLead.propertySize;

    const messageText = lang === 'en' 
      ? `Hello Jumo Business Cameroon!\n\nI would like to request a professional pest control intervention with my 30% offer.\n\n📋 *My Details:*\n- *Name:* ${lastLead.name}\n- *Phone:* ${lastLead.phone}\n- *Pests:* ${pestsList}\n- *Property Size:* ${sizeName}\n- *Location:* ${lastLead.city} (${details || 'No neighborhood info'})\n- *Estimated Price:* XAF ${lastLead.estimatedPrice.toLocaleString()}\n\nPlease call me back to schedule the inspection!`
      : `Bonjour Jumo Business Cameroun !\n\nJe souhaite réserver une intervention anti-nuisibles avec mon offre de -30%.\n\n📋 *Mes Détails :*\n- *Nom :* ${lastLead.name}\n- *Téléphone :* ${lastLead.phone}\n- *Nuisibles :* ${pestsList}\n- *Taille Propriété :* ${sizeName}\n- *Ville/Zone :* ${lastLead.city} (${details || 'Pas d\'indications'})\n- *Prix Estimé :* XAF ${lastLead.estimatedPrice.toLocaleString()}\n\nMerci de me recontacter pour confirmer le rendez-vous !`;

    return `https://wa.me/237652816882?text=${encodeURIComponent(messageText)}`;
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSelectedPests([]);
    setName('');
    // keep phone and city to avoid retyping
    setDetails('');
  };

  return (
    <section id="estimator" className="relative py-20 bg-emerald-50">
      
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[350px] h-[350px] bg-white rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 uppercase font-bold tracking-widest">
            {t.btnGetQuote}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-emerald-950 tracking-tight">
            {t.estTitle}
          </h2>
          <p className="mt-4 text-base text-slate-600 font-semibold">
            {t.estSubtitle}
          </p>
        </div>

        {/* Dynamic Calculator & Booking Container */}
        {!isSubmitted ? (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side / Options Panel / Span 7 */}
            <div className="lg:col-span-7 bg-white border border-emerald-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
              
              {/* 1. Select Pest Types */}
              <div>
                <h3 className="text-sm font-mono text-emerald-700 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calculator className="w-4.5 h-4.5 text-emerald-600" />
                  {t.estSelectPests}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PESTS.map((pest) => {
                    const isChecked = selectedPests.includes(pest.id);
                    return (
                      <div
                        key={pest.id}
                        onClick={() => togglePest(pest.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 font-bold' 
                            : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />}
                        </div>
                        <span className="text-sm font-semibold font-sans">
                          {lang === 'en' ? pest.nameEn : pest.nameFr}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Select Property Size */}
              <div>
                <h3 className="text-sm font-mono text-emerald-700 font-bold uppercase tracking-wider mb-4">
                  {t.estSelectProperty}
                </h3>
                <div className="space-y-2">
                  {PROPERTY_SIZES.map((size) => (
                    <label
                      key={size.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        propertySizeId === size.id
                          ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 font-extrabold'
                          : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="property-size"
                          value={size.id}
                          checked={propertySizeId === size.id}
                          onChange={() => setPropertySizeId(size.id)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          propertySizeId === size.id ? 'border-emerald-600 bg-white' : 'border-slate-300 bg-white'
                        }`}>
                          {propertySizeId === size.id && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>}
                        </div>
                        <span className="text-sm">{lang === 'en' ? size.nameEn : size.nameFr}</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-700 font-bold">x{size.multiplier}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Location Select */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-mono text-emerald-700 font-bold uppercase tracking-wider mb-3">
                    {t.estSelectLocation}
                  </h3>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full px-3 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-bold"
                  >
                    <option value="Yaoundé">Yaoundé (Cameroon)</option>
                    <option value="Douala">Douala (Cameroon)</option>
                    <option value="Peripheries Yaoundé">Peripheries Yaoundé</option>
                    <option value="Peripheries Douala">Peripheries Douala</option>
                  </select>
                </div>

                {/* 4. Infestation Severity Select */}
                <div>
                  <h3 className="text-sm font-mono text-emerald-700 font-bold uppercase tracking-wider mb-3">
                    {t.estSelectSeverity}
                  </h3>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="block w-full px-3 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="low">{t.estOptionSeverityLow}</option>
                    <option value="medium">{t.estOptionSeverityMed}</option>
                    <option value="high">{t.estOptionSeverityHigh}</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Right side / Live Price Output & Contact Submission / Span 5 */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Live Quotation Summary */}
              <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                
                {/* Dynamic Image Banner inside Estimator */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden border-b border-emerald-50">
                  {selectedPests.length > 0 ? (
                    (() => {
                      const firstPest = PESTS.find(p => p.id === selectedPests[0]);
                      const imgUrl = firstPest?.imageUrl || "/src/assets/images/disinfection_fogging_1782761030529.jpg";
                      return (
                        <div className="w-full h-full relative animate-fadeIn">
                          <img
                            src={imgUrl}
                            alt={firstPest ? (lang === 'en' ? firstPest.nameEn : firstPest.nameFr) : "Pest control estimation"}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                          <span className="absolute bottom-3 left-3 text-[10px] font-mono text-white bg-emerald-600/90 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-sm">
                            {lang === 'en' ? "Service Selected" : "Service Sélectionné"}
                          </span>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="w-full h-full relative">
                      <img
                        src="/src/assets/images/disinfection_fogging_1782761030529.jpg"
                        alt="Jumo Business Premium Sanitization"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                      <span className="absolute bottom-3 left-3 text-[10px] font-mono text-white bg-slate-800/90 border border-slate-700/50 px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-sm">
                        {lang === 'en' ? "Awaiting Selection" : "En attente de sélection"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1">
                  <h3 className="text-base font-display font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                    <span>{t.estSummary}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-normal uppercase tracking-wider">Real-time Calculation</span>
                  </h3>

                <div className="space-y-3 font-sans text-sm">
                  {/* Detailed breakdown of selected pests */}
                  {selectedPests.length > 0 ? (
                    <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {selectedPests.map(id => {
                        const p = PESTS.find(p => p.id === id);
                        return (
                          <div key={id} className="flex justify-between text-xs text-slate-600 font-semibold">
                            <span>{p ? (lang === 'en' ? p.nameEn : p.nameFr) : id}</span>
                            <span className="font-mono">XAF {p ? p.basePrice.toLocaleString() : 0}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic text-xs py-2 font-medium">{lang === 'en' ? "No pests selected. Price will display once selected." : "Aucun nuisible sélectionné. Le prix s'affichera après sélection."}</p>
                  )}

                  {/* Multipliers row */}
                  {selectedPests.length > 0 && (
                    <div className="flex justify-between text-xs text-slate-500 font-semibold">
                      <span>Multipliers (Property & Infestation)</span>
                      <span className="font-mono">x{sizeMultiplier} & x{severityMultiplier}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 flex justify-between text-slate-700 font-semibold">
                    <span>{t.estSubtotal}</span>
                    <span className="font-mono font-bold text-slate-900">XAF {rawSubtotalPrice.toLocaleString()}</span>
                  </div>

                  {/* Discount Block */}
                  {isDiscountClaimed && (
                    <div className="flex justify-between text-xs text-emerald-800 font-bold bg-emerald-50 p-2 rounded border border-emerald-100">
                      <span>{t.estDiscount}</span>
                      <span className="font-mono">-XAF {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Final estimation sum */}
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-slate-800 font-bold">
                    <span className="text-base text-emerald-700">{t.estTotal}</span>
                    <span className="text-2xl font-mono text-emerald-700 font-extrabold">
                      XAF {finalEstimatedPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {isDiscountClaimed && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <p className="text-[11px] text-emerald-800 leading-tight">
                      <strong>Code JUMO30 applied successfully!</strong> You saved XAF {discountAmount.toLocaleString()} on this quote.
                    </p>
                  </div>
                )}
              </div>
            </div>

              {/* Lead Submission Form */}
              <div className="bg-white border border-emerald-100 p-6 sm:p-8 rounded-2xl shadow-sm">
                <div className="pb-4 border-b border-slate-100">
                  <h3 className="text-base font-display font-extrabold text-slate-900">{t.estSubmitHeading}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">{t.estSubmitSub}</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.estFieldName}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Jean-Pierre"
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-250 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.estFieldPhone}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.estFieldPhonePlaceholder}
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50/50 border border-slate-250 rounded-xl text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Instructions/Neighborhood */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">{t.estFieldDetails}</label>
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder={t.estFieldDetailsPlaceholder}
                      rows={2}
                      className="block w-full px-3 py-2.5 bg-slate-50/50 border border-slate-250 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    ></textarea>
                  </div>

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    disabled={selectedPests.length === 0}
                    className={`w-full py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-md flex justify-center items-center gap-2 cursor-pointer ${
                      selectedPests.length > 0 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500' 
                        : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>{t.estSubmitBtn}</span>
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">OR / OU</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  <a
                    href="https://wa.me/237652816882?text=Bonjour%20Jumo%20Business,%20je%20souhaite%20obtenir%20un%20devis%20gratuit%20pour%20un%20traitement."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-md flex justify-center items-center gap-2 cursor-pointer border border-green-500"
                  >
                    <svg className="w-4 h-4 fill-white animate-pulse" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.487 5.358 1.488 5.568 0 10.106-4.537 10.11-10.107.002-2.698-1.047-5.234-2.952-7.14C17.25 1.489 14.717.44 12.012.44c-5.56 0-10.096 4.536-10.1 10.1-.001 2.012.518 3.98 1.5 5.68L2.316 21.7l5.584-1.46c.21.115.426.223.647.314z" />
                    </svg>
                    <span>{t.btnWhatsApp || "WhatsApp Us"}</span>
                  </a>
                </form>
              </div>

            </div>

          </div>
        ) : (
          /* Submission success state */
          <div className="bg-white border border-emerald-200 shadow-xl rounded-3xl max-w-2xl mx-auto overflow-hidden animate-scaleUp text-center flex flex-col">
            
            {/* Celebration Image Header */}
            <div className="h-48 w-full relative">
              <img
                src="/src/assets/images/pest_tech_cameroon_1782760999760.jpg"
                alt="Jumo Business Team Ready"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300 uppercase bg-slate-900/80 border border-emerald-500/20 px-2.5 py-0.5 rounded shadow-sm">
                  Team Ready • Yaoundé & Douala
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-12 space-y-6">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto border border-emerald-400 shadow-md">
                <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-950">
                  {t.estSuccessMsg}
                </h3>
                <p className="text-sm text-slate-600 font-semibold">
                  {t.estSuccessNote}
                </p>
              </div>

              {/* Direct WhatsApp launcher link */}
              <div className="pt-4 space-y-4">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-all shadow-[0_4px_20px_rgba(22,163,74,0.3)] border border-green-500 transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 fill-white text-white" />
                  <span>{t.estBtnSendDirectWA}</span>
                </a>

                <div>
                  <button
                    onClick={handleResetForm}
                    className="text-xs text-slate-500 hover:text-emerald-700 underline decoration-dotted font-mono uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    {lang === 'en' ? "Calculate New Quote" : "Calculer un Autre Devis"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
