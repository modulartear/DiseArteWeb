/* DiseArte — Intro presentation (glitch / trazo / encendido) */
(function () {
  const { useState, useEffect, useRef } = React;

  function Intro({ variant = "glitch", t, onDone }) {
    const [phase, setPhase] = useState("run"); // run -> out
    const barRef = useRef(null);

    useEffect(() => {
      document.body.classList.add("intro-lock");
      const timers = [];
      // fill the bar
      timers.push(setTimeout(() => {
        if (barRef.current) barRef.current.style.width = "100%";
      }, 700));
      // start exit
      timers.push(setTimeout(() => setPhase("out"), 3300));
      // hand control to the page
      timers.push(setTimeout(() => {
        document.body.classList.remove("intro-lock");
        onDone && onDone();
      }, 4250));
      return () => { timers.forEach(clearTimeout); document.body.classList.remove("intro-lock"); };
    }, []);

    const introClass = [
      "intro",
      variant === "glitch" ? "glitch" : "",
      variant === "encendido" ? "power" : "",
      phase === "out" ? "done" : "",
    ].join(" ");

    return (
      <div className={introClass}>
        <div className="intro-scan" />
        <div className="intro-stage">
          <NeonLogo
            variant="full"
            className="intro-logo"
            draw={variant === "trazo"}
            idleFlicker={variant === "encendido"}
          />
          <div className="intro-bar"><i ref={barRef} /></div>
          <div className="intro-tag">{t.tag}</div>
        </div>
      </div>
    );
  }

  window.Intro = Intro;
})();
