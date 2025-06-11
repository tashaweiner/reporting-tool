import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ChartWrapper({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p style={{ color: '#999' }}>⚠️ Invalid or missing chart data.</p>;
  }

  try {
    return (
      <LineChart width={600} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={2} />
      </LineChart>
    );
  } catch (err) {
    console.error('Chart rendering failed:', err);
    return <p style={{ color: 'red' }}>Chart could not be rendered.</p>;
  }
}
