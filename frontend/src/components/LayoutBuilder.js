import React, { useState } from 'react';

const imageOptions = [
  { label: 'Bear', url: 'https://placebear.com/300/200' },
  { label: 'Snapshot', url: 'https://placehold.co/300x200?text=Snapshot' },
  { label: 'Mountain', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80' },
  { label: 'Office', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=600&q=80' }
];

export default function LayoutBuilder({ layout, setLayout }) {
  const [newSectionType, setNewSectionType] = useState('text');

  const updateTitle = (e) => {
    setLayout(prev => ({ ...prev, title: e.target.value }));
  };

  const addSection = () => {
    let newSection;
    if (newSectionType === 'text') newSection = { type: 'text', content: '' };
    if (newSectionType === 'image') newSection = { type: 'image', url: imageOptions[0].url };
    if (newSectionType === 'table') {
      newSection = {
        type: 'table',
        data: [
          ['Header 1', 'Header 2'],
          ['Row 1 Col 1', 'Row 1 Col 2']
        ]
      };
    }

    setLayout(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (index, field, value) => {
    const updated = [...layout.sections];
    const section = { ...updated[index] };

    if (section.type === 'text') section.content = value;
    if (section.type === 'image') section.url = value;
    if (section.type === 'table') {
      try {
        section.data = JSON.parse(value);
      } catch {}
    }

    updated[index] = section;
    setLayout({ ...layout, sections: updated });
  };

  const deleteSection = (index) => {
    const updated = [...layout.sections];
    updated.splice(index, 1);
    setLayout({ ...layout, sections: updated });
  };

  const addRow = (i) => {
    const updated = [...layout.sections];
    const cols = updated[i].data[0]?.length || 2;
    updated[i].data.push(Array(cols).fill(''));
    setLayout({ ...layout, sections: updated });
  };

  const addCol = (i) => {
    const updated = [...layout.sections];
    updated[i].data = updated[i].data.map(row => [...row, '']);
    setLayout({ ...layout, sections: updated });
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Build Your Report</h2>

      <label>
        <strong>Report Title:</strong>
        <input
          type="text"
          value={layout.title}
          onChange={updateTitle}
          style={{ display: 'block', margin: '0.5rem 0 1rem', padding: '0.5rem', width: '100%' }}
        />
      </label>

      <div style={{ marginBottom: '1.5rem' }}>
        <label><strong>Add Section:</strong></label>
        <select
          value={newSectionType}
          onChange={(e) => setNewSectionType(e.target.value)}
          style={{ marginLeft: '0.5rem', padding: '0.3rem' }}
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="table">Table (Editable)</option>
          <option value="chart" disabled style={{ color: '#aaa' }}>
            Chart (Coming Soon)
          </option>
        </select>

        <button
          onClick={addSection}
          style={{
            marginLeft: '1rem',
            padding: '0.4rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      {layout.sections.map((section, i) => (
        <div
          key={i}
          style={{
            marginBottom: '1.5rem',
            border: '1px solid #ddd',
            padding: '1rem',
            borderRadius: '5px',
            backgroundColor: '#fafafa'
          }}
        >
          {section.type === 'text' && (
            <textarea
              value={section.content}
              onChange={(e) => updateSection(i, 'content', e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          )}

          {section.type === 'image' && (
            <>
              <select
                value={section.url}
                onChange={(e) => updateSection(i, 'url', e.target.value)}
                style={{ width: '100%', padding: '0.5rem' }}
              >
                {imageOptions.map(opt => (
                  <option key={opt.url} value={opt.url}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <img
                src={section.url}
                alt="Preview"
                style={{
                  marginTop: '0.75rem',
                  maxWidth: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </>
          )}

          {section.type === 'table' && (
            <div>
              <table style={{ borderCollapse: 'collapse', marginTop: '0.5rem' }}>
                <tbody>
                  {section.data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} style={{ border: '1px solid #ccc', padding: '4px' }}>
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => {
                              const updated = [...layout.sections];
                              updated[i].data[rowIndex][colIndex] = e.target.value;
                              setLayout({ ...layout, sections: updated });
                            }}
                            style={{ width: '100%' }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => addRow(i)} style={{ marginRight: '0.5rem' }}>➕ Add Row</button>
                <button onClick={() => addCol(i)}>➕ Add Column</button>
              </div>
            </div>
          )}

          <button
            onClick={() => deleteSection(i)}
            style={{
              marginTop: '1rem',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '0.4rem 0.75rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete Section
          </button>
        </div>
      ))}
    </div>
  );
}
