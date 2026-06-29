import { Pest, PropertySize, Review } from './types';

export const PESTS: Pest[] = [
  {
    id: "cockroaches",
    nameEn: "Cockroach Control",
    nameFr: "Traitement des Cafards",
    iconName: "Bug",
    descriptionEn: "Complete extermination of German, American, and Oriental cockroaches. Prevent nest resurgence with non-toxic gel and spray formulations.",
    descriptionFr: "Extermination complète des blattes (cafards) germaniques, américaines et orientales. Prévention anti-récidive avec gel appât et pulvérisation.",
    basePrice: 25000,
    imageUrl: "/src/assets/images/pest_gel_treatment_1782761015773.jpg",
    symptomsEn: [
      "Sightings of live or dead cockroaches during nighttime",
      "Small dark droppings resembling ground black pepper in cabinets",
      "Oval-shaped brown egg cases (oothecae) in dark corners",
      "Unpleasant, musty odor in kitchens, laundry rooms, or bathrooms"
    ],
    symptomsFr: [
      "Présence de cafards vivants ou morts surtout la nuit",
      "Petites déjections sombres ressemblant à du poivre noir dans les tiroirs",
      "Poches d'œufs brunes de forme ovale (oothèques) dans les coins sombres",
      "Odeur de moisi désagréable dans les cuisines ou salles de bain"
    ],
    detailsEn: "Our team applies specialized bait gels that cockroaches carry back to their nests, triggering total colony eradication. We also apply high-safety barrier sprays along baseboards to block any new entries. All formulas are registered, smell-free, and safe for children and pets.",
    detailsFr: "Nos techniciens appliquent un gel appât haute performance que les blattes ramènent au nid, éradiquant l'ensemble de la colonie. Nous pulvérisons également des barrières de sécurité le long des plinthes pour bloquer les entrées. Formulations homologuées, sans odeur gênante, sûres pour enfants et animaux."
  },
  {
    id: "rodents",
    nameEn: "Rat & Rodent Control",
    nameFr: "Dératisation (Rats & Souris)",
    iconName: "Skull",
    descriptionEn: "Extermination of rats, mice, and moles. Strategic secure baiting and comprehensive structural blocking of entry points.",
    descriptionFr: "Extermination de rats, souris et mulots. Appâtage sécurisé et colmatage des fissures et points d'accès structuraux.",
    basePrice: 30000,
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    symptomsEn: [
      "Scratching noises in ceilings, walls, or under floors",
      "Chew marks on food packages, wood, electrical wiring, or plastic pipes",
      "Dark, capsule-shaped droppings (approx. 10-15mm long for rats)",
      "Smear marks (dark grease stains) along walls and baseboards"
    ],
    symptomsFr: [
      "Bruits de grattement nocturnes dans les plafonds ou les cloisons",
      "Traces de dents sur les cartons de nourriture, fils électriques ou tuyaux",
      "Déjections sombres en forme de gélules (environ 10-15 mm de long pour les rats)",
      "Traces de frottement grisâtres le long des bas de murs"
    ],
    detailsEn: "We install heavy-duty tamper-resistant bait stations containing high-attractant professional rodenticides. More importantly, we locate and seal off physical entry holes with steel mesh and sealants to guarantee long-term exclusion.",
    detailsFr: "Nous installons des postes d'appâtage sécurisés et verrouillés contenant des raticides professionnels à haute appétence. Nous identifions et colmatons également les points d'entrée physiques avec de la maille d'acier pour une exclusion durable."
  },
  {
    id: "ants",
    nameEn: "Ant Control",
    nameFr: "Traitement des Fourmis",
    iconName: "ShieldAlert",
    descriptionEn: "Eradication of sugar ants, carpenter ants, and fire ants. Complete elimination of queens and underlying underground tunnels.",
    descriptionFr: "Éradication des fourmis de maison, fourmis charpentières ou de feu. Élimination complète de la reine et de la fourmilière souterraine.",
    basePrice: 20000,
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    symptomsEn: [
      "Steady trails of ants marching across kitchen countertops, floors, or walls",
      "Small piles of soil or sand particles near wall joints and doorways",
      "Swarms of winged ants inside the house, especially during rainy seasons",
      "Hollow sounds in wood framing (indicates destructive carpenter ants)"
    ],
    symptomsFr: [
      "Files indiennes de fourmis traversant les plans de travail ou les murs",
      "Petits dômes de sable ou terre près des portes et plinthes",
      "Nuées de fourmis ailées à l'intérieur, particulièrement en saison des pluies",
      "Bruit de froissement sourd dans le bois de charpente"
    ],
    detailsEn: "We apply advanced colloidal insecticide sprays and non-repellent systemic bait crystals. Ants ingest and share the solution with the entire colony and, crucially, the queen ant. This destroys the source of the infestation forever.",
    detailsFr: "Nous appliquons des insecticides colloidaux de pointe et des cristaux d'appât systémiques. Les fourmis partagent le produit avec l'ensemble du nid, éliminant la reine. Cela détruit la source de l'infestation à sa racine."
  },
  {
    id: "mosquitoes",
    nameEn: "Mosquito Treatment",
    nameFr: "Démoustication Professionnelle",
    iconName: "Wind",
    descriptionEn: "Residual outdoor spraying and thermal fogging. Eliminates adult mosquitoes and treats breeding pools to protect against Malaria and Dengue.",
    descriptionFr: "Pulvérisation résiduelle et thermonébulisation. Élimination des moustiques adultes et traitement des larves pour lutter contre le Paludisme.",
    basePrice: 35000,
    imageUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80",
    symptomsEn: [
      "Excessive high-pitched buzzing around ears, especially at dawn and dusk",
      "Frequent painful, itchy red welts on arms, legs, and body",
      "Visible clouds of mosquitoes resting in dark, damp spaces (hedges, drains, closets)",
      "Presence of standing water in gutters, pots, or puddles holding larvae"
    ],
    symptomsFr: [
      "Bourdonnements intenses près des oreilles, surtout à l'aube et au crépuscule",
      "Piqûres fréquentes provoquant des démangeaisons et boutons rouges",
      "Moustiques visibles se reposant dans les zones d'ombre (buissons, gouttières, placards)",
      "Présence d'eau stagnante (fûts, pots, flaques) contenant des larves"
    ],
    detailsEn: "We target both adult mosquitoes and active breeding grounds. We apply eco-friendly larvicides to standing water to stop larvae hatching. Then, we perform a thorough ultra-low volume (ULV) fogging around bushes, walls, and gardens to clear adult mosquito swarms.",
    detailsFr: "Nous ciblons les adultes et les larves. Nous appliquons des larvicides biologiques dans les eaux stagnantes. Ensuite, nous effectuons une pulvérisation de brouillard thermique (thermonébulisation) dans les jardins et recoins sombres pour un abattement immédiat."
  },
  {
    id: "bedbugs",
    nameEn: "Bed Bug Treatment",
    nameFr: "Traitement Punaises de Lit",
    iconName: "Flame",
    descriptionEn: "Advanced multi-stage localized spraying of mattresses, bed frames, carpets, and cracks with specialized micro-encapsulated formulas.",
    descriptionFr: "Traitement minutieux des matelas, sommiers, fissures et tissus par pulvérisation thermique et chimique à fort pouvoir rémanent.",
    basePrice: 45000,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    symptomsEn: [
      "Waking up with clusters of itchy, red bites in lines or zig-zags on your skin",
      "Tiny dark reddish-brown blood stains on sheets, pillows, or mattress seams",
      "Small clusters of tiny white eggs or translucent, shed skins in bed frame crevices",
      "A sweet, musty odor in heavily infested bedrooms"
    ],
    symptomsFr: [
      "Réveil avec des séries de piqûres rouges et alignées qui démangent fortement",
      "Petites taches de sang foncées sur les draps ou les coutures de matelas",
      "Présence d'œufs blancs minuscules ou de mues transparentes dans le sommier",
      "Odeur douceâtre et fade caractéristique dans les chambres fortement touchées"
    ],
    detailsEn: "Bed bugs require comprehensive, meticulous intervention. We apply dual-action shock and micro-encapsulated long-lasting sprays to mattresses, frames, drawers, and outlets. We also recommend high-temperature wash instructions for clothes to ensure total success.",
    detailsFr: "Les punaises de lit exigent une intervention extrêmement minutieuse. Nous combinons un traitement de choc et un insecticide micro-encapsulé longue durée sur les matelas, sommiers, plinthes et prises. Nous fournissons un protocole de lavage pour éradiquer les œufs restants."
  },
  {
    id: "disinfection",
    nameEn: "Home & Office Disinfection",
    nameFr: "Désinfection (Habitations & Bureaux)",
    iconName: "ShieldCheck",
    descriptionEn: "Broad-spectrum antiviral, antibacterial, and antifungal spraying and fogging of high-touch indoor spaces, offices, and restaurants.",
    descriptionFr: "Désinfection virucide, bactéricide et fongicide certifiée par nébulisation de vos locaux, habitations, bureaux et commerces.",
    basePrice: 25000,
    imageUrl: "/src/assets/images/disinfection_fogging_1782761030529.jpg",
    symptomsEn: [
      "Recent sickness outbreak in the office, gym, or restaurant",
      "Persistent damp, moldy, or stale air in damp or poorly ventilated rooms",
      "Visible black or green mold spots spreading on ceilings or drywall",
      "Requirements for safety certification standards in restaurant and medical facilities"
    ],
    symptomsFr: [
      "Épidémie récente de grippe ou virus dans les bureaux ou commerces",
      "Air humide, confiné ou odeur d'humidité persistante dans les pièces",
      "Taches de moisissure verte ou noire se propageant sur les plafonds ou murs",
      "Exigences de normes de sécurité sanitaire dans la restauration ou le médical"
    ],
    detailsEn: "Using professional-grade electrostatic cold foggers, we apply certified broad-spectrum disinfectants. The fog spreads evenly in 3D space, enveloping handles, electronics, carpets, and air conditioning vents, killing 99.99% of germs, bacteria, and viruses on contact within minutes.",
    detailsFr: "À l'aide de nébuliseurs électrostatiques, nous appliquons un désinfectant de niveau hospitalier. Le brouillard se propage partout, enveloppant poignées, claviers, climatisations et tissus, éliminant 99,99% des virus, bactéries et moisissures en quelques minutes."
  }
];

