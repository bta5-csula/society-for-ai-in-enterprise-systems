import React from "react";

export function Header({ backButton }) {
  return (
    <header className="audit-header">
      <div className="header-left">
        {backButton}
        <span className="header-badge">⚑ FORENSIC AUDIT</span>
        <div>
          <div className="header-title">Audit Analytics Terminal</div>
          <div className="header-sub">
            BIKE MANUFACTURER · EY ENGAGEMENT · FY 2023
          </div>
        </div>
      </div>
      <div className="header-right">
        <div>
          <span className="live-dot" />
          SYSTEM ACTIVE
        </div>
        <div>5,000 TXN · $120.8M REVENUE</div>
      </div>
    </header>
  );
}
