import { useState } from "react";
import { Bell, Globe, Shield, Eye, Database, Download } from "lucide-react";

export default function Settings() {
  const [notifComplaints, setNotifComplaints] = useState(true);
  const [notifSensor, setNotifSensor] = useState(true);
  const [notifBudget, setNotifBudget] = useState(true);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [location, setLocation] = useState("Mumbai, MH");

  function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
      <button
        onClick={() => onChange(!value)}
        className="w-12 h-6 rounded-full relative transition-colors"
        style={{ background: value ? "#0EA5A4" : "hsl(var(--muted))" }}
      >
        <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: value ? "26px" : "2px" }} />
      </button>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile and platform preferences</p>
      </div>

      {/* Profile */}
      <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-4 h-4" style={{ color: "#0EA5A4" }} />
          <h3 className="font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>Profile</h3>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
              <input defaultValue="Demo User" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Mobile</label>
              <input defaultValue="+91 9876543210" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }} />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }} />
          </div>
          <button className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "#0EA5A4" }}>Save Profile</button>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-4 h-4" style={{ color: "#0EA5A4" }} />
          <h3 className="font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: "Complaint Updates", sub: "Notify when your complaints are updated", value: notifComplaints, onChange: setNotifComplaints },
            { label: "Sensor Alerts", sub: "Critical sensor anomalies near your location", value: notifSensor, onChange: setNotifSensor },
            { label: "Budget Alerts", sub: "Suspicious spending patterns flagged by AI", value: notifBudget, onChange: setNotifBudget },
          ].map(({ label, sub, value, onChange }) => (
            <div key={label} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
              <Toggle value={value} onChange={onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-4 h-4" style={{ color: "#0EA5A4" }} />
          <h3 className="font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>Preferences</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="kn">Kannada</option>
              <option value="ta">Tamil</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Theme</label>
            <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-4 h-4" style={{ color: "#0EA5A4" }} />
          <h3 className="font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>Privacy & Data</h3>
        </div>
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">Your data is used to improve road condition detection and provide localized alerts. No personal data is shared with contractors or authorities without consent.</div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "hsl(var(--muted))" }}>
              <Download className="w-4 h-4" /> Export My Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: "#DC262618", color: "#DC2626" }}>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* System info */}
      <div className="p-4 rounded-2xl" style={{ background: "hsl(var(--muted))" }}>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Platform Version: RoadIntel v2.4.1</div>
          <div>Demo Mode Active — Production data not connected</div>
          <div>Built for Hackathon 2025</div>
        </div>
      </div>
    </div>
  );
}
