import React, { useState } from 'react';
import { Camera, Eye, X, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface HomeGalleryProps {
  lang: Language;
  onEstimateClick: () => void;
}

interface GalleryItem {
  id: string;
  category: 'all' | 'pest' | 'disinfection' | 'team';
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
  imageUrl: string;
  locationEn: string;
  locationFr: string;
}

export default function HomeGallery({ lang, onEstimateClick }: HomeGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pest' | 'disinfection' | 'team'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "fogging",
      category: "disinfection",
      titleEn: "Professional Disinfection",
      titleFr: "Désinfection Professionnelle",
      descEn: "Electrostatic cold-fogging sanitization for premium offices and commercial stores in Douala.",
      descFr: "Nébulisation de désinfectant certifié dans des bureaux et commerces de haut standing à Douala.",
      imageUrl: "/src/assets/images/disinfection_fogging_1782761030529.jpg",
      locationEn: "Akwa, Douala",
      locationFr: "Akwa, Douala"
    },
    {
      id: "gel",
      category: "pest",
      titleEn: "Anti-Cockroach Gel Treatment",
      titleFr: "Traitement Gel Anti-Cafards",
      descEn: "Safe and precise non-toxic bait gel placement in a residential kitchen in Yaoundé.",
      descFr: "Application ultra-ciblée de gel appât inodore dans une cuisine résidentielle à Yaoundé.",
      imageUrl: "/src/assets/images/pest_gel_treatment_1782761015773.jpg",
      locationEn: "Bastos, Yaoundé",
      locationFr: "Bastos, Yaoundé"
    },
    {
      id: "team_action",
      category: "team",
      titleEn: "Certified Intervention Team",
      titleFr: "Équipe d'Intervention Certifiée",
      descEn: "Our fully trained and equipped technicians preparing specialized treatment gear in Cameroon.",
      descFr: "Nos techniciens qualifiés préparant le matériel de protection et de pulvérisation thermique.",
      imageUrl: "/src/assets/images/pest_tech_cameroon_1782760999760.jpg",
      locationEn: "Yaoundé Headquarters",
      locationFr: "Siège de Yaoundé"
    },
    {
      id: "rodent_bait",
      category: "pest",
      titleEn: "Secured Rodent Bait Stations",
      titleFr: "Postes d'Appâtage Sécurisés",
      descEn: "Installing robust, key-locked bait stations to safely clear mice and rats from commercial warehouses.",
      descFr: "Installation de postes d'appâtage raticides verrouillés pour entrepôts et restaurants.",
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      locationEn: "Bonapriso, Douala",
      locationFr: "Bonapriso, Douala"
    },
    {
      id: "mosquito_spray",
      category: "pest",
      titleEn: "Outdoor Mosquito Misting",
      titleFr: "Démoustication Extérieure",
      descEn: "Residual thermal misting around gardens and hedges to suppress active Malaria and Dengue vectors.",
      descFr: "Pulvérisation résiduelle et traitement thermique des jardins contre le paludisme.",
      imageUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80",
      locationEn: "Odza, Yaoundé",
      locationFr: "Odza, Yaoundé"
    },
    {
      id: "bedbugs_mattress",
      category: "pest",
      titleEn: "Deep Mattress Bedbug treatment",
      titleFr: "Traitement Punases de Lit",
      descEn: "Meticulous localized chemical and heat barrier applications on mattresses and bedframes.",
      descFr: "Désinsectisation minutieuse des sommiers et matelas à fort pouvoir rémanent.",
      imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      locationEn: "Kribi Road, Douala",
      locationFr: "Kribi, Douala"
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'all', nameEn: 'All Photos', nameFr: 'Toutes les Photos' },
    { id: 'pest', nameEn: 'Pest Control', nameFr: 'Anti-Nuisibles' },
    { id: 'disinfection', nameEn: 'Disinfection', nameFr: 'Désinfection' },
    { id: 'team', nameEn: 'Our Team', nameFr: 'Notre Équipe' }
  ];

  return (
    <section id="gallery" className="relative py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
              {lang === 'en' ? "Real Work on the Ground" : "Nos Interventions Réelles"}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Camera className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>{lang === 'en' ? "Our Interventions Gallery" : "Galerie d'Interventions"}</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-semibold leading-relaxed">
              {lang === 'en' 
                ? "Browse certified real-life operations, sanitization, and pest extermination completed by our team across Yaoundé and Douala." 
                : "Explorez nos photos réelles de désinfection, dératisation et désinsectisation réalisées par nos techniciens au Cameroun."}
            </p>
          </div>

          {/* Action Button */}
          <div className="shrink-0">
            <button
              onClick={onEstimateClick}
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 rounded-xl text-xs font-bold text-emerald-800 transition-all cursor-pointer"
            >
              <span>{lang === 'en' ? "Get Instant Calculation" : "Estimer mon Tarif"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Category Tabs - Highly mobile responsive wrap */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-1 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`text-xs px-4 py-2.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500'
                  : 'text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/60'
              }`}
            >
              {lang === 'en' ? cat.nameEn : cat.nameFr}
            </button>
          ))}
        </div>

        {/* Responsive Grid with perfect aspect-ratio ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/60 bg-slate-50 shadow-sm cursor-pointer aspect-4/3 transition-all duration-300 hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5"
            >
              <img
                src={item.imageUrl}
                alt={lang === 'en' ? item.titleEn : item.titleFr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Dark ambient overlay with responsive fade in */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 sm:opacity-75 sm:group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Badges & Content */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-mono uppercase bg-emerald-600/90 text-white font-extrabold px-2 py-1 rounded border border-emerald-500/40 shadow-sm">
                  {lang === 'en' ? item.locationEn : item.locationFr}
                </span>
              </div>

              <div className="absolute bottom-4 inset-x-4 flex flex-col justify-end text-white">
                <h3 className="text-sm sm:text-base font-display font-extrabold tracking-tight">
                  {lang === 'en' ? item.titleEn : item.titleFr}
                </h3>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 font-medium">
                  {lang === 'en' ? item.descEn : item.descFr}
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-[10px] font-bold text-emerald-400 font-mono">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? "TAP TO ENLARGE" : "TAPOTER POUR AGRANDIR"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fadeIn">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-w-3xl w-full max-h-[90vh] flex flex-col">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-900/60 hover:bg-slate-900/85 text-white rounded-full transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 h-full overflow-y-auto">
                {/* Image panel */}
                <div className="relative bg-slate-950 flex items-center justify-center min-h-[250px] sm:min-h-[350px]">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={lang === 'en' ? selectedPhoto.titleEn : selectedPhoto.titleFr}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover max-h-[300px] md:max-h-[500px]"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-mono uppercase bg-emerald-600 text-white font-extrabold px-2.5 py-1 rounded shadow-md border border-emerald-500">
                      {lang === 'en' ? selectedPhoto.locationEn : selectedPhoto.locationFr}
                    </span>
                  </div>
                </div>

                {/* Details text panel */}
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-600 uppercase font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                      {lang === 'en' ? "Intervention Audit" : "Rapport d'Intervention"}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-tight">
                      {lang === 'en' ? selectedPhoto.titleEn : selectedPhoto.titleFr}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                      {lang === 'en' ? selectedPhoto.descEn : selectedPhoto.descFr}
                    </p>

                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2.5">
                      <div className="flex items-start gap-2 text-xs text-emerald-950 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === 'en' ? "Ministry of Agriculture certified formulas" : "Formules homologuées MINADER"}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-emerald-950 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === 'en' ? "Eco-friendly, child and pet-friendly" : "Sûr pour les enfants et les animaux"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions inside Lightbox */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                    <button
                      onClick={() => {
                        setSelectedPhoto(null);
                        onEstimateClick();
                      }}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all border border-emerald-500 cursor-pointer flex justify-center items-center gap-2"
                    >
                      <span>{lang === 'en' ? "Get Quote for this Treatment" : "Calculer le Prix de cette Prestation"}</span>
                    </button>
                    
                    <a
                      href="tel:237652816882"
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex justify-center items-center gap-2 border border-slate-800"
                    >
                      <Phone className="w-3.5 h-3.5 fill-white text-white" />
                      <span>{lang === 'en' ? "Call Support : 652 81 68 82" : "Appeler un Conseiller : 652 81 68 82"}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
