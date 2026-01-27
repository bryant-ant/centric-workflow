"use client";

import { useState } from "react";

// ─── BRAND PALETTE (Centric-inspired warm modern) ────────────────────────────
const colors = {
  bg: "#faf8f4",
  cardBg: "#ffffff",
  cardBorder: "#e8e4d8",
  textPrimary: "#1a1a18",
  textSecondary: "#6b6b5e",
  textMuted: "#9a9a8e",
  accentWarm: "#c96b3a",     // warm orange CTA
  accentCool: "#4a7fb5",     // steel blue for tech nodes
  accentGreen: "#5a8a5e",    // success/green for completed
  accentRed: "#c45050",      // alert/red for exception path
  accentPurple: "#7b5ea7",   // Claude/AI purple
  nodeShadow: "0 4px 16px rgba(0,0,0,0.08)",
  panelShadow: "0 8px 32px rgba(0,0,0,0.14)",
  arrowColor: "#b0a898",
};

// ─── WORKFLOW DATA ────────────────────────────────────────────────────────────
const mainFlowSteps = [
  {
    id: "trigger",
    icon: "👤",
    label: "Performance Review Triggered",
    type: "human",
    color: colors.accentWarm,
    detail: {
      title: "Human Initiates Review",
      description: "A Centric Brands analyst launches the performance review agent via a simple prompt. No SQL or technical knowledge required.",
      example: 'Example prompt:\n"Run a Q1 performance check for Vera Bradley against our contract obligations."',
      tech: "Interface: Slack / Web Portal / Claude Chat",
    },
  },
  {
    id: "contract_lookup",
    icon: "📄",
    label: "Claude Reads PDF Contract",
    type: "ai",
    color: colors.accentPurple,
    detail: {
      title: "Contract Extraction (Claude Vision + PDF Parse)",
      description: "Claude ingests the scanned PDF contract and extracts performance obligations using vision-based document understanding.",
      example: 'Extracted obligation:\n• Brand: Vera Bradley\n• KPI: Quarterly Revenue\n• Target: $12.5M (Q1 2026)\n• Metric Type: Net Revenue',
      tech: "Tool: PDF Vision Parser → Claude Extraction Engine",
    },
  },
  {
    id: "workato",
    icon: "⚙️",
    label: "Workato DataGenie Translates",
    type: "middleware",
    color: colors.accentCool,
    detail: {
      title: "Enterprise MCP Server (Workato DataGenie)",
      description: "The human's plain-English intent and Claude's extracted KPIs are routed through Workato DataGenie, which generates the optimized SQL query and manages the Snowflake connection.",
      example: 'Generated SQL:\nSELECT\n  SUM(net_revenue) AS actual_revenue\nFROM sales_transactions\nWHERE brand_id = \'VERA_BRADLEY\'\n  AND fiscal_quarter = \'Q1\'\n  AND fiscal_year = 2026;',
      tech: "MCP Server: Workato DataGenie → Snowflake Connector",
    },
  },
  {
    id: "snowflake",
    icon: "❄️",
    label: "Snowflake Query Executes",
    type: "data",
    color: colors.accentCool,
    detail: {
      title: "Snowflake Data Warehouse",
      description: "The SQL query runs against Centric Brands' Snowflake data warehouse. DataGenie manages authentication, connection pooling, and query optimization.",
      example: 'Query Result:\n┌─────────────────────┬────────────────┐\n│ Metric              │ Value          │\n├─────────────────────┼────────────────┤\n│ actual_revenue      │ $14,230,847    │\n│ target_revenue      │ $12,500,000    │\n│ variance            │ +$1,730,847    │\n│ pct_achievement     │ 113.8%         │\n└─────────────────────┴────────────────┘',
      tech: "Database: Snowflake Cloud Data Warehouse",
    },
  },
  {
    id: "analysis",
    icon: "🧠",
    label: "Claude Analyzes Results",
    type: "ai",
    color: colors.accentPurple,
    detail: {
      title: "Claude Interprets & Contextualizes",
      description: "Claude compares the actual performance against the contractual obligations and generates a human-readable analysis with context.",
      example: 'Analysis Output:\n"Vera Bradley exceeded Q1 revenue obligations by 13.8% ($1.73M above target). This marks the second consecutive quarter of over-performance. Contract compliance: ✅ MET"',
      tech: "Model: Claude (Sonnet) → Natural Language Generation",
    },
  },
  {
    id: "report",
    icon: "📊",
    label: "Report Delivered to Analyst",
    type: "human",
    color: colors.accentGreen,
    detail: {
      title: "Final Report & Dashboard Update",
      description: "The performance summary is delivered to the analyst and optionally pushed to a dashboard or shared via Slack/email.",
      example: 'Delivery channels:\n• Slack notification with summary\n• Dashboard widget updated\n• PDF report generated\n• Email to stakeholders (optional)',
      tech: "Output: Slack Bot / Dashboard API / Email",
    },
  },
];

