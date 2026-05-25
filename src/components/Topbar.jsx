import { Bell, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function Topbar({ title, subtitle }) {
  const { isDark, setIsDark, colors } = useTheme();

  return (
    <header style={{
      background: colors.headerBg,
      borderBottom: `1px solid ${colors.border}`,
      padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 10
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: colors.textPrimary }}>{title}</h1>
        {subtitle && <p style={{ margin: 0, fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: colors.cardBg, border: `1px solid ${colors.border}`,
          borderRadius: 8, padding: '6px 12px'
        }}>
          <Search size={14} style={{ color: colors.textSecondary }} />
          <input
            placeholder="Search products, batches..."
            style={{ background: 'none', border: 'none', outline: 'none', color: colors.textPrimary, fontSize: 13, width: 200 }}
          />
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setIsDark(v => !v)}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: 8, border: `1px solid ${colors.border}`,
            background: colors.cardBg, cursor: 'pointer', flexShrink: 0,
            transition: 'all .2s'
          }}
        >
          {isDark
            ? <Sun  size={16} style={{ color: '#f59e0b' }} />
            : <Moon size={16} style={{ color: '#1a6dff' }} />
          }
        </button>

        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={18} style={{ color: colors.textSecondary }} />
          <span style={{
            position: 'absolute', top: -5, right: -5, background: '#ef4444',
            borderRadius: '50%', width: 14, height: 14, fontSize: 9, fontWeight: 700,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>3</span>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg,#1a6dff,#a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer'
        }}>KP</div>
      </div>
    </header>
  );
}
