import React from 'react';

export type ToastProps = {
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
  id: string | number;
};

export function Toast({ title, description, button }: ToastProps) {
  return (
    <div
      style={{
        display: 'flex',
        borderRadius: '8px',
        background: '#ffffff',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        width: '100%',
        padding: '16px',
      }}
    >
      <div style={{ display: 'flex', flex: '1', alignItems: 'center' }}>
        <div style={{ width: '100%' }}>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827', margin: 0 }}>{title}</p>
          <p style={{ marginTop: '4px', fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
            {description}
          </p>
        </div>
      </div>
      <div style={{ marginLeft: '20px', flexShrink: 0 }}>
        <button
          onClick={button.onClick}
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: '#6366f1',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '6px',
            padding: '4px 8px',
          }}
        >
          {button.label}
        </button>
      </div>
    </div>
  );
}
