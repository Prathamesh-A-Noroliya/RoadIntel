import { useState } from "react";
import { Check, Zap, Shield, Globe, CreditCard, Lock } from "lucide-react";

const PLANS = [
  {
    id: "citizen",
    name: "Citizen",
    price: "Free",
    period: "",
    color: "#0EA5A4",
    description: "For individual citizens and reporters",
    features: [
      "File up to 5 complaints/month",
      "View road profiles",
      "Quick Scan (3/month)",
      "Basic AI assistant",
      "Complaint tracking",
    ],
    cta: "Current Plan",
    disabled: true,
  },
  {
    id: "pro",
    name: "Pro Citizen",
    price: "₹199",
    period: "/month",
    color: "#1E88E5",
    badge: "Most Popular",
    description: "For active journalists and civic groups",
    features: [
      "Unlimited complaints",
      "Unlimited Quick Scans",
      "Full AI assistant access",
      "Voice + multilingual AI",
      "Export reports (PDF/CSV)",
      "Priority complaint routing",
      "SOS emergency features",
      "Email notifications",
    ],
    cta: "Subscribe Pro",
    disabled: false,
  },
  {
    id: "enterprise",
    name: "Government / NGO",
    price: "₹2,999",
    period: "/month",
    color: "#7C3AED",
    description: "For government bodies and large NGOs",
    features: [
      "Everything in Pro",
      "API access for integration",
      "Custom jurisdiction config",
      "Contractor accountability dashboard",
      "Budget audit tools",
      "Multi-user team accounts",
      "Dedicated support",
      "White-label options",
      "Advanced corruption analytics",
    ],
    cta: "Contact Sales",
    disabled: false,
  },
];

export default function Subscribe() {
  const [selected, setSelected] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "" });

  const handlePay = () => {
    if (!form.name || !form.email || !form.card) return;
    setTimeout(() => { setPaid(true); }, 800);
  };

  if (paid) {
    return (
      <div className="p-6 flex flex-col items-center justify-center gap-6 min-h-96">
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(22,163,74,0.15)" }}>
          <Check className="w-10 h-10" style={{ color: "#16A34A" }} />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>Subscription Activated!</h2>
          <p className="text-muted-foreground mt-2">Thank you for subscribing to RoadIntel Pro.</p>
          <p className="text-xs text-muted-foreground mt-1">A confirmation email has been sent (demo mode).</p>
        </div>
        <button onClick={() => { setPaid(false); setSelected(null); }}
          className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "#0EA5A4" }}>
          Back to Plans
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(14,165,164,0.15)", color: "#0EA5A4" }}>
            Subscription Plans
          </div>
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>Choose Your Plan</h1>
        <p className="text-muted-foreground">Unlock the full power of RoadIntel for your civic work</p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map(plan => (
          <div key={plan.id}
            className="rounded-2xl p-6 flex flex-col gap-4 relative cursor-pointer transition-all"
            style={{
              background: "hsl(var(--card))",
              border: `2px solid ${selected === plan.id ? plan.color : "hsl(var(--border))"}`,
              transform: selected === plan.id ? "scale(1.02)" : "scale(1)",
            }}
            onClick={() => !plan.disabled && setSelected(plan.id)}>
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: plan.color }}>
                {plan.badge}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${plan.color}20` }}>
                  {plan.id === "citizen" ? <Globe className="w-4 h-4" style={{ color: plan.color }} /> :
                    plan.id === "pro" ? <Zap className="w-4 h-4" style={{ color: plan.color }} /> :
                      <Shield className="w-4 h-4" style={{ color: plan.color }} />}
                </div>
                <span className="font-bold text-sm">{plan.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{plan.description}</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold" style={{ fontFamily: "Sora, sans-serif", color: plan.color }}>{plan.price}</span>
              {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
            </div>
            <ul className="space-y-2 flex-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: plan.color }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              disabled={plan.disabled}
              onClick={(e) => { e.stopPropagation(); if (!plan.disabled) setSelected(plan.id); }}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
              style={{ background: plan.disabled ? "hsl(var(--muted))" : plan.color, color: plan.disabled ? "hsl(var(--muted-foreground))" : "white" }}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Payment form */}
      {selected && selected !== "citizen" && (
        <div className="rounded-2xl p-6 max-w-lg mx-auto space-y-5" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" style={{ color: "#0EA5A4" }} />
            <h3 className="font-bold" style={{ fontFamily: "Sora, sans-serif" }}>
              Subscribe to {PLANS.find(p => p.id === selected)?.name}
            </h3>
            <Lock className="w-4 h-4 ml-auto text-muted-foreground" />
          </div>

          <div className="px-3 py-2 rounded-xl text-xs" style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.3)", color: "#F5A623" }}>
            Demo mode: No real payment is processed. This is a prototype integration.
          </div>

          {[
            { key: "name", label: "Full Name", placeholder: "Rajesh Kumar" },
            { key: "email", label: "Email Address", placeholder: "you@example.com" },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">{f.label}</label>
              <input
                value={(form as any)[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Card Number</label>
            <input
              value={form.card}
              onChange={e => setForm(prev => ({ ...prev, card: e.target.value }))}
              placeholder="4111 1111 1111 1111"
              maxLength={19}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none font-mono"
              style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[{ key: "expiry", label: "Expiry", placeholder: "MM/YY" }, { key: "cvv", label: "CVV", placeholder: "123" }].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium mb-1.5 text-muted-foreground">{f.label}</label>
                <input
                  value={(form as any)[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                />
              </div>
            ))}
          </div>

          <button onClick={handlePay}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
            style={{ background: PLANS.find(p => p.id === selected)?.color ?? "#0EA5A4" }}>
            <Lock className="w-4 h-4" />
            Pay {PLANS.find(p => p.id === selected)?.price}{PLANS.find(p => p.id === selected)?.period} — Subscribe
          </button>
        </div>
      )}

      {/* Trust badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
        {["SSL Secured", "No hidden fees", "Cancel anytime", "Data never sold", "GDPR compliant"].map(badge => (
          <div key={badge} className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" style={{ color: "#16A34A" }} />
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
