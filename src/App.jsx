import { useState } from "react";
import "./index.css";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import ExpiryCenter from "./pages/ExpiryCenter";
import Warehouse from "./pages/Warehouse";
import Purchases from "./pages/Purchases";
import Suppliers from "./pages/Suppliers";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const PAGE_META = {
  dashboard: { title: "Dashboard",           subtitle: "Executive Overview - Klen Pharmaceuticals Ltd" },
  inventory: { title: "Inventory Monitor",   subtitle: "Track and manage all stock items" },
  expiry:    { title: "Expiry Center",        subtitle: "Monitor product expiry dates" },
  warehouse: { title: "Warehouse Overview",  subtitle: "Storage locations and utilization" },
  purchases: { title: "Purchases",           subtitle: "Purchase orders and reorder management" },
  suppliers: { title: "Suppliers",           subtitle: "Vendor directory and performance" },
  analytics: { title: "Analytics & Insights",subtitle: "Trends, turnover and movement data" },
  alerts:    { title: "Alerts & Notifications", subtitle: "Real-time stock and expiry alerts" },
  reports:   { title: "Reports",             subtitle: "Inventory summary and export" },
  settings:  { title: "Settings",            subtitle: "System preferences and configuration" },
};

const PAGES = {
  dashboard: Dashboard,
  inventory: Inventory,
  expiry:    ExpiryCenter,
  warehouse: Warehouse,
  purchases: Purchases,
  suppliers: Suppliers,
  analytics: Analytics,
  alerts:    Alerts,
  reports:   Reports,
  settings:  Settings,
};

function AppShell() {
  const [page, setPage] = useState("dashboard");
  const { colors } = useTheme();
  const Page = PAGES[page] || Dashboard;
  const meta = PAGE_META[page] || {};

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: colors.appBg }}>
      <Sidebar active={page} onNavigate={setPage} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar title={meta.title} subtitle={meta.subtitle} />
        <main style={{ flex: 1, overflowY: "auto" }}>
          <Page />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
