export type Language = 'en' | 'fr';

export interface Pest {
  id: string;
  nameEn: string;
  nameFr: string;
  iconName: string;
  descriptionEn: string;
  descriptionFr: string;
  basePrice: number; // in XAF
  symptomsEn: string[];
  symptomsFr: string[];
  detailsEn: string;
  detailsFr: string;
  imageUrl?: string;
}

export interface PropertySize {
  id: string;
  nameEn: string;
  nameFr: string;
  multiplier: number;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  pests: string[];
  propertySize: string;
  estimatedPrice: number;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: string;
  discountApplied: boolean;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  pestId?: string;
}
