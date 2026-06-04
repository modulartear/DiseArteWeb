/* DiseArte — content sections */
(function () {
  const { useState } = React;

  const SectionHead = ({ kicker, title, lead, amber, center }) => (
    <div className="sec-head" data-reveal style={{ textAlign: center ? "center" : "left", marginInline: center ? "auto" : 0, maxWidth: center ? "760px" : "none" }}>
      <span className={`kicker ${amber ? "amber" : ""}`}>{kicker}</span>
      <h2 className="section-title" style={{ marginInline: center ? "auto" : 0 }}>{title}</h2>
      {lead && <p className="section-lead" style={{ marginInline: center ? "auto" : 0 }}>{lead}</p>}
    </div>
  );

  function Marquee({ items }) {
    const row = [...items, ...items];
    return (
      <div className="marquee">
        <div className="marquee-track">
          {row.map((it, i) => (
            <span className="marquee-item" key={i}>{it} <span className="s">✦</span></span>
          ))}
        </div>
      </div>
    );
  }

  function Why({ t }) {
    const icons = ["eye", "moon", "clock", "chat"];
    const move = (e) => {
      const el = e.currentTarget; const r = el.getBoundingClientRect();
      el.style.setProperty("--cx", `${e.clientX - r.left}px`);
      el.style.setProperty("--cy", `${e.clientY - r.top}px`);
    };
    return (
      <section className="section-pad" id="valor">
        <div className="wrap">
          <SectionHead kicker={t.why.kicker} title={t.why.title} lead={t.why.lead} />
          <div className="why-grid">
            {t.why.cards.map((c, i) => (
              <div className={`card why-card ${c.amber ? "amber" : ""}`} key={i} data-reveal onMouseMove={move}>
                <div className="pop" />
                <div className="ic"><Icon name={icons[i]} size={24} /></div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Process({ t }) {
    return (
      <section className="section-pad" id="proceso">
        <div className="wrap">
          <SectionHead kicker={t.process.kicker} title={t.process.title} amber />
          <div className="process-list">
            {t.process.steps.map((s, i) => (
              <div className="process-row" key={i} data-reveal>
                <div className="num">0{i + 1}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Services({ t }) {
    const icons = ["web", "auto", "cart", "chat", "brand", "seo"];
    return (
      <section className="section-pad" id="servicios">
        <div className="wrap">
          <SectionHead kicker={t.services.kicker} title={t.services.title} lead={t.services.lead} />
          <div className="svc-grid">
            {t.services.items.map((s, i) => (
              <div className="card svc-card" key={i} data-reveal>
                <div className="line">
                  <Icon name={icons[i]} size={26} className="ic" />
                  <span className="bar" />
                  <span className="tag">{s.tag}</span>
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Diff({ t }) {
    const icons = ["target", "cpu", "chart", "bolt"];
    return (
      <section className="section-pad diff" id="diferencia">
        <div className="wrap">
          <div className="diff-grid">
            <div>
              <SectionHead kicker={t.diff.kicker} title={t.diff.title} lead={t.diff.lead} amber />
              <div className="diff-list" style={{ marginTop: "32px" }}>
                {t.diff.items.map((d, i) => (
                  <div className="diff-item" key={i} data-reveal>
                    <div className="ic"><Icon name={icons[i]} size={22} /></div>
                    <div>
                      <h4>{d.t}</h4>
                      <p>{d.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="diff-visual" data-reveal>
              <NeonLogo variant="emblem" idleFlicker style={{ width: "min(100%, 380px)", filter: "drop-shadow(0 0 50px rgba(255,138,31,.18))" }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Voices({ t }) {
    return (
      <section className="section-pad" id="voces">
        <div className="wrap">
          <SectionHead kicker={t.voices.kicker} title={t.voices.title} center />
          <div className="tst-grid">
            {t.voices.items.map((v, i) => (
              <div className="card tst-card" key={i} data-reveal>
                <p className="quote">{v.q}</p>
                <div className="tst-who">
                  <div className="av">{v.n.charAt(0)}</div>
                  <div>
                    <div className="nm">{v.n}</div>
                    <div className="rl">{v.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Faq({ t }) {
    const [open, setOpen] = useState(0);
    return (
      <section className="section-pad" id="faq">
        <div className="wrap">
          <SectionHead kicker={t.faq.kicker} title={t.faq.title} center />
          <div className="faq-wrap">
            {t.faq.items.map((f, i) => (
              <div className={`faq-item ${open === i ? "open" : ""}`} key={i} data-reveal>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  {f.q}
                  <span className="pm"><Icon name="plus" size={16} /></span>
                </button>
                <div className="faq-a" style={{ maxHeight: open === i ? "320px" : "0" }}>
                  <div>{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  Object.assign(window, { Marquee, Why, Process, Services, Diff, Voices, Faq });
})();
