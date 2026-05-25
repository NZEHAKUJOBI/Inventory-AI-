import { useState } from 'react';
import Card from '../components/Card';
import { inventoryItems } from '../data/dummyData';
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

const ALL_CATEGORIES = ['All Categories', ...new Set(inventoryItems.map(i => i.category))];
const ALL_WAREHOUSES  = ['All Warehouses',  ...new Set(inventoryItems.map(i => i.warehouse))];

export default function Inventory() {
  const { colors } = useTheme();
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('All Categories');
  const [warehouse, setWarehouse] = useState('All Warehouses');

  const STATUS_COLORS = {
    'In Stock':     { bg: colors.greenLight,  text: colors.green },
    'Low Stock':    { bg: colors.yellowLight, text: colors.yellow },
    'Out of Stock': { bg: colors.redLight,    text: colors.red },
  };

  const filtered = inventoryItems.filter(item => {
    const matchSearch = item.product.toLowerCase().includes(search.toLowerCase()) ||
                        item.batch.toLowerCase().includes(search.toLowerCase());
    const matchCat  = category  === 'All Categories' || item.category  === category;
    const matchWH   = warehouse === 'All Warehouses'  || item.warehouse === warehouse;
    return matchSearch && matchCat && matchWH;
  });

  const selectStyle = {
    background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: 7,
    color: colors.textPrimary, padding: '7px 10px', fontSize: 12, outline: 'none', cursor: 'pointer'
  };

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary strip */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Items',    value: inventoryItems.length,                                                  color: '#1a6dff' },
          { label: 'In Stock',       value: inventoryItems.filter(i=>i.status==='In Stock').length,             color: colors.green },
          { label: 'Low Stock',      value: inventoryItems.filter(i=>i.status==='Low Stock').length,            color: colors.yellow },
          { label: 'Out of Stock',   value: inventoryItems.filter(i=>i.status==='Out of Stock').length,         color: colors.red },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 130, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: colors.textSecondary }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Table card */}
      <Card style={{ padding: 0 }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderBottom: `1px solid ${colors.border}`, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: 7, padding: '7px 12px', flex: 1, minWidth: 180 }}>
            <Search size={13} style={{ color: colors.textSecondary }} />
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search by product, batch or barcode…"
              style={{ background: 'none', border: 'none', outline: 'none', color: colors.textPrimary, fontSize: 12, width: '100%' }} />
          </div>
          <select value={category} onChange={e=>setCategory(e.target.value)} style={selectStyle}>
            {ALL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={warehouse} onChange={e=>setWarehouse(e.target.value)} style={selectStyle}>
            {ALL_WAREHOUSES.map(w => <option key={w}>{w}</option>)}
          </select>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#1a6dff', border: 'none', borderRadius: 7, color: '#fff', padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={13} /> Add Item
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {['Product','Batch No.','Category','Warehouse','Quantity','Expiry','Status','Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 20px', color: colors.textSecondary, fontWeight: 500, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => {
                const s = STATUS_COLORS[item.status] || {};
                return (
                  <tr key={item.id} style={{ borderBottom: `1px solid ${colors.border}`, background: idx % 2 === 0 ? 'transparent' : colors.rowAlt }}>
                    <td style={{ padding: '12px 20px', color: colors.textPrimary, fontWeight: 500 }}>{item.product}</td>
                    <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{item.batch}</td>
                    <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{item.category}</td>
                    <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{item.warehouse}</td>
                    <td style={{ padding: '12px 20px', color: colors.textPrimary, fontWeight: 600 }}>{item.qty.toLocaleString()}</td>
                    <td style={{ padding: '12px 20px', color: colors.textSecondary }}>{item.expiry}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: s.bg, color: s.text }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <button style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}>
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} style={{ padding: 40, textAlign: 'center', color: colors.textSecondary }}>No items match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination strip */}
        <div style={{ padding: '12px 20px', borderTop: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: colors.textSecondary }}>Showing {filtered.length} of {inventoryItems.length} items</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Prev','1','2','3','Next'].map(p => (
              <button key={p} style={{
                padding: '4px 10px', borderRadius: 6, border: `1px solid ${colors.border}`,
                background: p==='1' ? '#1a6dff' : colors.cardBg, color: p==='1' ? '#fff' : colors.textSecondary,
                fontSize: 12, cursor: 'pointer'
              }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
