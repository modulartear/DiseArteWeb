/* DiseArte — Contact + Footer */
(function () {
  const { useState } = React;

  function Contact({ t, lang, formRef }) {
    const f = t.contact.form;
    const [vals, setVals] = useState({ name: "", email: "", svc: t.contact.svcOpts[0], msg: "" });
    const [errs, setErrs] = useState({});
    const [sent, setSent] = useState(false);

    const set = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }));

    const submit = (e) => {
      e.preventDefault();
      const er = {};
      if (!vals.name.trim()) er.name = f.errReq;
      if (!vals.email.trim()) er.email = f.errReq;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) er.email = f.errMail;
      if (!vals.msg.trim()) er.msg = f.errReq;
      setErrs(er);
      if (Object.keys(er).length === 0) setSent(true);
    };

    return (
      <section className="section-pad contact" id="contacto">
        <div className="wrap">
          <div className="contact-card" ref={formRef} data-reveal>
            <div className="contact-left">
              <span className="kicker">{t.contact.kicker}</span>
              <h2 style={{ marginTop: "18px" }}>{t.contact.title}</h2>
              <p>{t.contact.lead}</p>
              <div className="contact-channels">
                <a className="channel wa" href={`https://wa.me/543462587692`} target="_blank" rel="noopener">
                  <div className="ic"><Icon name="whatsapp" size={22} /></div>
                  <div>
                    <div className="k">{t.contact.waLabel}</div>
                    <div className="v">{t.contact.wa}</div>
                  </div>
                </a>
                <a className="channel" href={`mailto:${t.contact.email}`}>
                  <div className="ic"><Icon name="mail" size={20} /></div>
                  <div>
                    <div className="k">{t.contact.emailLabel}</div>
                    <div className="v">{t.contact.email}</div>
                  </div>
                </a>
              </div>
            </div>

            {sent ? (
              <div className="contact-form">
                <div className="form-ok">
                  <div className="ring"><Icon name="check" size={30} /></div>
                  <h3 style={{ fontSize: "26px" }}>{f.okT}</h3>
                  <p style={{ color: "var(--ink-soft)", maxWidth: "32ch" }}>{f.okD}</p>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>
                <div className={`field ${errs.name ? "err" : ""}`}>
                  <label>{f.name}</label>
                  <input value={vals.name} onChange={set("name")} placeholder={f.nameP} />
                  {errs.name && <span className="msg">{errs.name}</span>}
                </div>
                <div className={`field ${errs.email ? "err" : ""}`}>
                  <label>{f.email}</label>
                  <input value={vals.email} onChange={set("email")} placeholder={f.emailP} />
                  {errs.email && <span className="msg">{errs.email}</span>}
                </div>
                <div className="field">
                  <label>{f.svc}</label>
                  <select value={vals.svc} onChange={set("svc")}>
                    {t.contact.svcOpts.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className={`field ${errs.msg ? "err" : ""}`}>
                  <label>{f.msg}</label>
                  <textarea value={vals.msg} onChange={set("msg")} placeholder={f.msgP} />
                  {errs.msg && <span className="msg">{errs.msg}</span>}
                </div>
                <button className="btn btn-primary" type="submit" style={{ justifyContent: "center" }}>
                  {f.send} <span className="arr"><Icon name="arrow" /></span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  function Footer({ t, go }) {
    return (
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div style={{ maxWidth: "320px" }}>
              <NeonLogo variant="full" className="footer-logo" idleFlicker />
              <p style={{ color: "var(--ink-soft)", marginTop: "20px", fontSize: "15px" }}>{t.footer.tagline}</p>
            </div>
            <div className="footer-cols">
              {t.footer.cols.map((col, i) => (
                <div className="footer-col" key={i}>
                  <h5>{col.h}</h5>
                  {col.links.map((l, j) => <a key={j} href="#servicios" onClick={(e) => { e.preventDefault(); go && go(i === 1 ? ["diferencia","proceso","voces","contacto"][j] : "servicios"); }}>{l}</a>)}
                </div>
              ))}
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t.footer.rights}</p>
            <p className="neon-cyan" style={{ opacity: .8 }}>{t.footer.made}</p>
          </div>
        </div>
      </footer>
    );
  }

  Object.assign(window, { Contact, Footer });
})();