export const PROPERTY_SIZES: PropertySize[] = [
  { id: "studio", nameEn: "Studio / Single Room", nameFr: "Studio / Chambre Unique", multiplier: 1.0 },
  { id: "apartment", nameEn: "Apartment / House (2-3 Rooms)", nameFr: "Appartement / Maison (2-3 Pièces)", multiplier: 1.5 },
  { id: "villa", nameEn: "Large Villa (4+ Rooms)", nameFr: "Grande Villa / Duplex (4+ Pièces)", multiplier: 2.2 },
  { id: "commercial", nameEn: "Office / Restaurant / Store", nameFr: "Bureau / Restaurant / Commerce", multiplier: 2.0 },
  { id: "industrial", nameEn: "Warehouse / Hotel / School", nameFr: "Entrepôt / Hôtel / Établissement", multiplier: 3.5 }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev1",
    name: "Jean-Pierre N.",
    city: "Bastos, Yaoundé",
    rating: 5,
    comment: "Extrêmement professionnel ! Ils sont intervenus le jour même pour des cafards qui avaient envahi notre cuisine à Bastos. Plus aucun cafard depuis 3 mois. Service impeccable.",
    date: "2026-06-15",
    pestId: "cockroaches"
  },
  {
    id: "rev2",
    name: "Florence K.",
    city: "Bonapriso, Douala",
    rating: 5,
    comment: "We had a severe bed bug issue in our apartments. The GreenShield team came twice and treated everything with high-grade products. Very effective, highly recommended in Douala!",
    date: "2026-06-22",
    pestId: "bedbugs"
  },
  {
    id: "rev3",
    name: "Moustapha O.",
    city: "Akwa, Douala",
    rating: 5,
    comment: "Traitement contre les moustiques très efficace dans notre restaurant à Akwa. Clientèle soulagée, techniciens discrets et aimables. Très bon rapport qualité-prix.",
    date: "2026-06-25",
    pestId: "mosquitoes"
  },
  {
    id: "rev4",
    name: "Marcelle T.",
    city: "Odza, Yaoundé",
    rating: 5,
    comment: "Grand soulagement ! Les rats dans le plafond d'Odza commençaient à ronger les câbles. GreenShield a tout bouché et mis des pièges sécurisés. Service rapide et garanti.",
    date: "2026-06-28",
    pestId: "rodents"
  }
];
