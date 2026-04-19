export default function PrintingPress() {
  const strips = Array.from({ length: 18 }, (_, i) => i);
  const cols = [
    { left: '8%',  delay: '0s',   dur: '14s' },
    { left: '22%', delay: '-5s',  dur: '19s' },
    { left: '38%', delay: '-2s',  dur: '11s' },
    { left: '55%', delay: '-8s',  dur: '16s' },
    { left: '70%', delay: '-3s',  dur: '21s' },
    { left: '85%', delay: '-6s',  dur: '13s' },
  ];

  return (
    <div className="press-bg" aria-hidden="true">
      {/* Horizontal belt strips */}
      {strips.map((i) => {
        const top = (i / strips.length) * 100;
        const dur = 22 + (i % 5) * 7;
        const dir = i % 2 === 0 ? 'normal' : 'reverse';
        const opacity = 0.4 + (i % 3) * 0.2;
        const h = i % 4 === 0 ? 2 : 1;
        return (
          <div
            key={i}
            className="press-strip"
            style={{
              top: `${top}%`,
              animationDuration: `${dur}s`,
              animationDirection: dir,
              opacity,
              height: `${h}px`,
            }}
          />
        );
      })}

      {/* Vertical ink columns */}
      {cols.map((c, i) => (
        <div
          key={i}
          className="press-col"
          style={{
            left: c.left,
            animationDelay: c.delay,
            animationDuration: c.dur,
          }}
        />
      ))}
    </div>
  );
}
