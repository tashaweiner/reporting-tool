import React, { useState } from 'react';

// Predefined image options
const imageOptions = [
  {
    label: 'Bear',
    url: 'https://placebear.com/300/200'
  },
  {
    label: 'Performance Snapshot',
    url: 'https://placehold.co/300x200?text=Snapshot'
  },
  {
    label: 'Mountain View',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80'
  },
  {
    label: 'Office Team',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=600&q=80'
  }
];

export default function LayoutBuilder({ layout, setLayout }) {
  const [newSectionType, setNewSectionType] = useState('text');

  const updateTitle = (e) => {
    setLayout(prev => ({ ...prev, title: e.target.value }));
  };

  const addSection = () => {
    let newSection;
    if (newSectionType === 'text') newSection = { type: 'text', content: '' };
    if (newSectionType === 'image') newSection = { type: 'image', url: '' };
    if (newSectionType === 'table') newSection = { type: 'table', data: [['Header 1', 'Header 2']] };
    if (newSectionType === 'chart') newSection = { type: 'chart', data: [{ label: 'A', value: 100 }] };

    setLayout(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (index, field, value) => {
    const updatedSections = [...layout.sections];
    const section = { ...updatedSections[index] };

    if (section.type === 'text') section.content = value;
    if (section.type === 'image') section.url = value;

    if (section.type === 'table' || section.type === 'chart') {
      try {
        section.data = JSON.parse(value);
      } catch {
        // silently ignore invalid JSON
      }
    }

    updatedSections[index] = section;
    setLayout({ ...layout, sections: updatedSections });
  };

  const deleteSection = (index) => {
    const updatedSections = [...layout.sections];
    updatedSections.splice(index, 1);
    setLayout({ ...layout, sections: updatedSections });
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>🛠️ Build Your Report</h2>

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
          <option value="table">Table (JSON)</option>
          <option value="chart">Chart (JSON)</option>
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
          <label><strong>{section.type.toUpperCase()} Section:</strong></label>

          {section.type === 'text' && (
            <textarea
              value={section.content}
              onChange={(e) => updateSection(i, 'content', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          )}

          {section.type === 'image' && (
            <>
              <select
                value={section.url}
                onChange={(e) => updateSection(i, 'url', e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              >
                <option value="">Select an image...</option>
                {imageOptions.map((opt) => (
                  <option key={opt.url} value={opt.url}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {section.url && (
                <img
                  src={section.url}
                  alt="Preview"
                  style={{ marginTop: '0.75rem', maxWidth: '100%', border: '1px solid #ccc' }}
                />
              )}
            </>
          )}

          {(section.type === 'table' || section.type === 'chart') && (
            <textarea
              value={JSON.stringify(section.data)}
              onChange={(e) => updateSection(i, 'data', e.target.value)}
              placeholder="Enter JSON array"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
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
