import React from 'react';

export default function SavedLayouts({ layouts, onLoad }) {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/layouts/${id}`, {
        method: 'DELETE',
      });
      window.location.reload(); // or lift state if you prefer
    } catch (err) {
      console.error('Failed to delete layout:', err);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Saved Layouts</h2>
      {layouts.length === 0 ? (
        <p>No saved layouts found.</p>
      ) : (
        <ul>
          {layouts.map((layout) => (
            <li key={layout.id} style={{ marginBottom: '1rem' }}>
              <strong>{layout.title}</strong>
              <div style={{ marginTop: '0.3rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => onLoad(layout)} style={{ padding: '0.3rem 0.75rem' }}>
                  View/Edit
                </button>
                <button
                  onClick={() => handleDelete(layout.id)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
