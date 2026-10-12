export type UserRole = 'customer' | 'staff';

export interface Vehicle {
  model: string;
  regNumber: string;
  year?: string;
  vin?: string;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  vehicle?: Vehicle;
  staffTitle?: string;
}

export type JobCardStatus = 'inspection' | 'parts_allocated' | 'in_progress' | 'quality_check' | 'ready' | 'completed';

export interface JobCard {
  id: string;
  vehicleReg: string;
  carModel: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  estimatedCost: number;
  status: JobCardStatus;
  technician: string;
  bayNumber: number;
  dateIn: string;
  estimatedReady: string;
  checklist: {
    item: string;
    completed: boolean;
  }[];
  partsReplaced: string[];
  technicianNotes: string;
}

export interface WorkshopService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  priceStartingAt: number;
  turnaroundTime: string;
  image: string;
  features: string[];
  popular?: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  carModel?: string;
  problemDescription: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  createdAt: string;
  status: 'new' | 'contacted' | 'scheduled';
}
