import React, { useState } from 'react';

export default function PythonCodeStep({ isPrinting }) {
  const [activeBlock, setActiveBlock] = useState(0);
  const blocks = [
    {
      title: "Step 1: Load & Preview",
      code: `import pandas as pd

customers    = pd.read_csv('customers.csv')
invoices     = pd.read_csv('invoices.csv', parse_dates=['invoice_date','due_date'])
payments     = pd.read_csv('payments.csv', parse_dates=['payment_date'])
transactions = pd.read_csv('transactions.csv', parse_dates=['order_date'])

# Key field: days_from_due (negative=early, positive=late)
print(payments['days_from_due'].describe())`,
      note: "payments.days_from_due is your gold field. Negative = paid early, positive = paid late, missing = unpaid.",
    },
    {
      title: "Step 2: Build AR Aging",
      code: `inv_pay = invoices.merge(payments, on='invoice_id', how='left')
inv_pay['days_late'] = inv_pay['days_from_due'].fillna(999)

def bucket(d):
    if d <= 0:    return 'current'
    elif d <= 30:  return 'b1_30'
    elif d <= 60:  return 'b31_60'
    elif d <= 90:  return 'b61_90'
    else:          return 'b90plus'

inv_pay['bucket'] = inv_pay['days_late'].apply(bucket)

# Pivot to customer level
aging = inv_pay.pivot_table(
    index='customer_id', columns='bucket',
    values='amount_x', aggfunc='sum', fill_value=0
).reset_index()`,
      note: "This is your AR aging schedule — standard format used by auditors and tax teams.",
    },
    {
      title: "Step 3: Engineer Features",
      code: `# Payment behavior features
behavior = inv_pay.groupby('customer_id').agg(
    avg_days_late=('days_late', 'mean'),
    payment_vol=('days_late', 'std'),
    invoice_count=('invoice_id', 'count')
).reset_index()

# Discount pattern from transactions
discount_feat = transactions.groupby('customer_id').agg(
    avg_discount=('discount', 'mean'),
    profit_margin=('profit', lambda x: x.sum() / transactions.loc[x.index,'revenue'].sum())
).reset_index()

# Merge everything
features = customers \\
    .merge(aging, on='customer_id', how='left') \\
    .merge(behavior, on='customer_id', how='left') \\
    .merge(discount_feat, on='customer_id', how='left') \\
    .fillna(0)`,
      note: "Each row = one customer with ~15 features describing their payment history, aging exposure, and transaction patterns.",
    },
    {
      title: "Step 4: Train & Score",
      code: `from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler

# Label: high risk = avg >30 days late OR has 90+ exposure
features['bad_debt_risk'] = (
    (features['avg_days_late'] > 30) | 
    (features['b90plus'] > 0)
).astype(int)

feature_cols = ['lifetime_revenue','avg_days_late','payment_vol',
                'avg_discount','b1_30','b31_60','b61_90','b90plus']

X = features[feature_cols]
y = features['bad_debt_risk']

scaler = StandardScaler()
model  = GradientBoostingClassifier(n_estimators=100, random_state=42)
model.fit(scaler.fit_transform(X), y)

features['risk_score'] = model.predict_proba(scaler.transform(X))[:,1]
features['risk_label'] = features['risk_score'].apply(
    lambda s: 'HIGH' if s>.6 else ('MEDIUM' if s>.3 else 'LOW')
)`,
      note: "With only 23 customers you're in semi-supervised territory — the model is more of a scoring engine than a predictive model. That's fine for this use case.",
    },
    {
      title: "Step 5: Export for Tax Work",
      code: `# Export 1: AR Aging Schedule
aging_report = features[['customer_name','b1_30','b31_60','b61_90','b90plus']]
aging_report.to_excel('ar_aging_schedule.xlsx', index=False)

# Export 2: Bad Debt Risk Scores
risk_report = features[['customer_name','avg_days_late',
                          'risk_score','risk_label']] \\
              .sort_values('risk_score', ascending=False)
risk_report.to_csv('bad_debt_risk_scores.csv', index=False)

# Export 3: Feature importance (audit trail)
import pandas as pd
importance = pd.DataFrame({
    'driver': feature_cols,
    'weight': model.feature_importances_
}).sort_values('weight', ascending=False)
print(importance)`,
      note: "Three outputs: AR aging for audit, risk scores for tax provision, and feature importance for your audit defense file.",
    },
  ];

  const renderBlock = (b, i) => (
    <div key={i} style={{ marginBottom: isPrinting ? "32px" : "0" }}>
      {isPrinting && (
        <h3 style={{ color: "var(--text-bright)", fontSize: 16, marginBottom: 12 }}>{b.title}</h3>
      )}
      <div
        style={{
          background: "var(--bg-card-dark)",
          border: "1px solid var(--border-main)",
          borderRadius: 8,
          padding: 16,
        }}
      >
        <pre
          style={{
            color: isPrinting ? "#006600" : "#a8d8a8",
            fontSize: 12,
            lineHeight: 1.7,
            overflowX: "auto",
            margin: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          {b.code}
        </pre>
      </div>
      <div
        style={{
          background: "var(--bg-card-alt)",
          border: "1px solid var(--border-main)",
          borderRadius: 6,
          padding: "10px 14px",
          marginTop: 10,
        }}
      >
        <span style={{ color: "var(--text-dim)", fontSize: 11, fontWeight: 700 }}>
          💡 WHY THIS MATTERS:{" "}
        </span>
        <span style={{ color: "var(--text-main)", fontSize: 12 }}>
          {b.note}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      {!isPrinting && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          {blocks.map((b, i) => (
            <button
              key={i}
              onClick={() => setActiveBlock(i)}
              style={{
                background: activeBlock === i ? "var(--text-bright)" : "var(--border-main)",
                color: activeBlock === i ? "var(--bg-main)" : "var(--text-main)",
                border: "none",
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: activeBlock === i ? 700 : 400,
              }}
            >
              {b.title}
            </button>
          ))}
        </div>
      )}

      {isPrinting ? (
        blocks.map((b, i) => renderBlock(b, i))
      ) : (
        renderBlock(blocks[activeBlock], activeBlock)
      )}
    </div>
  );
}
