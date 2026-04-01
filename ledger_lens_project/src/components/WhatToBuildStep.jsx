import React from 'react';

export default function WhatToBuildStep({ isPrinting }) {
  return (
    <div>
      <div
        style={{
          background: "var(--bg-card-alt)",
          border: "2px solid var(--text-bright)",
          borderRadius: 10,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            color: "var(--text-bright)",
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          🎯 The Product: Bad Debt Risk Scorer + AR Aging Engine
        </div>
        <div style={{ color: "var(--text-main)", fontSize: 13 }}>
          A tool your firm runs quarterly to support tax provision work and audit defense
        </div>
      </div>
      {[
        {
          phase: "INPUT",
          color: "var(--text-dim)",
          items: [
            "invoices.csv — invoice_date, due_date, amount, status",
            "payments.csv — payment_date, days_from_due",
            "customers.csv — segment, lifetime_revenue",
            "transactions.csv — discount patterns, profit margins",
          ],
        },
        {
          phase: "PROCESS",
          color: "var(--text-bright)",
          items: [
            "Build AR aging buckets: Current / 1-30 / 31-60 / 61-90 / 90+",
            "Calculate avg days late + payment volatility per customer",
            "Engineer discount abuse score from transaction data",
            "Train Gradient Boosting model to predict bad debt probability",
          ],
        },
        {
          phase: "OUTPUT",
          color: "#7ed47e",
          items: [
            "Risk score (0–100%) per customer",
            "Recommended provision % for each tier",
            "Audit-ready AR aging schedule (Excel export)",
            "Explainability: top 3 reasons per flagged customer",
          ],
        },
      ].map(({ phase, color, items }) => (
        <div
          key={phase}
          style={{
            background: "var(--bg-card)",
            border: `1px solid ${color}`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            opacity: isPrinting ? 1 : 0.9,
          }}
        >
          <div
            style={{
              color,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              marginBottom: 8,
            }}
          >
            {phase}
          </div>
          {items.map((i) => (
            <div
              key={i}
              style={{
                color: "var(--text-main)",
                fontSize: 13,
                padding: "3px 0",
                paddingLeft: 12,
                borderLeft: `2px solid ${color}`,
              }}
            >
              {i}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
