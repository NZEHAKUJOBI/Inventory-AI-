import Card from '../components/Card';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts';
import { monthlyData, stockMovementData, categoryData, inventoryItems } from '../data/dummyData';
import { TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{ background: '#0d1b2a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ margin: '0 0 4px', color: '#8facc8' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ margin: '2px 0', color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const turnoverRate = 4.6;

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPIs */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { label: 'Inventory Turnover Rate', value: turnoverRate, sub: '+15.2% vs last month', color: '#22c55e' },
          { label: 'Total Wastage Value',      value: '₦ 1,250,000', sub: '-8.6% vs last month', color: '#ef4444' },
          { label: 'Fast Moving SKUs',         value: '5',            sub: 'Top performers',       color: '#1a6dff' },
          { label: 'Avg Days to Stockout',     value: '18 days',      sub: 'Based on consumption', color: '#f59e0b' },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 11, color: '#8facc8' }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, margin: '6px 0 2px' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#8facc8', display: 'flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={11} style={{ color: s.color }} />{s.sub}
            </div>
          </Card>
        ))}
      </div>

      {/* Monthly bar chart */}
      <Card>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#e8f0fe' }}>Monthly Stock Movement</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData} barGap={4}>
            <XAxis dataKey="month" tick={{ fill: '#8facc8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8facc8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#8facc8' }} />
            <Bar dataKey="received" name="Received" fill="#1a6dff" radius={[4,4,0,0]} />
            <Bar dataKey="issued"   name="Issued"   fill="#22c55e" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Bottom row */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Stock movement line */}
        <Card style={{ flex: 2, minWidth: 280 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#e8f0fe' }}>Stock Movement (This Week)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={stockMovementData}>
              <XAxis dataKey="day" tick={{ fill: '#8facc8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8facc8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="stockIn"  stroke="#1a6dff" strokeWidth={2} dot={false} name="Stock In"  />
              <Line type="monotone" dataKey="stockOut" stroke="#22c55e" strokeWidth={2} dot={false} name="Stock Out" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Fast Moving Products */}
        <Card style={{ flex: 1, minWidth: 220 }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 600, color: '#e8f0fe' }}>Top Fast Moving Products</h3>
          {[
            { name: 'Paracetamol 500mg',  units: 4250 },
            { name: 'Amoxicillin 500mg',  units: 3120 },
            { name: 'Vitamin C 1000mg',   units: 2860 },
            { name: 'IV Fluids 500ml',    units: 2450 },
            { name: 'Diclofenac 50mg',    units: 1980 },
          ].map((p, i) => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#8facc8', width: 16 }}>{i+1}.</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#e8f0fe' }}>{p.name}</div>
                <div style={{ background: '#1e3a5f', borderRadius: 3, height: 4, marginTop: 4 }}>
                  <div style={{ width: `${(p.units/4250)*100}%`, background: '#1a6dff', borderRadius: 3, height: '100%' }} />
                </div>
              </div>
              <span style={{ fontSize: 11, color: '#8facc8', minWidth: 40 }}>{p.units.toLocaleString()}</span>
            </div>
          ))}
        </Card>

        {/* Category breakdown donut */}
        <Card style={{ flex: 1, minWidth: 200 }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 600, color: '#e8f0fe' }}>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categoryData} innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {categoryData.map((c,i) => <Cell key={i} fill={c.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 8 }}>
            {categoryData.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, fontSize: 11 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, display: 'inline-block' }} />
                <span style={{ flex: 1, color: '#8facc8' }}>{c.name}</span>
                <span style={{ color: '#e8f0fe', fontWeight: 600 }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
