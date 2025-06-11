import { useState, useEffect } from 'react';

const initialLayout = {
  title: 'My First Report',
  sections: [
    { type: 'text', content: '' },
    { type: 'image', url: '' },
    { type: 'table', data: [] },
    { type: 'chart', data: [] }
  ]
};

export default function App() {
  const [layout, setLayout] = useState(initialLayout);
  const [savedLayouts, setSavedLayouts] = useState([]);

  // Save layout to backend
  const saveLayout = async () => {
    const res = await fetch('http://localhost:8000/layouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(layout),
    });
    const data = await res.json();
    console.log('Saved layout:', data);
    setSavedLayouts(prev => [...prev, data]);
  };

  // Fetch saved layouts on load
  useEffect(() => {
    fetch('http://localhost:8000/layouts')
      .then(res => res.json())
      .then(data => setSavedLayouts(data));
  }, []);

  // Populate layout with sample data
  const populateWithSampleData = () => {
    setLayout({
      title: 'Populated Report',
      sections: [
        { type: 'text', content: 'This is a sample paragraph generated for preview.' },
        { type: 'image', url: 'https://source.unsplash.com/random/300x200' },
        {
          type: 'table',
          data: [
            ['Name', 'Score'],
            ['Alice', '95'],
            ['Bob', '88'],
          ],
        },
        {
          type: 'chart',
          data: [
            { label: 'Q1', value: 100 },
            { label: 'Q2', value: 150 },
            { label: 'Q3', value: 80 },
          ],
        },
      ],
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{layout.title}</h1>

      {/* Render current layout */}
      {layout.sections.map((section, index) => {
        if (section.type === 'text') return <p key={index}>{section.content}</p>;
        if (section.type === 'image') return <img key={index} src={section.url} alt="report section" width="300" />;
        if (section.type === 'table')
          return (
            <table key={index} border="1" style={{ marginTop: '1rem' }}>
              <tbody>
                {section.data.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '0.5rem' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        if (section.type === 'chart')
          return (
            <div key={index} style={{ marginTop: '1rem' }}>
              <strong>Chart (Placeholder)</strong>
              <ul>
                {section.data.map((point, i) => (
                  <li key={i}>{point.label}: {point.value}</li>
                ))}
              </ul>
            </div>
          );
        return null;
      })}

      <div style={{ marginTop: '2rem' }}>
        <button onClick={saveLayout} style={{ marginRight: '1rem' }}>Save Layout</button>
        <button onClick={populateWithSampleData}>Populate with Sample Data</button>
      </div>

      {/* Saved layouts preview */}
      <div style={{ marginTop: '3rem' }}>
        <h2>Saved Layouts</h2>
        {savedLayouts.map((saved, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{saved.title}</h3>
            {saved.sections.map((s, j) => (
              <p key={j}><strong>{s.type}</strong></p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
