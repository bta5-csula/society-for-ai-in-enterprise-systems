import React from 'react';
import Tooltip from './Tooltip';

export default function AIMethodStep() {
  return (
    <div className="space-y-4">
      <div
        style={{
          background: "#0a2233",
          border: "2px solid #5bc8d4",
          borderRadius: 10,
          padding: 20,
          marginBottom: "16px",
        }}
      >
        <div style={{ color: "#5bc8d4", fontSize: 15, fontWeight: 700 }}>
          ⭐ Recommended: <Tooltip text="A powerful machine learning technique that combines multiple decision trees into one highly accurate predictive model to score risk.">Gradient Boosting</Tooltip> (XGBoost / sklearn GBM)
        </div>
        <div style={{ color: "#b0c4cf", fontSize: 12, marginTop: 8 }}>
          Best for small structured datasets with mixed feature types. Used by KPMG and EY for exactly this problem class.
        </div>
      </div>
      <div style={{ color: "#c8dde8", fontSize: 13, marginBottom: 8 }}>
        Why not other methods:
      </div>
      {[
        ["Linear Regression", "Too simple — can't capture non-linear payment behavior", "❌"],
        ["Neural Network", "Overkill for 23 customers; uninterpretable to auditors", "❌"],
        ["Gradient Boosting", "Handles small data, mixed types, gives feature importance for audit trail", "✅"],
        ["Rule-based (thresholds)", "Good baseline but won't generalize to new customers", "⚠️"],
        ["Clustering (K-Means)", "Useful add-on to segment customers AFTER scoring", "➕"],
      ].map(([m, r, s]) => (
        <div
          key={m}
          style={{
            display: "grid",
            gridTemplateColumns: "30px 180px 1fr",
            gap: 12,
            alignItems: "center",
            background: "#0f1923",
            border: "1px solid #1e3a4a",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: 16 }}>{s}</span>
          <div style={{ color: "#e2c074", fontSize: 13, fontWeight: 600 }}>{m}</div>
          <div style={{ color: "#b0c4cf", fontSize: 12, lineHeight: 1.4 }}>{r}</div>
        </div>
      ))}
      <div
        style={{
          background: "#0f1923",
          border: "1px solid #2a4a5a",
          borderRadius: 8,
          padding: 14,
          marginTop: "16px",
        }}
      >
        <div
          style={{
            color: "#7ed47e",
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          KEY ADVANTAGE FOR TAX WORK
        </div>
        <div style={{ color: "#cbe0eb", fontSize: 12 }}>
          Gradient Boosting outputs{" "}
          <strong style={{ color: "#fff" }}>feature importances</strong> — you can tell your client exactly why a customer was flagged (e.g., "avg 47 days late + 90+ bucket exposure of $120K"). This creates an <Tooltip text="A clear, documented history of steps taken to calculate a tax provision, protecting your firm under audit.">audit-defensible paper trail</Tooltip>, which is critical for provision work.
        </div>
      </div>
    </div>
  );
}
