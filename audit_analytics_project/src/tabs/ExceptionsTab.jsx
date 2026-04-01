import React, { useState } from "react";
import { Search } from "lucide-react";
import { exceptionData } from "../data/mockData";

export function ExceptionsTab() {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL"
      ? exceptionData
      : exceptionData.filter((e) => e.risk === filter);

  const filterColors = { ALL: "#3b82f6", HIGH: "#ef4444", MEDIUM: "#f59e0b" };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.25rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Search size={13} color="var(--text-3)" style={{ flexShrink: 0 }} />
        {["ALL", "HIGH", "MEDIUM"].map((f) => {
          const active = filter === f;
          const c = filterColors[f];
          return (
            <button
              key={f}
              className="filter-btn"
              onClick={() => setFilter(f)}
              style={{
                border: `1px solid ${active ? c : "var(--border)"}`,
                background: active ? `${c}18` : "transparent",
                color: active ? c : "var(--text-3)",
              }}
            >
              {f}
            </button>
          );
        })}
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.62rem",
            color: "var(--text-3)",
            lineHeight: 1
          }}
        >
          Showing {filtered.length} of {exceptionData.length} Control Tests
        </span>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-container">
          <table className="exc-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Control Test</th>
                <th>Occurrences</th>
                <th>% of Exceptions</th>
                <th>Risk Level</th>
                <th>PCAOB / GAAS Ref</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <tr key={i}>
                  <td style={{ color: "var(--text-3)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td style={{ color: "var(--text-1)", fontWeight: 500 }}>{e.test}</td>
                  <td>{e.count.toLocaleString()}</td>
                  <td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 4,
                          background: "var(--border)",
                          borderRadius: 2,
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.min(e.pct, 100)}%`,
                            height: "100%",
                            borderRadius: 2,
                            background: e.risk === "HIGH" ? "#ef4444" : "#f59e0b",
                          }}
                        />
                      </div>
                      {e.pct}%
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${e.risk.toLowerCase()}`}>
                      {e.risk}
                    </span>
                  </td>
                  <td>
                    <span className="ref-code">{e.ref}</span>
                  </td>
                  <td
                    style={{
                      color: e.risk === "HIGH" ? "var(--red)" : "var(--text-2)",
                      fontSize: "0.68rem",
                    }}
                  >
                    {e.risk === "HIGH"
                      ? "Immediate escalation"
                      : "Standard follow-up"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--mono)",
            fontSize: "0.62rem",
            color: "var(--text-3)",
            letterSpacing: '0.04em'
          }}
        >
          <span>EY ENGAGEMENT · FY 2023 BIKE MANUFACTURER AUDIT</span>
          <span>REFERENCE: PCAOB AS2201 · GAAS · ASC 606</span>
        </div>
      </div>
    </>
  );
}
