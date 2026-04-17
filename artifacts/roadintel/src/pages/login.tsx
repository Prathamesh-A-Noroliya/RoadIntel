import { useState } from "react";
import { Link } from "wouter";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#0F172A" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(14,165,164,0.08) 0%, transparent 60%)" }} />
      <div className="relative w-full max-w-md">
        <div className="p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#0EA5A4" }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white" style={{ fontFamily: "Sora, sans-serif" }}>RoadIntel</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Intelligence Platform</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Sora, sans-serif" }}>Sign In</h1>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>Access road intelligence and accountability tools.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white", "--tw-ring-color": "#0EA5A4" } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs" style={{ color: "#0EA5A4" }}>Forgot password?</a>
              </div>
            </div>
            <Link href="/dashboard">
              <button className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2" style={{ background: "#0EA5A4" }}>
                Sign In
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="w-full py-3 rounded-xl text-sm font-semibold mt-1" style={{ border: "1px solid rgba(14,165,164,0.4)", color: "#0EA5A4" }}>
                Demo Access — No Signup Required
              </button>
            </Link>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Don't have an account?{" "}
            <Link href="/register"><span className="cursor-pointer" style={{ color: "#0EA5A4" }}>Create account</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}
