// ── Inventory items ─────────────────────────────────────────────────────────
export const inventoryItems = [
  { id: 1, product: 'Paracetamol 500mg', batch: 'PAR002324', category: 'Analgesics',   warehouse: 'Lagos Warehouse',     qty: 1250, status: 'In Stock',  expiry: '2025-12-15' },
  { id: 2, product: 'Amoxicillin 500mg', batch: 'AMX2324',   category: 'Antibiotics',  warehouse: 'Abuja Warehouse',     qty: 330,  status: 'Low Stock', expiry: '2024-06-06' },
  { id: 3, product: 'Ciprofloxacin 250mg',batch: 'CIP1003',  category: 'Antibiotics',  warehouse: 'Lagos Warehouse',     qty: 150,  status: 'Low Stock', expiry: '2024-12-12' },
  { id: 4, product: 'Vitamin C 1000mg',  batch: 'VITC566',   category: 'Vitamins',     warehouse: 'Kano Warehouse',      qty: 980,  status: 'In Stock',  expiry: '2025-03-20' },
  { id: 5, product: 'Salbutamol Inhaler',batch: 'SALB7788',  category: 'Respiratory',  warehouse: 'Port Harcourt',       qty: 25,   status: 'Low Stock', expiry: '2025-09-18' },
  { id: 6, product: 'IV Fluids 500ml',   batch: 'IVF500123', category: 'IV Fluids',    warehouse: 'Lagos Warehouse',     qty: 0,    status: 'Out of Stock',expiry: '2026-01-10' },
  { id: 7, product: 'Artemether 80mg',   batch: 'ART88001',  category: 'Antimalarial', warehouse: 'Abuja Warehouse',     qty: 600,  status: 'In Stock',  expiry: '2025-11-25' },
  { id: 8, product: 'Diclofenac 50mg',   batch: 'DIC0165',   category: 'Analgesics',   warehouse: 'Kano Warehouse',      qty: 90,   status: 'Low Stock', expiry: '2024-05-09' },
  { id: 9, product: 'Azithromycin 500mg',batch: 'AZI3321',   category: 'Antibiotics',  warehouse: 'Port Harcourt',       qty: 60,   status: 'Low Stock', expiry: '2025-07-14' },
  { id:10, product: 'Metformin 500mg',   batch: 'MET4450',   category: 'Analgesics',   warehouse: 'Lagos Warehouse',     qty: 420,  status: 'In Stock',  expiry: '2026-02-28' },
];

// ── Expiry items ─────────────────────────────────────────────────────────────
export const expiryItems = [
  { id: 1, product: 'Amoxicillin 500mg',   batch: 'AMX2324',  expiry: '2024-06-06', daysLeft: 18, status: 'Near Expiry' },
  { id: 2, product: 'Ciprofloxacin 250mg', batch: 'CIP1023',  expiry: '2024-12-12', daysLeft: 24, status: 'Near Expiry' },
  { id: 3, product: 'Vitamin C 1000mg',    batch: 'VITC566',  expiry: '2025-03-20', daysLeft: 32, status: 'Near Expiry' },
  { id: 4, product: 'Diclofenac 50mg',     batch: 'DIC0165',  expiry: '2024-05-09', daysLeft: -16,status: 'Expired'     },
  { id: 5, product: 'Artemether 80mg',     batch: 'ART88001', expiry: '2024-04-28', daysLeft: -28,status: 'Expired'     },
  { id: 6, product: 'Metformin 500mg',     batch: 'MET4450',  expiry: '2026-02-28', daysLeft: 120,status: 'Good'        },
];

// ── Warehouses ────────────────────────────────────────────────────────────────
export const warehouses = [
  { id: 1, name: 'Lagos Warehouse',    items: 620, value: 98450000, utilization: 85, accuracy: 99.7, color: '#1a6dff' },
  { id: 2, name: 'Abuja Warehouse',    items: 430, value: 76230000, utilization: 72, accuracy: 97.8, color: '#22c55e' },
  { id: 3, name: 'Kano Warehouse',     items: 320, value: 46120000, utilization: 68, accuracy: 98.1, color: '#f59e0b' },
  { id: 4, name: 'Port Harcourt',      items: 180, value: 36660000, utilization: 65, accuracy: 96.4, color: '#a855f7' },
];

// ── Purchases ─────────────────────────────────────────────────────────────────
export const purchases = [
  { id: 'PO-2024-0089', supplier: 'MedPharm Ltd',       date: '2024-05-20', items: 12, amount: 4500000,  status: 'Delivered'  },
  { id: 'PO-2024-0088', supplier: 'PharmaTrust NG',     date: '2024-05-18', items:  8, amount: 2300000,  status: 'In Transit' },
  { id: 'PO-2024-0087', supplier: 'HealthBridge Supp.', date: '2024-05-15', items: 20, amount: 8700000,  status: 'Delivered'  },
  { id: 'PO-2024-0086', supplier: 'NovaCure Pharma',    date: '2024-05-10', items:  5, amount: 1200000,  status: 'Pending'    },
  { id: 'PO-2024-0085', supplier: 'MedPharm Ltd',       date: '2024-05-05', items: 15, amount: 5600000,  status: 'Delivered'  },
  { id: 'PO-2024-0084', supplier: 'AfriMed Supplies',   date: '2024-04-30', items:  9, amount: 3100000,  status: 'Delivered'  },
  { id: 'PO-2024-0083', supplier: 'PharmaTrust NG',     date: '2024-04-25', items: 11, amount: 4800000,  status: 'Cancelled'  },
];

