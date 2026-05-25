import { useState } from 'react';
import Card from '../components/Card';
import { purchases, reorderSuggestions } from '../data/dummyData';
import { Plus, ShoppingCart } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function Purchases() {
  const { colors } = useTheme();
  const [tab, setTab] = useState('orders');

  const STATUS_COLORS = {
    'Delivered':  { bg: colors.greenLight,  text: colors.green },
    'In Transit': { bg: colors.accentLight, text: colors.accent },
    'Pending':    { bg: colors.yellowLight, text: colors.yellow },
    'Cancelled':  { bg: colors.redLight,    text: colors.red },
  };

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Orders',     value: purchases.length, color: '#1a6dff' },
          { label: 'Delivered',        value: purchases.filter(p=>p.status==='Delivered').length, color: colors.green },
          { label: 'In Transit',       value: purchases.filter(p=>p.status==='In Transit').length, color: colors.yellow },
          { label: 'Total Spend (₦)',  value: '₦ ' + (purchases.reduce((a,p)=>a+p.amount,0)/1e6).toFixed(1)+'M', color: colors.purple },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 150, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: colors.textSecondary }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: 8, padding: 4, alignSelf: 'flex-start' }}>
        {[['orders','Purchase Orders'],['reorder','Reorder Suggestions']].map(([id,label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            background: tab===id ? '#1a6dff' : 'transparent', color: tab===id ? '#fff' : colors.textSecondary
          }}>{label}</button>
        ))}
      </div>

      {tab === 'orders' && (
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Purchase Orders</h3>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1a6dff', border: 'none', borderRadius: 7, color: '#fff', padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              <Plus size={13} /> New Order
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                  {['Order ID','Supplier','Date','Items','Amount (₦)','Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 20px', color: colors.textSecondary, fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchases.map((p, idx) => {
                  const s = STATUS_COLORS[p.status] || {};
                  return (
                    <tr key={p.id} style={{ borderBottom: `1px solid ${colors.border}`, background: idx%2===0?'transparent':colors.rowAlt }}>
                      <td style={{ padding: '12px 20px', color: '#1a6dff', fontWeight: 600 }}>{p.id}</td>
                      <td style={{ padding: '12px 20px', color: colors.textPrimary }}>{p.supplier}</td>
                      <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{p.date}</td>
                      <td style={{ padding: '12px 20px', color: colors.textPrimary }}>{p.items}</td>
                      <td style={{ padding: '12px 20px', color: colors.textPrimary, fontWeight: 600 }}>₦ {p.amount.toLocaleString()}</td>
                      <td style={{ padding: '12px 20px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: s.bg, color: s.text }}>{p.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'reorder' && (
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Reorder Suggestions</h3>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: colors.textSecondary }}>{reorderSuggestions.length} products suggested for reorder</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#22c55e', border: 'none', borderRadius: 7, color: '#fff', padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              <ShoppingCart size={13} /> Generate Purchase List
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                  {['Product','Current Stock','Reorder Level','Suggested Qty','Action'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 20px', color: colors.textSecondary, fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reorderSuggestions.map((r, idx) => (
                  <tr key={r.id} style={{ borderBottom: `1px solid ${colors.border}`, background: idx%2===0?'transparent':colors.rowAlt }}>
                    <td style={{ padding: '12px 20px', color: colors.textPrimary, fontWeight: 500 }}>{r.product}</td>
                    <td style={{ padding: '12px 20px', color: r.currentStock===0?colors.red:r.currentStock<r.reorderLevel?colors.yellow:colors.green, fontWeight: 600 }}>{r.currentStock}</td>
                    <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{r.reorderLevel}</td>
                    <td style={{ padding: '12px 20px', color: '#1a6dff', fontWeight: 600 }}>{r.suggestedQty}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <button style={{ padding: '4px 12px', borderRadius: 6, border: 'none', background: '#1a6dff', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                        Add to PO
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
