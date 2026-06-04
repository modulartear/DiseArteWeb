/* DiseArte — Nav (centered logo, menu below) + language switch */
(function () {
  const { useState, useEffect } = React;

  function Nav({ t, lang, setLang, onCta }) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (id) => (e) => {
      e.preventDefault();
      setOpen(false);
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    return (
      <React.Fragment>
        <button
          className="menu-toggle"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Icon name="x" /> : <Icon name="menu" />}
        </button>

        <nav className={`nav ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
          <NeonLogo
            variant="full"
            className="nav-logo"
            idleFlicker
            style={{ height: "auto" }}
          />
          <div className="nav-menu">
            {t.nav.links.map((l) => (
              <a key={l.id} className="nav-link" href={`#${l.id}`} onClick={go(l.id)}>
                {l.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="nav-controls">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="btn btn-primary nav-cta" onClick={onCta}>
            {t.nav.cta} <span className="arr"><Icon name="arrow" /></span>
          </button>
        </div>
      </React.Fragment>
    );
  }

  window.Nav = Nav;
})();
