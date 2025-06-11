export default function populateSampleData(layout) {
  const populatedSections = layout.sections.map((section) => {
    if (section.type === 'text') {
      return {
        ...section,
        content:
          'Q2 performance showed significant growth in user engagement and retention. Product updates and marketing campaigns contributed to a 35% increase in active users.',
      };
    }

    if (section.type === 'image') {
      return {
        ...section,
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=600&q=80',
      };
    }

    if (section.type === 'table') {
      return {
        ...section,
        data: [
          ['Department', 'Q2 Revenue ($K)', 'Change vs Q1'],
          ['Engineering', '920', '+12%'],
          ['Marketing', '640', '+18%'],
          ['Sales', '1,130', '+9%'],
        ],
      };
    }

    if (section.type === 'chart') {
      return {
        ...section,
        data: [
          { label: 'April', value: 310 },
          { label: 'May', value: 480 },
          { label: 'June', value: 570 },
        ],
      };
    }

    return section;
  });

  return {
    ...layout,
    title: layout.title || 'Q2 2025 Company Performance Report',
    sections: populatedSections,
  };
}
