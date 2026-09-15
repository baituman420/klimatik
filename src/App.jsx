import React, { useState, useEffect, useRef } from 'react';
import { 
  Thermometer, 
  Fan, 
  Wind, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Play, 
  Check, 
  Send, 
  Download, 
  Plus, 
  Trash2, 
  ArrowRight, 
  UserCheck, 
  Shield, 
  Phone, 
  Mail, 
  FileCheck, 
  LogOut, 
  RefreshCw, 
  Briefcase, 
  DollarSign,
  User,
  ExternalLink,
  Map,
  ClipboardList,
  CalendarDays,
  FileSpreadsheet,
  TrendingUp,
  BarChart3,
  Zap,
  Eye,
  Truck,
  Edit,
  CheckSquare,
  Search,
  Filter,
  UserPlus
} from 'lucide-react';

// Initial Mock Data (Realistic HVAC Demo Dataset)
const INITIAL_LEADS = [
  {
    id: 'lead-1',
    name: 'Roberto Gómez (Restaurante La Paella)',
    company: 'La Paella S.L.',
    email: 'roberto@lapaella.com',
    phone: '+34 612 345 678',
    type: 'Industrial',
    address: 'Calle Mayor 15, Madrid',
    description: 'Instalación de 3 unidades cassette DUAL split para comedor principal.',
    status: 'Programado',
    date: '2026-05-25',
    daysWithoutResponse: 0,
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 2850,
    items: [
      { description: 'Sistema Cassette Daikin Twin 12kW', quantity: 1, price: 1950 },
      { description: 'Mano de obra - Instalación y pruebas', quantity: 1, price: 650 },
      { description: 'Material auxiliar, tubería y soportes', quantity: 1, price: 250 }
    ]
  },
  {
    id: 'lead-2',
    name: 'María García',
    company: 'Particular',
    email: 'mgarcia@gmail.com',
    phone: '+34 689 765 432',
    type: 'Residencial',
    address: 'Av. de América 42, 4ºB, Madrid',
    description: 'Fuga de gas refrigerante en split de dormitorio. El aparato no enfría.',
    status: 'Nuevo',
    date: '2026-05-24',
    daysWithoutResponse: 0,
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 120,
    items: [
      { description: 'Carga de Gas Refrigerante R32 ecológico', quantity: 1, price: 120 }
    ]
  },
  {
    id: 'lead-3',
    name: 'Elena Rivas (Oficinas TechHub)',
    company: 'TechHub Spaces',
    email: 'mantenimiento@techhub.es',
    phone: '+34 91 555 1234',
    type: 'Mantenimiento',
    address: 'Calle Serrano 120, Planta 2, Madrid',
    description: 'Revisión anual obligatoria RITE del sistema central de climatización conductos.',
    status: 'Presupuesto enviado',
    date: '2026-05-18',
    daysWithoutResponse: 7, // Sin respuesta > 5 días -> Requiere seguimiento
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 450,
    items: [
      { description: 'Mantenimiento RITE - Climatizadora Central', quantity: 1, price: 350 },
      { description: 'Cambio de filtros de carbono y purificación', quantity: 2, price: 50 }
    ]
  },
  {
    id: 'lead-4',
    name: 'Clínica Dental Sol',
    company: 'Dental Sol S.L.',
    email: 'administracion@dentalsol.es',
    phone: '+34 91 444 8899',
    type: 'Industrial',
    address: 'Calle Alcalá 84, Madrid',
    description: 'Sustitución de compresor frigorífico y purga de circuito conductos. Trabajo finalizado en obra por Carlos.',
    status: 'Pendiente de gestión administrativa',
    date: '2026-05-24',
    daysWithoutResponse: 0,
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 1890,
    items: [
      { description: 'Compresor scroll 5HP alta eficiencia', quantity: 1, price: 1350 },
      { description: 'Mano de obra y recuperación de gas', quantity: 1, price: 540 }
    ]
  },
  {
    id: 'lead-5',
    name: 'Talleres AutoMadrid',
    company: 'AutoMadrid Norte',
    email: 'taller@automadrid.es',
    phone: '+34 91 777 2211',
    type: 'Urgencia',
    address: 'Polígono Industrial Las Mercedes, Nave 4',
    description: 'Reparación urgente de cortina de aire en recepción de taller.',
    status: 'Terminado',
    date: '2026-05-24',
    daysWithoutResponse: 0,
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 680,
    items: [
      { description: 'Sustitución condensador y tarjeta de control cortina', quantity: 1, price: 480 },
      { description: 'Desplazamiento urgente y mano de obra', quantity: 1, price: 200 }
    ]
  },
  {
    id: 'lead-6',
    name: 'Javier López',
    company: 'Particular',
    email: 'jlopez99@hotmail.com',
    phone: '+34 654 321 098',
    type: 'Residencial',
    address: 'Calle Alfonso XII, 8, Madrid',
    description: 'Instalación de bomba de calor para salón de 30 metros cuadrados.',
    status: 'Pasado a facturación externa',
    date: '2026-05-20',
    daysWithoutResponse: 0,
    externalInvoiceRef: 'FACT-2026-0481 (Programa de facturación)',
    paymentStatus: 'Cobro verificado',
    totalPrice: 1350,
    items: [
      { description: 'Aire Acondicionado Mitsubishi Electric AP35', quantity: 1, price: 850 },
      { description: 'Kit instalación rápida y soportes amortiguados', quantity: 1, price: 150 },
      { description: 'Instalación básica e interconexión', quantity: 1, price: 350 }
    ]
  },
  {
    id: 'lead-7',
    name: 'Fernando Ruiz (Chalet La Moraleja)',
    company: 'Particular',
    email: 'fruiz_la_moraleja@gmail.com',
    phone: '+34 630 112 233',
    type: 'Residencial',
    address: 'Paseo del Conde 12, Alcobendas',
    description: 'Estudio de aerotermia para vivienda unifamiliar de 240 m2.',
    status: 'Presupuesto preparado',
    date: '2026-05-24',
    daysWithoutResponse: 0,
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 8400,
    items: [
      { description: 'Unidad Aerotermia Daikin Altherma 3 14kW', quantity: 1, price: 6200 },
      { description: 'Depósito ACS 300L e interconexión', quantity: 1, price: 2200 }
    ]
  },
  {
    id: 'lead-8',
    name: 'Colegio San José',
    company: 'Fundación San José',
    email: 'gerencia@colegiosanjose.edu.es',
    phone: '+34 91 888 4433',
    type: 'Industrial',
    address: 'Calle San Bernardo 45, Madrid',
    description: 'Presupuesto para climatización de 4 aulas con multisplit.',
    status: 'Presupuesto enviado',
    date: '2026-05-12',
    daysWithoutResponse: 12, // Sin respuesta > 5 días -> Alerta urgente
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 3600,
    items: [
      { description: 'Sistema MultiSplit 4x1 Haier', quantity: 1, price: 2800 },
      { description: 'Instalación canaleta y cableado alimentador', quantity: 1, price: 800 }
    ]
  },
  {
    id: 'lead-9',
    name: 'Marta Fernández',
    company: 'Particular',
    email: 'marta.fndz@gmail.com',
    phone: '+34 677 889 900',
    type: 'Residencial',
    address: 'Calle Velázquez 34, 2ºA, Madrid',
    description: 'Bomba de calor conductos Fujitsu. Presupuesto aprobado por el cliente.',
    status: 'Aceptado',
    date: '2026-05-23',
    daysWithoutResponse: 0,
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 2100,
    items: [
      { description: 'Conductos Fujitsu ACY71K-KA', quantity: 1, price: 1600 },
      { description: 'Adaptación rejillas de difusión y embocado', quantity: 1, price: 500 }
    ]
  },
  {
    id: 'lead-10',
    name: 'Panadería El Horno',
    company: 'El Horno Artesano S.L.',
    email: 'pedidos@elhornoartesano.es',
    phone: '+34 91 333 5566',
    type: 'Urgencia',
    address: 'Calle Atocha 88, Madrid',
    description: 'Extracción de humos y climatización de obrador. Técnico interviniendo actualmente.',
    status: 'En curso',
    date: '2026-05-25',
    daysWithoutResponse: 0,
    externalInvoiceRef: '',
    paymentStatus: 'No facturado',
    totalPrice: 980,
    items: [
      { description: 'Motor extractor 400 ºC/2h caja insonorizada', quantity: 1, price: 780 },
      { description: 'Mano de obra urgente', quantity: 1, price: 200 }
    ]
  },
  {
    id: 'lead-11',
    name: 'Asesoría Henares',
    company: 'Henares Consultores',
    email: 'admin@henaresconsultores.com',
    phone: '+34 91 666 3322',
    type: 'Mantenimiento',
    address: 'Av. Reyes Católicos 14, Alcalá de Henares',
    description: 'Revisión semestral de splits y limpieza de filtros antibacterianos.',
    status: 'Pasado a facturación externa',
    date: '2026-05-19',
    daysWithoutResponse: 0,
    externalInvoiceRef: 'FACT-2026-0479 (Programa de facturación)',
    paymentStatus: 'Pendiente de comprobar en banco',
    totalPrice: 640,
    items: [
      { description: 'Revisión 8 unidades de climatización', quantity: 1, price: 640 }
    ]
  },
  {
    id: 'lead-12',
    name: 'Boutique Chic',
    company: 'Moda Chic S.A.',
    email: 'contacto@boutiquechic.es',
    phone: '+34 91 222 1100',
    type: 'Mantenimiento',
    address: 'Calle Fuencarral 12, Madrid',
    description: 'Mantenimiento de climatizador cassette de escaparate.',
    status: 'Finalizado',
    date: '2026-05-15',
    daysWithoutResponse: 0,
    externalInvoiceRef: 'FACT-2026-0455',
    paymentStatus: 'Cobrado',
    totalPrice: 320,
    items: [
      { description: 'Higienización y tratamiento bactericida', quantity: 1, price: 320 }
    ]
  }
];

const INITIAL_CLIENTS = [
  {
    id: 'cli-1',
    name: 'Roberto Gómez',
    clientType: 'Empresa',
    company: 'Restaurante La Paella S.L.',
    nifCif: 'B-84729103',
    email: 'roberto@lapaella.com',
    phone: '+34 612 345 678',
    contactPerson: 'Roberto Gómez (Gerente)',
    mainAddress: 'Calle Mayor 15, Madrid',
    installationAddresses: [
      'Calle Mayor 15, Madrid (Comedor Principal)',
      'Calle Mayor 17, Madrid (Cocina & Obradores)'
    ],
    notes: 'Cliente de alta prioridad. Mantenimiento semestral programado antes de apertura.',
    status: 'activo',
    originLeadId: 'lead-1',
    createdAt: '2026-05-20'
  },
  {
    id: 'cli-2',
    name: 'María García',
    clientType: 'Particular',
    company: 'Particular',
    nifCif: '53142890X',
    email: 'mgarcia@gmail.com',
    phone: '+34 689 765 432',
    contactPerson: 'María García',
    mainAddress: 'Av. de América 42, 4ºB, Madrid',
    installationAddresses: [
      'Av. de América 42, 4ºB, Madrid'
    ],
    notes: 'Solicitó recarga R32 urgente. Atención preferente tardes.',
    status: 'activo',
    originLeadId: 'lead-2',
    createdAt: '2026-05-24'
  },
  {
    id: 'cli-3',
    name: 'TechHub Spaces',
    clientType: 'Empresa',
    company: 'TechHub Spaces S.L.',
    nifCif: 'A-91827364',
    email: 'mantenimiento@techhub.es',
    phone: '+34 91 555 1234',
    contactPerson: 'Elena Rivas (Facility Manager)',
    mainAddress: 'Calle Serrano 120, Planta 2, Madrid',
    installationAddresses: [
      'Calle Serrano 120, Planta 2, Madrid',
      'Calle Serrano 120, Planta 3, Madrid'
    ],
    notes: 'Revisión RITE anual obligatoria para oficinas.',
    status: 'activo',
    originLeadId: 'lead-3',
    createdAt: '2026-05-18'
  }
];

const EMPLOYEES = [
  { id: 1, name: 'Marta Ortiz', role: 'Administración', specialty: 'Gestión & Facturación', phone: '+34 600 111 222', email: 'marta@klimatik.es', status: 'activo', schedule: '08:30 - 17:30', avatar: '👩‍💼', color: '#06b6d4' },
  { id: 2, name: 'Carlos Martín', role: 'Técnico', specialty: 'Climatización & Aerotermia', phone: '+34 600 333 444', email: 'carlos@klimatik.es', status: 'activo', schedule: '08:00 - 16:00', avatar: '👨‍🔧', color: 'var(--accent-warm)' },
  { id: 3, name: 'Javier Sanz', role: 'Técnico', specialty: 'Conductos & VRF', phone: '+34 600 555 666', email: 'javier@klimatik.es', status: 'activo', schedule: '08:00 - 16:00', avatar: '🧑‍🔧', color: '#10b981' },
  { id: 4, name: 'Laura Ortiz', role: 'Técnica', specialty: 'Frigorista RITE', phone: '+34 600 777 888', email: 'laura@klimatik.es', status: 'activo', schedule: '08:30 - 16:30', avatar: '👩‍🔧', color: '#06b6d4' },
  { id: 5, name: 'David Ruíz', role: 'Técnico', specialty: 'Ayudante de Instalación', phone: '+34 600 999 000', email: 'david@klimatik.es', status: 'inactivo', schedule: '08:00 - 16:00', avatar: '👦', color: '#f59e0b' }
];

const INITIAL_SHIFTS = [
  {
    id: 'shift-1',
    employeeId: 1, // Carlos
    date: '2026-05-25',
    time: '08:00 - 16:00',
    client: 'Roberto Gómez (Restaurante)',
    address: 'Calle Mayor 15, Madrid',
    jobType: 'Instalación',
    description: 'Montaje de cassettes en techo desmontable.'
  },
  {
    id: 'shift-2',
    employeeId: 2, // Javier
    date: '2026-05-25',
    time: '09:00 - 14:00',
    client: 'María García',
    address: 'Av. de América 42, Madrid',
    jobType: 'Carga de Gas',
    description: 'Localizar fuga en obús y recargar R32.'
  },
  {
    id: 'shift-3',
    employeeId: 3, // Laura
    date: '2026-05-26',
    time: '08:30 - 16:30',
    client: 'Oficinas TechHub',
    address: 'Calle Serrano 120, Madrid',
    jobType: 'Mantenimiento RITE',
    description: 'Limpieza de intercambiadores, test de consumo y gases.'
  },
  {
    id: 'shift-4',
    employeeId: 1, // Carlos
    date: '2026-05-27',
    time: '08:00 - 16:00',
    client: 'Oficinas TechHub',
    address: 'Calle Serrano 120, Madrid',
    jobType: 'Mantenimiento RITE',
    description: 'Apoyo a Laura en la revisión del chiller en azotea.'
  },
  {
    id: 'shift-5',
    employeeId: 4, // David
    date: '2026-05-25',
    time: '08:00 - 16:00',
    client: 'Roberto Gómez (Restaurante)',
    address: 'Calle Mayor 15, Madrid',
    jobType: 'Instalación',
    description: 'Ayuda a Carlos con el tendido de tubería de cobre y andamio.'
  }
];

const INITIAL_CLOCKINS = [
  {
    id: 'clock-1',
    employeeName: 'Carlos Martín',
    date: '2026-05-24',
    timeIn: '07:55',
    timeOut: '16:05',
    latitude: 40.416775,
    longitude: -3.703790,
    address: 'Calle Mayor 12, Madrid (Fichaje en obra)',
    active: false
  },
  {
    id: 'clock-2',
    employeeName: 'Laura Ortiz',
    date: '2026-05-24',
    timeIn: '08:24',
    timeOut: '16:35',
    latitude: 40.423380,
    longitude: -3.691230,
    address: 'Calle Serrano 120, Madrid (En cliente TechHub)',
    active: false
  },
  {
    id: 'clock-3',
    employeeName: 'Javier Sanz',
    date: '2026-05-24',
    timeIn: '09:02',
    timeOut: '',
    latitude: 40.408790,
    longitude: -3.715690,
    address: 'Av. América 42, Madrid (Localización activa)',
    active: true
  }
];

const INITIAL_VACATIONS = [
  {
    id: 'vac-1',
    employeeName: 'Javier Sanz',
    startDate: '2026-06-15',
    endDate: '2026-06-22',
    reason: 'Vacaciones de verano familiares',
    status: 'Pendiente'
  },
  {
    id: 'vac-2',
    employeeName: 'Laura Ortiz',
    startDate: '2026-07-01',
    endDate: '2026-07-15',
    reason: 'Viaje y descanso de verano',
    status: 'Aprobado'
  }
];

const WHATSAPP_TEMPLATES = {
  welcome: "¡Hola! Gracias por contactar con Klimatik. Hemos recibido tu solicitud correctamente. Marta se pondrá en contacto contigo muy pronto para preparar tu valoración técnica. ¡Que tengas un gran día!",
  quote_sent: "Hola {{name}}. Te escribimos desde Klimatik Climatización. Tu presupuesto para la instalación en {{address}} ya está listo por un total de {{totalPrice}}€. Puedes revisarlo en el enlace que te hemos enviado por correo. Quedamos a tu entera disposición.",
  scheduled: "Hola {{name}}. Te confirmamos que tu cita para la instalación/servicio está programada para el día {{date}}. Nuestro técnico se desplazará a {{address}}. Si tienes alguna duda, puedes escribirnos por aquí.",
  en_camino: "¡Hola! Tu instalador de Klimatik ya va de camino a tu ubicación en {{address}}. Estimamos la llegada en unos 25 minutos. ¡Hasta ahora!"
};

// Helper for rendering badges across the 10-stage lifecycle
const getStatusBadge = (status) => {
  switch (status) {
    case 'Nuevo':
      return <span className="badge badge-nuevo"><Info size={12} /> Nuevo</span>;
    case 'Contactado':
      return <span className="badge badge-contactado"><Phone size={12} /> Contactado</span>;
    case 'Presupuesto preparado':
      return <span className="badge badge-presupuesto-preparado"><FileText size={12} /> Presupuesto preparado</span>;
    case 'Presupuesto enviado':
      return <span className="badge badge-presupuesto-enviado"><Send size={12} /> Presupuesto enviado</span>;
    case 'Aceptado':
      return <span className="badge badge-aceptado"><CheckCircle size={12} /> Aceptado</span>;
    case 'Programado':
      return <span className="badge badge-programado"><Calendar size={12} /> Programado</span>;
    case 'En camino':
      return <span className="badge badge-en-camino"><Truck size={12} /> En camino</span>;
    case 'En curso':
      return <span className="badge badge-en-curso"><Play size={12} /> En curso</span>;
    case 'Terminado':
      return <span className="badge badge-terminado"><Check size={12} /> Terminado</span>;
    case 'Pendiente de gestión administrativa':
      return <span className="badge badge-pendiente-admin"><AlertTriangle size={12} /> Pendiente gestión admin</span>;
    case 'Pasado a facturación externa':
      return <span className="badge badge-pasado-facturacion"><ExternalLink size={12} /> Pasado a fact. ext.</span>;
    case 'Finalizado':
      return <span className="badge badge-finalizado"><FileCheck size={12} /> Finalizado</span>;
    default:
      return <span className="badge badge-nuevo">{status}</span>;
  }
};

