import React from "react";
import { riskCells } from "../data/mockData";

export function RiskMatrixTab() {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.68rem",
          color: "var(--text-3)",
          marginBottom: "1.25rem",
          letterSpacing: "0.04em",
        }}
      >
        Composite risk scoring based on exception frequency, financial exposure,
        and control effectiveness · Scale: 0–100
      </div>
      <div className="risk-grid">
        {riskCells.map((cell, i) => (
          <div
            key={i}
            className="risk-cell fade-up"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.6rem",
              }}
            >
              <div className="risk-cell-title" style={{ color: cell.color }}>
                {cell.title}
              </div>
              <span className="ref-code">{cell.ref}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.6rem",
                  color: "var(--text-3)",
                }}
              >
                Risk Score
              </span>
              <span
                style={{
                  fontFamily: "IBM Plex Mono",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: cell.color,
                }}
              >
                {cell.score}
              </span>
            </div>
            <div className="risk-meter">
              <div
                className="risk-meter-fill"
                style={{ width: `${cell.score}%`, background: cell.color }}
              />
            </div>
            <ul
              style={{
                paddingLeft: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
              }}
            >
              {cell.items.map((item, j) => (
                <li
                  key={j}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.62rem",
                    color: "var(--text-2)",
                    lineHeight: 1.55,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
