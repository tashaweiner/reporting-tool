import React from 'react';

export default function LayoutViewer({ layout }) {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{layout.title}</h1>
      {layout.sections.map((section, index) => (
        <div key={index} style={{ marginBottom: '2rem' }}>
          {section.type === 'text' && (
            <div>
              <strong>📝 Text:</strong>
              <p>{section.content}</p>
            </div>
          )}

          {section.type === 'image' && (
            <div>
              <strong>🖼️ Image:</strong><br />
              <img src={section.url} alt="section" style={{ width: '100%', maxWidth: '300px' }} />
            </div>
          )}

          {section.type === 'table' && (
            <div>
              <strong>📋 Table:</strong>
              <table border="1" cellPadding="8" style={{ marginTop: '0.5rem' }}>
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
            </div>
          )}

          {section.type === 'chart' && (
            <div>
              <strong>📊 Chart:</strong>
              <ul style={{ marginTop: '0.5rem' }}>
                {section.data.map((point, i) => (
                  <li key={i}>{point.label}: {point.value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
