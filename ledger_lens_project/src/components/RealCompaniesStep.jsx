import React from 'react';

export default function RealCompaniesStep() {
  return (
    <div className="space-y-4">
      {[
        {
          company: "Deloitte",
          product: "Argus",
          use: "Lease & contract extraction",
          detail:
            "Scans thousands of lease agreements to auto-extract tax-relevant terms (ASC 842 / IFRS 16). Cuts a 3-week manual process to hours. Output feeds directly into tax provision models.",
          tag: "NLP / Document AI",
        },
        {
          company: "KPMG",
          product: "KPMG Clara",
          use: "Tax provision anomaly detection",
          detail:
            "ML model trained on historical provision schedules flags unusual effective tax rate movements across business units. Audit teams use it to prioritize where to dig deeper.",
          tag: "Anomaly Detection",
        },
        {
          company: "EY",
          product: "EY Tax Analyzer",
          use: "Transfer pricing & related-party risk scoring",
          detail:
            "Ingests ERP transaction data (similar to your CSVs) to score intercompany transactions for audit risk. Flags pricing outliers vs. arm's-length benchmarks automatically.",
          tag: "Gradient Boosting",
        },
      ].map((c) => (
        <div
          key={c.company}
          style={{
            background: "#0f1923",
            border: "1px solid #1e3a4a",
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span style={{ color: "#e2c074", fontWeight: 700, fontSize: 17 }}>
              {c.company} — {c.product}
            </span>
            <span
              style={{
                background: "#1e3a4a",
                color: "#5bc8d4",
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              {c.tag}
            </span>
          </div>
          <div style={{ color: "#cbe0eb", fontSize: 13, marginBottom: 6 }}>
            <strong style={{ color: "#fff" }}>What it does:</strong> {c.use}
          </div>
          <div style={{ color: "#b0c4cf", fontSize: 12, lineHeight: 1.6 }}>
            {c.detail}
          </div>
        </div>
      ))}
    </div>
  );
}
