import React from 'react';

export default function WhatToBuildStep() {
  return (
    <div>
      <div
        style={{
          background: "#0a2233",
          border: "2px solid #e2c074",
          borderRadius: 10,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            color: "#e2c074",
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          🎯 The Product: Bad Debt Risk Scorer + AR Aging Engine
        </div>
        <div style={{ color: "#cbe0eb", fontSize: 13 }}>
          A tool your firm runs quarterly to support tax provision work and audit defense
        </div>
      </div>
      {[
        {
          phase: "INPUT",
          color: "#5bc8d4",
          items: [
            "invoices.csv — invoice_date, due_date, amount, status",
            "payments.csv — payment_date, days_from_due",
            "customers.csv — segment, lifetime_revenue",
            "transactions.csv — discount patterns, profit margins",
          ],
        },
        {
          phase: "PROCESS",
          color: "#e2c074",
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
            background: "#0f1923",
            border: `1px solid ${color}33`,
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
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
                color: "#cbe0eb",
                fontSize: 13,
                padding: "3px 0",
                paddingLeft: 12,
                borderLeft: `2px solid ${color}66`,
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
