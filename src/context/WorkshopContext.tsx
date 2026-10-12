import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, JobCard, ContactInquiry, UserRole } from '../types';
import { DEMO_USERS, INITIAL_JOB_CARDS } from '../data/mockData';

export type PageId = 'home' | 'login' | 'register' | 'contact';

interface WorkshopContextType {
  currentPage: PageId;
  navigateTo: (page: PageId) => void;
  currentUser: User | null;
  login: (email: string, role: UserRole) => { success: boolean; error?: string };
  register: (data: {
    name: string;
    email: string;
    phone: string;
    carModel: string;
    regNumber: string;
    password?: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
  jobCards: JobCard[];
  trackJobCard: (regNumber: string) => JobCard | undefined;
  updateJobStatus: (id: string, status: JobCard['status'], notes?: string) => void;
  addBooking: (booking: {
    serviceType: string;
    carModel: string;
    regNumber: string;
    customerName: string;
    customerPhone: string;
    notes?: string;
  }) => JobCard;
  contactInquiries: ContactInquiry[];
  submitContactInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => ContactInquiry;
  isBookModalOpen: boolean;
  openBookingModal: (preselectedService?: string) => void;
  closeBookingModal: () => void;
  preselectedService: string | null;
  activeJobTrackerReg: string | null;
  openJobTracker: (regNumber?: string) => void;
  closeJobTracker: () => void;
}

const WorkshopContext = createContext<WorkshopContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'wheelscare_users_v1';
const CURRENT_USER_KEY = 'wheelscare_current_user_v1';
const JOBS_STORAGE_KEY = 'wheelscare_jobs_v1';
const INQUIRIES_STORAGE_KEY = 'wheelscare_inquiries_v1';

export const WorkshopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [jobCards, setJobCards] = useState<JobCard[]>(() => {
    try {
      const saved = localStorage.getItem(JOBS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_JOB_CARDS;
    } catch {
      return INITIAL_JOB_CARDS;
    }
  });

  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);
  const [activeJobTrackerReg, setActiveJobTrackerReg] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // storage unavailable
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch {
      // storage unavailable
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobCards));
    } catch {
      // storage unavailable
    }
  }, [jobCards]);

  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(contactInquiries));
    } catch {
      // storage unavailable
    }
  }, [contactInquiries]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, role: UserRole) => {
    const trimmedEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === trimmedEmail && u.role === role);
    if (found) {
      setCurrentUser(found);
      return { success: true };
    }

    // If not found in custom list, check if matches any demo user role
    const demo = DEMO_USERS.find(d => d.role === role);
    if (demo && trimmedEmail.includes(role)) {
      setCurrentUser(demo);
      return { success: true };
    }

    // Default friendly login if user provided valid looking email
    const fallbackUser: User = {
      id: `user-${Date.now()}`,
      name: role === 'staff' ? 'Technician ' + trimmedEmail.split('@')[0] : trimmedEmail.split('@')[0],
      email: trimmedEmail,
      phone: '+1 (555) 880-9911',
      role: role,
      vehicle: role === 'customer' ? {
        model: 'Standard Sedan',
        regNumber: 'WC-' + Math.floor(100 + Math.random() * 900) + '-AA'
      } : undefined,
      staffTitle: role === 'staff' ? 'Certified Workshop Technician' : undefined
    };
    setUsers(prev => [...prev, fallbackUser]);
    setCurrentUser(fallbackUser);
    return { success: true };
  };

  const register = (data: {
    name: string;
    email: string;
    phone: string;
    carModel: string;
    regNumber: string;
    password?: string;
  }) => {
    const trimmedEmail = data.email.trim().toLowerCase();
    const cleanReg = data.regNumber.trim().toUpperCase();

    const newUser: User = {
      id: `cust-${Date.now()}`,
      name: data.name.trim(),
      email: trimmedEmail,
      phone: data.phone.trim(),
      role: 'customer',
      vehicle: {
        model: data.carModel.trim(),
        regNumber: cleanReg
      }
    };

    setUsers(prev => [...prev.filter(u => u.email.toLowerCase() !== trimmedEmail), newUser]);
    setCurrentUser(newUser);

    // Also auto-generate a sample active inspection for their newly registered car so they can test the Digital Job Card feature!
    const newJob: JobCard = {
      id: `WC-JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleReg: cleanReg,
      carModel: data.carModel.trim(),
      customerName: data.name.trim(),
      customerPhone: data.phone.trim(),
      serviceType: 'Initial Welcome Vehicle Inspection & Fluids Top-up',
      estimatedCost: 0,
      status: 'inspection',
      technician: 'Dave Miller (Master Tech #04)',
      bayNumber: 3,
      dateIn: 'Just Now',
      estimatedReady: 'In 30 mins',
      checklist: [
        { item: 'Battery cold cranking amps diagnostic', completed: true },
        { item: 'Tire tread depth & brake pad wear check', completed: false },
        { item: 'Engine coolant & brake fluid boiling point check', completed: false }
      ],
      partsReplaced: [],
      technicianNotes: 'Welcome to WheelsCare! Complimentary 21-point initial diagnostics in progress.'
    };

    setJobCards(prev => [newJob, ...prev]);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const trackJobCard = (regNumber: string) => {
    const cleaned = regNumber.trim().toUpperCase().replace(/[\s-]/g, '');
    return jobCards.find(j => j.vehicleReg.toUpperCase().replace(/[\s-]/g, '') === cleaned);
  };

  const updateJobStatus = (id: string, status: JobCard['status'], notes?: string) => {
    setJobCards(prev => prev.map(job => {
      if (job.id === id) {
        return {
          ...job,
          status,
          technicianNotes: notes || job.technicianNotes
        };
      }
      return job;
    }));
  };

  const addBooking = (booking: {
    serviceType: string;
    carModel: string;
    regNumber: string;
    customerName: string;
    customerPhone: string;
    notes?: string;
  }) => {
    const cleanReg = booking.regNumber.trim().toUpperCase();
    const newJob: JobCard = {
      id: `WC-JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleReg: cleanReg,
      carModel: booking.carModel.trim(),
      customerName: booking.customerName.trim(),
      customerPhone: booking.customerPhone.trim(),
      serviceType: booking.serviceType,
      estimatedCost: booking.serviceType.toLowerCase().includes('oil') ? 65 : booking.serviceType.toLowerCase().includes('tuning') ? 180 : 120,
      status: 'inspection',
      technician: 'Dave Miller (Assigned Bay)',
      bayNumber: Math.floor(1 + Math.random() * 5),
      dateIn: 'Scheduled Today',
      estimatedReady: 'Estimated 2-3 hours',
      checklist: [
        { item: 'Intake Vehicle Check-in & OBD scan', completed: true },
        { item: 'Service execution according to workshop manual', completed: false },
        { item: 'Quality verification road test', completed: false }
      ],
      partsReplaced: [],
      technicianNotes: booking.notes || 'Vehicle scheduled and bay prepped for service.'
    };

    setJobCards(prev => [newJob, ...prev]);
    return newJob;
  };

  const submitContactInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `WC-MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'new'
    };
    setContactInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const openBookingModal = (preselected?: string) => {
    setPreselectedService(preselected || null);
    setIsBookModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookModalOpen(false);
    setPreselectedService(null);
  };

  const openJobTracker = (reg?: string) => {
    if (reg) {
      setActiveJobTrackerReg(reg);
    } else if (currentUser?.vehicle?.regNumber) {
      setActiveJobTrackerReg(currentUser.vehicle.regNumber);
    } else {
      setActiveJobTrackerReg('ABC-4821'); // default demo reg
    }
  };

  const closeJobTracker = () => {
    setActiveJobTrackerReg(null);
  };

  return (
    <WorkshopContext.Provider
      value={{
        currentPage,
        navigateTo,
        currentUser,
        login,
        register,
        logout,
        jobCards,
        trackJobCard,
        updateJobStatus,
        addBooking,
        contactInquiries,
        submitContactInquiry,
        isBookModalOpen,
        openBookingModal,
        closeBookingModal,
        preselectedService,
        activeJobTrackerReg,
        openJobTracker,
        closeJobTracker
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
};

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error('useWorkshop must be used within a WorkshopProvider');
  }
  return context;
};
