import Card from '../components/Card';
import { expiryItems } from '../data/dummyData';
import { AlertTriangle, Clock, XCircle } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function ExpiryCenter() {
  const { colors } = useTheme();
  const nearExpiry = expiryItems.filter(i => i.status === 'Near Expiry');
  const expired    = expiryItems.filter(i => i.status === 'Expired');
  const good       = expiryItems.filter(i => i.status === 'Good');

  const badge = (status, daysLeft) => {
    if (status === 'Expired')     return { bg: colors.redLight,    text: colors.red,    label: 'Expired' };
    if (daysLeft <= 20)           return { bg: colors.redLight,    text: colors.red,    label: `${daysLeft} days` };
    if (daysLeft <= 35)           return { bg: colors.yellowLight, text: colors.yellow, label: `${daysLeft} days` };
    return                               { bg: colors.greenLight,  text: colors.green,  label: `${daysLeft} days` };
  };

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Stat strip */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Near Expiry',      value: nearExpiry.length, sub: '≤ 30 days',    color: '#f59e0b', icon: Clock       },
          { label: 'Very Near Expiry', value: nearExpiry.filter(i=>i.daysLeft<=20).length, sub: '≤ 20 days', color: '#ef4444', icon: AlertTriangle },
          { label: 'Expired Items',    value: expired.length,    sub: 'Action needed', color: '#ef4444', icon: XCircle    },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginTop: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: colors.textSecondary, marginTop: 2 }}>{s.sub}</div>
              </div>
              <s.icon size={28} style={{ color: s.color, opacity: 0.6 }} />
            </div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Expiry Tracking</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {['All','Near Expiry','Expired','Good'].map(f => (
              <button key={f} style={{
                padding: '4px 12px', borderRadius: 6, border: `1px solid ${colors.border}`,
                background: f==='All' ? '#1a6dff' : colors.cardBg, color: f==='All' ? '#fff' : colors.textSecondary,
                fontSize: 11, cursor: 'pointer', fontWeight: f==='All' ? 600 : 400
              }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {['Product','Batch No.','Expiry Date','Days Left','Status','Action'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 20px', color: colors.textSecondary, fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expiryItems.map((item, idx) => {
                const b = badge(item.status, item.daysLeft);
                return (
                  <tr key={item.id} style={{ borderBottom: `1px solid ${colors.border}`, background: idx%2===0?'transparent':colors.rowAlt }}>
                    <td style={{ padding: '12px 20px', color: colors.textPrimary, fontWeight: 500 }}>{item.product}</td>
                    <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{item.batch}</td>
                    <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{item.expiry}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: b.bg, color: b.text }}>
                        {b.label}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{item.status}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <button style={{
                        padding: '4px 12px', borderRadius: 6, border: '1px solid #1a6dff',
                        background: 'transparent', color: '#1a6dff', fontSize: 11, cursor: 'pointer', fontWeight: 500
                      }}>View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recommendations */}
      <Card>
        <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Recommended Actions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: XCircle,      color: colors.red,    msg: 'Diclofenac 50mg (DIC0165) has expired — remove from shelves immediately.' },
            { icon: XCircle,      color: colors.red,    msg: 'Artemether 80mg (ART88001) has expired — initiate disposal procedure.' },
            { icon: AlertTriangle,color: colors.yellow, msg: 'Amoxicillin 500mg (AMX2324) expires in 18 days — prioritize dispensing.' },
            { icon: AlertTriangle,color: colors.yellow, msg: 'Ciprofloxacin 250mg (CIP1023) expires in 24 days — consider redistribution.' },
          ].map((r,i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: `${r.color}11`, border: `1px solid ${r.color}33`, borderRadius: 8 }}>
              <r.icon size={15} style={{ color: r.color, marginTop: 1, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: colors.textPrimary }}>{r.msg}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
