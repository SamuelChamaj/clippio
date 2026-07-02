export default function CircularText({ text = 'CLIPPIO*FUNCTION*WEB*', className = '' }) {
  const letters = Array.from(text);
  return (
    <span className={`fx-circular-text ${className}`} aria-label={text}>
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          style={{ transform: `rotate(${(360 / letters.length) * index}deg) translateY(-3.1rem)` }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