// ── Suppliers ─────────────────────────────────────────────────────────────────
export const suppliers = [
  { id: 1, name: 'MedPharm Ltd',          contact: 'Emeka Obi',      phone: '+234 801 234 5678', email: 'emeka@medpharm.ng',   category: 'Full Range',    rating: 4.8, orders: 24, status: 'Active'   },
  { id: 2, name: 'PharmaTrust NG',         contact: 'Amaka Chukwu',   phone: '+234 802 345 6789', email: 'amaka@pharmatrust.ng', category: 'Antibiotics',   rating: 4.5, orders: 18, status: 'Active'   },
  { id: 3, name: 'HealthBridge Supplies',  contact: 'Bola Adeyemi',   phone: '+234 803 456 7890', email: 'bola@healthbridge.ng', category: 'Full Range',    rating: 4.2, orders: 31, status: 'Active'   },
  { id: 4, name: 'NovaCure Pharma',        contact: 'Chioma Eze',     phone: '+234 804 567 8901', email: 'chioma@novacure.ng',  category: 'Speciality',    rating: 3.9, orders:  7, status: 'Inactive' },
  { id: 5, name: 'AfriMed Supplies',       contact: 'Tunde Fashola',  phone: '+234 805 678 9012', email: 'tunde@afrimed.ng',    category: 'IV & Fluids',   rating: 4.6, orders: 15, status: 'Active'   },
];

// ── Alerts ────────────────────────────────────────────────────────────────────
export const alerts = [
  { id: 1, type: 'Low Stock',  message: 'Low stock alert for Diclofenac 50mg at Lagos Warehouse',         time: '10:34 AM', read: false },
  { id: 2, type: 'Expiry',     message: 'Amoxicillin 500mg (Batch: AMX2324) will expire in 18 days',       time: '09:15 AM', read: false },
  { id: 3, type: 'Stock Out',  message: 'Stock out for IV Fluids 500ml at Port Harcourt Warehouse',         time: 'Yesterday', read: false },
  { id: 4, type: 'Reorder',    message: 'Reorder suggestion generated for 7 products',                     time: 'Yesterday', read: true  },
  { id: 5, type: 'System',     message: 'Inventory discrepancy detected in Kano Warehouse',                time: 'May 28',    read: true  },
  { id: 6, type: 'Low Stock',  message: 'Salbutamol Inhaler critically low at Port Harcourt (Qty: 25)',    time: 'May 27',    read: true  },
  { id: 7, type: 'Expiry',     message: 'Diclofenac 50mg (Batch: DIC0165) has expired — take action',     time: 'May 26',    read: true  },
];

// ── Reorder suggestions ───────────────────────────────────────────────────────
export const reorderSuggestions = [
  { id: 1, product: 'Paracetamol 500mg',   currentStock: 180, reorderLevel: 500, suggestedQty: 1000 },
  { id: 2, product: 'Diclofenac 50mg',     currentStock:  90, reorderLevel: 300, suggestedQty:  600 },
  { id: 3, product: 'Salbutamol Inhaler',  currentStock:  25, reorderLevel: 100, suggestedQty:  200 },
  { id: 4, product: 'Azithromycin 500mg',  currentStock:  60, reorderLevel: 200, suggestedQty:  400 },
  { id: 5, product: 'IV Fluids 500ml',     currentStock:   0, reorderLevel: 150, suggestedQty:  300 },
  { id: 6, product: 'Amoxicillin 500mg',   currentStock: 330, reorderLevel: 400, suggestedQty:  500 },
  { id: 7, product: 'Ciprofloxacin 250mg', currentStock: 150, reorderLevel: 300, suggestedQty:  600 },
];

// ── Stock movement chart data ─────────────────────────────────────────────────
export const stockMovementData = [
  { day: 'Sun', stockIn: 120, stockOut:  80 },
  { day: 'Mon', stockIn:  95, stockOut: 110 },
  { day: 'Tue', stockIn: 140, stockOut:  70 },
  { day: 'Wed', stockIn:  80, stockOut: 130 },
  { day: 'Thu', stockIn: 160, stockOut:  90 },
  { day: 'Fri', stockIn: 110, stockOut: 100 },
  { day: 'Sat', stockIn:  75, stockOut:  60 },
];

// ── Monthly analytics ─────────────────────────────────────────────────────────
export const monthlyData = [
  { month: 'Jan', received: 320, issued: 280, value: 42000000 },
  { month: 'Feb', received: 280, issued: 260, value: 38000000 },
  { month: 'Mar', received: 410, issued: 350, value: 55000000 },
  { month: 'Apr', received: 380, issued: 320, value: 48000000 },
  { month: 'May', received: 450, issued: 390, value: 62000000 },
];

// ── Top categories ────────────────────────────────────────────────────────────
export const categoryData = [
  { name: 'Antibiotics', value: 32, color: '#1a6dff' },
  { name: 'Analgesics',  value: 21, color: '#22c55e' },
  { name: 'Vitamins',    value: 17, color: '#f59e0b' },
  { name: 'IV Fluids',   value: 15, color: '#a855f7' },
  { name: 'Others',      value: 15, color: '#64748b' },
];

// ── Inventory summary (report) ─────────────────────────────────────────────────
export const inventorySummary = [
  { category: 'Antibiotics',   openingStock: 320000, received: 46000, issued: 38000, closingStock: 327000, value: 98100000 },
  { category: 'Analgesics',    openingStock: 280000, received: 35000, issued: 30000, closingStock: 285000, value: 67150000 },
  { category: 'Vitamins',      openingStock: 210000, received: 20000, issued: 18000, closingStock: 212000, value: 34560000 },
  { category: 'IV Fluids',     openingStock: 180000, received: 15000, issued: 12000, closingStock: 183000, value: 28460000 },
  { category: 'Others',        openingStock: 135000, received:  6000, issued:   800, closingStock: 134000, value: 17000000 },
];
