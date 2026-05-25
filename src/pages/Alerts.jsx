import { useState } from 'react';
import Card from '../components/Card';
import { alerts } from '../data/dummyData';
import { AlertTriangle, Clock, XCircle, Bell, Info, CheckCircle } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function Alerts() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Low Stock', 'Expiry', 'Stock Out', 'System'];

  const TYPE_CONFIG = {
    'Low Stock':  { color: colors.yellow,  bg: colors.yellowLight, icon: AlertTriangle },
    'Expiry':     { color: colors.purple,  bg: colors.purpleLight, icon: Clock },
    'Stock Out':  { color: colors.red,     bg: colors.redLight,    icon: XCircle },
    'Reorder':    { color: colors.accent,  bg: colors.accentLight, icon: Bell },
    'System':     { color: colors.textSecondary, bg: colors.inputBg, icon: Info },
  };

  const filtered = filter === 'All' ? alerts : alerts.filter(a => a.type === filter);
  const unread = alerts.filter(a => !a.read).length;

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Alerts',  value: alerts.length,  color: '#1a6dff' },
          { label: 'Unread',        value: unread,          color: colors.red },
          { label: 'Low Stock',     value: alerts.filter(a=>a.type==='Low Stock').length, color: colors.yellow },
          { label: 'Expiry',        value: alerts.filter(a=>a.type==='Expiry').length,    color: colors.purple },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 140, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: colors.textSecondary }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', borderRadius: 6, border: `1px solid ${colors.border}`,
            background: filter===f ? '#1a6dff' : colors.cardBg,
            color: filter===f ? '#fff' : colors.textSecondary,
            fontSize: 12, fontWeight: filter===f ? 600 : 400, cursor: 'pointer'
          }}>{f}</button>
        ))}
        <button style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 6, border: `1px solid ${colors.green}`, background: 'transparent', color: colors.green, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
          Mark all as read
        </button>
      </div>

      {/* Alert list */}
      <Card style={{ padding: 0 }}>
        {filtered.map((alert, idx) => {
          const cfg = TYPE_CONFIG[alert.type] || TYPE_CONFIG['System'];
          const Icon = cfg.icon;
          return (
            <div key={alert.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14,
              padding: '14px 20px',
              borderBottom: idx < filtered.length-1 ? `1px solid ${colors.border}` : 'none',
              background: alert.read ? 'transparent' : 'rgba(26,109,255,0.04)',
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={15} style={{ color: cfg.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 13, color: alert.read ? colors.textSecondary : colors.textPrimary, fontWeight: alert.read ? 400 : 500 }}>{alert.message}</span>
                  <span style={{ fontSize: 11, color: colors.textSecondary, flexShrink: 0, marginLeft: 16 }}>{alert.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ padding: '2px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, background: cfg.bg, color: cfg.color }}>{alert.type}</span>
                  {!alert.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a6dff', display: 'inline-block' }} />}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: colors.textSecondary }}>
            <CheckCircle size={32} style={{ color: colors.green, marginBottom: 8 }} />
            <div>No alerts in this category.</div>
          </div>
        )}
      </Card>
    </div>
  );
}
