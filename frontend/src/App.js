import { useState, useEffect } from 'react';
import LayoutBuilder from './components/LayoutBuilder';
import LayoutViewer from './components/LayoutViewer';
import ControlPanel from './components/ControlPanel';
import SavedLayouts from './components/SavedLayouts';
import populateSampleData from './utils/populateSampleData';

// Default blank layout
const initialLayout = {
  title: 'My First Report',
  sections: []
};

export default function App() {
  const [layout, setLayout] = useState(initialLayout);
  const [savedLayouts, setSavedLayouts] = useState([]);

  // Load all saved layouts from backend
  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const res = await fetch('http://localhost:8000/layouts');
        const data = await res.json();
        setSavedLayouts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch saved layouts:', err);
      }
    };
    fetchLayouts();
  }, []);

  // Save current layout to backend
  const saveLayout = async () => {
    try {
      const res = await fetch('http://localhost:8000/layouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(layout),
      });
      const data = await res.json();
      setSavedLayouts(prev => [...prev, data]);
    } catch (err) {
      console.error('Failed to save layout:', err);
    }
  };

  // Populate layout with sample content
  const populateWithSampleData = () => {
    setLayout(prev => populateSampleData(prev));
  };

  // Catch invalid layout state
  if (!layout || !Array.isArray(layout.sections)) {
    return <p>Error loading layout. Please refresh or try again.</p>;
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#fff'
    }}>
      <LayoutBuilder layout={layout} setLayout={setLayout} />

      {/* Preview box */}
      <div style={{
        border: '1px solid #ddd',
        padding: '2rem',
        marginTop: '2rem',
        borderRadius: '8px',
        backgroundColor: '#fdfdfd',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: '#444' }}>
          **** PREVIEW ****
        </h2>
        <LayoutViewer layout={layout} />
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: '#444' }}>
          **** END OF PREVIEW ****
        </h2>
      </div>

      <ControlPanel onSave={saveLayout} onPopulate={populateWithSampleData} />

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #ccc' }} />

      <SavedLayouts layouts={savedLayouts} onLoad={setLayout} />
    </div>
  );
}