const exceptionBranch = [
  {
    id: "miss_detected",
    icon: "⚠️",
    label: "Performance Miss Detected",
    type: "alert",
    color: colors.accentRed,
    detail: {
      title: "Contractual Obligation Missed",
      description: "Claude detects that actual performance falls below the contractual threshold. The system triggers an exception workflow.",
      example: 'Detected Miss:\n• Brand: Steve Madden\n• KPI: Gross Margin\n• Target: 42.0%\n• Actual: 38.7%\n• Shortfall: -3.3 percentage points\n• Status: ❌ BELOW TARGET',
      tech: "Detection: Claude Threshold Comparison Engine",
    },
  },
  {
    id: "alert_stakeholders",
    icon: "📣",
    label: "Stakeholders Alerted",
    type: "alert",
    color: colors.accentRed,
    detail: {
      title: "Automated Escalation & Alert",
      description: "The system automatically notifies relevant stakeholders based on severity and contract terms. Claude drafts a contextual summary for the alert.",
      example: 'Alert Message:\n"⚠️ Margin Alert: Steve Madden Q1 margin at 38.7% vs. 42.0% target. Gap of 330bps. Contract requires remediation plan within 30 days. Routing to Account Manager and VP of Partnerships."',
      tech: "Channels: Slack (urgent) / Email / Ticketing System",
    },
  },
  {
    id: "remediation",
    icon: "🔧",
    label: "Remediation Plan Drafted",
    type: "ai",
    color: colors.accentPurple,
    detail: {
      title: "Claude Drafts Remediation Recommendations",
      description: "Claude references historical performance data and contract terms to draft recommended actions and a remediation timeline.",
      example: 'Recommended Actions:\n1. Review pricing strategy for underperforming SKUs\n2. Evaluate marketing spend allocation\n3. Schedule joint business review within 2 weeks\n4. Set interim weekly monitoring checkpoints',
      tech: "Model: Claude → Recommendation Engine + Calendar Integration",
    },
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Arrow({ direction = "down", color = colors.arrowColor }) {
  if (direction === "down") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 36, position: "relative" }}>
        <div style={{ width: 2, height: 28, background: color }}></div>
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "7px solid transparent", borderRight: "7px solid transparent",
          borderTop: `8px solid ${color}`
        }}></div>
      </div>
    );
  }
  if (direction === "right") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 36, position: "relative" }}>
        <div style={{ height: 2, width: 28, background: color }}></div>
        <div style={{
          position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
          width: 0, height: 0,
          borderTop: "7px solid transparent", borderBottom: "7px solid transparent",
          borderLeft: `8px solid ${color}`
        }}></div>
      </div>
    );
  }
  return null;
}

function StepNode({ step, isSelected, onClick, showArrow = true, isBranch = false, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", position: "relative" }}>
      {/* Step number bubble */}
      <div style={{
        position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
        width: 22, height: 22, borderRadius: "50%", background: step.color,
        color: "#fff", fontSize: 11, fontWeight: 700, display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
      }}>{index + 1}</div>
      {/* Card */}
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: "pointer",
          background: isSelected ? step.color + "12" : colors.cardBg,
          border: `2px solid ${isSelected ? step.color : hovered ? step.color + "88" : colors.cardBorder}`,
          borderRadius: 14,
          padding: "16px 14px 14px",
          width: 160,
          textAlign: "center",
          boxShadow: isSelected ? `0 4px 20px ${step.color}40` : hovered ? colors.nodeShadow : "0 2px 8px rgba(0,0,0,0.04)",
          transition: "all 0.2s ease",
          transform: hovered && !isSelected ? "translateY(-2px)" : "none",
        }}
      >
        <div style={{ fontSize: 26, marginBottom: 5 }}>{step.icon}</div>
        <div style={{
          fontSize: 10, fontWeight: 700, color: step.color, letterSpacing: "0.4px",
          textTransform: "uppercase", marginBottom: 3
        }}>
          {step.type === "human" ? "Human" : step.type === "ai" ? "Claude AI" : step.type === "middleware" ? "Middleware" : step.type === "data" ? "Data Layer" : "Alert"}
        </div>
        <div style={{ fontSize: 12, color: colors.textPrimary, fontWeight: 500, lineHeight: 1.3 }}>
          {step.label}
        </div>
      </div>
      {/* Right arrow */}
      {showArrow && <Arrow direction="right" />}
    </div>
  );
}

