import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function LayoutViewer({ layout }) {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{layout.title}</h1>

      {layout.sections.length === 0 && (
        <p style={{ fontStyle: 'italic', color: '#777' }}>
          No sections added yet.
        </p>
      )}

      {layout.sections.map((section, index) => (
        <div key={index} style={{ marginBottom: '2rem' }}>
          {section.type === 'text' && section.content && (
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              {section.content}
            </p>
          )}

          {section.type === 'image' && section.url && (
            <img
              src={section.url}
              alt="Report"
              style={{ width: '100%', maxWidth: '500px', borderRadius: '6px' }}
            />
          )}

          {section.type === 'table' && Array.isArray(section.data) && (
            <table
              border="1"
              cellPadding="8"
              style={{
                borderCollapse: 'collapse',
                width: '100%',
                fontSize: '0.95rem'
              }}
            >
              <tbody>
                {section.data.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {section.type === 'chart' &&
            Array.isArray(section.data) &&
            section.data.every(d => d.label && d.value !== undefined) && (
              <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                  <LineChart data={section.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#007bff"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
          )}
        </div>
      ))}
    </div>
  );
}
