import { Bell, Search } from 'lucide-react';

export default function Topbar({ title, subtitle }) {
  return (
    <header style={{
      background: '#0d1b2a', borderBottom: '1px solid #1e3a5f',
      padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 10
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#e8f0fe' }}>{title}</h1>
        {subtitle && <p style={{ margin: 0, fontSize: 12, color: '#8facc8', marginTop: 2 }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, background: '#112233',
          border: '1px solid #1e3a5f', borderRadius: 8, padding: '6px 12px'
        }}>
          <Search size={14} style={{ color: '#8facc8' }} />
          <input
            placeholder="Search products, batches…"
            style={{ background: 'none', border: 'none', outline: 'none', color: '#e8f0fe', fontSize: 13, width: 200 }}
          />
        </div>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={18} style={{ color: '#8facc8' }} />
          <span style={{
            position: 'absolute', top: -5, right: -5, background: '#ef4444',
            borderRadius: '50%', width: 14, height: 14, fontSize: 9, fontWeight: 700,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>3</span>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#1a6dff,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer'
        }}>KP</div>
      </div>
    </header>
  );
}
