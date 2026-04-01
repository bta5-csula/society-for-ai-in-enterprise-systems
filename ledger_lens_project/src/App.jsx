import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Database, Hammer, BrainCircuit, FileCode2, PlayCircle, Printer, ArrowLeft } from "lucide-react";

// Import components
import RealCompaniesStep from "./components/RealCompaniesStep";
import YourDataFitStep from "./components/YourDataFitStep";
import WhatToBuildStep from "./components/WhatToBuildStep";
import AIMethodStep from "./components/AIMethodStep";
import PythonCodeStep from "./components/PythonCodeStep";
import InteractiveDemoStep from "./components/InteractiveDemoStep";

const steps = [
  {
    id: 1,
    label: "Real Companies",
    title: "3 Real Companies Using AI in Tax Strategy",
    content: RealCompaniesStep,
    icon: Building2,
  },
  {
    id: 2,
    label: "Your Data Fit",
    title: "Which Problems Can YOU Solve With This Data?",
    content: YourDataFitStep,
    icon: Database,
  },
  {
    id: 3,
    label: "What to Build",
    title: "What Would You Build? (Specific Blueprint)",
    content: WhatToBuildStep,
    icon: Hammer,
  },
  {
    id: 4,
    label: "AI Method",
    title: "Which AI/ML Method to Use?",
    content: AIMethodStep,
    icon: BrainCircuit,
  },
  {
    id: 5,
    label: "Python Code",
    title: "Python Code — Step by Step",
    content: PythonCodeStep,
    icon: FileCode2,
  },
  {
    id: 6,
    label: "Interactive Demo",
    title: "Run Analysis Workflow",
    content: InteractiveDemoStep,
    icon: PlayCircle,
  },
];

