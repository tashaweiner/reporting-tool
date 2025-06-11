export default function ControlPanel({ onSave, onPopulate }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <button onClick={onSave} style={{ marginRight: '1rem' }}>Save Layout</button>
      <button onClick={onPopulate}>Populate with Sample Data</button>
    </div>
  );
}
