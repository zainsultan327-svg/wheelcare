import { WorkshopService, JobCard, User } from '../types';

export const WORKSHOP_SERVICES: WorkshopService[] = [
  {
    id: 'engine-tuning',
    title: 'Engine Tuning',
    tagline: 'Precision Dyno & ECU Calibration',
    description: 'Advanced computer diagnostics, throttle map optimization, fuel-air mixture calibration, and horsepower recovery using calibrated dynamometer testing.',
    priceStartingAt: 180,
    turnaroundTime: '2 - 3 Hours',
    image: '/src/assets/images/service_engine_tuning_1791814396999.jpg',
    features: [
      'OBD-II Real-time telemetry diagnostics',
      'Electronic Control Unit (ECU) software optimization',
      'Spark ignition timing and fuel rail pressure tuning',
      'Exhaust emissions and sensor recalibration'
    ],
    popular: true
  },
  {
    id: 'oil-change',
    title: 'Oil Change',
    tagline: '100% Full-Synthetic Lubrication Care',
    description: 'High-grade synthetic engine oil flush and replacement with OEM filter change, complete fluid top-offs, and our complimentary 21-point vehicle safety inspection.',
    priceStartingAt: 65,
    turnaroundTime: '45 Minutes',
    image: '/src/assets/images/service_oil_change_1791814410963.jpg',
    features: [
      'Premium 5W-30 / 0W-20 Full Synthetic motor oil',
      'High-micron OEM oil filter replacement',
      'Brake, coolant, transmission and steering fluid check',
      'Chassis point lubrication & tire pressure check'
    ]
  },
  {
    id: 'digital-job-cards',
    title: 'Digital Job Cards',
    tagline: 'Transparent Live Vehicle Repair Tracker',
    description: 'Say goodbye to paper clutter and hidden surprises. Track your vehicle’s repair progress live in real time with technician inspection photos, exact parts breakdown, and digital approval.',
    priceStartingAt: 0,
    turnaroundTime: 'Real-time Live Sync',
    image: '/src/assets/images/hero_car_workshop_bay_1791814382317.jpg',
    features: [
      'Live bay progress from Diagnostic to Final Road Test',
      'Instant SMS & WhatsApp update notifications',
      'Photo documentation of worn parts before replacement',
      'Digital sign-off with clear itemized invoicing'
    ],
    popular: true
  },
  {
    id: 'spare-parts',
    title: 'Spare Parts',
    tagline: '100% Genuine OEM & Performance Hardware',
    description: 'Direct factory replacement parts for European, Japanese, and American vehicles. Sourced straight from certified tier-1 manufacturers with nationwide warranty.',
    priceStartingAt: 45,
    turnaroundTime: 'Immediate Stock / Same-Day',
    image: '/src/assets/images/service_spare_parts_1791814422897.jpg',
    features: [
      'Certified Bosch, Brembo, NGK, Denso & Mann-Filter parts',
      'Brake pads, ceramic rotors, suspension struts & bushings',
      '12-Month / 20,000 km replacement warranty included',
      'Complete serial verification against vehicle VIN'
    ]
  }
];