export default function TaxAIGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);

  const ActiveComponent = steps[activeStep].content;
  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 150); // Small delay to allow React to mount all steps before browser captures print window
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: isPrinting ? "#ffffff" : "#0a1520",
        color: isPrinting ? "#000000" : "#c8dde8",
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: 0,
        position: "relative",
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .nav-container div::-webkit-scrollbar { display: none; }
        @media print {
          body, html, main { background: #ffffff !important; color: #000000 !important; height: auto !important; }
          .screen-only { display: none !important; }
        }
        /* Tablet (≤768px) */
        @media (max-width: 768px) {
          .site-title { font-size: 24px !important; }
          .header-sub { letter-spacing: 2px !important; font-size: 10px !important; }
          .header-desc { font-size: 12px !important; }
          .header-wrapper { padding-top: 52px !important; }
          .content-panel { padding: 14px !important; }
          .nav-btn { padding: 12px 8px !important; font-size: 11px !important; }
        }
        /* Phone (≤480px) */
        @media (max-width: 480px) {
          .site-title { font-size: 24px !important; }
          .back-btn-label, .print-btn-label { display: none !important; }
          .back-btn, .print-btn { padding: 8px 10px !important; }
          .content-panel { padding: 12px !important; }
          .prev-next-row { gap: 8px !important; }
        }
      `}} />

      {/* Top glowing progress bar - fixed so it never scrolls away */}
      <motion.div
        className="screen-only"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          background: "#5bc8d4",
          boxShadow: "0 0 10px #5bc8d4",
          zIndex: 1000,
        }}
      />

      <div style={{ maxWidth: 820, margin: "0 auto", overflowX: "hidden" }}>

        {/* Sticky header - pins title + nav to top, never scrolls away */}
        <div
          className="screen-only"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "#0a1520",
            paddingTop: "24px",
            paddingBottom: 0,
          }}
        >
          {/* Header Container */}
          <div style={{ position: "relative", textAlign: "center", marginBottom: 20, padding: "0 16px" }} className="header-wrapper">

            {/* Back to Projects link — top left */}
            <a
              href="https://society-for-ai-in-enterprise-systems.vercel.app/index.html#projects"
              className="back-btn"
              style={{
                position: "absolute", left: 16, top: 0, color: "#8cabb8",
                border: "1px solid #1e3a4a", borderRadius: "8px", padding: "8px 12px",
                display: "flex", alignItems: "center", gap: "6px",
                fontSize: "12px", fontWeight: 600, textDecoration: "none",
                transition: "all 0.2s", background: "transparent"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1e3a4a"; e.currentTarget.style.color = "#cbe0eb"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8cabb8"; }}
            >
              <ArrowLeft size={14} /><span className="back-btn-label"> Projects</span>
            </a>

            {/* Print Button — top right */}
            <button
              onClick={handlePrint}
              className="screen-only print-btn"
              style={{
                position: "absolute", right: 16, top: 0, background: "transparent", color: "#8cabb8",
                border: "1px solid #1e3a4a", borderRadius: "8px", padding: "8px 12px", display: "flex",
                alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1e3a4a"; e.currentTarget.style.color = "#cbe0eb"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8cabb8"; }}
            >
              <Printer size={16} /><span className="print-btn-label"> Print Full Report</span>
            </button>

            <div className="header-sub" style={{ color: isPrinting ? "#555" : "#5bc8d4", fontSize: 11, letterSpacing: 4, marginBottom: 8, fontWeight: 600 }}>
              ENTERPRISE AI FOR TAX PROFESSIONALS
            </div>
            <h1 className="site-title" style={{ color: isPrinting ? "#000" : "#e2c074", fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
              From Bike Sales Data → Tax Intelligence
            </h1>
            <p className="header-desc" style={{ color: isPrinting ? "#555" : "#b0c4cf", fontSize: 13, margin: 0 }}>
              A practical walkthrough for public accounting professionals
            </p>
          </div>

          {/* Step Nav - also sticky, sits directly below header */}
          {!isPrinting && (
            <div className="nav-container" style={{ padding: "0 16px", paddingBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  background: "#0f1923",
                  borderRadius: 10,
                  border: "1px solid #1e3a4a",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = activeStep === i;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveStep(i)}
                      style={{
                        flex: "1 0 auto",
                        padding: "16px 14px 12px",
                        background: isActive ? "#1e3a4a" : "transparent",
                        color: isActive ? "#e2c074" : "#b0c4cf",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: isActive ? 600 : 400,
                        letterSpacing: 0.5,
                        borderRight: i < steps.length - 1 ? "1px solid #1e3a4a" : "none",
                        transition: "all .2s",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div> {/* END sticky header wrapper */}

        {/* Scrollable content below the sticky header */}
        <div style={{ padding: "0 16px 24px" }}>

          {/* --- PRINTING RENDER BLOCK --- */}
          {isPrinting ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {steps.map((s, index) => {
                const StepContent = s.content;
                return (
                  <div key={s.id} style={{ pageBreakInside: "avoid" }}>
                    <h2 style={{ fontSize: 20, color: "#000", borderBottom: "2px solid #ccc", paddingBottom: "10px", marginBottom: "20px" }}>
                      Step {index + 1}: {s.title}
                    </h2>
                    <StepContent />
                  </div>
                );
              })}
            </div>
          ) : (
            /* --- STANDARD INTERACTIVE INTERFACE --- */
            <>

              {/* Content Container */}
              <div
                className="screen-only content-panel"
                style={{
                  background: "#0d1e2a",
                  border: "1px solid #1e3a4a",
                  borderRadius: 12,
                  padding: 24,
                  minHeight: "450px",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2
                      style={{
                        color: "#e2c074",
                        fontSize: 18,
                        marginTop: 0,
                        marginBottom: 20,
                        paddingBottom: 12,
                        borderBottom: "1px solid #1e3a4a",
                      }}
                    >
                      {steps[activeStep].title}
                    </h2>
                    <ActiveComponent />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div
                className="screen-only"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  style={{
                    background: "#1e3a4a",
                    color: "#5bc8d4",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 20px",
                    cursor: activeStep === 0 ? "default" : "pointer",
                    opacity: activeStep === 0 ? 0.3 : 1,
                    fontSize: 13,
                  }}
                >
                  ← Previous
                </button>
                <span style={{ color: "#8cabb8", fontSize: 12, alignSelf: "center", fontWeight: 600 }}>
                  {activeStep + 1} / {steps.length}
                </span>
                <button
                  onClick={() =>
                    setActiveStep(Math.min(steps.length - 1, activeStep + 1))
                  }
                  disabled={activeStep === steps.length - 1}
                  style={{
                    background: "#e2c074",
                    color: "#0a1520",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 20px",
                    cursor: activeStep === steps.length - 1 ? "default" : "pointer",
                    opacity: activeStep === steps.length - 1 ? 0.3 : 1,
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div> {/* END scrollable content wrapper */}
      </div> {/* END maxWidth wrapper */}

      {/* FOOTER */}
      {!isPrinting && (
        <footer>
          <span>Berumen Escobedo, Anthony · Society for AI in Enterprise Systems · Est. CSULA 2026</span>
          <span>Data: Audit Analytics Bike Manufacturer Dataset · FY 2023</span>
        </footer>
      )}
    </main>
  );
}