function DetailPanel({ step, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16,
    }} onClick={onClose}>
      <div style={{
        background: colors.cardBg, borderRadius: 20, maxWidth: 560, width: "100%",
        boxShadow: colors.panelShadow, overflow: "hidden", maxHeight: "90vh", overflowY: "auto",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          background: step.color, padding: "18px 24px", display: "flex",
          justifyContent: "space-between", alignItems: "flex-start"
        }}>
          <div>
            <div style={{ fontSize: 22 }}>{step.icon}</div>
            <div style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginTop: 4 }}>{step.detail.title}</div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
            width: 28, height: 28, borderRadius: 8, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center"
          }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ padding: "22px 24px 24px" }}>
          <p style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>
            {step.detail.description}
          </p>
          {/* Example block */}
          <div style={{
            background: "#f7f6f2", borderRadius: 12, padding: 16, marginBottom: 16,
            border: `1px solid ${colors.cardBorder}`
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>
              Example
            </div>
            <pre style={{
              fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12,
              color: colors.textPrimary, whiteSpace: "pre-wrap", margin: 0, lineHeight: 1.6
            }}>
              {step.detail.example}
            </pre>
          </div>
          {/* Tech badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, color: colors.textMuted }}>🔗</span>
            <span style={{
              fontSize: 11, color: step.color, fontWeight: 600,
              background: step.color + "15", padding: "4px 10px", borderRadius: 6
            }}>{step.detail.tech}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 12, height: 12, borderRadius: 3, background: color }}></div>
      <span style={{ fontSize: 12, color: colors.textSecondary, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [activeTab, setActiveTab] = useState("main"); // "main" or "exception"

  const handleSelect = (step) => {
    setSelectedStep(step);
  };

  const steps = activeTab === "main" ? mainFlowSteps : exceptionBranch;

  return (
    <div style={{
      minHeight: "100vh", background: colors.bg, fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: "32px 16px", position: "relative"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: colors.cardBg, border: `1px solid ${colors.cardBorder}`,
          borderRadius: 10, padding: "6px 16px", marginBottom: 20
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px" }}>
            Centric Brands × Claude AI
          </span>
        </div>
        <h1 style={{
          fontSize: 24, fontWeight: 800, color: colors.textPrimary, margin: "0 0 6px",
          letterSpacing: "-0.3px"
        }}>
          Contract Performance Monitor
        </h1>
        <p style={{ fontSize: 13, color: colors.textSecondary, margin: 0, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          AI-powered agent that checks brand performance obligations against Snowflake financial data — no SQL required.
        </p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
        {[
          { key: "main", label: "✅ Main Flow", color: colors.accentGreen },
          { key: "exception", label: "⚠️ Exception Path", color: colors.accentRed },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            background: activeTab === tab.key ? tab.color : colors.cardBg,
            color: activeTab === tab.key ? "#fff" : colors.textSecondary,
            border: `1.5px solid ${activeTab === tab.key ? tab.color : colors.cardBorder}`,
            borderRadius: 8, padding: "7px 18px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", transition: "all 0.2s ease",
            boxShadow: activeTab === tab.key ? `0 3px 12px ${tab.color}40` : "none"
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Hint */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={{
          fontSize: 11, color: colors.textMuted, background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`, borderRadius: 6,
          padding: "4px 12px", display: "inline-block"
        }}>
          👆 Click any node to see technical details & examples
        </span>
      </div>

      {/* Flow */}
      <div style={{
        display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center",
        overflowX: "auto", paddingBottom: 16, paddingTop: 14, gap: 0
      }}>
        {steps.map((step, i) => (
          <StepNode
            key={step.id}
            step={step}
            isSelected={selectedStep?.id === step.id}
            onClick={() => handleSelect(step)}
            showArrow={i < steps.length - 1}
            isBranch={activeTab === "exception" && i === 0}
            index={i}
          />
        ))}
      </div>

      {/* Connection note for exception path */}
      {activeTab === "exception" && (
        <div style={{
          textAlign: "center", marginTop: 12,
          background: "#fff5f5", border: `1px solid ${colors.accentRed}44`,
          borderRadius: 10, padding: "10px 20px", maxWidth: 560, marginLeft: "auto", marginRight: "auto"
        }}>
          <span style={{ fontSize: 12, color: colors.accentRed, fontWeight: 600 }}>
            📍 This branch triggers at Step 5 of the Main Flow when Claude detects a missed obligation.
          </span>
        </div>
      )}

      {/* Legend */}
      <div style={{
        display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 20,
        marginTop: 24, padding: "12px 24px", background: colors.cardBg,
        borderRadius: 10, border: `1px solid ${colors.cardBorder}`,
        maxWidth: 640, marginLeft: "auto", marginRight: "auto"
      }}>
        <LegendItem color={colors.accentWarm} label="Human Touchpoint" />
        <LegendItem color={colors.accentPurple} label="Claude AI" />
        <LegendItem color={colors.accentCool} label="Tech Layer" />
        <LegendItem color={colors.accentGreen} label="Success / Output" />
        <LegendItem color={colors.accentRed} label="Alert / Exception" />
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 28 }}>
        <span style={{ fontSize: 10, color: colors.textMuted }}>
          Architecture Overview — Centric Brands IT Planning | January 2026
        </span>
      </div>

      {/* Detail modal */}
      {selectedStep && (
        <DetailPanel step={selectedStep} onClose={() => setSelectedStep(null)} />
      )}
    </div>
  );
}
