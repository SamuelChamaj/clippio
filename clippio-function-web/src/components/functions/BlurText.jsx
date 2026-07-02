export default function BlurText({ text, className = '', animateBy = 'words' }) {
  const parts = animateBy === 'letters' ? Array.from(text) : text.split(' ');

  return (
    <span className={`fx-blur-text ${className}`} aria-label={text}>
      {parts.map((part, index) => (
        <span
          className="fx-blur-text__item"
          style={{ animationDelay: `${index * 0.075}s` }}
          key={`${part}-${index}`}
        >
          {part === ' ' ? '\u00A0' : part}
          {animateBy === 'words' && index < parts.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}
