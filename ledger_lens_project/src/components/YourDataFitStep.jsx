import React from 'react';
import Tooltip from './Tooltip';

export default function YourDataFitStep({ isPrinting }) {
  const inventory = [
    ["customers.csv", "23 customers", "Segment, city, lifetime revenue"],
    ["products.csv", "26 products", "Category, avg price, avg cost"],
    [
      "transactions.csv",
      "5,000 rows",
      "Revenue, cost, discount, profit by order",
    ],
    ["invoices.csv", "2,237 rows", "Invoice dates, due dates, status"],
    ["payments.csv", "2,237 rows", "Payment date, days_from_due"],
  ];

  const problems = [
    [
      "✅ Bad Debt Provision Modeling",
      "invoices + payments → days_from_due tells you exactly who pays late. This is the foundation of ASC 450 bad debt estimates.",
    ],
    [
      "✅ AR Aging Schedule (audit-ready)",
      "Combine invoice due dates + payment dates to build a proper 30/60/90/90+ day aging schedule.",
    ],
    [
      "✅ Revenue Recognition Timing",
      "Order date vs invoice date vs payment date — flag transactions where recognition may be premature.",
    ],
    [
      "✅ Discount Abuse / Transfer Pricing Risk",
      "High discount + related customer segment patterns can indicate non-arm's-length pricing.",
    ],
    [
      "⚠️ Not enough for: Corporate income tax provision",
      "You'd need GL/trial balance data for that.",
    ],
  ];

  return (
    <div className="space-y-4">
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-main)",
          borderRadius: 8,
          padding: 16,
          marginBottom: "16px",
        }}
      >
        <div style={{ color: "var(--text-dim)", fontSize: 12, marginBottom: 8 }}>
          YOUR DATA INVENTORY
        </div>
        {inventory.map(([f, s, d]) => (
          <div
            key={f}
            style={{
              display: "flex",
              gap: 12,
              padding: "6px 0",
              borderBottom: "1px solid var(--border-main)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: "var(--text-bright)", width: 160, fontSize: 13, fontWeight: 600 }}>
              {f}
            </span>
            <span style={{ color: "var(--text-dim)", width: 100, fontSize: 13 }}>
              {s}
            </span>
            <span style={{ color: "var(--text-main)", fontSize: 13, flex: "1 0 200px" }}>{d}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          color: "var(--text-main)",
          fontSize: 14,
          fontWeight: 600,
          marginTop: 4,
          marginBottom: 16,
        }}
      >
        Problems you CAN solve:
      </div>
      {problems.map(([t, d]) => (
        <div
          key={t}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-main)",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              color: t.startsWith("⚠") ? "#c87a30" : "var(--text-dim)",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {t}
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
            {d.includes('ASC 450') ? (
              <span>invoices + payments → days_from_due tells you exactly who pays late. This is the foundation of <Tooltip isPrinting={isPrinting} text="A standard requiring companies to estimate and record losses from uncollectible receivables.">ASC 450 bad debt</Tooltip> estimates.</span>
            ) : d.includes("arm's-length pricing") ? (
              <span>High discount + related customer segment patterns can indicate non-<Tooltip isPrinting={isPrinting} text="Transactions between related parties must be priced as if they were unrelated to prevent tax evasion.">arm's-length pricing</Tooltip>.</span>
            ) : d}
          </div>
        </div>
      ))}
    </div>
  );
}
