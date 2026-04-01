import React, { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ borderBottom: '1px dotted #5bc8d4', cursor: 'help', color: '#cbe0eb' }}>
        {children}
      </span>
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
          background: '#0f1923',
          color: '#5bc8d4',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          border: '1px solid #1e3a4a',
        }}>
          {text}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            marginLeft: '-5px',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#1e3a4a transparent transparent transparent'
          }} />
        </div>
      )}
    </span>
  );
}
