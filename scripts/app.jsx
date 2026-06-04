/* DiseArte — main app */
(function () {
  const { useState, useEffect, useRef, useCallback } = React;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "introVariant": "glitch",
    "heroVariant": "centrado"
  }/*EDITMODE-END*/;

  function App() {
    const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [lang, setLangState] = useState(() => localStorage.getItem("da_lang") || "es");
    const [showIntro, setShowIntro] = useState(true);
    const [introKey, setIntroKey] = useState(0);
    const formRef = useRef(null);

    const setLang = (l) => { setLangState(l); localStorage.setItem("da_lang", l); };
    const t = window.DA_I18N[lang];

    // ---- global effects ----
    useEffect(() => {
      const onMove = (e) => {
        document.documentElement.style.setProperty("--mx", e.clientX + "px");
        document.documentElement.style.setProperty("--my", e.clientY + "px");
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, []);

    // reveal-on-scroll (scroll-based; IO is unreliable in some preview frames)
    useEffect(() => {
      let raf = 0;
      const check = () => {
        raf = 0;
        const vh = window.innerHeight;
        document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => {
          const top = el.getBoundingClientRect().top;
          if (top < vh * 0.9) el.setAttribute("data-shown", "1");
        });
      };
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
      check();
      const tIds = [80, 300, 700].map((d) => setTimeout(check, d));
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      document.addEventListener("visibilitychange", check);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        document.removeEventListener("visibilitychange", check);
        if (raf) cancelAnimationFrame(raf);
        tIds.forEach(clearTimeout);
      };
    }, [lang, tw.heroVariant, showIntro]);

    // magnetic buttons
    useEffect(() => {
      const btns = Array.from(document.querySelectorAll(".magnetic"));
      const handlers = [];
      btns.forEach((b) => {
        const move = (e) => {
          const r = b.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.3;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
          b.style.transform = `translate(${x}px, ${y}px)`;
        };
        const leave = () => { b.style.transform = ""; };
        b.addEventListener("mousemove", move);
        b.addEventListener("mouseleave", leave);
        handlers.push([b, move, leave]);
      });
      return () => handlers.forEach(([b, m, l]) => { b.removeEventListener("mousemove", m); b.removeEventListener("mouseleave", l); });
    }, [lang, tw.heroVariant, showIntro]);

    // ---- actions ----
    const go = useCallback((id) => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
    }, []);
    const onQuote = () => go("contacto");
    const onWhats = () => window.open("https://wa.me/543462587692", "_blank");
    const replayIntro = () => { setIntroKey((k) => k + 1); setShowIntro(true); };

    return (
      <React.Fragment>
        <div className="bg-field" />
        <div className="bg-grid" />
        <div className="spotlight" />
        <div className="bg-noise" />

        {showIntro && (
          <Intro key={introKey} variant={tw.introVariant} t={t.intro} onDone={() => setShowIntro(false)} />
        )}

        <div className="app" aria-hidden={showIntro}>
          <Nav t={t} lang={lang} setLang={setLang} onCta={onQuote} />
          <Hero t={t} variant={tw.heroVariant} onQuote={onQuote} onWhats={onWhats} />
          <Marquee items={t.marquee} />
          <Why t={t} />
          <Process t={t} />
          <Services t={t} />
          <Diff t={t} />
          <Voices t={t} />
          <Faq t={t} />
          <Contact t={t} lang={lang} formRef={formRef} />
          <Footer t={t} go={go} />
        </div>

        <Chatbot t={t.bot} onOpenForm={onQuote} />

        <TweaksPanel title="Tweaks">
          <TweakSection label={lang === "es" ? "Intro de carga" : "Loading intro"} />
          <TweakRadio
            label={lang === "es" ? "Estilo" : "Style"}
            value={tw.introVariant}
            options={["glitch", "trazo", "encendido"]}
            onChange={(v) => setTweak("introVariant", v)}
          />
          <TweakButton label={lang === "es" ? "Repetir intro" : "Replay intro"} onClick={replayIntro} />
          <TweakSection label="Hero" />
          <TweakRadio
            label={lang === "es" ? "Diseño" : "Layout"}
            value={tw.heroVariant}
            options={["centrado", "dividido", "declaracion"]}
            onChange={(v) => setTweak("heroVariant", v)}
          />
        </TweaksPanel>
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
