import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BenfordTip } from "../components/Common";
import { benfordData } from "../data/mockData";

export function BenfordTab() {
  return (
    <>
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-title">
          Benford's Law — Leading Digit Frequency Analysis
        </div>
        <div className="card-sub">
          Expected vs. actual distribution · Deviations ≥ 2% flagged for
          investigation · Reference: AS2201.44
        </div>
        <div style={{ height: 300, minWidth: 0, position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={benfordData}
              margin={{ top: 8, right: 30, bottom: 28, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1c2d4a" />
              <XAxis
                dataKey="digit"
                label={{
                  value: "Leading Digit",
                  position: "insideBottom",
                  offset: -12,
                  fill: "var(--text-3)",
                  fontSize: 10,
                  fontFamily: "var(--mono)",
                }}
                tick={{
                  fill: "var(--text-3)",
                  fontSize: 11,
                  fontFamily: "var(--mono)",
                }}
                axisLine={{ stroke: "#1c2d4a" }}
                tickLine={false}
              />
              <YAxis
                label={{
                  value: "Frequency (%)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "var(--text-3)",
                  fontSize: 10,
                  fontFamily: "var(--mono)",
                }}
                tick={{
                  fill: "var(--text-3)",
                  fontSize: 10,
                  fontFamily: "var(--mono)",
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<BenfordTip />} />
              <Legend
                verticalAlign="top"
                height={32}
                wrapperStyle={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-2)",
                }}
              />
              <Line
                type="monotone"
                dataKey="expected"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="6 3"
                name="Expected Benford %"
                dot={{ fill: "#3b82f6", r: 3 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#f59e0b"
                strokeWidth={2.5}
                name="Actual Transaction %"
                dot={{ fill: "#f59e0b", r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Deviation Table</div>
        <div className="card-sub">
          Positive = over-represented · Negative = under-represented · Flag
          threshold: ±2.0%
        </div>
        <div className="table-container">
          <table className="exc-table">
            <thead>
              <tr>
                <th>Digit</th>
                <th>Expected %</th>
                <th>Actual %</th>
                <th>Deviation</th>
                <th>Magnitude</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {benfordData.map((row) => {
                const abs = Math.abs(row.deviation);
                const flag = abs >= 2;
                const devColor = flag
                  ? "#ef4444"
                  : row.deviation > 0
                    ? "#f59e0b"
                    : "#8899bb";
                return (
                  <tr key={row.digit}>
                    <td style={{ color: "var(--text-1)", fontWeight: 600 }}>
                      {row.digit}
                    </td>
                    <td>{row.expected}%</td>
                    <td>{row.actual}%</td>
                    <td style={{ color: devColor }}>
                      {row.deviation > 0 ? "+" : ""}
                      {row.deviation}%
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 64,
                            height: 4,
                            background: "var(--border)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.min((abs / 3) * 100, 100)}%`,
                              height: "100%",
                              background: devColor,
                              borderRadius: 2,
                            }}
                          />
                        </div>
                        <span style={{ color: "var(--text-3)", fontSize: "0.62rem" }}>
                          {abs.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td>
                      {flag ? (
                        <span className="badge badge-high">INVESTIGATE</span>
                      ) : (
                        <span className="badge badge-low">NORMAL</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          style={{
            padding: "0.75rem 1rem",
            borderTop: "1px solid var(--border)",
            fontFamily: "var(--mono)",
            fontSize: "0.62rem",
            color: "var(--text-3)",
          }}
        >
          Flagged digits: 2 (digits 2 and 9) · Chi-square analysis recommended
          for digits with deviation ≥ 2%
        </div>
      </div>
    </>
  );
}