function App() {
  // Navigation
  const [currentView, setCurrentView] = useState('landing');
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'leads', 'clients', 'budgets', 'calendar', 'jobs', 'admin', 'team', 'automations'
  const [adminSubTab, setAdminSubTab] = useState('pending_admin');
  const [teamSubTab, setTeamSubTab] = useState('team_members');
  const [leadFilter, setLeadFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [jobStatusFilter, setJobStatusFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [employeeTab, setEmployeeTab] = useState('clock');
  
  // Modals & Drawers
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [selectedClientForModal, setSelectedClientForModal] = useState(null);
  const [selectedParteModal, setSelectedParteModal] = useState(null);
  const [simulatedModal, setSimulatedModal] = useState(null); // { title, recipient, message, type }
  
  // CRUD Modal States
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedLeadForEdit, setSelectedLeadForEdit] = useState(null);
  
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClientForEdit, setSelectedClientForEdit] = useState(null);
  const [selectedClientFor360View, setSelectedClientFor360View] = useState(null);
  
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);

  // Selected Profile for Operario Portal
  const [selectedEmployee, setSelectedEmployee] = useState(EMPLOYEES[0]);

  // Main Data States (with LocalStorage fallback)
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('klimatik_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('klimatik_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [employeesList, setEmployeesList] = useState(() => {
    const saved = localStorage.getItem('klimatik_employees');
    return saved ? JSON.parse(saved) : EMPLOYEES;
  });
  
  const [shifts, setShifts] = useState(() => {
    const saved = localStorage.getItem('klimatik_shifts');
    return saved ? JSON.parse(saved) : INITIAL_SHIFTS;
  });

  const [clockIns, setClockIns] = useState(() => {
    const saved = localStorage.getItem('klimatik_clockins');
    return saved ? JSON.parse(saved) : INITIAL_CLOCKINS;
  });

  const [vacations, setVacations] = useState(() => {
    const saved = localStorage.getItem('klimatik_vacations');
    return saved ? JSON.parse(saved) : INITIAL_VACATIONS;
  });

  const [chatLogs, setChatLogs] = useState(() => {
    const saved = localStorage.getItem('klimatik_chats');
    if (saved) return JSON.parse(saved);
    
    // Default chat simulations
    const initialChats = {};
    INITIAL_LEADS.forEach(lead => {
      initialChats[lead.id] = [
        { sender: 'client', text: `Hola, les escribo desde el formulario. ${lead.description}`, time: '10:02' },
        { sender: 'us', text: WHATSAPP_TEMPLATES.welcome, time: '10:03' }
      ];
    });
    return initialChats;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('klimatik_leads', JSON.stringify(leads));
  }, [leads]);
  useEffect(() => {
    localStorage.setItem('klimatik_clients', JSON.stringify(clients));
  }, [clients]);
  useEffect(() => {
    localStorage.setItem('klimatik_employees', JSON.stringify(employeesList));
  }, [employeesList]);
  useEffect(() => {
    localStorage.setItem('klimatik_shifts', JSON.stringify(shifts));
  }, [shifts]);
  useEffect(() => {
    localStorage.setItem('klimatik_clockins', JSON.stringify(clockIns));
  }, [clockIns]);
  useEffect(() => {
    localStorage.setItem('klimatik_vacations', JSON.stringify(vacations));
  }, [vacations]);
  useEffect(() => {
    localStorage.setItem('klimatik_chats', JSON.stringify(chatLogs));
  }, [chatLogs]);

  // ERP Integration State
  const [erpWebhookUrl, setErpWebhookUrl] = useState(() => localStorage.getItem('klimatik_erp_webhook') || 'https://api.ges-clima.es/v1/webhooks/klimatik');
  const [erpApiKey, setErpApiKey] = useState(() => localStorage.getItem('klimatik_erp_apikey') || 'kl_sec_8a39f1c7d2e46b89');
  const [isSyncingERP, setIsSyncingERP] = useState(false);
  const [lastSyncERP, setLastSyncERP] = useState(() => localStorage.getItem('klimatik_last_sync') || 'Sin sincronizar');

  // Toasts State & Hover Chart State
  const [toasts, setToasts] = useState([]);
  const [hoveredBar, setHoveredBar] = useState(null);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // ERP Sync Handlers
  const handleERPSync = () => {
    setIsSyncingERP(true);
    showToast('Iniciando sincronización bidireccional con ERP...', 'info');
    setTimeout(() => {
      setIsSyncingERP(false);
      const nowStr = new Date().toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      setLastSyncERP(nowStr);
      localStorage.setItem('klimatik_last_sync', nowStr);
      showToast('Sincronización completada con éxito. Leads y fichajes actualizados.', 'success');
    }, 2000);
  };

  const handleSaveERPConfig = (e) => {
    e.preventDefault();
    localStorage.setItem('klimatik_erp_webhook', erpWebhookUrl);
    localStorage.setItem('klimatik_erp_apikey', erpApiKey);
    showToast('Configuración del ERP guardada correctamente.', 'success');
  };

  // Lead to Client Conversion Handler (preserves origin trace)
  const handleConvertLeadToClient = (lead) => {
    const existingClient = clients.find(c => c.originLeadId === lead.id || (c.email === lead.email && lead.email !== ''));
    if (existingClient) {
      showToast(`El lead '${lead.name}' ya está registrado como cliente.`, 'info');
      return;
    }
    const newClient = {
      id: `cli-${Date.now()}`,
      name: lead.name,
      clientType: lead.company && !lead.company.includes('Particular') ? 'Empresa' : 'Particular',
      company: lead.company || 'Particular',
      nifCif: lead.nifCif || `B-${Math.floor(10000000 + Math.random() * 90000000)}`,
      email: lead.email,
      phone: lead.phone,
      contactPerson: lead.name,
      mainAddress: lead.address,
      installationAddresses: [lead.address],
      notes: `Convertido desde Lead #${lead.id} (${lead.origin || 'formulario web'}) el ${new Date().toISOString().split('T')[0]}. Necesidad inicial: ${lead.description}`,
      status: 'activo',
      originLeadId: lead.id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setClients([newClient, ...clients]);
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'Contactado', convertedToClientId: newClient.id } : l));
    showToast(`¡Lead '${lead.name}' convertido a Cliente con éxito! Trazabilidad vinculada.`, 'success');
  };

  // Lead Discard Handler (uses status without physical deletion)
  const handleDiscardLead = (leadId) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: 'Descartado' } : l));
    showToast('Lead marcado como Descartado. Se conserva su historial en la plataforma.', 'info');
  };

  // Save / Edit Client Handler
  const handleSaveClient = (clientData) => {
    if (clientData.id) {
      setClients(prev => prev.map(c => c.id === clientData.id ? { ...c, ...clientData } : c));
      showToast('Ficha de cliente actualizada con éxito.', 'success');
    } else {
      const newCli = {
        ...clientData,
        id: `cli-${Date.now()}`,
        status: 'activo',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setClients([newCli, ...clients]);
      showToast('Nuevo cliente registrado en la plataforma.', 'success');
    }
    setShowClientModal(false);
    setSelectedClientForEdit(null);
  };

  // Internal User Handlers
  const handleSaveUser = (userData) => {
    if (userData.id) {
      setEmployeesList(prev => prev.map(u => u.id === userData.id ? { ...u, ...userData } : u));
      showToast(`Usuario interno '${userData.name}' actualizado.`, 'success');
    } else {
      const newEmp = {
        ...userData,
        id: Date.now(),
        status: 'activo',
        avatar: userData.role === 'Técnico' ? '👨‍🔧' : '👩‍💼',
        color: '#38bdf8'
      };
      setEmployeesList([...employeesList, newEmp]);
      showToast(`Nuevo usuario interno '${userData.name}' registrado como ${userData.role}.`, 'success');
    }
    setShowUserModal(false);
    setSelectedUserForEdit(null);
  };

  const handleToggleUserStatus = (userId) => {
    setEmployeesList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'activo' ? 'inactivo' : 'activo';
        showToast(`Usuario '${u.name}' cambiado a estado '${nextStatus}'. Su histórico se conserva.`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Handle Transition Status across the 10-stage lifecycle
  const handleTransitionStatus = (leadId, newStatus, customRef = '') => {
    setLeads(prevLeads => prevLeads.map(l => {
      if (l.id === leadId) {
        const updated = { ...l, status: newStatus };
        if (newStatus === 'Pasado a facturación externa') {
          updated.externalInvoiceRef = customRef || `FACT-2026-${Math.floor(1000 + Math.random() * 9000)} (Holded/Contasimple)`;
          updated.paymentStatus = 'Pendiente de comprobar en banco';
        } else if (newStatus === 'Finalizado') {
          updated.paymentStatus = 'Cobrado';
        }
        return updated;
      }
      return l;
    }));

    if (newStatus === 'Pasado a facturación externa') {
      showToast(`Trabajo marcado como 'Pasado a Facturación Externa'. Trazabilidad actualizada.`, 'success');
    } else if (newStatus === 'Aceptado') {
      showToast(`Presupuesto marcado como ACEPTADO. Listo para programar en la Rota.`, 'success');
    } else if (newStatus === 'Pendiente de gestión administrativa') {
      showToast(`Trabajo trasladado a la Bandeja Administrativa.`, 'info');
    } else {
      showToast(`Estado de trabajo actualizado a: ${newStatus}`, 'info');
    }
  };

  // CSV Export Utility
  const exportToCSV = (filename, data, headers, columnMapping) => {
    try {
      const csvRows = [];
      // Add UTF-8 BOM and headers
      csvRows.push(headers.map(h => `"${h}"`).join(','));
      
      data.forEach(item => {
        const row = columnMapping.map(field => {
          let val = item[field] !== undefined ? item[field] : '';
          // Escape quotes
          const escaped = ('' + val).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(row.join(','));
      });
      
      const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + csvRows.join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Datos de ${filename} exportados correctamente`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Error al exportar los datos a CSV', 'error');
    }
  };

  // Analytics Helpers
  const renderMonthlyBillingChart = () => {
    const completedRev = leads.reduce((acc, l) => acc + (l.status === 'Completado' ? l.totalPrice : 0), 0);
    const salesData = [
      { month: 'Ene', value: 8400 },
      { month: 'Feb', value: 10200 },
      { month: 'Mar', value: 14500 },
      { month: 'Abr', value: 19800 },
      { month: 'May (Hoy)', value: 12000 + completedRev }
    ];
    
    const maxValue = Math.max(...salesData.map(d => d.value));
    const width = 450;
    const height = 220;
    const paddingX = 45;
    const paddingY = 30;
    
    return (
      <div className="svg-chart-container" style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="svg-chart" style={{ width: '100%', height: 'auto' }}>
          {/* Y Axis Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const yVal = paddingY + ratio * (height - 2 * paddingY);
            const gridValue = Math.round(maxValue * (1 - ratio));
            return (
              <g key={i}>
                <line 
                  x1={paddingX} 
                  y1={yVal} 
                  x2={width - 20} 
                  y2={yVal} 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="1" 
                />
                <text 
                  x={paddingX - 8} 
                  y={yVal + 4} 
                  fill="var(--text-muted)" 
                  fontSize="9" 
                  textAnchor="end"
                >
                  {gridValue >= 1000 ? `${(gridValue / 1000).toFixed(1)}k` : gridValue}€
                </text>
              </g>
            );
          })}
          
          {/* Bars */}
          {salesData.map((d, index) => {
            const colWidth = (width - paddingX - 20) / salesData.length;
            const barW = 32;
            const barX = paddingX + index * colWidth + (colWidth - barW) / 2;
            const barH = (d.value / maxValue) * (height - 2 * paddingY);
            const barY = height - paddingY - barH;
            
            const isHovered = hoveredBar === index;
            
            return (
              <g 
                key={index}
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Background bar glow on hover */}
                {isHovered && (
                  <rect 
                    x={barX - 6} 
                    y={paddingY} 
                    width={barW + 12} 
                    height={height - 2 * paddingY} 
                    fill="rgba(255,255,255,0.02)"
                    rx="6"
                  />
                )}
                {/* Actual Bar */}
                <rect 
                  x={barX} 
                  y={barY} 
                  width={barW} 
                  height={Math.max(barH, 4)} 
                  fill="url(#barGradient)"
                  rx="6"
                  className="chart-bar"
                  style={{ transition: 'height 0.4s ease, y 0.4s ease' }}
                />
                {/* Labels */}
                <text 
                  x={barX + barW / 2} 
                  y={height - paddingY + 18} 
                  fill={isHovered ? '#fff' : 'var(--text-secondary)'} 
                  fontSize="10" 
                  fontWeight={isHovered ? '600' : '400'}
                  textAnchor="middle"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
          
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-cool)" />
              <stop offset="100%" stopColor="rgba(var(--accent-cool-rgb), 0.2)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Dynamic Tooltip on Hover */}
        {hoveredBar !== null && (
          <div 
            className="chart-tooltip animate-fade-in"
            style={{
              position: 'absolute',
              top: '10px',
              left: `${80 + hoveredBar * 60}px`,
              background: 'rgba(5, 7, 12, 0.95)',
              border: '1px solid var(--border-color)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block' }}>
              Facturación {salesData[hoveredBar].month}
            </span>
            <strong style={{ fontSize: '0.88rem', color: '#fff' }}>
              {salesData[hoveredBar].value.toLocaleString('es-ES')} €
            </strong>
          </div>
        )}
      </div>
    );
  };

  const renderClimatizationTypeChart = () => {
    const counts = { Residencial: 0, Industrial: 0, Mantenimiento: 0 };
    leads.forEach(l => {
      if (counts[l.type] !== undefined) {
        counts[l.type]++;
      } else {
        counts[l.type] = 1;
      }
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    
    // Percentages
    const resPct = Math.round((counts.Residencial / total) * 100);
    const indPct = Math.round((counts.Industrial / total) * 100);
    const mantPct = Math.round((counts.Mantenimiento / total) * 100);
    
    const radius = 38;
    const circ = 2 * Math.PI * radius;

    return (
      <>
        {/* Left Side: SVG Donut */}
        <div style={{ position: 'relative', width: '130px', height: '130px' }}>
          <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            {/* Background ring */}
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
            
            {/* Segment 1: Residencial */}
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="transparent" 
              stroke="var(--accent-cool)" 
              strokeWidth="8" 
              strokeDasharray={circ}
              strokeDashoffset={circ - (counts.Residencial / total) * circ}
              strokeLinecap="round"
            />
            
            {/* Segment 2: Industrial */}
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="transparent" 
              stroke="var(--accent-warm)" 
              strokeWidth="8" 
              strokeDasharray={circ}
              strokeDashoffset={circ - (counts.Industrial / total) * circ}
              style={{ 
                transform: `rotate(${(counts.Residencial / total) * 360}deg)`, 
                transformOrigin: '50px 50px'
              }}
              strokeLinecap="round"
            />
            
            {/* Segment 3: Mantenimiento */}
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="transparent" 
              stroke="var(--info)" 
              strokeWidth="8" 
              strokeDasharray={circ}
              strokeDashoffset={circ - (counts.Mantenimiento / total) * circ}
              style={{ 
                transform: `rotate(${((counts.Residencial + counts.Industrial) / total) * 360}deg)`, 
                transformOrigin: '50px 50px'
              }}
              strokeLinecap="round"
            />
          </svg>
          {/* Inner Content */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff' }}>{leads.length}</span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Leads</span>
          </div>
        </div>
        
        {/* Right Side: Detailed Legends with Progress Bars */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', minWidth: '180px' }}>
          <div className="legend-row">
            <div className="legend-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span className="dot" style={{ backgroundColor: 'var(--accent-cool)', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
              <span>Residencial ({counts.Residencial})</span>
            </div>
            <div className="legend-value" style={{ fontWeight: '700', fontSize: '0.85rem' }}>{resPct}%</div>
            <div className="progress-bg" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
              <div className="progress-fill" style={{ width: `${resPct}%`, backgroundColor: 'var(--accent-cool)', height: '100%', borderRadius: '4px' }}></div>
            </div>
          </div>
          <div className="legend-row">
            <div className="legend-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span className="dot" style={{ backgroundColor: 'var(--accent-warm)', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
              <span>Industrial ({counts.Industrial})</span>
            </div>
            <div className="legend-value" style={{ fontWeight: '700', fontSize: '0.85rem' }}>{indPct}%</div>
            <div className="progress-bg" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
              <div className="progress-fill" style={{ width: `${indPct}%`, backgroundColor: 'var(--accent-warm)', height: '100%', borderRadius: '4px' }}></div>
            </div>
          </div>
          <div className="legend-row">
            <div className="legend-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span className="dot" style={{ backgroundColor: 'var(--info)', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
              <span>Mantenimiento ({counts.Mantenimiento})</span>
            </div>
            <div className="legend-value" style={{ fontWeight: '700', fontSize: '0.85rem' }}>{mantPct}%</div>
            <div className="progress-bg" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
              <div className="progress-fill" style={{ width: `${mantPct}%`, backgroundColor: 'var(--info)', height: '100%', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderEmployeeHoursList = () => {
    const parseTime = (t) => {
      if (!t) return 0;
      const [h, m] = t.split(':').map(Number);
      return h + m / 60;
    };

    return EMPLOYEES.map(emp => {
      // Calculate real total hours from clocked-in histories
      const empClockins = clockIns.filter(c => c.employeeName === emp.name && !c.active && c.timeIn && c.timeOut);
      const totalHours = empClockins.reduce((acc, c) => {
        const hIn = parseTime(c.timeIn);
        const hOut = parseTime(c.timeOut);
        const diff = hOut - hIn;
        return acc + (diff > 0 ? diff : 0);
      }, 0);

      // Baseline monthly hours
      const baseline = emp.id === 1 ? 142.5 : emp.id === 2 ? 110.0 : emp.id === 3 ? 98.2 : 65.4;
      const finalHours = parseFloat((baseline + totalHours).toFixed(1));
      const monthlyGoal = 160.0;
      const percent = Math.min(Math.round((finalHours / monthlyGoal) * 100), 100);

      // Check if currently clocked in
      const isActive = clockIns.some(c => c.employeeName === emp.name && c.active);

      return (
        <div key={emp.id} className="employee-hours-row" style={{ marginBottom: '1.25rem' }}>
          <div className="employee-hours-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{emp.avatar}</span>
              <div>
                <span style={{ fontWeight: '600', color: '#fff', display: 'block', fontSize: '0.9rem' }}>
                  {emp.name} {isActive && <span className="pulse-indicator" style={{ marginLeft: '6px', verticalAlign: 'middle' }}></span>}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.role}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: '700', color: emp.color || 'var(--accent-cool)', fontSize: '0.95rem' }}>
                {finalHours}h
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Meta: {monthlyGoal}h ({percent}%)
              </span>
            </div>
          </div>
          <div className="progress-bg" style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
            <div 
              className="progress-fill" 
              style={{ 
                width: `${percent}%`, 
                backgroundColor: emp.color || 'var(--accent-cool)',
                boxShadow: `0 0 8px ${emp.color || 'var(--accent-cool)'}`,
                height: '100%',
                borderRadius: '4px',
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            ></div>
          </div>
        </div>
      );
    });
  };

  const renderDonutConversionRate = () => {
    const totalLeads = leads.length || 1;
    const completedLeads = leads.filter(l => l.status === 'Completado').length;
    const activeLeads = leads.filter(l => l.status === 'Programado' || l.status === 'Presupuesto Enviado').length;
    const newLeads = leads.filter(l => l.status === 'Nuevo').length;
    
    const conversionRate = Math.round((completedLeads / totalLeads) * 100);
    
    const radius = 35;
    const circ = 2 * Math.PI * radius;
    const strokeDashoffset = circ - (conversionRate / 100) * circ;

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Circle Progress */}
        <div style={{ position: 'relative', width: '110px', height: '110px' }}>
          <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            {/* Background ring */}
            <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
            
            {/* Glowing active arc */}
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="transparent" 
              stroke="var(--success)" 
              strokeWidth="6" 
              strokeDasharray={circ}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--success)' }}>{conversionRate}%</span>
            <span style={{ fontSize: '0.52rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conversión</span>
          </div>
        </div>
        
        {/* Right Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flexGrow: 1, minWidth: '150px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.35rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Nuevos Registros</span>
            <strong style={{ color: 'var(--info)' }}>{newLeads} leads</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '0.35rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>En Negociación</span>
            <strong style={{ color: 'var(--warning)' }}>{activeLeads} leads</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Completados</span>
            <strong style={{ color: 'var(--success)' }}>{completedLeads} leads</strong>
          </div>
        </div>
      </div>
    );
  };

  // Lead Booking State
  const [bookingName, setBookingName] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingType, setBookingType] = useState('Residencial');
  const [bookingAddress, setBookingAddress] = useState('');
  const [bookingDesc, setBookingDesc] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Time Clock Running State
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [activeClockId, setActiveClockId] = useState(null);
  const [clockSeconds, setClockSeconds] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [clockInAddress, setClockInAddress] = useState('');

  // Active Timer Effect
  useEffect(() => {
    let interval = null;
    if (isClockedIn) {
      interval = setInterval(() => {
        setClockSeconds((sec) => sec + 1);
      }, 1000);
    } else {
      setClockSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  // Format Timer
  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // WhatsApp Automation Simulation State
  const [waSelectedLeadId, setWaSelectedLeadId] = useState(leads[0]?.id || '');
  const [waTypedMessage, setWaTypedMessage] = useState('');
  const [isTypingSim, setIsTypingSim] = useState(false);

  // Document Creator State
  const [selectedDocLeadId, setSelectedDocLeadId] = useState(leads[0]?.id || '');
  const [invoiceType, setInvoiceType] = useState('Presupuesto');
  const [invoiceItemsList, setInvoiceItemsList] = useState([
    { description: 'Unidad Interior / Exterior Inverter', quantity: 1, price: 850 },
    { description: 'Tendido de conductos clima reforzado', quantity: 1, price: 350 },
    { description: 'Desplazamiento e instalación técnica', quantity: 1, price: 250 }
  ]);
  const [newDocItemDesc, setNewDocItemDesc] = useState('');
  const [newDocItemQty, setNewDocItemQty] = useState(1);
  const [newDocItemPrice, setNewDocItemPrice] = useState(0);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Employee Portal Job Complete Flow
  const [selectedShiftForCompletion, setSelectedShiftForCompletion] = useState(null);
  const [signatureName, setSignatureName] = useState('');
  const [signatureDone, setSignatureDone] = useState(false);
  const [uploadPhotoSim, setUploadPhotoSim] = useState(false);

  // Employee Portal Vacation Form
  const [vacStart, setVacStart] = useState('');
  const [vacEnd, setVacEnd] = useState('');
  const [vacReason, setVacReason] = useState('');
  const [vacFormSuccess, setVacFormSuccess] = useState(false);

  // Admin New Shift Form
  const [adminShiftEmpId, setAdminShiftEmpId] = useState(1);
  const [adminShiftDate, setAdminShiftDate] = useState('');
  const [adminShiftTime, setAdminShiftTime] = useState('08:00 - 16:00');
  const [adminShiftClient, setAdminShiftClient] = useState('');
  const [adminShiftAddress, setAdminShiftAddress] = useState('');
  const [adminShiftType, setAdminShiftType] = useState('Instalación');
  const [adminShiftDesc, setAdminShiftDesc] = useState('');
  const [showShiftModal, setShowShiftModal] = useState(false);

  // Scroll to section helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add shift handler
  const handleAddShift = (e) => {
    e.preventDefault();
    if (!adminShiftDate || !adminShiftClient || !adminShiftAddress) {
      showToast("Por favor, rellena todos los campos obligatorios.", "error");
      return;
    }
    const newShift = {
      id: `shift-${Date.now()}`,
      employeeId: parseInt(adminShiftEmpId),
      date: adminShiftDate,
      time: adminShiftTime,
      client: adminShiftClient,
      address: adminShiftAddress,
      jobType: adminShiftType,
      description: adminShiftDesc
    };
    setShifts([...shifts, newShift]);
    setShowShiftModal(false);
    
    const emp = EMPLOYEES.find(emp => emp.id === parseInt(adminShiftEmpId));
    const empName = emp ? emp.name : 'Operario';
    showToast(`Turno asignado a ${empName} correctamente.`, 'success');

    // Auto-update matching lead status to 'Programado'
    const matchingLead = leads.find(l => l.name.toLowerCase().includes(adminShiftClient.toLowerCase()) || adminShiftClient.toLowerCase().includes(l.name.split(' (')[0].toLowerCase()));
    if (matchingLead) {
      setLeads(leads.map(l => l.id === matchingLead.id ? { ...l, status: 'Programado' } : l));
      showToast(`Lead '${matchingLead.name}' actualizado a 'Programado' automáticamente.`, 'info');
    }

    // Reset form
    setAdminShiftClient('');
    setAdminShiftAddress('');
    setAdminShiftDesc('');
  };

  // Add lead from Landing booking form
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingAddress) {
      showToast("Por favor, introduce nombre, teléfono y dirección.", "error");
      return;
    }
    const newLead = {
      id: `lead-${Date.now()}`,
      name: bookingName,
      company: bookingCompany || 'Particular',
      email: bookingEmail || 'no-email@klimatik.com',
      phone: bookingPhone,
      type: bookingType,
      address: bookingAddress,
      description: bookingDesc || 'Sin descripción adicional.',
      status: 'Nuevo',
      date: new Date().toISOString().split('T')[0],
      totalPrice: 150, // Default base fee
      items: [
        { description: `Servicio de revisión y diagnóstico inicial: Climatización ${bookingType}`, quantity: 1, price: 150 }
      ]
    };
    
    // Update leads
    setLeads([newLead, ...leads]);
    
    // Add default initial WhatsApp conversation
    const timeNow = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    setChatLogs(prev => ({
      ...prev,
      [newLead.id]: [
        { sender: 'client', text: `Hola, he solicitado un presupuesto desde su web. Tipo: ${bookingType}. Detalle: ${bookingDesc || 'Diagnóstico de clima'}`, time: timeNow },
        { sender: 'us', text: WHATSAPP_TEMPLATES.welcome, time: timeNow }
      ]
    }));

    setBookingSuccess(true);
    showToast("¡Solicitud de climatización enviada con éxito!", "success");
    
    // Reset Form
    setBookingName('');
    setBookingCompany('');
    setBookingEmail('');
    setBookingPhone('');
    setBookingAddress('');
    setBookingDesc('');
    
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  // Trigger WhatsApp Template Automation
  const triggerWhatsAppTemplate = (templateKey, leadId) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    let text = WHATSAPP_TEMPLATES[templateKey]
      .replace('{{name}}', lead.name.split(' (')[0])
      .replace('{{address}}', lead.address)
      .replace('{{totalPrice}}', lead.totalPrice || 150)
      .replace('{{date}}', lead.date);

    const timeNow = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    // Add outgoing message
    const updatedChat = [...(chatLogs[leadId] || []), { sender: 'us', text, time: timeNow }];
    setChatLogs(prev => ({
      ...prev,
      [leadId]: updatedChat
    }));
    showToast(`Plantilla WhatsApp enviada a ${lead.name.split(' (')[0]}`, 'success');

    // Simulate client response after 1.5s
    setIsTypingSim(true);
    setTimeout(() => {
      setIsTypingSim(false);
      let responseText = "¡De acuerdo! Muchas gracias por el aviso. Quedo a la espera.";
      if (templateKey === 'quote_sent') {
        responseText = "Perfecto, he recibido el presupuesto. Lo reviso con mi pareja y les confirmo para programar la instalación.";
      } else if (templateKey === 'welcome') {
        responseText = "Hola Marta, gracias. Si es urgente, por favor decidme qué día os viene mejor pasar.";
      } else if (templateKey === 'en_camino') {
        responseText = "¡Genial! Aquí le espero. Tengo el portal abierto.";
      }

      const clientTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      setChatLogs(prev => ({
        ...prev,
        [leadId]: [...(prev[leadId] || []), { sender: 'client', text: responseText, time: clientTime }]
      }));
      showToast(`Nuevo mensaje recibido de ${lead.name.split(' (')[0]}`, 'info');
    }, 2000);
  };

  // Send manually typed message in simulator
  const handleSendManualWAMessage = (e) => {
    e.preventDefault();
    if (!waTypedMessage.trim() || !waSelectedLeadId) return;

    const leadId = waSelectedLeadId;
    const lead = leads.find(l => l.id === leadId);
    const timeNow = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    const updatedChat = [...(chatLogs[leadId] || []), { sender: 'us', text: waTypedMessage, time: timeNow }];
    setChatLogs(prev => ({
      ...prev,
      [leadId]: updatedChat
    }));
    setWaTypedMessage('');
    showToast("Mensaje enviado correctamente", "success");

    // Trigger dynamic intelligent reply from client
    setIsTypingSim(true);
    setTimeout(() => {
      setIsTypingSim(false);
      const responses = [
        "Estupendo, muchas gracias. Quedamos así.",
        "Perfecto, entiendo. Si hay novedades me avisan.",
        "Vale, me viene perfecto a esa hora.",
        "Muchas gracias por la atención y la rapidez.",
        "¿Me podéis enviar la factura por favor?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const clientTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      
      setChatLogs(prev => ({
        ...prev,
        [leadId]: [...(prev[leadId] || []), { sender: 'client', text: randomResponse, time: clientTime }]
      }));
      if (lead) {
        showToast(`Nuevo mensaje recibido de ${lead.name.split(' (')[0]}`, 'info');
      }
    }, 2000);
  };

  // Time Clock - Fichar Jornada
  const handleClockToggle = () => {
    const timeNow = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const dateToday = new Date().toISOString().split('T')[0];

    if (!isClockedIn) {
      // Clocking In
      setGpsLoading(true);
      
      const registerClockIn = (lat, lng, addressString) => {
        const newId = `clock-${Date.now()}`;
        const newClockIn = {
          id: newId,
          employeeName: selectedEmployee.name,
          date: dateToday,
          timeIn: timeNow,
          timeOut: '',
          latitude: lat,
          longitude: lng,
          address: addressString,
          active: true
        };
        setClockIns([newClockIn, ...clockIns]);
        setActiveClockId(newId);
        setIsClockedIn(true);
        setGpsLoading(false);
        showToast(`Fichaje de ENTRADA registrado: ${selectedEmployee.name}`, 'success');
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // Simulated reverse geocode for gorgeous display
            const mockStreet = `C/ de O'Donnell 14, Madrid (Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)})`;
            setCurrentLocation({ lat, lng, address: mockStreet });
            setClockInAddress(mockStreet);
            registerClockIn(lat, lng, mockStreet);
          },
          (error) => {
            console.log("GPS Blocked, using secure simulated client site location.");
            // Beautiful simulated high-fidelity locations around Madrid
            const simulatedCoordinates = [
              { lat: 40.4189, lng: -3.6934, address: 'C/ del Prado 18, Madrid (Sede Cliente)' },
              { lat: 40.4321, lng: -3.7088, address: 'C/ Bravo Murillo 90, Madrid (Edificio de Oficinas)' },
              { lat: 40.4025, lng: -3.6821, address: 'Av. Ciudad de Barcelona 12, Madrid (Instalación Residencial)' }
            ];
            const randomCoord = simulatedCoordinates[Math.floor(Math.random() * simulatedCoordinates.length)];
            setCurrentLocation(randomCoord);
            setClockInAddress(randomCoord.address);
            registerClockIn(randomCoord.lat, randomCoord.lng, randomCoord.address);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        const fallback = { lat: 40.4167, lng: -3.7037, address: 'C/ de Atocha 50, Madrid (Simulado por falta de API)' };
        setCurrentLocation(fallback);
        setClockInAddress(fallback.address);
        registerClockIn(fallback.lat, fallback.lng, fallback.address);
      }
    } else {
      // Clocking Out
      const updatedClockIns = clockIns.map(c => {
        if (c.id === activeClockId) {
          return { ...c, timeOut: timeNow, active: false };
        }
        return c;
      });
      setClockIns(updatedClockIns);
      setIsClockedIn(false);
      setActiveClockId(null);
      setCurrentLocation(null);
      setClockInAddress('');
      showToast(`Fichaje de SALIDA registrado: ${selectedEmployee.name}`, 'success');
    }
  };

  // Add Item in Estimate Builder
  const handleAddInvoiceItem = () => {
    if (!newDocItemDesc.trim() || newDocItemPrice <= 0) return;
    setInvoiceItemsList([
      ...invoiceItemsList,
      { description: newDocItemDesc, quantity: newDocItemQty, price: parseFloat(newDocItemPrice) }
    ]);
    setNewDocItemDesc('');
    setNewDocItemQty(1);
    setNewDocItemPrice(0);
  };

  // Remove Item in Estimate Builder
  const handleRemoveInvoiceItem = (index) => {
    const updated = [...invoiceItemsList];
    updated.splice(index, 1);
    setInvoiceItemsList(updated);
  };

  // Generate Document
  const handleGenerateDocument = () => {
    const lead = leads.find(l => l.id === selectedDocLeadId);
    if (!lead) return;

    const subtotal = invoiceItemsList.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const tax = parseFloat((subtotal * 0.21).toFixed(2)); // 21% IVA
    const total = subtotal + tax;

    const docObj = {
      type: invoiceType,
      number: `${invoiceType === 'Presupuesto' ? 'PRES' : 'FACT'}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      leadName: lead.name,
      leadCompany: lead.company,
      leadEmail: lead.email,
      leadPhone: lead.phone,
      leadAddress: lead.address,
      items: [...invoiceItemsList],
      subtotal,
      tax,
      total
    };

    setPreviewDoc(docObj);

    // Update lead values
    const updatedLeads = leads.map(l => {
      if (l.id === lead.id) {
        return {
          ...l,
          totalPrice: total,
          status: invoiceType === 'Presupuesto' ? 'Presupuesto Enviado' : 'Completado',
          items: [...invoiceItemsList]
        };
      }
      return l;
    });
    setLeads(updatedLeads);
    showToast(`${invoiceType} generado y guardado correctamente.`, 'success');

    // Trigger WhatsApp notification simulator
    if (invoiceType === 'Presupuesto') {
      setTimeout(() => {
        triggerWhatsAppTemplate('quote_sent', lead.id);
      }, 500);
    }
  };

  // Handle Shift Completion (Carlos/Javier on-site)
  const handleCompleteShift = () => {
    if (!signatureName.trim()) {
      showToast("Por favor, introduce el nombre del cliente que firma.", "error");
      return;
    }
    
    // Update shift & matching lead status
    const matchingLead = leads.find(l => l.name.includes(selectedShiftForCompletion.client) || selectedShiftForCompletion.client.includes(l.name.split(' (')[0]));
    if (matchingLead) {
      setLeads(leads.map(l => l.id === matchingLead.id ? { ...l, status: 'Completado' } : l));
    }
    
    // Remove shift or mark shift as completed (represented by removing from calendar list or updating color/metadata)
    setShifts(shifts.filter(s => s.id !== selectedShiftForCompletion.id));

    setSignatureDone(true);
    showToast("¡Instalación/Servicio completado y firma registrada!", "success");
    setTimeout(() => {
      setSelectedShiftForCompletion(null);
      setSignatureDone(false);
      setUploadPhotoSim(false);
      setSignatureName('');
    }, 2000);
  };

  // Submit Vacation Request
  const handleVacationRequest = (e) => {
    e.preventDefault();
    if (!vacStart || !vacEnd || !vacReason) {
      showToast("Por favor rellena fechas y motivo de las vacaciones.", "error");
      return;
    }
    const newReq = {
      id: `vac-${Date.now()}`,
      employeeName: selectedEmployee.name,
      startDate: vacStart,
      endDate: vacEnd,
      reason: vacReason,
      status: 'Pendiente'
    };
    setVacations([newReq, ...vacations]);
    setVacFormSuccess(true);
    setVacStart('');
    setVacEnd('');
    setVacReason('');
    showToast("Solicitud de vacaciones enviada para revisión.", "success");
    setTimeout(() => setVacFormSuccess(false), 4000);
  };

  // Approve Vacation (Admin)
  const handleApproveVacation = (id, newStatus) => {
    setVacations(vacations.map(v => v.id === id ? { ...v, status: newStatus } : v));
    showToast(`Solicitud de vacaciones ${newStatus === 'Aprobado' ? 'aprobada' : 'rechazada'} con éxito.`, 'success');
  };

  // Delete Lead
  const handleDeleteLead = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este lead?")) {
      setLeads(leads.filter(l => l.id !== id));
      showToast("Lead eliminado correctamente.", "info");
    }
  };

  return (
    <div className="app-container">
      {/* Visual Ambient Blur Globals */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Main Header / Navigation */}
      <header className="public-header">
        <div className="logo" onClick={() => setCurrentView('landing')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-container">
            <Thermometer className="logo-cool" size={28} />
            <Wind className="logo-warm" size={28} />
          </div>
          <div className="logo-text">Klimat<span>ik</span></div>
        </div>

        <nav className="nav-links">
          <span 
            className={`nav-link ${currentView === 'landing' ? 'active' : ''}`}
            onClick={() => setCurrentView('landing')}
          >
            Web Pública
          </span>
          <span 
            className={`nav-link ${currentView === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('admin');
              setAdminTab('analytics');
            }}
          >
            Portal Marta (Administración)
          </span>
          <span 
            className={`nav-link ${currentView === 'employee' ? 'active' : ''}`}
            onClick={() => {
              setCurrentView('employee');
              setEmployeeTab('clock');
            }}
          >
            Portal Carlos (Instalaciones)
          </span>
        </nav>

        <button 
          className="btn-portal"
          onClick={() => {
            if (currentView === 'landing') {
              setCurrentView('admin');
            } else {
              setCurrentView('landing');
            }
          }}
        >
          {currentView === 'landing' ? (
            <>
              <Shield size={16} /> Panel de Control
            </>
          ) : (
            <>
              <ExternalLink size={16} /> Ver Web
            </>
          )}
        </button>
      </header>

      {/* =========================================================================
          VIEW 1: LANDING PAGE (PUBLIC WEBSITE)
          ========================================================================= */}
      {currentView === 'landing' && (
        <main style={{ flex: 1 }}>
          {/* Hero Section */}
          <section className="landing-hero">
            <div className="hero-content text-left">
              <div className="badge-intro">
                <Fan size={14} className="pulse-indicator" style={{ background: 'transparent', boxShadow: 'none' }} /> Climatización Inteligente
              </div>
              <h1>Confort Térmico a Medida para tu Hogar y Negocio</h1>
              <p>
                Diseñamos, instalamos y mantenemos sistemas de aire acondicionado, calefacción y ventilación. Con un equipo liderado a pie de obra y una gestión de atención inmediata, garantizamos la máxima eficiencia energética y fiabilidad.
              </p>
              <div className="hero-cta">
                <button className="btn-primary" onClick={() => scrollToSection('contacto')}>
                  Solicitar Presupuesto Gratis <ArrowRight size={18} />
                </button>
                <button className="btn-secondary" onClick={() => scrollToSection('servicios')}>
                  Nuestros Servicios
                </button>
              </div>
            </div>

            {/* Fast Booking Form */}
            <div className="glass-card booking-card" id="booking-form">
              <h3>¿Qué necesitas climatizar?</h3>
              <p>Rellena tus datos y nuestro equipo técnico te llamará hoy mismo.</p>
              
              {bookingSuccess && (
                <div className="badge-intro" style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success)', width: '100%', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <CheckCircle size={16} /> ¡Solicitud enviada! Marta te llamará pronto.
                </div>
              )}

              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label htmlFor="clientName">Nombre Completo *</label>
                  <input 
                    type="text" 
                    id="clientName" 
                    className="form-control" 
                    placeholder="Ej. Roberto Gómez" 
                    required 
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName">Empresa (Opcional)</label>
                  <input 
                    type="text" 
                    id="companyName" 
                    className="form-control" 
                    placeholder="Ej. Restaurante La Paella" 
                    value={bookingCompany}
                    onChange={(e) => setBookingCompany(e.target.value)}
                  />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label htmlFor="clientPhone">Teléfono *</label>
                    <input 
                      type="tel" 
                      id="clientPhone" 
                      className="form-control" 
                      placeholder="612 345 678" 
                      required 
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serviceType">Tipo de Espacio</label>
                    <select 
                      id="serviceType" 
                      className="form-control"
                      value={bookingType}
                      onChange={(e) => setBookingType(e.target.value)}
                    >
                      <option value="Residencial">Hogar / Residencial</option>
                      <option value="Industrial">Comercio / Empresa</option>
                      <option value="Mantenimiento">Mantenimiento RITE</option>
                      <option value="Urgencia">Avería / Urgencia 24h</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="clientAddress">Dirección de Instalación *</label>
                  <input 
                    type="text" 
                    id="clientAddress" 
                    className="form-control" 
                    placeholder="Ej. Calle Mayor 15, Madrid" 
                    required 
                    value={bookingAddress}
                    onChange={(e) => setBookingAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="clientDesc">Breve descripción de la necesidad</label>
                  <textarea 
                    id="clientDesc" 
                    className="form-control" 
                    rows="3" 
                    placeholder="Ej. Quiero instalar un aire acondicionado split en el salón de mi piso..."
                    value={bookingDesc}
                    onChange={(e) => setBookingDesc(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center' }}>
                  <Send size={16} /> Solicitar Cita de Valoración
                </button>
              </form>
            </div>
          </section>

          {/* Services Section */}
          <section className="services-section" id="servicios">
            <div className="section-header">
              <h2>Soluciones de Climatización Profesional</h2>
              <p>Ofrecemos equipos de última generación con alto coeficiente de rendimiento, asegurando el mínimo gasto en la factura eléctrica.</p>
            </div>

            <div className="services-grid">
              <div className="glass-card service-card">
                <div className="service-icon cool">
                  <Thermometer size={24} />
                </div>
                <h3>Aire Acondicionado Residencial</h3>
                <p>Equipos split de pared, multi-splits y conductos silenciosos con tecnología inverter de clasificación A+++.</p>
              </div>

              <div className="glass-card service-card">
                <div className="service-icon warm">
                  <Wind size={24} />
                </div>
                <h3>Aerotermia y Calefacción</h3>
                <p>Bombas de calor de alta eficiencia, suelo radiante y calderas que ahorran hasta un 70% en comparación con sistemas antiguos.</p>
              </div>

              <div className="glass-card service-card">
                <div className="service-icon cool">
                  <Fan size={24} />
                </div>
                <h3>Ventilación y Cassettes Industriales</h3>
                <p>Sistemas para hostelería, oficinas y retail que purifican y renuevan el flujo de aire continuamente.</p>
              </div>

              <div className="glass-card service-card">
                <div className="service-icon warm">
                  <Clock size={24} />
                </div>
                <h3>Mantenimiento RITE y Averías</h3>
                <p>Contratos de mantenimiento preventivo oficial exigido por ley y atención urgente 24h para negocios.</p>
              </div>
            </div>
          </section>

          {/* Team / Presentation Section */}
          <section className="team-section" id="nosotros">
            <div className="team-split">
              <div className="text-left">
                <div className="badge-intro" style={{ background: 'rgba(var(--accent-warm-rgb), 0.1)', color: 'var(--accent-warm)', border: '1px solid rgba(var(--accent-warm-rgb), 0.25)' }}>
                  Equipo Klimatik
                </div>
                <h2 style={{ fontSize: '2.25rem', color: '#fff', marginBottom: '1.5rem' }}>Estructura Profesional, Atención Familiar</h2>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                  Detrás de Klimatik están <strong>Marta y Carlos</strong>. Ella coordina toda la maquinaria administrativa, contabilidad, respuestas automáticas y envíos de facturas desde la oficina. Carlos coordina a los técnicos a pie de obra, instalando con precisión y garantizando que cada sistema funcione perfectamente.
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  Al registrar todas nuestras instalaciones y fichajes geolocalizados, controlamos los tiempos de respuesta para asegurar que nunca te dejemos sin servicio cuando el calor o el frío aprietan.
                </p>
                <button className="btn-secondary" onClick={() => scrollToSection('booking-form')}>
                  Conocer nuestro flujo de trabajo
                </button>
              </div>

              <div className="team-profile-container">
                <div className="glass-card profile-card marta">
                  <div className="profile-avatar">👩‍💼</div>
                  <h4>Marta Ortiz</h4>
                  <div className="profile-role">Administración y Clientes</div>
                  <p>Encargada de tus presupuestos, atención inmediata por WhatsApp y facturación automatizada.</p>
                </div>

                <div className="glass-card profile-card carlos">
                  <div className="profile-avatar">👨‍🔧</div>
                  <h4>Carlos Martín</h4>
                  <div className="profile-role">Instalador Jefe & Obra</div>
                  <p>Líder técnico. Diseña la distribución ideal de los conductos y supervisa al personal de campo.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="public-footer">
            <div className="footer-content">
              <div className="footer-logo">
                <Thermometer size={22} className="text-cool" /> Klimatik
              </div>
              <div className="footer-links">
                <a href="#servicios" className="nav-link">Servicios</a>
                <a href="#nosotros" className="nav-link">Equipo</a>
                <a href="#booking-form" className="nav-link">Solicitud de Clima</a>
              </div>
            </div>
            <div className="footer-copyright">
              © 2026 Klimatik Climatización S.L. Creado con fines de gestión interna y atención al cliente. Todos los derechos reservados.
            </div>
          </footer>
        </main>
      )}


      {/* =========================================================================
          VIEW 2: ADMIN / COMMERCIAL DASHBOARD (PORTAL MARTA)
          ========================================================================= */}
      {currentView === 'admin' && (
        <div className="dashboard-wrapper">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-profile">
              <div className="sidebar-avatar">👩‍💼</div>
              <div className="sidebar-profile-info">
                <h4>Marta Ortiz</h4>
                <p>Administradora</p>
              </div>
            </div>

            <div className="sidebar-menu">
              <div className="sidebar-menu-title">Navegación Klimatik</div>
              
              <div 
                className={`sidebar-item ${adminTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setAdminTab('dashboard')}
              >
                <BarChart3 size={18} /> Dashboard
              </div>

              <div 
                className={`sidebar-item ${adminTab === 'leads' ? 'active' : ''}`}
                onClick={() => setAdminTab('leads')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={18} /> Leads
                </span>
                {leads.filter(l => l.status === 'Nuevo' || l.status === 'Contactado').length > 0 && (
                  <span style={{ background: '#06b6d4', color: '#fff', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', fontWeight: 800 }}>
                    {leads.filter(l => l.status === 'Nuevo' || l.status === 'Contactado').length}
                  </span>
                )}
              </div>

              <div 
                className={`sidebar-item ${adminTab === 'clients' ? 'active' : ''}`}
                onClick={() => setAdminTab('clients')}
              >
                <UserCheck size={18} /> Clientes
              </div>

              <div 
                className={`sidebar-item ${adminTab === 'budgets' ? 'active' : ''}`}
                onClick={() => setAdminTab('budgets')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} /> Presupuestos
                </span>
                {leads.filter(l => l.status === 'Presupuesto enviado' && l.daysWithoutResponse > 5).length > 0 && (
                  <span style={{ background: '#f59e0b', color: '#000', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', fontWeight: 800 }}>
                    ⚠️ {leads.filter(l => l.status === 'Presupuesto enviado' && l.daysWithoutResponse > 5).length}
                  </span>
                )}
              </div>

              <div 
                className={`sidebar-item ${adminTab === 'calendar' ? 'active' : ''}`}
                onClick={() => setAdminTab('calendar')}
              >
                <Calendar size={18} /> Calendario & Citas
              </div>

              <div 
                className={`sidebar-item ${adminTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setAdminTab('jobs')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Briefcase size={18} /> Trabajos
                </span>
                <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', fontWeight: 700 }}>
                  {leads.length}
                </span>
              </div>

              <div 
                className={`sidebar-item ${adminTab === 'admin' ? 'active' : ''}`}
                onClick={() => setAdminTab('admin')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={18} /> Administración
                </span>
                {leads.filter(l => l.status === 'Terminado' || l.status === 'Pendiente de gestión administrativa').length > 0 && (
                  <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', fontWeight: 800 }}>
                    {leads.filter(l => l.status === 'Terminado' || l.status === 'Pendiente de gestión administrativa').length}
                  </span>
                )}
              </div>

              <div 
                className={`sidebar-item ${adminTab === 'team' ? 'active' : ''}`}
                onClick={() => setAdminTab('team')}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={18} /> Equipo / Usuarios
                </span>
                <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '100px', fontWeight: 700 }}>
                  {employeesList.filter(e => e.status === 'activo').length}
                </span>
              </div>

              <div 
                className={`sidebar-item ${adminTab === 'automations' ? 'active' : ''}`}
                onClick={() => setAdminTab('automations')}
              >
                <Zap size={18} /> Automatizaciones
              </div>

              <div 
                className="sidebar-item"
                onClick={() => {
                  setCurrentView('employee');
                  setEmployeeTab('clock');
                }}
                style={{ marginTop: '0.5rem', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.25)', color: 'var(--accent-warm)' }}
              >
                <User size={18} /> Portal Operario
              </div>
            </div>

            <div className="sidebar-footer">
              <div className="sidebar-menu-title">Rol Rápido</div>
              <button 
                className="btn-portal w-full"
                onClick={() => {
                  setCurrentView('employee');
                  setEmployeeTab('clock');
                }}
                style={{ background: 'rgba(var(--accent-warm-rgb), 0.1)', borderColor: 'rgba(var(--accent-warm-rgb), 0.3)' }}
              >
                <Users size={16} className="text-warm" /> Ver como Empleado
              </button>
            </div>
          </aside>

          {/* Main Dashboard Area */}
          <main className="dashboard-content text-left">
            
            {/* KPI STATS CARDS (Max 4 indicators for ultra-simple dashboard) */}
            <div className="stats-grid">
              <div className="glass-card stat-card" onClick={() => setAdminTab('calendar')} style={{ borderLeft: '4px solid #38bdf8', cursor: 'pointer' }}>
                <div className="stat-info">
                  <span className="stat-label">Agenda de Hoy</span>
                  <span className="stat-value" style={{ color: '#38bdf8' }}>
                    {leads.filter(l => l.status === 'Programado' || l.status === 'En curso' || l.status === 'En camino').length} citas/trabajos
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Intervenciones para hoy 25 de Mayo
                  </span>
                </div>
                <div className="stat-icon cool">
                  <Calendar size={22} />
                </div>
              </div>

              <div className="glass-card stat-card" onClick={() => setAdminTab('leads')} style={{ borderLeft: '4px solid #06b6d4', cursor: 'pointer' }}>
                <div className="stat-info">
                  <span className="stat-label">Nuevos Leads</span>
                  <span className="stat-value" style={{ color: '#06b6d4' }}>
                    {leads.filter(l => l.status === 'Nuevo' || l.status === 'Contactado').length} pendientes
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Contactos sin presupuesto preparado
                  </span>
                </div>
                <div className="stat-icon info">
                  <Users size={22} />
                </div>
              </div>

              <div className="glass-card stat-card" onClick={() => setAdminTab('budgets')} style={{ borderLeft: '4px solid #f59e0b', cursor: 'pointer' }}>
                <div className="stat-info">
                  <span className="stat-label">Presupuestos a Seguimiento</span>
                  <span className="stat-value" style={{ color: '#f59e0b' }}>
                    {leads.filter(l => l.status === 'Presupuesto enviado' && l.daysWithoutResponse > 5).length} sin respuesta
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Más de 5 días sin contestación
                  </span>
                </div>
                <div className="stat-icon warning">
                  <FileText size={22} />
                </div>
              </div>

              <div className="glass-card stat-card" onClick={() => setAdminTab('admin')} style={{ borderLeft: '4px solid #ef4444', cursor: 'pointer' }}>
                <div className="stat-info">
                  <span className="stat-label">Atención Administrativa</span>
                  <span className="stat-value" style={{ color: '#f87171' }}>
                    {leads.filter(l => l.status === 'Terminado' || l.status === 'Pendiente de gestión administrativa').length} en bandeja
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Partes terminados por volcar a facturación
                  </span>
                </div>
                <div className="stat-icon danger">
                  <AlertTriangle size={22} />
                </div>
              </div>
            </div>

            {/* =========================================================================
                TAB 1: DASHBOARD (SIMPLE & FOCUSED)
               ========================================================================= */}
            {adminTab === 'dashboard' && (
              <div className="analytics-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Visual Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#fff', margin: 0 }}>Dashboard Operativo & Comercial</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Resumen ejecutivo: la actividad de hoy y los asuntos que requieren tu atención inmediata.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button 
                      className={`btn-secondary ${isSyncingERP ? 'loading' : ''}`}
                      onClick={handleERPSync} 
                      disabled={isSyncingERP}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <RefreshCw size={16} className={isSyncingERP ? 'animate-spin' : ''} /> 
                      {isSyncingERP ? 'Sincronizando...' : 'Sincronizar Sistema Externo'}
                    </button>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Última Sincronización: <strong>{lastSyncERP}</strong>
                    </span>
                  </div>
                </div>

                {/* DASHBOARD 2-COLUMN MAIN LAYOUT */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
                  
                  {/* Left Column: Agenda de Hoy (25 Mayo 2026) */}
                  <div className="glass-card text-left" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={18} className="text-cool" /> Agenda de Hoy (25 de Mayo de 2026)
                      </h3>
                      <span className="badge badge-scheduled">
                        {leads.filter(l => l.status === 'Programado' || l.status === 'En curso' || l.status === 'En camino').length} citas
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {leads.filter(l => l.status === 'Programado' || l.status === 'En curso' || l.status === 'En camino').length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                          No hay citas programadas para hoy. Puedes asignar nuevas en el Calendario.
                        </div>
                      ) : (
                        leads.filter(l => l.status === 'Programado' || l.status === 'En curso' || l.status === 'En camino').map(job => (
                          <div key={job.id} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{job.name}</strong>
                                {getStatusBadge(job.status)}
                              </div>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>📍 {job.address}</span>
                              <span style={{ fontSize: '0.78rem', color: 'var(--accent-warm)', fontWeight: 600 }}>👨‍🔧 Técnico: Carlos Martín</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                              <button 
                                className="btn-secondary" 
                                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                                onClick={() => {
                                  setSimulatedModal({
                                    title: 'Aviso WhatsApp a Cliente (Simulado)',
                                    recipient: `${job.name} (${job.phone})`,
                                    message: `Hola ${job.name.split(' (')[0]}, te recordamos tu cita de climatización con Klimatik programada para hoy. Nuestro técnico Carlos se desplazará a tu dirección en ${job.address}. Si necesitas hacer cualquier ajuste de hora, responde a este mensaje. ¡Gracias!`,
                                    type: 'whatsapp'
                                  });
                                }}
                              >
                                📱 Simular WhatsApp
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Right Column: Asuntos Prioritarios (Requieren Acción) */}
                  <div className="glass-card text-left" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={18} style={{ color: '#ef4444' }} /> Asuntos Prioritarios (Acciones Inmediatas)
                      </h3>
                      <span className="simulation-tag">VERIFICADO</span>
                    </div>

                    {/* Section 1: Presupuestos sin respuesta > 5 días */}
                    <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#f59e0b', fontSize: '0.85rem' }}>⚠️ Presupuestos Enviados sin Respuesta (&gt;5 días)</strong>
                        <span className="badge badge-quote">{leads.filter(l => l.status === 'Presupuesto enviado' && l.daysWithoutResponse > 5).length} pendientes</span>
                      </div>
                      {leads.filter(l => l.status === 'Presupuesto enviado' && l.daysWithoutResponse > 5).map(job => (
                        <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', background: '#0b141f', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{job.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.daysWithoutResponse} días sin respuesta • {job.totalPrice}€</div>
                          </div>
                          <button 
                            className="btn-primary" 
                            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', background: '#f59e0b', borderColor: '#f59e0b', color: '#000' }}
                            onClick={() => {
                              setSimulatedModal({
                                title: 'Recordatorio Comercial de Presupuesto (>5 días)',
                                recipient: `${job.name} (${job.phone})`,
                                message: `Hola ${job.name.split(' (')[0]}, te escribimos desde Klimatik para saber si pudiste revisar la propuesta técnica enviada hace ${job.daysWithoutResponse} días por valor de ${job.totalPrice}€. ¿Deseas resolver alguna duda o concertar la fecha de instalación? Quedamos a tu disposición.`,
                                type: 'whatsapp'
                              });
                            }}
                          >
                            📱 Recordatorio WhatsApp
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Section 2: Trabajos Terminados pendientes de Gestión Admin */}
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#f87171', fontSize: '0.85rem' }}>🔴 Trabajos Terminados Pendientes de Facturación</strong>
                        <span className="badge badge-pendiente-admin">{leads.filter(l => l.status === 'Terminado' || l.status === 'Pendiente de gestión administrativa').length} listos</span>
                      </div>
                      {leads.filter(l => l.status === 'Terminado' || l.status === 'Pendiente de gestión administrativa').map(job => (
                        <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', background: '#0b141f', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{job.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Parte firmado • Importe: {job.totalPrice}€</div>
                          </div>
                          <button 
                            className="btn-primary" 
                            style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', background: '#ef4444', borderColor: '#ef4444' }}
                            onClick={() => {
                              setAdminTab('admin');
                              setAdminSubTab('pending_admin');
                            }}
                          >
                            📋 Ir a Administración
                          </button>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* 10-STAGE PIPELINE TRACKING BAR */}
                <div className="glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <TrendingUp size={16} className="text-cool" /> Flujo Completo de Trazabilidad (10 Estados)
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Oficina ➔ Operario ➔ Administración ➔ Facturación Externa</span>
                  </div>

                  <div className="pipeline-container">
                    {[
                      { key: 'Nuevo', label: '1. Nuevo Lead' },
                      { key: 'Presupuesto preparado', label: '2. Pres. Listo' },
                      { key: 'Presupuesto enviado', label: '3. Pres. Enviado' },
                      { key: 'Aceptado', label: '4. Aceptado' },
                      { key: 'Programado', label: '5. Programado' },
                      { key: 'En camino', label: '6. En Camino' },
                      { key: 'En curso', label: '7. En Curso' },
                      { key: 'Terminado', label: '8. Terminado / Parte' },
                      { key: 'Pendiente de gestión administrativa', label: '9. Pend. Admin', highlight: 'admin' },
                      { key: 'Pasado a facturación externa', label: '10. Fact. Externa', highlight: 'ext' }
                    ].map(stage => {
                      const count = leads.filter(l => l.status === stage.key).length;
                      return (
                        <div 
                          key={stage.key} 
                          className={`pipeline-step ${count > 0 ? 'active-step' : ''} ${stage.highlight === 'admin' ? 'highlight-admin' : ''} ${stage.highlight === 'ext' ? 'highlight-ext' : ''}`}
                        >
                          <div className="pipeline-count">{count}</div>
                          <div className="pipeline-label" title={stage.key}>{stage.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 2: LEADS
               ========================================================================= */}
            {adminTab === 'leads' && (
              <div className="leads-container animate-fade-in">
                <div className="filter-bar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={22} className="text-cool" /> Solicitudes de Climatización Entrantes (Leads)
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
                        Gestiona contactos recientes, conviértelos en clientes y genera propuestas técnicas.
                      </p>
                    </div>
                    <div className="filter-actions">
                      <button className="btn-primary" onClick={() => {
                        const names = ['Carlos Benítez', 'Restaurante El Patio', 'Clínica Oftalmológica Sol', 'Laura Vega'];
                        const randomName = names[Math.floor(Math.random() * names.length)];
                        const newId = `lead-${Date.now()}`;
                        setLeads([{
                          id: newId,
                          name: randomName,
                          company: randomName.includes('Restaurante') || randomName.includes('Clínica') ? randomName : 'Particular',
                          email: 'contacto@cliente.es',
                          phone: '+34 611 ' + Math.floor(100000 + Math.random() * 900000),
                          type: 'Residencial',
                          address: 'Calle Gran Vía 55, Madrid',
                          description: 'Solicitud urgente de sustitución de split inverter.',
                          status: 'Nuevo',
                          date: new Date().toISOString().split('T')[0],
                          daysWithoutResponse: 0,
                          externalInvoiceRef: '',
                          paymentStatus: 'No facturado',
                          totalPrice: 450,
                          items: [{ description: 'Sustitución equipo e instalación rápida', quantity: 1, price: 450 }]
                        }, ...leads]);
                        showToast(`Nuevo lead '${randomName}' registrado en la plataforma.`, 'success');
                      }}>
                        <Plus size={16} /> Crear Lead de Prueba
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[
                      { key: 'all', label: `Todos los Leads (${leads.length})` },
                      { key: 'new', label: `🟢 Nuevos (${leads.filter(l => l.status === 'Nuevo' || l.status === 'Contactado').length})` },
                      { key: 'quotes', label: `🟡 Presupuestados (${leads.filter(l => l.status.includes('Presupuesto')).length})` }
                    ].map(f => (
                      <button
                        key={f.key}
                        onClick={() => setLeadFilter(f.key)}
                        className={`admin-subnav-item ${leadFilter === f.key ? 'active' : ''}`}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="table-responsive glass-card" style={{ padding: '1rem' }}>
                  <table className="klimatik-table">
                    <thead>
                      <tr>
                        <th>Cliente / Contacto</th>
                        <th>Tipo Intervención</th>
                        <th>Dirección</th>
                        <th>Descripción</th>
                        <th>Importe Est.</th>
                        <th>Estado Actual</th>
                        <th>Acción / Flujo Comercial</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads
                        .filter(lead => {
                          if (leadFilter === 'new') return lead.status === 'Nuevo' || lead.status === 'Contactado';
                          if (leadFilter === 'quotes') return lead.status.includes('Presupuesto');
                          return true;
                        })
                        .map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <div className="client-cell">
                              <strong className="client-name" style={{ color: '#fff' }}>{lead.name}</strong>
                              <span className="client-contact" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{lead.phone} | {lead.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge badge-new" style={{
                              background: lead.type === 'Urgencia' ? 'var(--danger-bg)' : lead.type === 'Industrial' ? 'rgba(var(--accent-warm-rgb), 0.1)' : '',
                              color: lead.type === 'Urgencia' ? 'var(--danger)' : lead.type === 'Industrial' ? 'var(--accent-warm)' : ''
                            }}>
                              {lead.type}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-center gap-2 text-secondary" style={{ fontSize: '0.82rem' }}>
                              <MapPin size={14} className="text-cool" /> {lead.address}
                            </div>
                          </td>
                          <td style={{ maxWidth: '220px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {lead.description}
                          </td>
                          <td style={{ fontWeight: 700, color: 'var(--accent-cool)' }}>
                            {lead.totalPrice}€
                          </td>
                          <td>
                            {getStatusBadge(lead.status)}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              {!clients.some(c => c.originLeadId === lead.id) && lead.status !== 'Descartado' && (
                                <button 
                                  className="btn-primary" 
                                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', background: '#10b981', borderColor: '#10b981' }}
                                  onClick={() => handleConvertLeadToClient(lead)}
                                >
                                  <UserPlus size={13} /> Convertir a Cliente
                                </button>
                              )}
                              <button 
                                className="btn-secondary" 
                                style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                                onClick={() => {
                                  setSelectedLeadForEdit(lead);
                                  setShowLeadModal(true);
                                }}
                              >
                                <Edit size={13} /> Editar
                              </button>
                              {lead.status !== 'Descartado' && (
                                <button 
                                  className="btn-secondary text-danger" 
                                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                                  onClick={() => handleDiscardLead(lead.id)}
                                >
                                  Descartar
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CLIENTES */}
            {adminTab === 'clients' && (
              <div className="leads-container animate-fade-in">
                <div className="filter-bar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserCheck size={22} className="text-cool" /> Cartera de Clientes
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
                        Gestión completa de particulares y empresas, NIF/CIF, direcciones de instalación y Ficha 360º.
                      </p>
                    </div>
                    <div className="filter-actions">
                      <button className="btn-primary" onClick={() => {
                        setSelectedClientForEdit(null);
                        setShowClientModal(true);
                      }}>
                        <Plus size={16} /> Alta de Nuevo Cliente
                      </button>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[
                      { key: 'all', label: `Todos los Clientes (${clients.length})` },
                      { key: 'particular', label: `👤 Particulares (${clients.filter(c => c.clientType === 'Particular').length})` },
                      { key: 'empresa', label: `🏢 Empresas (${clients.filter(c => c.clientType === 'Empresa').length})` }
                    ].map(f => (
                      <button
                        key={f.key}
                        onClick={() => setClientFilter(f.key)}
                        className={`admin-subnav-item ${clientFilter === f.key ? 'active' : ''}`}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="table-responsive glass-card" style={{ padding: '1rem' }}>
                  <table className="klimatik-table">
                    <thead>
                      <tr>
                        <th>Cliente / Razón Social</th>
                        <th>Tipo / NIF-CIF</th>
                        <th>Persona Contacto</th>
                        <th>Teléfono / Email</th>
                        <th>Direcciones Instalación</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients
                        .filter(c => {
                          if (clientFilter === 'particular') return c.clientType === 'Particular';
                          if (clientFilter === 'empresa') return c.clientType === 'Empresa';
                          return true;
                        })
                        .map(client => (
                          <tr key={client.id}>
                            <td>
                              <div className="client-cell">
                                <strong className="client-name" style={{ color: '#fff' }}>{client.name}</strong>
                                {client.company && client.company !== 'Particular' && (
                                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{client.company}</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${client.clientType === 'Empresa' ? 'badge-completed' : 'badge-new'}`}>
                                {client.clientType}
                              </span>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                NIF: <strong>{client.nifCif}</strong>
                              </div>
                            </td>
                            <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              {client.contactPerson || client.name}
                            </td>
                            <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                              <div>📞 {client.phone}</div>
                              <div>✉️ {client.email}</div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                <span style={{ fontSize: '0.82rem', color: '#fff' }}>📍 {client.mainAddress}</span>
                                {client.installationAddresses && client.installationAddresses.length > 1 && (
                                  <span className="client-address-pill" style={{ fontSize: '0.72rem', display: 'inline-block', width: 'fit-content' }}>
                                    +{client.installationAddresses.length - 1} sedes de instalación
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className={`badge ${client.status === 'activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                                {client.status === 'activo' ? '🟢 Activo' : '🔴 Inactivo'}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <button 
                                  className="btn-primary" 
                                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', background: '#38bdf8', borderColor: '#38bdf8' }}
                                  onClick={() => setSelectedClientFor360View(client)}
                                >
                                  <Eye size={13} /> Ficha 360º
                                </button>
                                <button 
                                  className="btn-secondary" 
                                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                                  onClick={() => {
                                    setSelectedClientForEdit(client);
                                    setShowClientModal(true);
                                  }}
                                >
                                  <Edit size={13} /> Editar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRESUPUESTOS */}
            {adminTab === 'budgets' && (
              <div className="leads-container animate-fade-in">
                <div className="filter-bar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={22} className="text-cool" /> Gestión Comercial de Presupuestos
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
                        Propuestas técnicas presentadas a clientes, control de vencimiento y cierre comercial por WhatsApp.
                      </p>
                    </div>
                  </div>

                  {/* Summary KPI Cards for Budgets */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid #38bdf8' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Presupuestado Activo</span>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
                        {leads.filter(l => l.status.includes('Presupuesto') || l.status === 'Aceptado').reduce((acc, curr) => acc + (curr.totalPrice || 0), 0).toFixed(2)}€
                      </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid #f59e0b' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>En Riesgo (&gt;5 Días sin Respuesta)</span>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.2rem' }}>
                        {leads.filter(l => l.status === 'Presupuesto enviado' && l.daysWithoutResponse > 5).length} ofertas
                      </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1rem', borderLeft: '4px solid #10b981' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Presupuestos Aceptados</span>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>
                        {leads.filter(l => l.status === 'Aceptado').length} obras listas
                      </div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive glass-card" style={{ padding: '1rem' }}>
                  <table className="klimatik-table">
                    <thead>
                      <tr>
                        <th>Cliente / Contacto</th>
                        <th>Tipo Intervención</th>
                        <th>Detalles / Necesidad</th>
                        <th>Antigüedad Envío</th>
                        <th>Importe Total (€)</th>
                        <th>Estado Comercial</th>
                        <th>Acciones de Seguimiento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads
                        .filter(l => l.status.includes('Presupuesto') || l.status === 'Aceptado')
                        .map(lead => (
                          <tr key={lead.id}>
                            <td>
                              <div className="client-cell">
                                <strong className="client-name" style={{ color: '#fff' }}>{lead.name}</strong>
                                <span className="client-contact" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{lead.phone}</span>
                              </div>
                            </td>
                            <td><span className="badge badge-new">{lead.type}</span></td>
                            <td style={{ maxWidth: '240px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.description}</td>
                            <td>
                              {lead.daysWithoutResponse >= 5 ? (
                                <span className="badge badge-quote" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', fontWeight: 700 }}>
                                  ⚠️ {lead.daysWithoutResponse} días
                                </span>
                              ) : (
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lead.daysWithoutResponse || 0} días</span>
                              )}
                            </td>
                            <td style={{ fontWeight: 700, color: 'var(--accent-cool)' }}>{lead.totalPrice}€</td>
                            <td>{getStatusBadge(lead.status)}</td>
                            <td>
                              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                <button 
                                  className="btn-primary" 
                                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', background: '#f59e0b', borderColor: '#f59e0b', color: '#000' }}
                                  onClick={() => {
                                    setWaSelectedLeadId(lead.id);
                                    setAdminTab('whatsapp');
                                  }}
                                >
                                  📱 Recordatorio WhatsApp
                                </button>
                                {lead.status !== 'Aceptado' && (
                                  <button 
                                    className="btn-primary" 
                                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', background: '#10b981', borderColor: '#10b981' }}
                                    onClick={() => handleTransitionStatus(lead.id, 'Aceptado')}
                                  >
                                    <CheckCircle size={13} /> Marcar Aceptado
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CALENDARIO & CITAS */}
            {adminTab === 'calendar' && (
              <div className="leads-container animate-fade-in">
                <div className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={22} className="text-cool" /> Agenda de Citas e Instalaciones
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
                      Programación semanal de servicios en obra y asignación técnica.
                    </p>
                  </div>
                  <button className="btn-primary" onClick={() => setShowShiftModal(true)}>
                    <Plus size={16} /> Programar Nueva Cita
                  </button>
                </div>

                <div className="calendar-wrapper glass-card" style={{ padding: '1.5rem' }}>
                  <div className="calendar-header">
                    <h4>Mayo 2026 - Semana Activa</h4>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                      <span className="d-flex align-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-cool)' }}></span> Instalaciones Programadas</span>
                      <span className="d-flex align-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-warm)' }}></span> Urgencias / Cargas de Gas</span>
                    </div>
                  </div>

                  <div className="calendar-grid">
                    <div className="calendar-day-header">Lunes (24)</div>
                    <div className="calendar-day-header">Martes (25)</div>
                    <div className="calendar-day-header">Miércoles (26)</div>
                    <div className="calendar-day-header">Jueves (27)</div>
                    <div className="calendar-day-header">Viernes (28)</div>
                    <div className="calendar-day-header">Sábado (29)</div>
                    <div className="calendar-day-header">Domingo (30)</div>

                    <div className="calendar-day-cell today">
                      <span className="calendar-day-number">HOY (Lunes 24)</span>
                      {shifts.filter(s => s.date === '2026-05-24').map(s => (
                        <div key={s.id} className="calendar-shift">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Martes 25</span>
                      {shifts.filter(s => s.date === '2026-05-25').map(s => (
                        <div key={s.id} className="calendar-shift">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Miércoles 26</span>
                      {shifts.filter(s => s.date === '2026-05-26').map(s => (
                        <div key={s.id} className="calendar-shift warm">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Jueves 27</span>
                      {shifts.filter(s => s.date === '2026-05-27').map(s => (
                        <div key={s.id} className="calendar-shift">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Viernes 28</span>
                      {shifts.filter(s => s.date === '2026-05-28').map(s => (
                        <div key={s.id} className="calendar-shift">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Sábado 29</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solo Urgencias 24h</span>
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Domingo 30</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRABAJOS */}
            {adminTab === 'jobs' && (
              <div className="leads-container animate-fade-in">
                <div className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Briefcase size={22} className="text-cool" /> Control de Trabajos y Obras
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
                      El nexo entre Oficina ➔ Operario ➔ Administración. Consulta el estado de cada obra y su parte firmado.
                    </p>
                  </div>
                </div>

                <div className="table-responsive glass-card" style={{ padding: '1rem' }}>
                  <table className="klimatik-table">
                    <thead>
                      <tr>
                        <th>Cliente / Obra</th>
                        <th>Tipo Intervención</th>
                        <th>Dirección Obra</th>
                        <th>Técnico Asignado</th>
                        <th>Estado Actual</th>
                        <th>Parte de Trabajo</th>
                        <th>Próxima Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(job => (
                        <tr key={job.id}>
                          <td>
                            <div className="client-cell">
                              <strong className="client-name" style={{ color: '#fff' }}>{job.name}</strong>
                              <span className="client-contact" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{job.phone}</span>
                            </div>
                          </td>
                          <td><span className="badge badge-new">{job.type}</span></td>
                          <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>📍 {job.address}</td>
                          <td>
                            <span style={{ fontSize: '0.82rem', color: 'var(--accent-warm)', fontWeight: 600 }}>
                              👨‍🔧 Carlos Martín
                            </span>
                          </td>
                          <td>{getStatusBadge(job.status)}</td>
                          <td>
                            {job.signedParte ? (
                              <span className="badge badge-completed" title={`Firmado por ${job.signedParte.clientName}`}>
                                ✅ Firmado ({job.signedParte.signedAt})
                              </span>
                            ) : (
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pendiente de Obra</span>
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              {(job.status === 'Terminado' || job.status === 'Pendiente de gestión administrativa') ? (
                                <button 
                                  className="btn-primary" 
                                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', background: '#ef4444', borderColor: '#ef4444' }}
                                  onClick={() => {
                                    setAdminTab('admin');
                                    setAdminSubTab('pending_admin');
                                  }}
                                >
                                  📋 Ir a Administración
                                </button>
                              ) : (
                                <button 
                                  className="btn-secondary" 
                                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                                  onClick={() => {
                                    setWaSelectedLeadId(job.id);
                                    setAdminTab('whatsapp');
                                  }}
                                >
                                  📱 Avisar WhatsApp
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: WHATSAPP & AUTOMATIZACIONES */}
            {(adminTab === 'whatsapp' || adminTab === 'automations') && (
              <div className="leads-container">
                <div className="filter-bar">
                  <div>
                    <h3>Simulador de Comunicaciones de WhatsApp</h3>
                    <p>Simula cómo se envían las automatizaciones y cómo responde el cliente en tiempo real.</p>
                  </div>
                </div>

                <div className="whatsapp-grid">
                  {/* Left Column: Selector & Triggers */}
                  <div className="glass-card text-left" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label htmlFor="waLeadSelect">Seleccionar Cliente / Lead Activo</label>
                      <select 
                        id="waLeadSelect" 
                        className="form-control"
                        value={waSelectedLeadId}
                        onChange={(e) => setWaSelectedLeadId(e.target.value)}
                      >
                        {leads.map(l => (
                          <option key={l.id} value={l.id}>{l.name} ({l.phone})</option>
                        ))}
                      </select>
                    </div>

                    <div className="automation-rules-list">
                      <div className="sidebar-menu-title" style={{ paddingLeft: 0 }}>Automatizaciones de Disparo Rápido</div>
                      
                      <div className="automation-card">
                        <div className="automation-header">
                          <span className="automation-trigger">Trigger: Solicitud Web</span>
                          <span className="badge badge-completed">Activo</span>
                        </div>
                        <h4>Mensaje de Bienvenida Automático</h4>
                        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Se dispara al instante cuando el cliente introduce sus datos en el formulario web.</p>
                        <button 
                          className="btn-secondary w-full" 
                          onClick={() => triggerWhatsAppTemplate('welcome', waSelectedLeadId)}
                          style={{ fontSize: '0.85rem', padding: '0.5rem' }}
                        >
                          Simular Envío de Bienvenida
                        </button>
                      </div>

                      <div className="automation-card">
                        <div className="automation-header">
                          <span className="automation-trigger">Trigger: Cierre Presupuesto</span>
                          <span className="badge badge-completed">Activo</span>
                        </div>
                        <h4>Envío de Presupuesto</h4>
                        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Envía una plantilla con el enlace y valor de la propuesta para confirmación.</p>
                        <button 
                          className="btn-secondary w-full"
                          onClick={() => triggerWhatsAppTemplate('quote_sent', waSelectedLeadId)}
                          style={{ fontSize: '0.85rem', padding: '0.5rem' }}
                        >
                          Simular Envío de Presupuesto
                        </button>
                      </div>

                      <div className="automation-card">
                        <div className="automation-header">
                          <span className="automation-trigger">Trigger: Programación Rota</span>
                          <span className="badge badge-completed">Activo</span>
                        </div>
                        <h4>Confirmación de Cita / Instalación</h4>
                        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Se envía automáticamente cuando Marta asigna al personal de obra.</p>
                        <button 
                          className="btn-secondary w-full"
                          onClick={() => triggerWhatsAppTemplate('scheduled', waSelectedLeadId)}
                          style={{ fontSize: '0.85rem', padding: '0.5rem' }}
                        >
                          Simular Confirmación Cita
                        </button>
                      </div>

                      <div className="automation-card">
                        <div className="automation-header">
                          <span className="automation-trigger">Trigger: GPS Operario en Obra</span>
                          <span className="badge badge-completed">Activo</span>
                        </div>
                        <h4>"Instalador en camino"</h4>
                        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Se dispara cuando el técnico (Carlos) inicia trayecto en su app móvil.</p>
                        <button 
                          className="btn-secondary w-full"
                          onClick={() => triggerWhatsAppTemplate('en_camino', waSelectedLeadId)}
                          style={{ fontSize: '0.85rem', padding: '0.5rem' }}
                        >
                          Simular "Operario en camino"
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual Mobile Frame */}
                  <div className="phone-container">
                    <div className="whatsapp-mock-phone">
                      {/* Top status bar */}
                      <div style={{ background: '#075e54', height: '14px', width: '100%' }}></div>
                      
                      <div className="phone-header">
                        <div className="phone-avatar">
                          {leads.find(l => l.id === waSelectedLeadId)?.name.charAt(0) || '👤'}
                        </div>
                        <div className="phone-contact-info">
                          <span className="phone-contact-name">
                            {leads.find(l => l.id === waSelectedLeadId)?.name.split(' (')[0] || 'Selecciona Lead'}
                          </span>
                          <span className="phone-contact-status">
                            {isTypingSim ? 'escribiendo...' : 'en línea'}
                          </span>
                        </div>
                        <Phone size={16} />
                      </div>

                      {/* Chat Messages flow */}
                      <div className="phone-chat-bg">
                        {waSelectedLeadId && chatLogs[waSelectedLeadId] ? (
                          chatLogs[waSelectedLeadId].map((msg, i) => (
                            <div key={i} className={`chat-message ${msg.sender === 'client' ? 'incoming' : 'outgoing'}`}>
                              <div>{msg.text}</div>
                              <div className="message-time">{msg.time}</div>
                            </div>
                          ))
                        ) : (
                          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '50%' }}>
                            No hay mensajes con este cliente.
                          </div>
                        )}

                        {isTypingSim && (
                          <div className="chat-message incoming" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                            Escribiendo respuesta...
                          </div>
                        )}
                      </div>

                      {/* Bottom Input Area */}
                      <form onSubmit={handleSendManualWAMessage} className="chat-input-bar">
                        <input 
                          type="text" 
                          placeholder="Escribe un mensaje de respuesta..." 
                          className="chat-input"
                          value={waTypedMessage}
                          onChange={(e) => setWaTypedMessage(e.target.value)}
                        />
                        <button type="submit" className="btn-icon-only" style={{ background: 'var(--accent-cool)', color: '#fff', border: 'none', borderRadius: '50%' }}>
                          <Send size={14} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: GESTIÓN ADMINISTRATIVA (PUENTE EXTERNALIZADO) */}
            {(adminTab === 'admin' || adminTab === 'documents') && (
              <div className="leads-container animate-fade-in">
                
                {/* Header Banner */}
                <div className="filter-bar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Briefcase size={22} className="text-cool" /> Centro de Gestión Administrativa
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
                        Organiza el trabajo previo y posterior. Enlaza el parte de obra con tu programa externo de facturación (Contasimple, Holded, Factusol, etc.).
                      </p>
                    </div>
                    <div className="badge badge-completed" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                      <span>Puente Administrativo Externe</span>
                    </div>
                  </div>
                </div>

                {/* Subnav Pills */}
                <div className="admin-subnav">
                  <div 
                    className={`admin-subnav-item ${adminSubTab === 'pending_admin' ? 'active' : ''}`}
                    onClick={() => setAdminSubTab('pending_admin')}
                  >
                    <AlertTriangle size={16} /> Pendientes de Procesar ({leads.filter(l => l.status === 'Terminado' || l.status === 'Pendiente de gestión administrativa').length})
                  </div>
                  <div 
                    className={`admin-subnav-item ${adminSubTab === 'quotes_followup' ? 'active' : ''}`}
                    onClick={() => setAdminSubTab('quotes_followup')}
                  >
                    <Clock size={16} /> Seguimiento Presupuestos ({leads.filter(l => l.status === 'Presupuesto enviado' || l.status === 'Presupuesto preparado').length})
                  </div>
                  <div 
                    className={`admin-subnav-item ${adminSubTab === 'external_history' ? 'active' : ''}`}
                    onClick={() => setAdminSubTab('external_history')}
                  >
                    <ExternalLink size={16} /> Histórico Volcado Externe ({leads.filter(l => l.status === 'Pasado a facturación externa' || l.status === 'Finalizado').length})
                  </div>
                  <div 
                    className={`admin-subnav-item ${adminSubTab === 'doc_builder' ? 'active' : ''}`}
                    onClick={() => setAdminSubTab('doc_builder')}
                  >
                    <FileText size={16} /> Creador Técnico Fichas/Presupuestos
                  </div>
                </div>

                {/* SUBTAB 1: PENDIENTES DE PROCESAR */}
                {adminSubTab === 'pending_admin' && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Trabajos Finalizados en Obra Pendientes de Facturación</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        Revisa la información técnica registrada por los instaladores y marca la información cuando la hayas volcado a tu programa externo de facturación.
                      </p>
                    </div>

                    {leads.filter(l => l.status === 'Terminado' || l.status === 'Pendiente de gestión administrativa').length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        <CheckCircle size={40} style={{ color: '#10b981', marginBottom: '0.5rem' }} />
                        <p>¡No hay trabajos pendientes de gestión administrativa en este momento!</p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="klimatik-table">
                          <thead>
                            <tr>
                              <th>Cliente / Contacto</th>
                              <th>Tipo Servicio</th>
                              <th>Descripción Técnica Obra</th>
                              <th>Importe (€)</th>
                              <th>Estado Actual</th>
                              <th>Acción de Gestión</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leads.filter(l => l.status === 'Terminado' || l.status === 'Pendiente de gestión administrativa').map(lead => (
                              <tr key={lead.id}>
                                <td>
                                  <div className="client-cell">
                                    <span className="client-name">{lead.name}</span>
                                    <span className="client-contact">{lead.phone} | {lead.address}</span>
                                  </div>
                                </td>
                                <td><span className="badge badge-new">{lead.type}</span></td>
                                <td style={{ maxWidth: '280px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                  {lead.description}
                                </td>
                                <td style={{ fontWeight: 700, color: 'var(--accent-cool)' }}>{lead.totalPrice}€</td>
                                <td>{getStatusBadge(lead.status)}</td>
                                <td>
                                  <button 
                                    className="btn-primary"
                                    onClick={() => handleTransitionStatus(lead.id, 'Pasado a facturación externa')}
                                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem' }}
                                  >
                                    <ExternalLink size={14} /> Pasar a Facturación Externa
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 2: SEGUIMIENTO PRESUPUESTOS */}
                {adminSubTab === 'quotes_followup' && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Seguimiento Activo de Presupuestos Enviados</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        Localiza presupuestos abiertos sin respuesta del cliente e inicia recordatorios de cierre por WhatsApp.
                      </p>
                    </div>

                    <div className="table-responsive">
                      <table className="klimatik-table">
                        <thead>
                          <tr>
                            <th>Cliente</th>
                            <th>Presupuesto</th>
                            <th>Fecha Envío</th>
                            <th>Días sin Respuesta</th>
                            <th>Importe (€)</th>
                            <th>Acción de Seguimiento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.filter(l => l.status === 'Presupuesto enviado' || l.status === 'Presupuesto preparado').map(lead => (
                            <tr key={lead.id}>
                              <td>
                                <div className="client-cell">
                                  <span className="client-name">{lead.name}</span>
                                  <span className="client-contact">{lead.phone}</span>
                                </div>
                              </td>
                              <td style={{ maxWidth: '240px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.description}</td>
                              <td style={{ fontSize: '0.85rem' }}>{lead.date}</td>
                              <td>
                                {lead.daysWithoutResponse >= 5 ? (
                                  <span className="badge badge-quote" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', fontWeight: 700 }}>
                                    ⚠️ {lead.daysWithoutResponse} días
                                  </span>
                                ) : (
                                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lead.daysWithoutResponse || 0} días</span>
                                )}
                              </td>
                              <td style={{ fontWeight: 700, color: 'var(--warning)' }}>{lead.totalPrice}€</td>
                              <td>
                                <div className="action-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button 
                                    className="btn-icon-only whatsapp"
                                    title="Enviar Recordatorio por WhatsApp"
                                    onClick={() => {
                                      setWaSelectedLeadId(lead.id);
                                      setAdminTab('whatsapp');
                                    }}
                                  >
                                    <MessageSquare size={16} />
                                  </button>
                                  <button 
                                    className="btn-primary"
                                    style={{ fontSize: '0.78rem', padding: '0.4rem 0.65rem', background: '#10b981', borderColor: '#10b981' }}
                                    onClick={() => handleTransitionStatus(lead.id, 'Aceptado')}
                                  >
                                    <CheckCircle size={14} /> Marcar Aceptado
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUBTAB 3: HISTÓRICO Y REGISTRO EXTERNO */}
                {adminSubTab === 'external_history' && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Registro de Trabajos Volcados a Facturación Externa</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        Consulta la trazabilidad de los trabajos trasladados a tu software contable/facturación y el estado del seguimiento.
                      </p>
                    </div>

                    <div className="table-responsive">
                      <table className="klimatik-table">
                        <thead>
                          <tr>
                            <th>Cliente / Empresa</th>
                            <th>Referencia Software Externo</th>
                            <th>Importe Obra</th>
                            <th>Estado Klimatik</th>
                            <th>Comprobación de Cobro (Seguimiento)</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.filter(l => l.status === 'Pasado a facturación externa' || l.status === 'Finalizado').map(lead => (
                            <tr key={lead.id}>
                              <td>
                                <div className="client-cell">
                                  <span className="client-name">{lead.name}</span>
                                  <span className="client-contact">{lead.address}</span>
                                </div>
                              </td>
                              <td>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cool)', background: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                                  {lead.externalInvoiceRef || 'FACT-2026-REG'}
                                </span>
                              </td>
                              <td style={{ fontWeight: 700, color: '#fff' }}>{lead.totalPrice}€</td>
                              <td>{getStatusBadge(lead.status)}</td>
                              <td>
                                <span className={`badge ${lead.paymentStatus === 'Cobrado' || lead.paymentStatus === 'Cobro verificado' ? 'badge-completed' : 'badge-quote'}`}>
                                  {lead.paymentStatus || 'Pendiente de comprobar'}
                                </span>
                              </td>
                              <td>
                                {lead.paymentStatus !== 'Cobro verificado' && lead.paymentStatus !== 'Cobrado' ? (
                                  <button 
                                    className="btn-secondary"
                                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                                    onClick={() => {
                                      setLeads(leads.map(l => l.id === lead.id ? { ...l, paymentStatus: 'Cobro verificado', status: 'Finalizado' } : l));
                                      showToast(`Cobro verificado para ${lead.name.split(' (')[0]}. Trabajo marcado como Finalizado.`, 'success');
                                    }}
                                  >
                                    <CheckCircle size={13} /> Confirmar Cobro Banco
                                  </button>
                                ) : (
                                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✅ Finalizado</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUBTAB 4: CREADOR TÉCNICO DE DOCUMENTOS */}
                {adminSubTab === 'doc_builder' && (
                  <div>
                    <div className="filter-bar" style={{ marginBottom: '1rem' }}>
                      <div>
                        <h3>Creador Técnico de Presupuestos y Fichas</h3>
                        <p>Estructura los costes de climatizadores, recargas e instalaciones fácilmente.</p>
                      </div>
                    </div>

                <div className="doc-builder-grid">
                  {/* Left Column: Configuration form */}
                  <div className="glass-card text-left" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    <div className="grid-2">
                      <div className="form-group">
                        <label htmlFor="docLeadSel">Asociar a Cliente</label>
                        <select 
                          id="docLeadSel" 
                          className="form-control"
                          value={selectedDocLeadId}
                          onChange={(e) => {
                            setSelectedDocLeadId(e.target.value);
                            const lead = leads.find(l => l.id === e.target.value);
                            if (lead) setInvoiceItemsList(lead.items || []);
                          }}
                        >
                          {leads.map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="docType">Tipo de Documento</label>
                        <select 
                          id="docType" 
                          className="form-control"
                          value={invoiceType}
                          onChange={(e) => setInvoiceType(e.target.value)}
                        >
                          <option value="Presupuesto">Presupuesto Comercial</option>
                          <option value="Factura">Factura Oficial (21% IVA)</option>
                        </select>
                      </div>
                    </div>

                    {/* Add new Item to list */}
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                        Añadir Concepto / Equipo Técnico
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <input 
                          type="text" 
                          placeholder="Descripción (Ej. Daikin Cassette Clima)" 
                          className="form-control"
                          value={newDocItemDesc}
                          onChange={(e) => setNewDocItemDesc(e.target.value)}
                        />
                        <div className="grid-2">
                          <input 
                            type="number" 
                            placeholder="Cant." 
                            className="form-control"
                            min="1"
                            value={newDocItemQty}
                            onChange={(e) => setNewDocItemQty(parseInt(e.target.value))}
                          />
                          <input 
                            type="number" 
                            placeholder="Precio Unit. (€)" 
                            className="form-control"
                            min="0"
                            value={newDocItemPrice}
                            onChange={(e) => setNewDocItemPrice(e.target.value)}
                          />
                        </div>
                        <button 
                          type="button" 
                          className="btn-secondary w-full"
                          onClick={handleAddInvoiceItem}
                          style={{ padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                        >
                          <Plus size={14} /> Añadir a Detalle de Costes
                        </button>
                      </div>
                    </div>

                    {/* Active items lists */}
                    <div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Detalle Actual del Documento</span>
                      <div className="doc-items-list">
                        {invoiceItemsList.length === 0 ? (
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>No hay conceptos agregados.</div>
                        ) : (
                          invoiceItemsList.map((item, idx) => (
                            <div key={idx} className="doc-item-row" style={{ fontSize: '0.85rem' }}>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>{item.description}</span>
                              <span className="text-center">{item.quantity}x</span>
                              <span className="text-center">{item.price}€</span>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveInvoiceItem(idx)}
                                style={{ border: 'none', background: 'transparent', color: 'var(--danger)', cursor: 'pointer' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="btn-primary w-full"
                      onClick={handleGenerateDocument}
                      style={{ justifyContent: 'center', marginTop: '1rem' }}
                    >
                      <FileCheck size={16} /> Generar y Guardar Documento
                    </button>
                  </div>

                  {/* Right Column: Visual Invoice Preview (WOW A4 effect) */}
                  <div>
                    {previewDoc ? (
                      <div className="invoice-preview-container">
                        <div className="invoice-header">
                          <div className="invoice-company-info">
                            <h3>KLIMATIK S.L.</h3>
                            <p>Instalaciones Térmicas y Confort</p>
                            <p>C.I.F. B-88776655</p>
                            <p>Tel: +34 91 600 00 00 | admin@klimatik.com</p>
                          </div>
                          <div className="invoice-meta">
                            <span className="invoice-title">{previewDoc.type}</span>
                            <p style={{ fontWeight: 700, marginTop: '0.5rem' }}>Nº: {previewDoc.number}</p>
                            <p>Fecha: {previewDoc.date}</p>
                          </div>
                        </div>

                        <div className="invoice-bill-to">
                          <div>
                            <h4>DIRECCIÓN DE CLIENTE</h4>
                            <p style={{ fontWeight: 700 }}>{previewDoc.leadName}</p>
                            {previewDoc.leadCompany !== 'Particular' && <p>{previewDoc.leadCompany}</p>}
                            <p>{previewDoc.leadAddress}</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <h4>DETALLES DE CONTACTO</h4>
                            <p>{previewDoc.leadPhone}</p>
                            <p>{previewDoc.leadEmail}</p>
                          </div>
                        </div>

                        <table className="invoice-table" style={{ width: '100%' }}>
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'left' }}>Descripción / Concepto</th>
                              <th style={{ width: '80px', textAlign: 'center' }}>Cant.</th>
                              <th style={{ width: '120px', textAlign: 'right' }}>Precio U.</th>
                              <th style={{ width: '120px', textAlign: 'right' }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {previewDoc.items.map((item, index) => (
                              <tr key={index}>
                                <td style={{ textAlign: 'left' }}>{item.description}</td>
                                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'right' }}>{item.price.toFixed(2)}€</td>
                                <td style={{ textAlign: 'right', fontWeight: 600 }}>{(item.quantity * item.price).toFixed(2)}€</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="invoice-totals">
                          <div className="invoice-total-row">
                            <span>Base Imponible:</span>
                            <span>{previewDoc.subtotal.toFixed(2)}€</span>
                          </div>
                          <div className="invoice-total-row">
                            <span>I.V.A (21%):</span>
                            <span>{previewDoc.tax.toFixed(2)}€</span>
                          </div>
                          <div className="invoice-total-row grand">
                            <span>Total {previewDoc.type === 'Presupuesto' ? 'Presupuestado' : 'Facturado'}:</span>
                            <span>{previewDoc.total.toFixed(2)}€</span>
                          </div>
                        </div>

                        <div style={{ borderTop: '1px solid #cbd5e1', marginTop: '3rem', paddingTop: '1rem', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                          Normativa RITE. Garantía de instalación de 2 años en todos los equipos especificados. El presente presupuesto es válido durante 30 días.
                        </div>
                      </div>
                    ) : (
                      <div className="glass-card" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                        <div className="text-center">
                          <FileText size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
                          <p>Configura las partidas y haz clic en "Generar" para previsualizar el documento corporativo.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

            {/* TAB CONTENT: ROTA & SHIFT SCHEDULER */}
            {adminTab === 'rota' && (
              <div className="leads-container">
                <div className="filter-bar">
                  <div>
                    <h3>Planificador de Turnos de Instalación (Rota)</h3>
                    <p>Asigna qué técnicos se desplazan a cada instalación y controla sus horarios de trabajo.</p>
                  </div>
                  <button className="btn-primary" onClick={() => setShowShiftModal(true)}>
                    <Plus size={16} /> Crear Nuevo Turno / Cita
                  </button>
                </div>

                {/* VISUAL SHIFT CALENDAR GRID */}
                <div className="calendar-wrapper">
                  <div className="calendar-header">
                    <h4>Mayo 2026</h4>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                      <span className="d-flex align-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-cool)' }}></span> Carlos / Laura (Instalaciones)</span>
                      <span className="d-flex align-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-warm)' }}></span> Turnos Especiales</span>
                    </div>
                  </div>

                  <div className="calendar-grid">
                    {/* Day Headers */}
                    <div className="calendar-day-header">Lunes (24)</div>
                    <div className="calendar-day-header">Martes (25)</div>
                    <div className="calendar-day-header">Miércoles (26)</div>
                    <div className="calendar-day-header">Jueves (27)</div>
                    <div className="calendar-day-header">Viernes (28)</div>
                    <div className="calendar-day-header">Sábado (29)</div>
                    <div className="calendar-day-header">Domingo (30)</div>

                    {/* Simulated Week representation */}
                    <div className="calendar-day-cell today">
                      <span className="calendar-day-number">HOY (Lunes)</span>
                      {shifts.filter(s => s.date === '2026-05-24').map(s => (
                        <div key={s.id} className="calendar-shift">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{EMPLOYEES.find(e => e.id === s.employeeId)?.name.split(' ')[0]}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Martes 25</span>
                      {shifts.filter(s => s.date === '2026-05-25').map(s => (
                        <div key={s.id} className="calendar-shift">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{EMPLOYEES.find(e => e.id === s.employeeId)?.name.split(' ')[0]}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Miércoles 26</span>
                      {shifts.filter(s => s.date === '2026-05-26').map(s => (
                        <div key={s.id} className="calendar-shift warm">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{EMPLOYEES.find(e => e.id === s.employeeId)?.name.split(' ')[0]}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Jueves 27</span>
                      {shifts.filter(s => s.date === '2026-05-27').map(s => (
                        <div key={s.id} className="calendar-shift">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{EMPLOYEES.find(e => e.id === s.employeeId)?.name.split(' ')[0]}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Viernes 28</span>
                      {shifts.filter(s => s.date === '2026-05-28').map(s => (
                        <div key={s.id} className="calendar-shift">
                          <span className="shift-time">{s.time}</span>
                          <span className="shift-assignee"><strong>{EMPLOYEES.find(e => e.id === s.employeeId)?.name.split(' ')[0]}</strong></span>
                          <span className="shift-client">{s.client}</span>
                        </div>
                      ))}
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Sábado 29</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solo Urgencias 24h</span>
                    </div>

                    <div className="calendar-day-cell">
                      <span className="calendar-day-number">Domingo 30</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cerrado</span>
                    </div>
                  </div>
                </div>

                {/* VACATION MANAGEMENT PANEL */}
                <div style={{ marginTop: '3rem' }}>
                  <h3>Gestión de Solicitudes de Vacaciones</h3>
                  <p style={{ marginBottom: '1.5rem' }}>Aprueba o deniega los días solicitados por los operarios desde su portal móvil.</p>

                  <div className="vacation-requests-list">
                    {vacations.map(req => (
                      <div key={req.id} className="glass-card vacation-request-card">
                        <div className="vacation-info">
                          <span className="vacation-dates">{req.startDate} al {req.endDate}</span>
                          <span className="vacation-employee">Solicitado por: <strong>{req.employeeName}</strong></span>
                          <span className="vacation-reason">Motivo: {req.reason}</span>
                        </div>
                        <div className="d-flex align-center gap-3">
                          <span className={`badge ${req.status === 'Pendiente' ? 'badge-quote' : req.status === 'Aprobado' ? 'badge-completed' : 'badge-new'}`} style={{ marginRight: '1rem' }}>
                            {req.status}
                          </span>
                          {req.status === 'Pendiente' && (
                            <>
                              <button 
                                className="btn-primary" 
                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                onClick={() => handleApproveVacation(req.id, 'Aprobado')}
                              >
                                Aprobar
                              </button>
                              <button 
                                className="btn-secondary text-danger" 
                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                onClick={() => handleApproveVacation(req.id, 'Rechazado')}
                              >
                                Rechazar
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CLOCKINS & GPS LOGS */}
            {adminTab === 'clockins' && (
              <div className="leads-container">
                <div className="filter-bar">
                  <div>
                    <h3>Fichaje Diario y Auditoría de Ubicación GPS</h3>
                    <p>Registro legal de jornada horaria obligatoria. Captura la ubicación en tiempo real mediante satélite al fichar.</p>
                  </div>
                </div>

                <div className="whatsapp-grid">
                  {/* Left: Clock-In Logs list */}
                  <div className="table-responsive">
                    <table className="klimatik-table">
                      <thead>
                        <tr>
                          <th>Empleado</th>
                          <th>Fecha</th>
                          <th>Entrada</th>
                          <th>Salida</th>
                          <th>Estado Jornada</th>
                          <th>Coordenadas GPS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clockIns.map(log => (
                          <tr key={log.id}>
                            <td>
                              <span style={{ fontWeight: 700, color: '#fff' }}>{log.employeeName}</span>
                            </td>
                            <td>{log.date}</td>
                            <td>
                              <span className="text-cool" style={{ fontWeight: 600 }}>{log.timeIn}</span>
                            </td>
                            <td>
                              <span className="text-warm" style={{ fontWeight: 600 }}>{log.timeOut || '--:--'}</span>
                            </td>
                            <td>
                              {log.active ? (
                                <span className="badge badge-completed"><span className="pulse-indicator" style={{ marginRight: '4px' }}></span> Activo en Obra</span>
                              ) : (
                                <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>Finalizado</span>
                              )}
                            </td>
                            <td>
                              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cool)', display: 'flex', flexDirection: 'column' }}>
                                <span>Lat: {log.latitude.toFixed(5)}</span>
                                <span>Lng: {log.longitude.toFixed(5)}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Right: GPS Active Tracking visual map (WOW effect) */}
                  <div className="glass-card text-left" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4>Visualización en Mapa Satélite</h4>
                    <p style={{ fontSize: '0.85rem' }}>Mapeo en vivo de fichajes del personal con coordenadas validadas por navegador móvil.</p>

                    <div className="map-visual-container">
                      <div className="mock-map">
                        {/* Street layout vectors */}
                        <div className="map-street street-h1"></div>
                        <div className="map-street street-h2"></div>
                        <div className="map-street street-v1"></div>
                        <div className="map-street street-v2"></div>

                        {/* Employee Markers mapped */}
                        {clockIns.map((log, index) => {
                          // Simple mock positioning within AABB
                          const xOffsets = [35, 65, 50];
                          const yOffsets = [40, 75, 55];
                          return (
                            <div 
                              key={log.id} 
                              className="map-marker" 
                              style={{ left: `${xOffsets[index % 3]}%`, top: `${yOffsets[index % 3]}%` }}
                            >
                              <div className="marker-pulse"></div>
                              <MapPin className="marker-icon" size={24} style={{ color: log.active ? 'var(--success)' : 'var(--accent-cool)' }} />
                              <div className="marker-label">
                                {log.employeeName.split(' ')[0]} ({log.timeIn})
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="map-controls-panel">
                        <span>Precisión GPS: <strong>±6 metros</strong></span>
                        <span className="d-flex align-center gap-2"><span className="pulse-indicator"></span> Servidor Conectado</span>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <p><strong>Nota legal:</strong> Las coordenadas GPS solo se registran al hacer clic en "Iniciar" y "Finalizar" jornada, cumpliendo la Ley de Protección de Datos de los trabajadores.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: EQUIPO / USUARIOS INTERNOS */}
            {adminTab === 'team' && (
              <div className="leads-container animate-fade-in">
                
                {/* Header Banner */}
                <div className="filter-bar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={22} className="text-cool" /> Gestión de Equipo y Usuarios Internos
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
                        Administra los perfiles de tu empresa (Oficina, Administración, Responsables e Instaladores técnicos) y sus turnos de trabajo.
                      </p>
                    </div>
                    <button 
                      className="btn-primary"
                      onClick={() => {
                        setSelectedUserForEdit(null);
                        setShowUserModal(true);
                      }}
                    >
                      <Plus size={16} /> Crear Nuevo Usuario Interno
                    </button>
                  </div>
                </div>

                {/* Subnav Pills for Team */}
                <div className="admin-subnav">
                  <div 
                    className={`admin-subnav-item ${teamSubTab === 'team_members' ? 'active' : ''}`}
                    onClick={() => setTeamSubTab('team_members')}
                  >
                    <Users size={16} /> Usuarios Internos ({employeesList.filter(e => e.status === 'activo').length} activos)
                  </div>
                  <div 
                    className={`admin-subnav-item ${teamSubTab === 'rota' ? 'active' : ''}`}
                    onClick={() => setTeamSubTab('rota')}
                  >
                    <Calendar size={16} /> Planificador de Turnos (Rota)
                  </div>
                  <div 
                    className={`admin-subnav-item ${teamSubTab === 'clockins' ? 'active' : ''}`}
                    onClick={() => setTeamSubTab('clockins')}
                  >
                    <Clock size={16} /> Fichajes y GPS Satélite
                  </div>
                  <div 
                    className={`admin-subnav-item ${teamSubTab === 'vacations' ? 'active' : ''}`}
                    onClick={() => setTeamSubTab('vacations')}
                  >
                    <CalendarDays size={16} /> Solicitudes de Vacaciones ({vacations.filter(v => v.status === 'Pendiente').length})
                  </div>
                </div>

                {/* SUBTAB 1: USUARIOS INTERNOS */}
                {teamSubTab === 'team_members' && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Plantilla y Roles de la Empresa</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                          Personal interno con acceso al sistema o asignación de partes de trabajo.
                        </p>
                      </div>
                      <div className="badge badge-intro" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                        Total: {employeesList.length} registros | {employeesList.filter(e => e.status === 'activo').length} Activos
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="klimatik-table">
                        <thead>
                          <tr>
                            <th>Usuario / Empleado</th>
                            <th>Rol en Empresa</th>
                            <th>Especialidad Técnica</th>
                            <th>Teléfono / Email</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employeesList.map(emp => (
                            <tr key={emp.id} style={{ opacity: emp.status === 'inactivo' ? 0.6 : 1 }}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <span style={{ fontSize: '1.5rem' }}>{emp.avatar}</span>
                                  <div>
                                    <div style={{ fontWeight: 700, color: '#fff' }}>{emp.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: #{emp.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className={`badge ${emp.role.includes('Administrador') || emp.role.includes('Administración') ? 'badge-completed' : 'badge-new'}`}>
                                  {emp.role}
                                </span>
                              </td>
                              <td>
                                <span style={{ fontSize: '0.85rem', color: 'var(--accent-cool)', fontWeight: 600 }}>
                                  {emp.specialty || 'General'}
                                </span>
                              </td>
                              <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <div>📞 {emp.phone || '+34 600 000 000'}</div>
                                <div>✉️ {emp.email || 'usuario@klimatik.es'}</div>
                              </td>
                              <td>
                                <span className={`badge ${emp.status === 'activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                                  {emp.status === 'activo' ? '🟢 Activo' : '🔴 Inactivo'}
                                </span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button 
                                    className="btn-secondary" 
                                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                                    onClick={() => {
                                      setSelectedUserForEdit(emp);
                                      setShowUserModal(true);
                                    }}
                                  >
                                    <Edit size={13} /> Editar
                                  </button>
                                  <button 
                                    className={emp.status === 'activo' ? 'btn-secondary text-danger' : 'btn-primary'}
                                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                                    onClick={() => handleToggleUserStatus(emp.id)}
                                  >
                                    {emp.status === 'activo' ? 'Desactivar' : 'Activar'}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.5rem', paddingTop: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      💡 <strong>Trazabilidad Histórica:</strong> Los usuarios desactivados se mantienen en los registros antiguos de fichajes y obras terminadas, pero quedan excluidos automáticamente de las listas de asignación para nuevas intervenciones.
                    </div>
                  </div>
                )}

                {/* SUBTAB 2: ROTA */}
                {teamSubTab === 'rota' && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div className="filter-bar" style={{ marginBottom: '1.5rem', border: 'none', padding: 0 }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Planificador de Turnos (Rota)</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                          Asigna instaladores a obras y coordina las franjas horarias de servicio.
                        </p>
                      </div>
                      <button className="btn-primary" onClick={() => setShowShiftModal(true)}>
                        <Plus size={16} /> Crear Nuevo Turno / Cita
                      </button>
                    </div>

                    <div className="calendar-wrapper">
                      <div className="calendar-header">
                        <h4>Mayo 2026</h4>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                          <span className="d-flex align-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-cool)' }}></span> Instaladores Activos</span>
                          <span className="d-flex align-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-warm)' }}></span> Urgencias / Especiales</span>
                        </div>
                      </div>

                      <div className="calendar-grid">
                        <div className="calendar-day-header">Lunes (24)</div>
                        <div className="calendar-day-header">Martes (25)</div>
                        <div className="calendar-day-header">Miércoles (26)</div>
                        <div className="calendar-day-header">Jueves (27)</div>
                        <div className="calendar-day-header">Viernes (28)</div>
                        <div className="calendar-day-header">Sábado (29)</div>
                        <div className="calendar-day-header">Domingo (30)</div>

                        <div className="calendar-day-cell today">
                          <span className="calendar-day-number">HOY (Lunes 24)</span>
                          {shifts.filter(s => s.date === '2026-05-24').map(s => (
                            <div key={s.id} className="calendar-shift">
                              <span className="shift-time">{s.time}</span>
                              <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                              <span className="shift-client">{s.client}</span>
                            </div>
                          ))}
                        </div>

                        <div className="calendar-day-cell">
                          <span className="calendar-day-number">Martes 25</span>
                          {shifts.filter(s => s.date === '2026-05-25').map(s => (
                            <div key={s.id} className="calendar-shift">
                              <span className="shift-time">{s.time}</span>
                              <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                              <span className="shift-client">{s.client}</span>
                            </div>
                          ))}
                        </div>

                        <div className="calendar-day-cell">
                          <span className="calendar-day-number">Miércoles 26</span>
                          {shifts.filter(s => s.date === '2026-05-26').map(s => (
                            <div key={s.id} className="calendar-shift warm">
                              <span className="shift-time">{s.time}</span>
                              <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                              <span className="shift-client">{s.client}</span>
                            </div>
                          ))}
                        </div>

                        <div className="calendar-day-cell">
                          <span className="calendar-day-number">Jueves 27</span>
                          {shifts.filter(s => s.date === '2026-05-27').map(s => (
                            <div key={s.id} className="calendar-shift">
                              <span className="shift-time">{s.time}</span>
                              <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                              <span className="shift-client">{s.client}</span>
                            </div>
                          ))}
                        </div>

                        <div className="calendar-day-cell">
                          <span className="calendar-day-number">Viernes 28</span>
                          {shifts.filter(s => s.date === '2026-05-28').map(s => (
                            <div key={s.id} className="calendar-shift">
                              <span className="shift-time">{s.time}</span>
                              <span className="shift-assignee"><strong>{employeesList.find(e => e.id === s.employeeId)?.name.split(' ')[0] || 'Técnico'}</strong></span>
                              <span className="shift-client">{s.client}</span>
                            </div>
                          ))}
                        </div>

                        <div className="calendar-day-cell">
                          <span className="calendar-day-number">Sábado 29</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solo Urgencias 24h</span>
                        </div>

                        <div className="calendar-day-cell">
                          <span className="calendar-day-number">Domingo 30</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cerrado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB 3: CLOCKINS */}
                {teamSubTab === 'clockins' && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Fichaje Diario y Geolocalización GPS</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        Control horario legal con verificación de coordenadas GPS en tiempo real.
                      </p>
                    </div>

                    <div className="whatsapp-grid">
                      <div className="table-responsive">
                        <table className="klimatik-table">
                          <thead>
                            <tr>
                              <th>Empleado</th>
                              <th>Fecha</th>
                              <th>Entrada</th>
                              <th>Salida</th>
                              <th>Estado Jornada</th>
                              <th>Coordenadas GPS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clockIns.map(log => (
                              <tr key={log.id}>
                                <td><span style={{ fontWeight: 700, color: '#fff' }}>{log.employeeName}</span></td>
                                <td>{log.date}</td>
                                <td><span className="text-cool" style={{ fontWeight: 600 }}>{log.timeIn}</span></td>
                                <td><span className="text-warm" style={{ fontWeight: 600 }}>{log.timeOut || '--:--'}</span></td>
                                <td>
                                  {log.active ? (
                                    <span className="badge badge-completed"><span className="pulse-indicator" style={{ marginRight: '4px' }}></span> Activo en Obra</span>
                                  ) : (
                                    <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>Finalizado</span>
                                  )}
                                </td>
                                <td>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-cool)', display: 'flex', flexDirection: 'column' }}>
                                    <span>Lat: {log.latitude.toFixed(5)}</span>
                                    <span>Lng: {log.longitude.toFixed(5)}</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="glass-card text-left" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4>Visualización en Mapa Satélite</h4>
                        <p style={{ fontSize: '0.85rem' }}>Mapeo en vivo de fichajes con validación satelital en el smartphone.</p>
                        <div className="map-visual-container">
                          <div className="mock-map">
                            <div className="map-street street-h1"></div>
                            <div className="map-street street-h2"></div>
                            <div className="map-street street-v1"></div>
                            <div className="map-street street-v2"></div>
                            {clockIns.map((log, index) => {
                              const xOffsets = [35, 65, 50];
                              const yOffsets = [40, 75, 55];
                              return (
                                <div key={log.id} className="map-marker" style={{ left: `${xOffsets[index % 3]}%`, top: `${yOffsets[index % 3]}%` }}>
                                  <div className="marker-pulse"></div>
                                  <MapPin className="marker-icon" size={24} style={{ color: log.active ? 'var(--success)' : 'var(--accent-cool)' }} />
                                  <div className="marker-label">{log.employeeName.split(' ')[0]} ({log.timeIn})</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB 4: VACATIONS */}
                {teamSubTab === 'vacations' && (
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Gestión de Solicitudes de Vacaciones</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        Aprueba o deniega los días solicitados por los empleados.
                      </p>
                    </div>

                    <div className="vacation-requests-list">
                      {vacations.map(req => (
                        <div key={req.id} className="glass-card vacation-request-card">
                          <div className="vacation-info">
                            <span className="vacation-dates">{req.startDate} al {req.endDate}</span>
                            <span className="vacation-employee">Solicitado por: <strong>{req.employeeName}</strong></span>
                            <span className="vacation-reason">Motivo: {req.reason}</span>
                          </div>
                          <div className="d-flex align-center gap-3">
                            <span className={`badge ${req.status === 'Pendiente' ? 'badge-quote' : req.status === 'Aprobado' ? 'badge-completed' : 'badge-new'}`} style={{ marginRight: '1rem' }}>
                              {req.status}
                            </span>
                            {req.status === 'Pendiente' && (
                              <>
                                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => handleApproveVacation(req.id, 'Aprobado')}>Aprobar</button>
                                <button className="btn-secondary text-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => handleApproveVacation(req.id, 'Rechazado')}>Rechazar</button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}


      {/* =========================================================================
          VIEW 3: EMPLOYEE PORTAL (CARLOS & TECHNICIANS PANEL)
          ========================================================================= */}
      {currentView === 'employee' && (
        <div className="dashboard-wrapper employee">
          {/* Sidebar */}
          <aside className="sidebar" style={{ background: 'rgba(15, 12, 8, 0.95)' }}>
            
            {/* Quick Employee Toggle to demonstrate multiple users */}
            <div className="form-group text-left" style={{ marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Operario Activo (Demo)</label>
              <select 
                className="form-control"
                value={selectedEmployee.id}
                onChange={(e) => {
                  const emp = EMPLOYEES.find(emp => emp.id === parseInt(e.target.value));
                  setSelectedEmployee(emp);
                  setIsClockedIn(false);
                }}
                style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', padding: '0.5rem' }}
              >
                {EMPLOYEES.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.avatar} {emp.name}</option>
                ))}
              </select>
            </div>

            <div className="sidebar-profile employee">
              <div className="sidebar-avatar">{selectedEmployee.avatar}</div>
              <div className="sidebar-profile-info">
                <h4>{selectedEmployee.name}</h4>
                <p>{selectedEmployee.role}</p>
              </div>
            </div>

            <div className="sidebar-menu">
              <div className="sidebar-menu-title">Mi Jornada</div>
              
              <div 
                className={`sidebar-item ${employeeTab === 'clock' ? 'active' : ''}`}
                onClick={() => setEmployeeTab('clock')}
              >
                <Clock size={18} /> Registro Horario (Fichar)
              </div>

              <div 
                className={`sidebar-item ${employeeTab === 'shifts' ? 'active' : ''}`}
                onClick={() => setEmployeeTab('shifts')}
              >
                <ClipboardList size={18} /> Mis Órdenes de Instalación
              </div>

              <div 
                className={`sidebar-item ${employeeTab === 'vacations' ? 'active' : ''}`}
                onClick={() => setEmployeeTab('vacations')}
              >
                <CalendarDays size={18} /> Solicitar Vacaciones
              </div>
            </div>

            <div className="sidebar-footer">
              <button 
                className="btn-portal w-full"
                onClick={() => {
                  setCurrentView('admin');
                  setAdminTab('leads');
                }}
                style={{ background: 'rgba(var(--accent-cool-rgb), 0.1)', borderColor: 'rgba(var(--accent-cool-rgb), 0.3)' }}
              >
                <Shield size={16} className="text-cool" /> Volver a Oficina (Admin)
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="dashboard-content text-left">
            
            {/* SUB-VIEW 1: TIME CLOCK WIDGET (FICHAR) */}
            {employeeTab === 'clock' && (
              <div className="leads-container">
                <div className="filter-bar">
                  <div>
                    <h3>Fichaje Diario con Geolocalización Obligatoria</h3>
                    <p>Ficha el inicio y final de tu jornada. El sistema verificará tu localización GPS exacta en la instalación.</p>
                  </div>
                </div>

                <div className="time-clock-grid">
                  {/* Left: Giant Animated Button */}
                  <div className="glass-card clock-widget-container">
                    <div className="clock-timer">
                      {isClockedIn ? formatTimer(clockSeconds) : '00:00:00'}
                    </div>

                    <button 
                      className={`btn-clock ${isClockedIn ? 'clocked-in' : 'clocked-out'}`}
                      onClick={handleClockToggle}
                      disabled={gpsLoading}
                    >
                      <div className="clock-btn-pulse"></div>
                      <span className="clock-btn-icon">
                        {gpsLoading ? '🛰️' : isClockedIn ? '🛑' : '🔑'}
                      </span>
                      <span className="clock-btn-text">
                        {gpsLoading ? 'Geolocalizando...' : isClockedIn ? 'Fichar Salida' : 'Fichar Entrada'}
                      </span>
                    </button>

                    {isClockedIn ? (
                      <div className="clock-status-banner in mt-4">
                        <CheckCircle size={16} className="pulse-indicator" style={{ display: 'inline', marginRight: '6px' }} />
                        Jornada Iniciada a las <strong>{clockIns.find(c => c.active)?.timeIn}</strong>
                      </div>
                    ) : (
                      <div className="clock-status-banner out mt-4">
                        Fuera de servicio
                      </div>
                    )}
                  </div>

                  {/* Right: GPS Location Validator */}
                  <div className="glass-card text-left" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4>Localizador Satélite al Fichar</h4>
                    <p style={{ fontSize: '0.85rem' }}>Para la validez legal del fichaje en obra, se requiere acceso al sensor GPS de tu smartphone.</p>
                    
                    {gpsLoading && (
                      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <RefreshCw size={24} className="spin-slow text-cool" style={{ animation: 'spin 2s linear infinite', margin: '0 auto 1rem' }} />
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Conectando con satélites GPS...</p>
                      </div>
                    )}

                    {!gpsLoading && currentLocation && (
                      <div>
                        <div className="badge-intro" style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success)', width: '100%', marginBottom: '1rem' }}>
                          <CheckCircle size={14} /> Posición validada correctamente
                        </div>
                        <div className="map-visual-container" style={{ height: '200px' }}>
                          <div className="mock-map">
                            <div className="map-street street-h1"></div>
                            <div className="map-street street-v1"></div>
                            <div className="map-marker" style={{ left: '50%', top: '50%' }}>
                              <div className="marker-pulse"></div>
                              <MapPin className="marker-icon" size={24} style={{ color: 'var(--success)' }} />
                              <div className="marker-label">Estás aquí</div>
                            </div>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--accent-cool)', marginTop: '0.75rem', fontWeight: 600 }}>
                          Ubicación actual: {clockInAddress}
                        </p>
                      </div>
                    )}

                    {!gpsLoading && !currentLocation && (
                      <div className="text-center" style={{ padding: '2rem 0', color: 'var(--text-muted)' }}>
                        <AlertTriangle size={32} className="text-warning" style={{ margin: '0 auto 1rem' }} />
                        <p style={{ fontSize: '0.85rem' }}>No hay fichaje activo en este momento para geolocalizar.</p>
                      </div>
                    )}

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Tus Fichajes Recientes</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {clockIns.filter(c => c.employeeName === selectedEmployee.name).slice(0, 3).map(log => (
                          <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                            <span>📅 {log.date}</span>
                            <span>📥 {log.timeIn} - 📤 {log.timeOut || 'Activo'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: MY ASSIGNED SHIFTS & INSTALLATIONS */}
            {employeeTab === 'shifts' && (
              <div className="leads-container">
                <div className="filter-bar">
                  <div>
                    <h3>Mis Órdenes de Instalación y Trabajo</h3>
                    <p>Consulta tus citas programadas, navega a la dirección del cliente y firma el fin de obra.</p>
                  </div>
                </div>

                <div className="rota-assignments-list">
                  {shifts.filter(s => s.employeeId === selectedEmployee.id).length === 0 ? (
                    <div className="glass-card text-center" style={{ padding: '4rem 0', color: 'var(--text-muted)' }}>
                      <ClipboardList size={36} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                      <p>No tienes ningún servicio asignado para esta semana. ¡Buen trabajo!</p>
                    </div>
                  ) : (
                    shifts.filter(s => s.employeeId === selectedEmployee.id).map(shift => (
                      <div key={shift.id} className="glass-card rota-assignment-item">
                        <div className="assignment-details">
                          <span className="assignment-title">{shift.client}</span>
                          <span className="badge badge-quote" style={{ alignSelf: 'flex-start', margin: '0.25rem 0' }}>{shift.jobType}</span>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{shift.description}</p>
                          
                          <div className="assignment-meta mt-2">
                            <div className="assignment-meta-item">
                              <Calendar size={14} className="text-cool" /> <span>{shift.date}</span>
                            </div>
                            <div className="assignment-meta-item">
                              <Clock size={14} className="text-cool" /> <span>{shift.time}</span>
                            </div>
                            <div className="assignment-meta-item">
                              <MapPin size={14} className="text-warm" /> <span>{shift.address}</span>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex align-center gap-2">
                          {/* Hands off to Google Maps directions */}
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shift.address)}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                          >
                            <ExternalLink size={14} /> Cómo llegar
                          </a>

                          <button 
                            className="btn-primary"
                            style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                            onClick={() => {
                              setSelectedShiftForCompletion(shift);
                              setSignatureDone(false);
                            }}
                          >
                            <CheckCircle size={14} /> Completar e Informar
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SUB-VIEW 3: VACATION REQUESTS */}
            {employeeTab === 'vacations' && (
              <div className="leads-container">
                <div className="filter-bar">
                  <div>
                    <h3>Solicitar Días Libres o Vacaciones</h3>
                    <p>Envía la solicitud de forma directa al portal de administración de Marta.</p>
                  </div>
                </div>

                <div className="time-clock-grid">
                  {/* Left: Request form */}
                  <div className="glass-card text-left">
                    <h4>Nueva Solicitud de Días</h4>
                    <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>Especifique las fechas y la justificación. Se notificará a oficina.</p>

                    {vacFormSuccess && (
                      <div className="badge-intro" style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success)', width: '100%', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <CheckCircle size={14} /> ¡Enviado! A la espera de que Marta lo valide.
                      </div>
                    )}

                    <form onSubmit={handleVacationRequest}>
                      <div className="grid-2">
                        <div className="form-group">
                          <label htmlFor="vacStartInput">Fecha de Inicio *</label>
                          <input 
                            type="date" 
                            id="vacStartInput" 
                            className="form-control" 
                            required 
                            value={vacStart}
                            onChange={(e) => setVacStart(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="vacEndInput">Fecha de Fin *</label>
                          <input 
                            type="date" 
                            id="vacEndInput" 
                            className="form-control" 
                            required 
                            value={vacEnd}
                            onChange={(e) => setVacEnd(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="vacReasonInput">Justificación / Asunto *</label>
                        <textarea 
                          id="vacReasonInput" 
                          className="form-control" 
                          rows="3" 
                          placeholder="Ej. Vacaciones de verano para viaje al extranjero..." 
                          required
                          value={vacReason}
                          onChange={(e) => setVacReason(e.target.value)}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center' }}>
                        Enviar Solicitud
                      </button>
                    </form>
                  </div>

                  {/* Right: History status */}
                  <div className="glass-card text-left" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4>Historial de Solicitudes</h4>
                    <p style={{ fontSize: '0.85rem' }}>Comprueba si tus peticiones de días libres ya han sido aprobadas por la oficina.</p>
                    
                    <div className="vacation-requests-list" style={{ marginTop: '0.5rem' }}>
                      {vacations.filter(v => v.employeeName === selectedEmployee.name).map(req => (
                        <div key={req.id} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.01)' }}>
                          <div className="d-flex justify-between align-center mb-2">
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>📅 {req.startDate} al {req.endDate}</span>
                            <span className={`badge ${req.status === 'Pendiente' ? 'badge-quote' : req.status === 'Aprobado' ? 'badge-completed' : 'badge-new'}`}>
                              {req.status}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{req.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}


      {/* =========================================================================
          MODALS & OVERLAYS SECTION
          ========================================================================= */}
      
      {/* 1. Modal: Assign / Add Shift in Rota */}
      {showShiftModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <div className="modal-header">
              <h3>Asignar Nuevo Turno de Instalación</h3>
              <button className="btn-icon-only" onClick={() => setShowShiftModal(false)} style={{ color: 'var(--text-secondary)' }}>X</button>
            </div>
            
            <form onSubmit={handleAddShift}>
              <div className="grid-2">
                <div className="form-group">
                  <label htmlFor="shiftEmp">Operario Asignado *</label>
                  <select 
                    id="shiftEmp" 
                    className="form-control"
                    value={adminShiftEmpId}
                    onChange={(e) => setAdminShiftEmpId(e.target.value)}
                  >
                    {EMPLOYEES.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="shiftDate">Fecha de Servicio *</label>
                  <input 
                    type="date" 
                    id="shiftDate" 
                    className="form-control" 
                    required
                    value={adminShiftDate}
                    onChange={(e) => setAdminShiftDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label htmlFor="shiftTime">Franja Horaria *</label>
                  <input 
                    type="text" 
                    id="shiftTime" 
                    className="form-control" 
                    placeholder="Ej. 08:00 - 16:00" 
                    required
                    value={adminShiftTime}
                    onChange={(e) => setAdminShiftTime(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shiftType">Tipo de Obra</label>
                  <select 
                    id="shiftType" 
                    className="form-control"
                    value={adminShiftType}
                    onChange={(e) => setAdminShiftType(e.target.value)}
                  >
                    <option value="Instalación">Instalación Completa</option>
                    <option value="Carga de Gas">Carga de Gas / Mantenimiento</option>
                    <option value="Mantenimiento RITE">Mantenimiento RITE Oficial</option>
                    <option value="Urgencia 24h">Urgencia 24h / Avería</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="shiftClient">Cliente *</label>
                <input 
                  type="text" 
                  id="shiftClient" 
                  className="form-control" 
                  placeholder="Ej. Roberto Gómez" 
                  required
                  value={adminShiftClient}
                  onChange={(e) => setAdminShiftClient(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="shiftAddress">Dirección Completa *</label>
                <input 
                  type="text" 
                  id="shiftAddress" 
                  className="form-control" 
                  placeholder="Ej. Calle Mayor 15, Madrid" 
                  required
                  value={adminShiftAddress}
                  onChange={(e) => setAdminShiftAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="shiftDesc">Detalles e Instrucciones Técnicas</label>
                <textarea 
                  id="shiftDesc" 
                  className="form-control" 
                  rows="3" 
                  placeholder="Ej. Llevar tubería de 3/8 y soportes amortiguados..."
                  value={adminShiftDesc}
                  onChange={(e) => setAdminShiftDesc(e.target.value)}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowShiftModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar en Calendario</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal: Employee Signature / Complete Job Confirmation */}
      {selectedShiftForCompletion && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Completar Orden de Climatización</h3>
              <button className="btn-icon-only" onClick={() => setSelectedShiftForCompletion(null)}>X</button>
            </div>

            {signatureDone ? (
              <div className="text-center" style={{ padding: '3rem 1.5rem' }}>
                <CheckCircle size={48} className="text-success" style={{ margin: '0 auto 1.5rem' }} />
                <h4>¡Obra informada con éxito!</h4>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>El parte digital ha sido firmado y archivado. Marta lo recibirá en la oficina al instante.</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Vas a reportar la finalización del servicio en <strong>{selectedShiftForCompletion.client}</strong>. Rellena los datos para cerrar la orden.
                </p>

                <div className="form-group">
                  <label htmlFor="sigNameInput">Nombre de Cliente Firmante *</label>
                  <input 
                    type="text" 
                    id="sigNameInput" 
                    className="form-control" 
                    placeholder="Ej. Roberto Gómez" 
                    required 
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Firma Digital en Pantalla</label>
                  <div className="signature-box mt-2" onClick={() => setSignatureDone(false)}>
                    <div className="signature-dummy-line"></div>
                    <span className="signature-overlay-text">
                      [ Simulación de Firma en Pantalla Táctil: {signatureName || 'Escribe el nombre del cliente'} ]
                    </span>
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <input 
                    type="checkbox" 
                    id="photoUploadCheck" 
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    checked={uploadPhotoSim}
                    onChange={(e) => setUploadPhotoSim(e.target.checked)}
                  />
                  <label htmlFor="photoUploadCheck" style={{ marginBottom: 0, cursor: 'pointer' }}>
                    Adjuntar foto de la instalación (Unidad Exterior y acabados)
                  </label>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setSelectedShiftForCompletion(null)}>Cancelar</button>
                  <button type="button" className="btn-primary" onClick={handleCompleteShift}>
                    Enviar Parte Firmado
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Modal: Add/Edit Internal User */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3>{selectedUserForEdit ? 'Editar Usuario Interno' : 'Nuevo Usuario Interno'}</h3>
              <button className="btn-icon-only" onClick={() => setShowUserModal(false)}>X</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const userData = {
                id: selectedUserForEdit ? selectedUserForEdit.id : Date.now(),
                name: formData.get('userName'),
                role: formData.get('userRole'),
                specialty: formData.get('userSpecialty'),
                phone: formData.get('userPhone'),
                email: formData.get('userEmail'),
                status: formData.get('userStatus'),
                avatar: selectedUserForEdit ? selectedUserForEdit.avatar : '👤'
              };
              handleSaveUser(userData);
            }}>
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input type="text" name="userName" className="form-control" defaultValue={selectedUserForEdit?.name || ''} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Rol en Empresa *</label>
                  <select name="userRole" className="form-control" defaultValue={selectedUserForEdit?.role || 'Técnico Instalador'} required>
                    <option value="Administrador">Administrador</option>
                    <option value="Administración">Administración</option>
                    <option value="Responsable Técnico">Responsable Técnico</option>
                    <option value="Técnico Instalador">Técnico Instalador</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Especialidad Técnica *</label>
                  <select name="userSpecialty" className="form-control" defaultValue={selectedUserForEdit?.specialty || 'Climatización'} required>
                    <option value="Climatización">Climatización (Splits / Conductos)</option>
                    <option value="Frigorista">Frigorista Certificado</option>
                    <option value="Aerotermia">Aerotermia y Suelo Radiante</option>
                    <option value="Ayudante">Ayudante / En Formación</option>
                    <option value="Gestión Oficina">Gestión Oficina</option>
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Teléfono *</label>
                  <input type="text" name="userPhone" className="form-control" defaultValue={selectedUserForEdit?.phone || '+34 600 000 000'} required />
                </div>
                <div className="form-group">
                  <label>Email Corporativo *</label>
                  <input type="email" name="userEmail" className="form-control" defaultValue={selectedUserForEdit?.email || 'usuario@klimatik.es'} required />
                </div>
              </div>
              <div className="form-group">
                <label>Estado del Usuario *</label>
                <select name="userStatus" className="form-control" defaultValue={selectedUserForEdit?.status || 'activo'} required>
                  <option value="activo">🟢 Activo (Aparece en asignaciones y listas)</option>
                  <option value="inactivo">🔴 Inactivo (Mantiene historial, excluido de asignaciones)</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowUserModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar Usuario</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal: Lead CRUD */}
      {showLeadModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{selectedLeadForEdit ? 'Editar Lead' : 'Nuevo Lead de Climatización'}</h3>
              <button className="btn-icon-only" onClick={() => setShowLeadModal(false)}>X</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const leadData = {
                id: selectedLeadForEdit ? selectedLeadForEdit.id : `lead-${Date.now()}`,
                name: fd.get('leadName'),
                company: fd.get('leadCompany') || 'Particular',
                phone: fd.get('leadPhone'),
                email: fd.get('leadEmail'),
                type: fd.get('leadType'),
                address: fd.get('leadAddress'),
                description: fd.get('leadDesc'),
                origin: fd.get('leadOrigin'),
                status: selectedLeadForEdit ? selectedLeadForEdit.status : 'Nuevo',
                date: selectedLeadForEdit ? selectedLeadForEdit.date : new Date().toISOString().split('T')[0],
                totalPrice: parseFloat(fd.get('leadPrice')) || 500,
                daysWithoutResponse: selectedLeadForEdit ? selectedLeadForEdit.daysWithoutResponse : 0
              };
              if (selectedLeadForEdit) {
                setLeads(leads.map(l => l.id === leadData.id ? { ...l, ...leadData } : l));
                showToast('Lead actualizado correctamente.', 'success');
              } else {
                setLeads([leadData, ...leads]);
                showToast('Nuevo lead registrado.', 'success');
              }
              setShowLeadModal(false);
            }}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Nombre / Contacto *</label>
                  <input type="text" name="leadName" className="form-control" defaultValue={selectedLeadForEdit?.name || ''} required />
                </div>
                <div className="form-group">
                  <label>Empresa / Particular</label>
                  <input type="text" name="leadCompany" className="form-control" placeholder="Particular o Razón Social" defaultValue={selectedLeadForEdit?.company || 'Particular'} />
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Teléfono *</label>
                  <input type="text" name="leadPhone" className="form-control" defaultValue={selectedLeadForEdit?.phone || ''} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="leadEmail" className="form-control" defaultValue={selectedLeadForEdit?.email || ''} />
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Tipo de Intervención</label>
                  <select name="leadType" className="form-control" defaultValue={selectedLeadForEdit?.type || 'Residencial'}>
                    <option value="Residencial">Residencial Split/Multisplit</option>
                    <option value="Industrial">Industrial / Conductos / Local</option>
                    <option value="Aerotermia">Aerotermia / Suelo Radiante</option>
                    <option value="Urgencia">Urgencia 24h / Avería</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Canal de Origen</label>
                  <select name="leadOrigin" className="form-control" defaultValue={selectedLeadForEdit?.origin || 'Formulario Web'}>
                    <option value="Formulario Web">Formulario Web</option>
                    <option value="WhatsApp Directo">WhatsApp Directo</option>
                    <option value="Llamada Telefónica">Llamada Telefónica</option>
                    <option value="Referido / Recomendación">Referido / Recomendación</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Dirección de la Instalación *</label>
                <input type="text" name="leadAddress" className="form-control" defaultValue={selectedLeadForEdit?.address || ''} required />
              </div>
              <div className="form-group">
                <label>Necesidad o Descripción Técnica</label>
                <textarea name="leadDesc" className="form-control" rows="2" defaultValue={selectedLeadForEdit?.description || ''}></textarea>
              </div>
              <div className="form-group">
                <label>Importe Estimado (€)</label>
                <input type="number" name="leadPrice" className="form-control" defaultValue={selectedLeadForEdit?.totalPrice || 500} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowLeadModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal: Client CRUD */}
      {showClientModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3>{selectedClientForEdit ? 'Editar Ficha de Cliente' : 'Alta de Nuevo Cliente'}</h3>
              <button className="btn-icon-only" onClick={() => setShowClientModal(false)}>X</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const addressesRaw = fd.get('clientAddresses') || '';
              const addrs = addressesRaw.split('\n').map(a => a.trim()).filter(Boolean);
              const clientData = {
                id: selectedClientForEdit ? selectedClientForEdit.id : undefined,
                name: fd.get('clientName'),
                clientType: fd.get('clientType'),
                company: fd.get('clientCompany') || 'Particular',
                nifCif: fd.get('clientNif'),
                phone: fd.get('clientPhone'),
                email: fd.get('clientEmail'),
                contactPerson: fd.get('clientContactPerson'),
                mainAddress: fd.get('clientMainAddress'),
                installationAddresses: addrs.length > 0 ? addrs : [fd.get('clientMainAddress')],
                notes: fd.get('clientNotes'),
                status: fd.get('clientStatus')
              };
              handleSaveClient(clientData);
            }}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Nombre / Razón Social *</label>
                  <input type="text" name="clientName" className="form-control" defaultValue={selectedClientForEdit?.name || ''} required />
                </div>
                <div className="form-group">
                  <label>Tipo de Cliente *</label>
                  <select name="clientType" className="form-control" defaultValue={selectedClientForEdit?.clientType || 'Particular'}>
                    <option value="Particular">Particular</option>
                    <option value="Empresa">Empresa / Negocio</option>
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>NIF / CIF *</label>
                  <input type="text" name="clientNif" className="form-control" defaultValue={selectedClientForEdit?.nifCif || ''} placeholder="Ej. B-12345678 o 12345678Z" required />
                </div>
                <div className="form-group">
                  <label>Persona de Contacto</label>
                  <input type="text" name="clientContactPerson" className="form-control" defaultValue={selectedClientForEdit?.contactPerson || ''} />
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Teléfono de Contacto *</label>
                  <input type="text" name="clientPhone" className="form-control" defaultValue={selectedClientForEdit?.phone || ''} required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="clientEmail" className="form-control" defaultValue={selectedClientForEdit?.email || ''} required />
                </div>
              </div>
              <div className="form-group">
                <label>Dirección Principal / Fiscal *</label>
                <input type="text" name="clientMainAddress" className="form-control" defaultValue={selectedClientForEdit?.mainAddress || ''} required />
              </div>
              <div className="form-group">
                <label>Direcciones de Instalación / Centros (Una por línea)</label>
                <textarea 
                  name="clientAddresses" 
                  className="form-control" 
                  rows="3" 
                  placeholder="Calle Mayor 15, Madrid"
                  defaultValue={selectedClientForEdit?.installationAddresses?.join('\n') || ''}
                ></textarea>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Notas de Seguimiento</label>
                  <textarea name="clientNotes" className="form-control" rows="2" defaultValue={selectedClientForEdit?.notes || ''}></textarea>
                </div>
                <div className="form-group">
                  <label>Estado del Cliente</label>
                  <select name="clientStatus" className="form-control" defaultValue={selectedClientForEdit?.status || 'activo'}>
                    <option value="activo">🟢 Activo</option>
                    <option value="inactivo">🔴 Inactivo / Archivado</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowClientModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">Guardar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal: Ficha 360º del Cliente */}
      {selectedClientFor360View && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ maxWidth: '800px', width: '90%' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={20} className="text-cool" /> Ficha 360º: {selectedClientFor360View.name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {selectedClientFor360View.clientType} • NIF/CIF: <strong>{selectedClientFor360View.nifCif}</strong>
                </span>
              </div>
              <button className="btn-icon-only" onClick={() => setSelectedClientFor360View(null)}>X</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
              <div className="glass-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#fff' }}>📍 Direcciones de Instalación</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {selectedClientFor360View.installationAddresses?.map((addr, idx) => (
                    <div key={idx} className="client-address-pill">
                      <MapPin size={12} className="text-cool" /> {addr} {idx === 0 ? '(Principal)' : ''}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#fff' }}>🔗 Trazabilidad & Origen Lead</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {selectedClientFor360View.originLeadId ? (
                    <span>Convertido desde Lead <strong>#{selectedClientFor360View.originLeadId}</strong></span>
                  ) : (
                    <span>Registrado directamente en la plataforma el {selectedClientFor360View.createdAt || '2026-05-01'}</span>
                  )}
                </p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {selectedClientFor360View.notes}
                </div>
              </div>
            </div>

            <div style={{ margin: '1.5rem 0 0.5rem 0' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} className="text-cool" /> Histórico de Presupuestos y Obras Vinculadas
              </h4>
              <div className="table-responsive">
                <table className="klimatik-table">
                  <thead>
                    <tr>
                      <th>Ref. / Tipo</th>
                      <th>Dirección Instalación</th>
                      <th>Descripción Servicio</th>
                      <th>Importe (€)</th>
                      <th>Estado Obra</th>
                      <th>Parte Firmado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.filter(l => l.name.toLowerCase().includes(selectedClientFor360View.name.toLowerCase()) || l.email === selectedClientFor360View.email).length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                          No hay obras grabadas aún para este cliente.
                        </td>
                      </tr>
                    ) : (
                      leads.filter(l => l.name.toLowerCase().includes(selectedClientFor360View.name.toLowerCase()) || l.email === selectedClientFor360View.email).map(l => (
                        <tr key={l.id}>
                          <td><span className="badge badge-new">{l.type}</span></td>
                          <td style={{ fontSize: '0.82rem' }}>{l.address}</td>
                          <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '200px' }}>{l.description}</td>
                          <td style={{ fontWeight: 700, color: 'var(--accent-cool)' }}>{l.totalPrice}€</td>
                          <td>{getStatusBadge(l.status)}</td>
                          <td>
                            {l.signedParte ? (
                              <span className="badge badge-completed">✅ Firmado ({l.signedParte.signedAt})</span>
                            ) : (
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pendiente</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedClientFor360View(null)}>Cerrar Ficha</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <div className="toasts-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast-card toast-${t.type} animate-slide-in`}>
            <div className="toast-icon">
              {t.type === 'success' ? (
                <CheckCircle size={18} />
              ) : t.type === 'error' ? (
                <AlertTriangle size={18} />
              ) : (
                <Info size={18} />
              )}
            </div>
            <div className="toast-message">{t.message}</div>
            <button className="toast-close" onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