export const INITIAL_JOB_CARDS: JobCard[] = [
  {
    id: 'WC-JOB-8421',
    vehicleReg: 'ABC-4821',
    carModel: 'Toyota Camry 2.5L SE (2022)',
    customerName: 'Marcus Vance',
    customerPhone: '+1 (555) 392-1840',
    serviceType: 'Engine Tuning & Dyno Diagnostics',
    estimatedCost: 240,
    status: 'in_progress',
    technician: 'Dave Miller (Master Tech #04)',
    bayNumber: 2,
    dateIn: 'Today, 08:30 AM',
    estimatedReady: 'Today, 04:30 PM',
    checklist: [
      { item: 'OBD-II Fault Code Scan & Compression Test', completed: true },
      { item: 'Throttle Body & MAF Sensor Ultrasonic Cleanse', completed: true },
      { item: 'Dyno ECU Fuel Trim Calibration', completed: false },
      { item: 'High-speed Highway Road Test & Logging', completed: false }
    ],
    partsReplaced: ['NGK Laser Iridium Spark Plugs (x4)', 'Denso High-Flow Air Filter'],
    technicianNotes: 'Throttle response recalibrated. Final dyno pull scheduled at 15:00.'
  },
  {
    id: 'WC-JOB-8422',
    vehicleReg: 'WC-789-GT',
    carModel: 'BMW 330i M-Sport (2021)',
    customerName: 'Elena Rostova',
    customerPhone: '+1 (555) 718-9923',
    serviceType: 'Full Synthetic Oil Change & Filter',
    estimatedCost: 115,
    status: 'quality_check',
    technician: 'Sarah Jenkins (Senior Specialist)',
    bayNumber: 4,
    dateIn: 'Today, 10:15 AM',
    estimatedReady: 'Today, 12:30 PM',
    checklist: [
      { item: 'Drain old oil & install fresh drain plug crush washer', completed: true },
      { item: 'Install Mann-Filter HU816x oil cartridge', completed: true },
      { item: 'Fill 5.25 Liters Motul 8100 X-Clean 5W-30', completed: true },
      { item: '21-Point suspension & brake fluid inspection', completed: true },
      { item: 'Service Interval Indicator reset via iDrive', completed: false }
    ],
    partsReplaced: ['Mann-Filter OEM Element', 'Motul 8100 5W-30 Full Synthetic'],
    technicianNotes: 'All fluids verified. Brake pads measured at 8mm front, 7mm rear (healthy).'
  },
  {
    id: 'WC-JOB-8419',
    vehicleReg: 'NY-552-MK',
    carModel: 'Ford Mustang GT 5.0 (2020)',
    customerName: 'David Chen',
    customerPhone: '+1 (555) 441-2098',
    serviceType: 'Brake Disc & Brembo Caliper Overhaul',
    estimatedCost: 680,
    status: 'ready',
    technician: 'Dave Miller (Master Tech #04)',
    bayNumber: 1,
    dateIn: 'Yesterday, 02:00 PM',
    estimatedReady: 'Ready for Pick-up',
    checklist: [
      { item: 'Rotors removal and hub de-rust treatment', completed: true },
      { item: 'Brembo slotted ventilated rotors installation', completed: true },
      { item: 'Ceramic low-dust pad bedding cycle', completed: true },
      { item: 'DOT 4 High-temperature brake fluid flush', completed: true }
    ],
    partsReplaced: ['Brembo 380mm Front Slotted Rotors', 'Brembo Ceramic Performance Pads'],
    technicianNotes: 'Bedding procedure completed. Exceptional pedal firmness. Ready for customer handover.'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'demo-customer',
    name: 'Marcus Vance',
    email: 'customer@wheelscare.com',
    phone: '+1 (555) 392-1840',
    role: 'customer',
    vehicle: {
      model: 'Toyota Camry 2.5L SE',
      regNumber: 'ABC-4821',
      year: '2022',
      color: 'Midnight Black'
    }
  },
  {
    id: 'demo-staff',
    name: 'Dave Miller',
    email: 'staff@wheelscare.com',
    phone: '+1 (555) 019-8234',
    role: 'staff',
    staffTitle: 'Lead Diagnostic Specialist & Workshop Manager'
  }
];

export const WORKSHOP_DETAILS = {
  name: 'WheelsCare Auto-Workshop',
  tagline: 'Precision Auto Care & Master Diagnostics',
  phone: '+1 (800) 555-CARE',
  directPhone: '+1 (555) 019-8234',
  whatsappNumber: '+1 (555) 019-8234',
  whatsappUrl: 'https://wa.me/15550198234?text=Hi%20WheelsCare,%20I%20would%20like%20to%20inquire%20about%20vehicle%20service',
  email: 'service@wheelscare.com',
  address: 'Plot 42, Motorway Industrial Hub, Automotive Way, Sector 7',
  hours: 'Mon - Sat: 9:00 AM - 8:00 PM',
  sundayHours: 'Sunday: Emergency Breakdown & Towing Service Only',
  emergencyHotline: '+1 (800) 555-TOWS'
};

export const WORKSHOP_STATS = [
  { label: 'Vehicles Serviced', value: '14,850+' },
  { label: 'Happy Customers', value: '12,400+' },
  { label: 'Certified Techs', value: '35+' },
  { label: 'Same-Day Turnaround', value: '98.6%' }
];
