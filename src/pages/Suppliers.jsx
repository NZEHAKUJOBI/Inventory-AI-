import Card from '../components/Card';
import { suppliers } from '../data/dummyData';
import { Plus, Star, Phone, Mail } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function Suppliers() {
  const { colors } = useTheme();
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Suppliers', value: suppliers.length,                                       color: '#1a6dff' },
          { label: 'Active',          value: suppliers.filter(s=>s.status==='Active').length,         color: colors.green },
          { label: 'Inactive',        value: suppliers.filter(s=>s.status==='Inactive').length,       color: colors.red },
          { label: 'Avg Rating',      value: (suppliers.reduce((a,s)=>a+s.rating,0)/suppliers.length).toFixed(1), color: colors.yellow },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 150, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: colors.textSecondary }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Supplier cards */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {suppliers.map(sup => (
          <Card key={sup.id} style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: '#1a6dff22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, color: '#1a6dff'
                }}>
                  {sup.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.textPrimary }}>{sup.name}</div>
                  <div style={{ fontSize: 11, color: colors.textSecondary }}>{sup.category}</div>
                </div>
              </div>
              <span style={{
                padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                background: sup.status==='Active'?colors.greenLight:colors.redLight,
                color: sup.status==='Active'?colors.green:colors.red
              }}>{sup.status}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={12} style={{ color: colors.textSecondary }} />
                <span style={{ color: colors.textSecondary }}>{sup.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={12} style={{ color: colors.textSecondary }} />
                <span style={{ color: colors.textSecondary }}>{sup.email}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: `1px solid ${colors.border}`, fontSize: 12 }}>
              <div>
                <div style={{ color: colors.textSecondary }}>Orders</div>
                <div style={{ color: colors.textPrimary, fontWeight: 600, marginTop: 2 }}>{sup.orders}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: colors.textSecondary }}>Rating</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <Star size={12} style={{ color: colors.yellow, fill: colors.yellow }} />
                  <span style={{ color: colors.yellow, fontWeight: 700 }}>{sup.rating}</span>
                </div>
              </div>
              <button style={{ padding: '5px 14px', borderRadius: 7, border: '1px solid #1a6dff', background: 'transparent', color: '#1a6dff', fontSize: 11, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-end' }}>
                View
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add supplier CTA */}
      <button style={{
        alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8,
        background: '#1a6dff', border: 'none', borderRadius: 8, color: '#fff',
        padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer'
      }}>
        <Plus size={15} /> Add New Supplier
      </button>
    </div>
  );
}
