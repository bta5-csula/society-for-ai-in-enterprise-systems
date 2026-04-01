import React from "react";

export function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <nav className="tab-nav">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`tab-btn${activeTab === t.id ? " active" : ""}`}
          onClick={() => onTabChange(t.id)}
        >
          {t.icon} {t.label}
        </button>
      ))}
    </nav>
  );
}
