import { Router } from "express";

const router = Router();

router.post("/ai/chatbot", async (req, res) => {
  const { message } = req.body;
  const msg = (message ?? "").toLowerCase();

  let response = "I can help you with road conditions, sensor data, complaints, and public spending. What would you like to know?";

  if (msg.includes("health") || msg.includes("score")) {
    response = "The average road health score across all monitored roads is 62/100. Critical roads include AIIMS Delhi Stretch (22/100) and Andheri-Kurla Road (28/100). I recommend immediate action on both.";
  } else if (msg.includes("mg road")) {
    response = "MG Road in Bangalore has a health score of 78/100 with medium risk. Two repair cycles have been completed by BuildRight Infrastructure. Budget utilization is at 105.6% of allocated funds. AI recommends a quality audit before any further work.";
  } else if (msg.includes("sensor") || msg.includes("anomal")) {
    response = "Today's sensor network shows 34 live anomalies. The most critical readings are on AIIMS Delhi Stretch (vibration: 9.8/10) and Andheri-Kurla Road (vibration: 9.1/10). Both roads are flagged for imminent failure risk.";
  } else if (msg.includes("corruption") || msg.includes("suspicious")) {
    response = "The AI Corruption Detector has flagged RoadCraft Solutions and QuickFix Road Services. RoadCraft shows 3 corruption flags — repeated repairs, budget overruns, and suspicious re-failure patterns. QuickFix has 7 corruption flags with the lowest trust score of 22/100.";
  } else if (msg.includes("spend") || msg.includes("money") || msg.includes("budget")) {
    response = "The platform is tracking ₹241.8 Crores allocated for road maintenance in FY 2024-25. Current spending stands at ₹253.1 Crores — a 4.7% overrun. ₹28.5 Crores are estimated as wasted on repeated repairs that should not have been necessary.";
  } else if (msg.includes("risk") || msg.includes("fail")) {
    response = "The AI Risk Map predicts 2 road failures within 7 days: AIIMS Delhi Stretch (97% risk) and Andheri-Kurla Road (94% risk). Within 30 days, 5 roads total are predicted to fail. Preventive action can save an estimated ₹8 Crores in emergency repairs.";
  } else if (msg.includes("aiims") || msg.includes("delhi")) {
    response = "AIIMS Delhi Stretch is in critical condition with a health score of 22/100 and 97% failure probability. Sensor vibration is at 9.8/10. Contractor QuickFix Road Services has been suspended. Immediate intervention by PWD Delhi is recommended.";
  } else if (msg.includes("andheri") || msg.includes("kurla") || msg.includes("mumbai")) {
    response = "Andheri-Kurla Road in Mumbai has a health score of 28/100. RoadCraft Solutions has managed this road through 8 repair cycles in 9 years — highly suspicious. AI has flagged this as a corruption case. Current sensor data shows 9.1/10 vibration intensity.";
  } else if (msg.includes("nh-48") || msg.includes("gurugram") || msg.includes("delhi-gurugram")) {
    response = "NH-48 (Delhi-Gurugram stretch) has a health score of 34/100 with high risk. This road has failed 5 times in 3 years under RoadCraft Solutions. AI corruption detector has flagged this pattern as statistically impossible under normal conditions.";
  }

  res.json({ response, timestamp: new Date().toISOString() });
});

router.get("/ai/insights", async (req, res) => {
  res.json([
    { id: 1, title: "High repeat failure risk on NH-48", description: "Road has failed 5 times in 3 years. Contractor shows suspicious pattern.", severity: "critical", confidence: 0.92, roadId: 2 },
    { id: 2, title: "Budget anomaly on Andheri-Kurla Road", description: "51% budget overrun with quality score of 28/100.", severity: "high", confidence: 0.87, roadId: 4 },
    { id: 3, title: "Predicted failure in 7 days: AIIMS Stretch", description: "Sensor data indicates imminent road failure.", severity: "critical", confidence: 0.95, roadId: 7 },
    { id: 4, title: "QuickFix Services pattern detected", description: "7 corruption flags across 15 road contracts.", severity: "high", confidence: 0.89, roadId: null },
  ]);
});

