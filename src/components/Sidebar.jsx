import { useState } from 'react';
import {
  LayoutDashboard, Package, AlertTriangle, Warehouse,
  ShoppingCart, Users, BarChart2, Bell, FileText,
  Settings, ChevronRight, LogOut
} from 'lucide-react';

const navItems = [
  { id: 'dashboard',   label: 'Dashboard',     icon: LayoutDashboard },
  { id: 'inventory',   label: 'Inventory',     icon: Package },
  { id: 'expiry',      label: 'Expiry Center', icon: AlertTriangle },
  { id: 'warehouse',   label: 'Warehouse',     icon: Warehouse },
  { id: 'purchases',   label: 'Purchases',     icon: ShoppingCart },
  { id: 'suppliers',   label: 'Suppliers',     icon: Users },
  { id: 'analytics',   label: 'Analytics',     icon: BarChart2 },
  { id: 'alerts',      label: 'Alerts',        icon: Bell, badge: 3 },
  { id: 'reports',     label: 'Reports',       icon: FileText },
  { id: 'settings',    label: 'Settings',      icon: Settings },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside style={{ width: 220, minHeight: '100vh', background: '#0d1b2a', borderRight: '1px solid #1e3a5f', display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg,#1a6dff,#0040cc)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#fff'
          }}>AI</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#e8f0fe', lineHeight: 1 }}>SmartInventory</div>
            <div style={{ fontSize: 10, color: '#1a6dff', fontWeight: 600, marginTop: 2 }}>AI</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {navItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 2,
                background: isActive ? 'rgba(26,109,255,0.18)' : 'transparent',
                color: isActive ? '#5b9dff' : '#8facc8',
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                transition: 'all .15s',
              }}
            >
              <Icon size={16} />
              <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
              {badge && (
                <span style={{
                  background: '#ef4444', color: '#fff', borderRadius: 10,
                  fontSize: 10, fontWeight: 700, padding: '1px 6px', minWidth: 18, textAlign: 'center'
                }}>{badge}</span>
              )}
              {isActive && <ChevronRight size={13} />}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #1e3a5f', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#1a6dff,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff'
        }}>KP</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#e8f0fe' }}>Klen Pharma</div>
          <div style={{ fontSize: 10, color: '#8facc8' }}>Admin</div>
        </div>
        <LogOut size={14} style={{ color: '#8facc8', cursor: 'pointer' }} />
      </div>
    </aside>
  );
}
