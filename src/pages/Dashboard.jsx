import Card from '../components/Card';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useTheme } from '../theme/ThemeContext';
import {
  stockMovementData, categoryData, inventoryItems, expiryItems,
  warehouses, reorderSuggestions
} from '../data/dummyData';
import { TrendingUp, TrendingDown, Package, AlertTriangle, XCircle, Clock } from 'lucide-react';

const fmt = (n) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', notation: 'compact', maximumFractionDigits: 1 }).format(n);

function StatCard({ label, value, change, icon: Icon, color, positive }) {
  const { colors } = useTheme();
  return (
    <Card style={{ flex: 1, minWidth: 160 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: colors.textSecondary }}>{label}</p>
          <p style={{ margin: '6px 0 4px', fontSize: 22, fontWeight: 700, color: colors.textPrimary }}>{value}</p>
          {change && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
              {positive ? <TrendingUp size={12} style={{ color: colors.green }} /> : <TrendingDown size={12} style={{ color: colors.red }} />}
              <span style={{ color: positive ? colors.green : colors.red }}>{change}</span>
              <span style={{ color: colors.textSecondary }}>vs last week</span>
            </div>
          )}
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: `${color}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  const { colors } = useTheme();
  if (!active || !payload) return null;
  return (
    <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ margin: 0, color: colors.textSecondary, marginBottom: 4 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ margin: '2px 0', color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { colors } = useTheme();
  const lowStock   = inventoryItems.filter(i => i.status === 'Low Stock').length;
  const outOfStock = inventoryItems.filter(i => i.status === 'Out of Stock').length;
  const nearExpiry = expiryItems.filter(i => i.status === 'Near Expiry').length;

  const statusData = [
    { name: 'In Stock',     value: inventoryItems.filter(i => i.status === 'In Stock').length, color: colors.green },
    { name: 'Low Stock',    value: lowStock,    color: colors.yellow },
    { name: 'Out of Stock', value: outOfStock,  color: colors.red },
  ];

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: 12, color: colors.textSecondary, background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: 6, padding: '4px 12px' }}>
          Last updated: Today, 10:30 AM &nbsp;|&nbsp; May 21 – May 28, 2024
        </span>
      </div>

      {/* KPI row */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <StatCard label="Total Inventory Value"  value="₦ 245,860,000" change="+12.5%" positive={true}  icon={Package}       color="#1a6dff" />
        <StatCard label="Total Items"            value="1,248"          change="+8.2%"  positive={true}  icon={Package}       color={colors.green} />
        <StatCard label="Low Stock Items"        value={lowStock}       change="-5.4%"  positive={false} icon={AlertTriangle}  color={colors.yellow} />
        <StatCard label="Out of Stock Items"     value={outOfStock}     change="-12.5%" positive={false} icon={XCircle}        color={colors.red} />
        <StatCard label="Near Expiry Items"      value={nearExpiry}     change="+3.7%"  positive={false} icon={Clock}          color={colors.purple} />
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Inventory Status donut */}
        <Card style={{ flex: 1, minWidth: 260 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Inventory Status</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ResponsiveContainer width={130} height={130}>
              <PieChart>
                <Pie data={statusData} innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={3}>
                  {statusData.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12 }}>
              {statusData.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                  <span style={{ color: colors.textSecondary }}>{s.name}</span>
                  <span style={{ color: colors.textPrimary, fontWeight: 600, marginLeft: 'auto' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Categories bar */}
        <Card style={{ flex: 2, minWidth: 300 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Top Categories</h3>
          {categoryData.map(c => (
            <div key={c.name} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: colors.textSecondary }}>{c.name}</span>
                <span style={{ color: colors.textPrimary, fontWeight: 600 }}>{c.value}%</span>
              </div>
              <div style={{ background: colors.border, borderRadius: 4, height: 6 }}>
                <div style={{ width: `${c.value}%`, background: c.color, borderRadius: 4, height: '100%' }} />
              </div>
            </div>
          ))}
        </Card>

        {/* Stock Movement line */}
        <Card style={{ flex: 2, minWidth: 300 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Stock Movement (This Week)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={stockMovementData}>
              <XAxis dataKey="day" tick={{ fill: colors.textSecondary, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: colors.textSecondary, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="stockIn"  stroke="#1a6dff" strokeWidth={2} dot={false} name="Stock In" />
              <Line type="monotone" dataKey="stockOut" stroke={colors.green} strokeWidth={2} dot={false} name="Stock Out" />
              <Legend wrapperStyle={{ fontSize: 11, color: colors.textSecondary }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Expiring Soon */}
        <Card style={{ flex: 1, minWidth: 280 }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Expiring Soon</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ color: colors.textSecondary }}>
                {['Product','Batch','Expiry','Days'].map(h => (
                  <th key={h} style={{ textAlign: 'left', paddingBottom: 8, fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expiryItems.slice(0,4).map(e => (
                <tr key={e.id} style={{ borderTop: `1px solid ${colors.border}` }}>
                  <td style={{ padding: '8px 0', color: colors.textPrimary }}>{e.product}</td>
                  <td style={{ color: colors.textSecondary }}>{e.batch}</td>
                  <td style={{ color: colors.textSecondary }}>{e.expiry}</td>
                  <td>
                    <span style={{
                      padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                      background: e.daysLeft < 25 ? colors.redLight : colors.yellowLight,
                      color: e.daysLeft < 25 ? colors.red : colors.yellow
                    }}>
                      {e.daysLeft < 0 ? 'Expired' : `${e.daysLeft} days`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Low Stock Alerts */}
        <Card style={{ flex: 1, minWidth: 260 }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Low Stock Alerts</h3>
          {inventoryItems.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').slice(0,4).map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <AlertTriangle size={14} style={{ color: item.status === 'Out of Stock' ? colors.red : colors.yellow, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: colors.textPrimary, fontWeight: 500 }}>{item.product}</div>
                <div style={{ fontSize: 11, color: colors.textSecondary }}>Current: {item.qty} &nbsp; Min: 100</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 5,
                background: item.status === 'Out of Stock' ? colors.redLight : colors.yellowLight,
                color: item.status === 'Out of Stock' ? colors.red : colors.yellow
              }}>{item.status}</span>
            </div>
          ))}
        </Card>

        {/* Warehouse Distribution */}
        <Card style={{ flex: 1, minWidth: 260 }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>Warehouse Distribution</h3>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={warehouses.map(w => ({ name: w.name, value: w.items }))} innerRadius={30} outerRadius={55} dataKey="value" paddingAngle={3}>
                  {warehouses.map((w, i) => <Cell key={i} fill={w.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 12 }}>
              {warehouses.map(w => (
                <div key={w.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: w.color, display: 'inline-block' }} />
                  <span style={{ color: colors.textSecondary }}>{w.name.replace(' Warehouse','')}</span>
                  <span style={{ color: colors.textPrimary, marginLeft: 'auto', fontWeight: 600 }}>
                    {Math.round(w.items / warehouses.reduce((a,x) => a+x.items, 0) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
