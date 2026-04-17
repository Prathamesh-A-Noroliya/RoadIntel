import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, FileText, Scan, Map, TrendingDown, Wallet,
  Radio, Users, BarChart3, Settings, Bell, Menu, X, ChevronRight,
  AlertTriangle, Shield, Activity
} from "lucide-react";
import { useListNotifications } from "@workspace/api-client-react";
import { ChatbotPanel } from "@/components/chatbot-panel";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "File Complaint", href: "/complaints", icon: FileText },
  { label: "Quick Scan", href: "/scan", icon: Scan },
  { label: "Road DNA", href: "/roads", icon: Map },
  { label: "Risk Map", href: "/risk-map", icon: TrendingDown },
  { label: "Public Spending", href: "/spending", icon: Wallet },
  { label: "Sensor Intel", href: "/sensors", icon: Radio },
  { label: "Contractors", href: "/contractors", icon: Users },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const { data: notifications } = useListNotifications();
  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "hsl(var(--sidebar))", borderRight: "1px solid hsl(var(--sidebar-border))" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--sidebar-primary))" }}>
            <Shield className="w-4 h-4" style={{ color: "hsl(var(--sidebar-primary-foreground))" }} />
          </div>
          <div>
            <div className="font-bold text-sm" style={{ fontFamily: "Sora, sans-serif", color: "hsl(var(--sidebar-foreground))" }}>
              RoadIntel
            </div>
            <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              v2.4.1 LIVE
            </div>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)} style={{ color: "hsl(var(--sidebar-foreground))" }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = location === href;
            return (
              <Link key={href} href={href}>
                <div
                  className="sidebar-item"
                  style={active ? {
                    background: "hsl(var(--sidebar-primary) / 0.15)",
                    color: "hsl(var(--sidebar-primary))",
                    borderLeft: "3px solid hsl(var(--sidebar-primary))",
                  } : {}}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                  {active && <ChevronRight className="w-3 h-3 ml-auto" />}
                  {label === "Sensor Intel" && (
                    <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full pulse-glow" style={{ background: "hsl(var(--sidebar-primary) / 0.2)", color: "hsl(var(--sidebar-primary))" }}>
                      LIVE
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom info */}
        <div className="px-4 py-4 border-t space-y-2" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
          <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            <Activity className="w-3 h-3" style={{ color: "#16A34A" }} />
            <span>All systems operational</span>
          </div>
          <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            Demo Mode — Apr 17, 2025
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-4 py-3 border-b shrink-0" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
          <button className="lg:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Welcome back, Demo User</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Link href="/dashboard">
                <button className="relative p-2 rounded-lg hover:bg-muted">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white" style={{ background: "#DC2626" }}>
                      {unreadCount}
                    </span>
                  )}
                </button>
              </Link>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "hsl(var(--sidebar-primary))" }}>
              D
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Chatbot FAB */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center pulse-glow"
        style={{ background: "hsl(var(--sidebar-primary))" }}
      >
        <AlertTriangle className="w-6 h-6 text-white" />
      </button>

      {chatOpen && <ChatbotPanel onClose={() => setChatOpen(false)} />}
    </div>
  );
}
