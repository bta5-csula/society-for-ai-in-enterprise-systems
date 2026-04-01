export const benfordData = [
  { digit: "1", expected: 30.1, actual: 29.7, deviation: -0.4 },
  { digit: "2", expected: 17.6, actual: 19.8, deviation: 2.2 },
  { digit: "3", expected: 12.5, actual: 11.8, deviation: -0.7 },
  { digit: "4", expected: 9.7, actual: 10.7, deviation: 1.0 },
  { digit: "5", expected: 7.9, actual: 6.1, deviation: -1.8 },
  { digit: "6", expected: 6.7, actual: 5.9, deviation: -0.8 },
  { digit: "7", expected: 5.8, actual: 5.5, deviation: -0.3 },
  { digit: "8", expected: 5.1, actual: 3.2, deviation: -1.9 },
  { digit: "9", expected: 4.6, actual: 6.9, deviation: 2.3 },
];

export const exceptionData = [
  {
    test: "Duplicate Payments",
    count: 3588,
    risk: "HIGH",
    ref: "AS2201.43",
    pct: 71.8,
  },
  {
    test: "Late Payments",
    count: 2873,
    risk: "MEDIUM",
    ref: "ASC 606",
    pct: 57.5,
  },
  {
    test: "Off-Hours Transactions",
    count: 1471,
    risk: "MEDIUM",
    ref: "AS2201.18",
    pct: 29.4,
  },
  {
    test: "Threshold Avoidance",
    count: 477,
    risk: "MEDIUM",
    ref: "AS2201.44",
    pct: 9.5,
  },
  {
    test: "Credit Limit Breaches",
    count: 190,
    risk: "MEDIUM",
    ref: "AS2201.44",
    pct: 3.8,
  },
  {
    test: "SOD Violations",
    count: 87,
    risk: "HIGH",
    ref: "AS2201.15",
    pct: 1.7,
  },
];

export const riskCells = [
  {
    title: "Fraud Risk",
    score: 72,
    color: "#ef4444",
    ref: "AS2110",
    items: [
      "Benford digit 9 anomaly (+2.3%)",
      "SOD violations (87)",
      "Threshold clustering (477)",
    ],
  },
  {
    title: "Control Risk",
    score: 58,
    color: "#f59e0b",
    ref: "AS2201",
    items: [
      "Duplicate payment exposure (~$3.1M)",
      "Off-hours auth failures",
      "Credit limit breaches (190)",
    ],
  },
  {
    title: "Revenue Risk",
    score: 41,
    color: "#3b82f6",
    ref: "ASC 606",
    items: [
      "Late recognition events (2,873)",
      "Exception rate: 13.7%",
      "Revenue tested: $120.8M",
    ],
  },
  {
    title: "Compliance Risk",
    score: 65,
    color: "#f59e0b",
    ref: "AS2301",
    items: [
      "PCAOB AS2201 mapping gaps",
      "GAAS documentation gaps",
      "Management override indicators",
    ],
  },
  {
    title: "IT / Access Risk",
    score: 83,
    color: "#ef4444",
    ref: "AS2201.18",
    items: [
      "SOD violations signal access gaps",
      "Off-hours logins (1,471)",
      "System change log anomalies",
    ],
  },
  {
    title: "Inherent Risk",
    score: 35,
    color: "#10b981",
    ref: "AS2101",
    items: [
      "B2B manufacturing — moderate risk",
      "23 customers (concentrated)",
      "FY2023 stable environment",
    ],
  },
];
