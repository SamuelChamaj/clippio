import { useEffect, useMemo, useState } from 'react';

const glyphs = '01CLIPPIO{}<>/#@$%';

export default function DecryptedText({ text, className = '' }) {
  const [frame, setFrame] = useState(0);
  const length = text.length;

  useEffect(() => {
    const total = length + 12;
    const interval = window.setInterval(() => {
      setFrame((value) => (value + 1) % total);
    }, 60);
    return () => window.clearInterval(interval);
  }, [length]);

  const output = useMemo(() => {
    return Array.from(text)
      .map((char, index) => {
        if (char === ' ') return ' ';
        if (index < frame - 6) return char;
        return glyphs[(frame + index * 7) % glyphs.length];
      })
      .join('');
  }, [frame, text]);

  return <span className={`fx-decrypted-text ${className}`}>{output}</span>;
}
