import Card from '../components/Card';
import { warehouses, inventoryItems } from '../data/dummyData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Warehouse as WarehouseIcon, MapPin, Package, TrendingUp } from 'lucide-react';

const fmt = n => '₦ ' + n.toLocaleString();

export default function Warehouse() {
  const totalItems = warehouses.reduce((a, w) => a + w.items, 0);

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header KPIs */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Warehouses',    value: '4',      sub: 'Across Nigeria',     color: '#1a6dff', icon: WarehouseIcon },
          { label: 'Inventory Accuracy',  value: '98.3%',  sub: 'Avg across all',     color: '#22c55e', icon: TrendingUp    },
          { label: 'Total Locations',     value: '1,230',  sub: 'Storage slots',      color: '#f59e0b', icon: MapPin        },
          { label: 'Utilization Rate',    value: '78%',    sub: 'Average fill rate',  color: '#a855f7', icon: Package       },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 170 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: '#8facc8' }}>{s.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: s.color, margin: '6px 0 2px' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#8facc8' }}>{s.sub}</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `${s.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Warehouse cards */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {warehouses.map(w => (
          <Card key={w.id} style={{ flex: 1, minWidth: 230 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e8f0fe' }}>{w.name}</div>
                <div style={{ fontSize: 11, color: '#8facc8', marginTop: 2 }}>{w.items} items &nbsp;·&nbsp; {fmt(w.value)}</div>
              </div>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: w.color, display: 'inline-block', marginTop: 4 }} />
            </div>

            {/* Utilization bar */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
                <span style={{ color: '#8facc8' }}>Utilization</span>
                <span style={{ color: w.color, fontWeight: 600 }}>{w.utilization}%</span>
              </div>
              <div style={{ background: '#1e3a5f', borderRadius: 4, height: 6 }}>
                <div style={{ width: `${w.utilization}%`, background: w.color, borderRadius: 4, height: '100%' }} />
              </div>
            </div>

            {/* Accuracy bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
                <span style={{ color: '#8facc8' }}>Accuracy</span>
                <span style={{ color: '#22c55e', fontWeight: 600 }}>{w.accuracy}%</span>
              </div>
              <div style={{ background: '#1e3a5f', borderRadius: 4, height: 6 }}>
                <div style={{ width: `${w.accuracy}%`, background: '#22c55e', borderRadius: 4, height: '100%' }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detail table */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #1e3a5f' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#e8f0fe' }}>Warehouse Inventory Breakdown</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                {['Warehouse','Total Items','Value (₦)','Utilization','Accuracy','Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 20px', color: '#8facc8', fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {warehouses.map((w, idx) => (
                <tr key={w.id} style={{ borderBottom: '1px solid #1e3a5f', background: idx%2===0?'transparent':'rgba(30,58,95,0.15)' }}>
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: w.color, display: 'inline-block' }} />
                      <span style={{ color: '#e8f0fe', fontWeight: 500 }}>{w.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 20px', color: '#e8f0fe' }}>{w.items.toLocaleString()}</td>
                  <td style={{ padding: '12px 20px', color: '#e8f0fe' }}>{fmt(w.value)}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, background: '#1e3a5f', borderRadius: 3, height: 5 }}>
                        <div style={{ width: `${w.utilization}%`, background: w.color, borderRadius: 3, height: '100%' }} />
                      </div>
                      <span style={{ color: w.color, fontSize: 11, fontWeight: 600 }}>{w.utilization}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 20px', color: '#22c55e', fontWeight: 600 }}>{w.accuracy}%</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: '#22c55e22', color: '#22c55e' }}>Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
