import React, { useState } from 'react';
import { Download } from 'lucide-react';

export default function InteractiveDemoStep() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(false);

  const handleRun = () => {
    setLoading(true);
    setResults(false);
    setTimeout(() => {
      setLoading(false);
      setResults(true);
    }, 2000);
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Customer,Current,31-60,90+,Risk Score\n" +
      "Acme Corp,$45000,$0,$0,Low (12%)\n" +
      "Globex,$12000,$8000,$35000,HIGH (88%)\n" +
      "Initech,$0,$19000,$2000,Medium (45%)";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Audit_AR_Aging_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadDataset = (type) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    let filename = "";
    if (type === "invoices") {
      csvContent += "invoice_id,invoice_date,due_date,amount,status\nINV-001,2023-01-15,2023-02-14,45000.00,PAID\nINV-002,2023-02-10,2023-03-12,12000.00,PAID\nINV-003,2023-03-05,2023-04-04,19000.00,LATE";
      filename = "mock_invoices.csv";
    } else if (type === "payments") {
      csvContent += "payment_id,invoice_id,payment_date,days_from_due\nPAY-101,INV-001,2023-02-10,-4\nPAY-102,INV-002,2023-03-20,8\nPAY-103,INV-003,2023-05-15,41";
      filename = "mock_payments.csv";
    } else if (type === "customers") {
      csvContent += "customer_id,segment,city,lifetime_revenue\nC-01,Enterprise,New York,1500000\nC-02,Mid-Market,Chicago,450000\nC-03,SMB,Austin,75000";
      filename = "mock_customers.csv";
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tagStyle = {
    background: '#0f1923', padding: '6px 14px', borderRadius: '15px', color: '#5bc8d4', fontSize: '13px', 
    border: '1px solid #1e3a4a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
    transition: 'all 0.2s', fontWeight: 600
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: '#0a2233', padding: '20px', borderRadius: '10px', border: '1px solid #1e3a4a'}}>
        <h3 style={{ margin: '0 0 10px 0', color: '#cbe0eb' }}>Data Sources Loaded</h3>
        <p style={{ margin: '0 0 12px 0', color: '#8cabb8', fontSize: '12px' }}>Click to download mock datasets for local analysis.</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button style={tagStyle} onMouseEnter={(e) => e.target.style.background = '#1e3a4a'} onMouseLeave={(e) => e.target.style.background = '#0f1923'} onClick={() => handleDownloadDataset("invoices")}><Download size={14} /> invoices.csv</button>
          <button style={tagStyle} onMouseEnter={(e) => e.target.style.background = '#1e3a4a'} onMouseLeave={(e) => e.target.style.background = '#0f1923'} onClick={() => handleDownloadDataset("payments")}><Download size={14} /> payments.csv</button>
          <button style={tagStyle} onMouseEnter={(e) => e.target.style.background = '#1e3a4a'} onMouseLeave={(e) => e.target.style.background = '#0f1923'} onClick={() => handleDownloadDataset("customers")}><Download size={14} /> customers.csv</button>
        </div>
      </div>

      <button 
        onClick={handleRun}
        disabled={loading}
        style={{
          background: loading ? '#0f1923' : '#e2c074',
          color: loading ? '#5bc8d4' : '#0a1520',
          padding: '14px 24px',
          border: loading ? '1px solid #5bc8d4' : 'none',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '15px',
          cursor: loading ? 'wait' : 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '16px', height: '16px', border: '2px solid #5bc8d4', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            Training GB Model & Scoring...
          </span>
        ) : 'Analyze Ledger Data (Run Script)'}
      </button>

      {results && (
        <div style={{ background: '#0f1923', borderRadius: '10px', padding: '20px', border: '1px solid #1e3a4a', animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ margin: 0, color: '#e2c074', fontSize: '16px' }}>AR Aging & Risk Output</h3>
                <span style={{ color: '#7ed47e', fontSize: '12px', background: '#060e14', padding: '4px 8px', borderRadius: '4px', border: '1px solid #1e3a4a' }}>✅ Analysis Complete</span>
            </div>
            
            <button 
                onClick={handleDownloadCSV}
                style={{
                    background: '#1e3a4a', color: '#cbe0eb', border: 'none', borderRadius: '6px',
                    padding: '8px 12px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    fontWeight: 600
                }}
            >
                <Download size={14} /> Download CSV
            </button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '13px', minWidth: '400px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e3a4a', color: '#b0c4cf' }}>
                  <th style={{ padding: '8px 4px' }}>Customer</th>
                  <th style={{ padding: '8px 4px' }}>Current</th>
                  <th style={{ padding: '8px 4px' }}>31-60</th>
                  <th style={{ padding: '8px 4px' }}>90+</th>
                  <th style={{ padding: '8px 4px' }}>Risk Score</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #1a2d38', color: '#cbe0eb' }}>
                  <td style={{ padding: '10px 4px' }}>Acme Corp</td>
                  <td style={{ padding: '10px 4px' }}>$45k</td>
                  <td style={{ padding: '10px 4px' }}>$0</td>
                  <td style={{ padding: '10px 4px' }}>$0</td>
                  <td style={{ padding: '10px 4px' }}><span style={{ color: '#7ed47e' }}>Low (12%)</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1a2d38', color: '#cbe0eb', background: '#251b14' }}>
                  <td style={{ padding: '10px 4px', fontWeight: 'bold' }}>Globex</td>
                  <td style={{ padding: '10px 4px' }}>$12k</td>
                  <td style={{ padding: '10px 4px' }}>$8k</td>
                  <td style={{ padding: '10px 4px', color: '#e2c074' }}>$35k</td>
                  <td style={{ padding: '10px 4px' }}><span style={{ color: '#e27474', fontWeight: 'bold' }}>HIGH (88%)</span></td>
                </tr>
                <tr style={{ color: '#cbe0eb' }}>
                  <td style={{ padding: '10px 4px' }}>Initech</td>
                  <td style={{ padding: '10px 4px' }}>$0</td>
                  <td style={{ padding: '10px 4px' }}>$19k</td>
                  <td style={{ padding: '10px 4px' }}>$2k</td>
                  <td style={{ padding: '10px 4px' }}><span style={{ color: '#e2c074' }}>Medium (45%)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin { 100% { transform: rotate(360deg); } }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          `}} />
        </div>
      )}
    </div>
  );
}
