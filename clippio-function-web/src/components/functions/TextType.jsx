import { useEffect, useMemo, useState } from 'react';

export default function TextType({ text, typingSpeed = 55, pauseDuration = 1100, className = '' }) {
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[sentenceIndex];
    let delay = deleting ? 26 : typingSpeed;

    if (!deleting && charIndex === current.length) {
      delay = pauseDuration;
    }

    const timeout = window.setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex(charIndex + 1);
        return;
      }
      if (!deleting && charIndex === current.length) {
        setDeleting(true);
        return;
      }
      if (deleting && charIndex > 0) {
        setCharIndex(charIndex - 1);
        return;
      }
      if (deleting && charIndex === 0) {
        setDeleting(false);
        setSentenceIndex((sentenceIndex + 1) % texts.length);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charIndex, deleting, pauseDuration, sentenceIndex, texts, typingSpeed]);

  return (
    <span className={`fx-text-type ${className}`}>
      <span>{texts[sentenceIndex].slice(0, charIndex)}</span>
      <span className="fx-text-type__cursor">|</span>
    </span>
  );
}
