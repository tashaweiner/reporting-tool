import { useState, useEffect } from 'react';
import LayoutViewer from './components/LayoutViewer';
import SavedLayouts from './components/SavedLayouts';
import ControlPanel from './components/ControlPanel';
import LayoutBuilder from './components/LayoutBuilder';
import populateSampleData from './utils/populateSampleData';

const initialLayout = {
  title: 'My First Report',
  sections: [
    { type: 'text', content: '' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=600&q=80' },
    { type: 'table', data: [] },
    { type: 'chart', data: [] }
  ]
};

export default function App() {
  const [layout, setLayout] = useState(initialLayout);
  const [savedLayouts, setSavedLayouts] = useState([]);

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
const populateWithSampleData = () => {
  setLayout((prev) => populateSampleData(prev));
};

  useEffect(() => {
    fetch('http://localhost:8000/layouts')
      .then(res => res.json())
      .then(data => setSavedLayouts(data))
      .catch(err => console.error('Failed to fetch layouts:', err));
  }, []);

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#fff'
    }}>
      <LayoutBuilder layout={layout} setLayout={setLayout} />
      <LayoutViewer layout={layout} />
      <ControlPanel onSave={saveLayout} onPopulate={populateWithSampleData} />
      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #ccc' }} />
      <SavedLayouts layouts={savedLayouts} />
    </div>
  );
}
