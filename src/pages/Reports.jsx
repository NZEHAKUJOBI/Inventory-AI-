import Card from '../components/Card';
import { inventorySummary } from '../data/dummyData';
import { Download, FileText, Filter } from 'lucide-react';

const fmt = n => '₦ ' + n.toLocaleString();

export default function Reports() {
  const totals = inventorySummary.reduce((acc, row) => ({
    openingStock: acc.openingStock + row.openingStock,
    received:     acc.received     + row.received,
    issued:       acc.issued       + row.issued,
    closingStock: acc.closingStock + row.closingStock,
    value:        acc.value        + row.value,
  }), { openingStock: 0, received: 0, issued: 0, closingStock: 0, value: 0 });

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#e8f0fe' }}>Inventory Summary Report</h2>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#8facc8' }}>Period: May 21 – May 28, 2024</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 7, border: '1px solid #1e3a5f', background: '#112233', color: '#8facc8', fontSize: 12, cursor: 'pointer' }}>
            <Filter size={13} /> Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 7, border: 'none', background: '#1a6dff', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* Totals */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Inventory Value', value: fmt(245860000),    color: '#1a6dff' },
          { label: 'Total Items',           value: '1,248',            color: '#e8f0fe' },
          { label: 'Total Received',        value: fmt(120450000),    color: '#22c55e' },
          { label: 'Total Issued',          value: fmt(98750000),     color: '#f59e0b' },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 180, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: '#8facc8' }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Summary table */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e3a5f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={15} style={{ color: '#1a6dff' }} />
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#e8f0fe' }}>Category Summary</h3>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Inventory','Purchases','Expiry'].map(r => (
              <button key={r} style={{
                padding: '4px 12px', borderRadius: 6, border: '1px solid #1e3a5f',
                background: r==='Inventory'?'#1a6dff':'#112233', color: r==='Inventory'?'#fff':'#8facc8',
                fontSize: 11, cursor: 'pointer'
              }}>{r}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                {['Category','Opening Stock','Received','Issued','Closing Stock','Value (₦)'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 20px', color: '#8facc8', fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventorySummary.map((row, idx) => (
                <tr key={row.category} style={{ borderBottom: '1px solid #1e3a5f', background: idx%2===0?'transparent':'rgba(30,58,95,0.15)' }}>
                  <td style={{ padding: '12px 20px', color: '#e8f0fe', fontWeight: 500 }}>{row.category}</td>
                  <td style={{ padding: '12px 20px', color: '#8facc8' }}>{row.openingStock.toLocaleString()}</td>
                  <td style={{ padding: '12px 20px', color: '#22c55e', fontWeight: 500 }}>+{row.received.toLocaleString()}</td>
                  <td style={{ padding: '12px 20px', color: '#ef4444', fontWeight: 500 }}>-{row.issued.toLocaleString()}</td>
                  <td style={{ padding: '12px 20px', color: '#e8f0fe', fontWeight: 600 }}>{row.closingStock.toLocaleString()}</td>
                  <td style={{ padding: '12px 20px', color: '#1a6dff', fontWeight: 600 }}>{fmt(row.value)}</td>
                </tr>
              ))}
              {/* Totals row */}
              <tr style={{ borderTop: '2px solid #1a6dff33', background: 'rgba(26,109,255,0.07)' }}>
                <td style={{ padding: '12px 20px', color: '#e8f0fe', fontWeight: 700 }}>TOTAL</td>
                <td style={{ padding: '12px 20px', color: '#8facc8', fontWeight: 700 }}>{totals.openingStock.toLocaleString()}</td>
                <td style={{ padding: '12px 20px', color: '#22c55e', fontWeight: 700 }}>+{totals.received.toLocaleString()}</td>
                <td style={{ padding: '12px 20px', color: '#ef4444', fontWeight: 700 }}>-{totals.issued.toLocaleString()}</td>
                <td style={{ padding: '12px 20px', color: '#e8f0fe', fontWeight: 700 }}>{totals.closingStock.toLocaleString()}</td>
                <td style={{ padding: '12px 20px', color: '#1a6dff', fontWeight: 700 }}>{fmt(totals.value)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
