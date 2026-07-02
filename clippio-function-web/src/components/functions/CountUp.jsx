import { useEffect, useState } from 'react';

export default function CountUp({ end = 100, suffix = '', className = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 48;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / total, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress === 1) window.clearInterval(timer);
    }, 25);
    return () => window.clearInterval(timer);
  }, [end]);

  return <span className={className}>{value}{suffix}</span>;
}
