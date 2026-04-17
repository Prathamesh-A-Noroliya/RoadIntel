import { useState } from "react";
import { useListComplaints, useCreateComplaint, useGetComplaintStats } from "@workspace/api-client-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, MapPin, AlertTriangle, CheckCircle, Clock, Plus, X } from "lucide-react";
import { getRiskColor } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  pending: "#F59E0B", in_progress: "#0EA5A4", resolved: "#16A34A", escalated: "#DC2626",
};

const MOCK_COMPLAINTS = [
  { id: 1, complaintId: "CMP-2024-001", title: "Large pothole causing vehicle damage", location: "MG Road, Bangalore", status: "in_progress", severity: "high", issueType: "Pothole", createdAt: "2024-04-10", assignedDepartment: "BBMP Roads Division" },
  { id: 2, complaintId: "CMP-2024-002", title: "Road collapse near metro station", location: "Andheri-Kurla Road, Mumbai", status: "pending", severity: "critical", issueType: "Road Collapse", createdAt: "2024-04-12", assignedDepartment: "MCGM Roads Department" },
  { id: 3, complaintId: "CMP-2024-003", title: "Severe cracks along NH-48", location: "NH-48, Delhi-Gurugram", status: "resolved", severity: "high", issueType: "Cracking", createdAt: "2024-04-05", assignedDepartment: "NHAI Region-I" },
  { id: 4, complaintId: "CMP-2024-004", title: "Waterlogging and surface damage", location: "GST Road, Chennai", status: "pending", severity: "medium", issueType: "Waterlogging", createdAt: "2024-04-14", assignedDepartment: "Chennai Corporation Roads" },
  { id: 5, complaintId: "CMP-2024-005", title: "Dangerous road near hospital", location: "AIIMS Delhi Stretch", status: "escalated", severity: "critical", issueType: "Surface Damage", createdAt: "2024-04-15", assignedDepartment: "PWD Delhi" },
  { id: 6, complaintId: "CMP-2024-006", title: "Potholes on expressway ramp", location: "Mumbai-Pune Expressway", status: "resolved", severity: "medium", issueType: "Pothole", createdAt: "2024-04-08", assignedDepartment: "MSRDC" },
];

const MOCK_STATS = {
  byStatus: [{ status: "Pending", count: 2 }, { status: "In Progress", count: 1 }, { status: "Resolved", count: 2 }, { status: "Escalated", count: 1 }],
  byType: [{ type: "Pothole", count: 2 }, { type: "Cracking", count: 1 }, { type: "Collapse", count: 1 }, { type: "Other", count: 2 }],
};

function NewComplaintModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ title: "", description: "", location: "", severity: "medium", issueType: "Pothole", reportedBy: "" });
  const create = useCreateComplaint();
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    await create.mutateAsync({ ...form });
    onClose();
  };

  const inputStyle: React.CSSProperties = { background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-lg rounded-2xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
          <h2 className="font-bold" style={{ fontFamily: "Sora, sans-serif" }}>File New Complaint</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Complaint Title</label>
            <input value={form.title} onChange={set("title")} placeholder="Brief description of the issue" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Severity</label>
              <select value={form.severity} onChange={set("severity")} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Issue Type</label>
              <select value={form.issueType} onChange={set("issueType")} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle}>
                {["Pothole", "Cracking", "Road Collapse", "Waterlogging", "Surface Damage", "Edge Damage", "Other"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Location</label>
            <input value={form.location} onChange={set("location")} placeholder="Road name, area, city" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Description</label>
            <textarea value={form.description} onChange={set("description")} placeholder="Describe the issue in detail..." rows={3} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={inputStyle} />
          </div>
          <div className="p-3 rounded-xl text-xs" style={{ background: "rgba(14,165,164,0.1)", border: "1px solid rgba(14,165,164,0.2)", color: "#0EA5A4" }}>
            AI will automatically classify the issue, suggest routing to the correct department, and generate a complaint ID.
          </div>
          <button onClick={submit} disabled={create.isPending} className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#0EA5A4" }}>
            {create.isPending ? "Filing Complaint..." : "Submit Complaint"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Complaints() {
  const { data: complaints, isLoading } = useListComplaints();
  const { data: stats } = useGetComplaintStats();
  const [showModal, setShowModal] = useState(false);

  const list = complaints ?? MOCK_COMPLAINTS;
  const s = stats ?? MOCK_STATS;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Sora, sans-serif" }}>Complaint Management</h1>
          <p className="text-sm text-muted-foreground mt-1">File, track, and monitor road complaints</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#0EA5A4" }}>
          <Plus className="w-4 h-4" /> File Complaint
        </button>
      </div>

      {/* Stats row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <h3 className="font-semibold mb-4" style={{ fontFamily: "Sora, sans-serif" }}>Complaints by Status</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={s.byStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={30} outerRadius={50}>
                  {s.byStatus.map((entry: any, i: number) => (
                    <Cell key={i} fill={["#F59E0B", "#0EA5A4", "#16A34A", "#DC2626"][i % 4]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {s.byStatus.map((item: any, i: number) => (
                <div key={item.status} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full" style={{ background: ["#F59E0B", "#0EA5A4", "#16A34A", "#DC2626"][i % 4] }} />
                  <span className="text-muted-foreground">{item.status}</span>
                  <span className="font-bold ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <h3 className="font-semibold mb-4" style={{ fontFamily: "Sora, sans-serif" }}>Issue Type Breakdown</h3>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={s.byType} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="type" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="count" fill="#0EA5A4" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Complaints list */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted))" }}>
              {["ID", "Complaint", "Location", "Type", "Severity", "Department", "Status", "Date"].map(h => (
                <th key={h} className="text-left text-xs font-semibold px-4 py-3 text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}><td colSpan={8} className="px-4 py-3"><div className="h-4 rounded animate-pulse" style={{ background: "hsl(var(--muted))" }} /></td></tr>
              ))
            ) : list.map((c: any) => (
              <tr key={c.id} className="hover:opacity-80 transition-opacity">
                <td className="px-4 py-3 text-xs font-mono" style={{ color: "#0EA5A4" }}>{c.complaintId}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-sm max-w-xs truncate">{c.title}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {c.location}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{c.issueType}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${getRiskColor(c.severity)}20`, color: getRiskColor(c.severity) }}>
                    {c.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground max-w-[140px] truncate">{c.assignedDepartment}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: `${STATUS_COLORS[c.status] ?? "#64748B"}20`, color: STATUS_COLORS[c.status] ?? "#64748B" }}>
                    {c.status?.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{c.createdAt?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <NewComplaintModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
