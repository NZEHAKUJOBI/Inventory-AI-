import { useState } from 'react';
import Card from '../components/Card';
import { Bell, Lock, User, Building, Globe, Moon, ChevronRight } from 'lucide-react';

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)} style={{
      width: 40, height: 22, borderRadius: 11, background: checked ? '#1a6dff' : '#1e3a5f',
      cursor: 'pointer', position: 'relative', transition: 'background .2s'
    }}>
      <div style={{
        position: 'absolute', top: 3, left: checked ? 20 : 3,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transition: 'left .2s'
      }} />
    </div>
  );
}

export default function Settings() {
  const [notifs, setNotifs] = useState({ lowStock: true, expiry: true, stockOut: true, reorder: false, system: true });
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState('English');

  const sections = [
    { icon: User,     label: 'Profile',       desc: 'Manage your personal information' },
    { icon: Building, label: 'Organisation',  desc: 'Update company details & logo'    },
    { icon: Lock,     label: 'Security',      desc: 'Password, 2FA, sessions'          },
    { icon: Globe,    label: 'Integrations',  desc: 'Connect ERP, accounting & more'   },
  ];

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Quick-access tiles */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {sections.map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 200, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: '#1a6dff22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.icon size={16} style={{ color: '#1a6dff' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e8f0fe' }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#8facc8' }}>{s.desc}</div>
            </div>
            <ChevronRight size={14} style={{ color: '#8facc8' }} />
          </Card>
        ))}
      </div>

      {/* Profile card */}
      <Card>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#e8f0fe', display: 'flex', alignItems: 'center', gap: 8 }}>
          <User size={14} style={{ color: '#1a6dff' }} /> Profile Settings
        </h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Full Name',     value: 'Klen Pharma Admin',       type: 'text'  },
            { label: 'Email',         value: 'admin@klenpharm.ng',       type: 'email' },
            { label: 'Phone',         value: '+234 800 000 0000',         type: 'tel'   },
            { label: 'Role',          value: 'Administrator',             type: 'text'  },
          ].map(f => (
            <div key={f.label} style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 12, color: '#8facc8', display: 'block', marginBottom: 6 }}>{f.label}</label>
              <input defaultValue={f.value} type={f.type} style={{
                width: '100%', background: '#0d1b2a', border: '1px solid #1e3a5f', borderRadius: 7,
                padding: '8px 12px', color: '#e8f0fe', fontSize: 13, outline: 'none'
              }} />
            </div>
          ))}
        </div>
        <button style={{ marginTop: 16, padding: '8px 20px', borderRadius: 8, border: 'none', background: '#1a6dff', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Save Changes
        </button>
      </Card>

      {/* Notification preferences */}
      <Card>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#e8f0fe', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={14} style={{ color: '#1a6dff' }} /> Notification Preferences
        </h3>
        {Object.entries(notifs).map(([key, val]) => {
          const labels = { lowStock: 'Low Stock Alerts', expiry: 'Expiry Alerts', stockOut: 'Stock Out Alerts', reorder: 'Reorder Suggestions', system: 'System Notifications' };
          return (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ fontSize: 13, color: '#e8f0fe' }}>{labels[key]}</span>
              <Toggle checked={val} onChange={v => setNotifs(prev => ({ ...prev, [key]: v }))} />
            </div>
          );
        })}
      </Card>

      {/* Appearance */}
      <Card>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#e8f0fe', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Moon size={14} style={{ color: '#1a6dff' }} /> Appearance
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 13, color: '#e8f0fe' }}>Dark Mode</span>
          <Toggle checked={darkMode} onChange={setDarkMode} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#e8f0fe' }}>Language</span>
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{
            background: '#0d1b2a', border: '1px solid #1e3a5f', borderRadius: 7,
            color: '#e8f0fe', padding: '6px 10px', fontSize: 12, outline: 'none'
          }}>
            {['English','French','Hausa','Igbo','Yoruba'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
      </Card>
    </div>
  );
}
