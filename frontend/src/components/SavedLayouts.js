export default function SavedLayouts({ layouts }) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>Saved Layouts</h2>
      {layouts.map((layout, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{layout.title}</h3>
          {layout.sections.map((s, j) => (
            <p key={j}><strong>{s.type}</strong></p>
          ))}
        </div>
      ))}
    </div>
  );
}
