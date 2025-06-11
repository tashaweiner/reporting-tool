export default function LayoutViewer({ layout }) {
  return (
    <div>
      <h1>{layout.title}</h1>
      {layout.sections.map((section, index) => {
        if (section.type === 'text') return <p key={index}>{section.content}</p>;
        if (section.type === 'image') return <img key={index} src={section.url} alt="section" width="300" />;
        if (section.type === 'table')
          return (
            <table key={index} border="1">
              <tbody>
                {section.data.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => <td key={j}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        if (section.type === 'chart')
          return (
            <div key={index}>
              <strong>Chart Placeholder</strong>
              <ul>
                {section.data.map((point, i) => (
                  <li key={i}>{point.label}: {point.value}</li>
                ))}
              </ul>
            </div>
          );
        return null;
      })}
    </div>
  );
}
