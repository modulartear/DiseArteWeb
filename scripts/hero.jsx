/* DiseArte — Hero (variants: centrado / dividido / declaracion) */
(function () {
  const { useRef } = React;

  function Hero({ t, variant = "centrado", onQuote, onWhats }) {
    const cubeRef = useRef(null);

    const tilt = (e) => {
      const el = cubeRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(800px) rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg)`;
    };
    const reset = () => { if (cubeRef.current) cubeRef.current.style.transform = ""; };

    const cls = variant === "dividido" ? "split" : variant === "declaracion" ? "statement" : "centered";

    const h1 = (
      <h1>
        <span className="line">{t.hero.h1a}</span>
        <span className="line"><em className="neon-amber">{t.hero.h1b}</em> {t.hero.h1c}</span>
      </h1>
    );

    const ctas = (
      <div className="hero-cta">
        <button className="btn btn-primary magnetic" onClick={onQuote}>
          {t.hero.cta1} <span className="arr"><Icon name="arrow" /></span>
        </button>
        <button className="btn btn-ghost magnetic" onClick={onWhats}>
          <Icon name="whatsapp" size={18} /> {t.hero.cta2}
        </button>
      </div>
    );

    const stats = (
      <div className="hero-stats">
        {t.hero.stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="n">{s.n}<span className="u">{s.u}</span></div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </div>
    );

    return (
      <header className={`hero ${cls}`} id="top" onMouseMove={variant === "dividido" ? tilt : undefined} onMouseLeave={reset}>
        <div className="hero-floor" />
        <div className="wrap hero-inner">
          {variant === "dividido" ? (
            <React.Fragment>
              <div className="hero-copy" data-reveal>
                <span className="hero-badge"><span className="dot" /> {t.hero.badge}</span>
                {h1}
                <p className="hero-sub">{t.hero.sub}</p>
                {ctas}
                {stats}
              </div>
              <div className="hero-visual" data-reveal>
                <div ref={cubeRef} style={{ transition: "transform .3s var(--ease)" }}>
                  <NeonLogo variant="emblem" className="hero-cube" idleFlicker />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div data-reveal>
              <span className="hero-badge"><span className="dot" /> {t.hero.badge}</span>
              {h1}
              <p className="hero-sub">{t.hero.sub}</p>
              {ctas}
              {stats}
            </div>
          )}
        </div>
        <div className="scroll-hint">
          <div className="m" />
          {t.hero.scroll}
        </div>
      </header>
    );
  }

  window.Hero = Hero;
})();