router.post("/ai/scan", async (req, res) => {
  await new Promise(r => setTimeout(r, 500));
  res.json({
    issueType: "Pothole Formation",
    severity: "high",
    confidence: 0.91,
    healthScore: 38,
    riskLevel: "high",
    detectedIssues: ["Surface pothole", "Edge crumbling", "Water seepage", "Asphalt delamination"],
    recommendation: "Immediate patching required. Pothole depth exceeds 5cm. Risk of vehicle damage high. Recommend full-depth repair with quality hot-mix asphalt.",
    shouldFileComplaint: true,
  });
});

router.get("/ai/corruption-flags", async (req, res) => {
  res.json([
    { id: 1, type: "Repeated Repair", description: "Road repaired 5 times in 3 years", roadName: "NH-48 Stretch", contractorName: "RoadCraft Solutions", severity: "critical", evidence: "5 repair cycles in 36 months", detectedAt: "2024-04-10", status: "open" },
    { id: 2, type: "Budget Overrun", description: "Repair cost unusually high", roadName: "Andheri-Kurla Road", contractorName: "RoadCraft Solutions", severity: "critical", evidence: "₹68L spent vs ₹45L allocated.", detectedAt: "2024-04-12", status: "open" },
    { id: 3, type: "Low Quality Score", description: "Contractor with multiple failed roads", roadName: "AIIMS Delhi Stretch", contractorName: "QuickFix Road Services", severity: "high", evidence: "3 of 5 roads show critical failure.", detectedAt: "2024-04-08", status: "under review" },
    { id: 4, type: "Suspicious Pattern", description: "Rapid re-failure after repair", roadName: "Andheri-Kurla Road", contractorName: "RoadCraft Solutions", severity: "high", evidence: "Each repair fails within 8-12 months.", detectedAt: "2024-04-15", status: "open" },
  ]);
});

router.get("/roads/risk-map", async (req, res) => {
  res.json([
    { id: 1, roadId: 7, roadName: "AIIMS Delhi Stretch", latitude: 28.5672, longitude: 77.2100, riskScore: 97, riskLevel: "critical", predictedFailureIn: "2-5 days", reason: "Extreme vibration detected. Health score 22/100." },
    { id: 2, roadId: 4, roadName: "Andheri-Kurla Road", latitude: 19.1136, longitude: 72.8697, riskScore: 94, riskLevel: "critical", predictedFailureIn: "3-7 days", reason: "8 repair cycles. Health 28/100." },
    { id: 3, roadId: 2, roadName: "NH-48 Stretch", latitude: 28.4595, longitude: 77.0266, riskScore: 78, riskLevel: "high", predictedFailureIn: "2-3 weeks", reason: "5 failures in 3 years." },
    { id: 4, roadId: 1, roadName: "MG Road", latitude: 12.9716, longitude: 77.5946, riskScore: 45, riskLevel: "medium", predictedFailureIn: "1-2 months", reason: "Gradual health decline." },
    { id: 5, roadId: 6, roadName: "GST Road", latitude: 12.8825, longitude: 80.1014, riskScore: 32, riskLevel: "medium", predictedFailureIn: "2-3 months", reason: "Moderate wear." },
    { id: 6, roadId: 3, roadName: "Outer Ring Road South", latitude: 12.9141, longitude: 77.6200, riskScore: 8, riskLevel: "low", predictedFailureIn: "12+ months", reason: "Excellent condition." },
    { id: 7, roadId: 5, roadName: "Electronic City Flyover", latitude: 12.8399, longitude: 77.6770, riskScore: 5, riskLevel: "low", predictedFailureIn: "12+ months", reason: "Near-optimal health." },
    { id: 8, roadId: 8, roadName: "Mumbai-Pune Expressway Sec-3", latitude: 18.5204, longitude: 73.8567, riskScore: 9, riskLevel: "low", predictedFailureIn: "12+ months", reason: "Well maintained." },
  ]);
});

export default router;
