/* DiseArte — BotDiseArte floating chat */
(function () {
  const { useState, useRef, useEffect } = React;

  function Chatbot({ t, onOpenForm }) {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([{ from: "bot", text: t.hello }]);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState("");
    const [showChips, setShowChips] = useState(true);
    const bodyRef = useRef(null);

    // reset greeting when language changes
    useEffect(() => {
      setMsgs([{ from: "bot", text: t.hello }]);
      setShowChips(true);
    }, [t]);

    useEffect(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [msgs, typing]);

    const answerFor = (text) => {
      const s = text.toLowerCase();
      const a = t.answers;
      if (/web|sitio|pagina|página|landing|site/.test(s)) return a.web;
      if (/autom|workflow|proceso|ia|ai|bot|tarea|task/.test(s)) return a.auto;
      if (/precio|cuesta|cuanto|cuánto|presupuesto|cost|price|much/.test(s)) return a.price;
      if (/equipo|humano|persona|hablar|contact|team|talk/.test(s)) return a.team;
      return a.default;
    };

    const push = (m) => setMsgs((x) => [...x, m]);

    const send = (text) => {
      const v = (text || input).trim();
      if (!v) return;
      push({ from: "me", text: v });
      setInput("");
      setShowChips(false);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        push({ from: "bot", text: answerFor(v) });
      }, 900 + Math.random() * 600);
    };

    return (
      <React.Fragment>
        <button
          className={`bot-fab ${open ? "hidden" : ""}`}
          aria-label="BotDiseArte"
          onClick={() => setOpen(true)}
        >
          <span className="ping" />
          <Icon name="bot" size={28} />
        </button>

        {open && (
          <div className="bot-panel" role="dialog" aria-label="BotDiseArte">
            <div className="bot-head">
              <div className="av"><Icon name="bot" size={22} /></div>
              <div>
                <div className="nm">{t.name}</div>
                <div className="st">{t.status}</div>
              </div>
              <button className="x" onClick={() => setOpen(false)} aria-label="Close"><Icon name="x" size={18} /></button>
            </div>

            <div className="bot-body" ref={bodyRef}>
              {msgs.map((m, i) => (
                <div className={`bot-msg ${m.from}`} key={i}>{m.text}</div>
              ))}
              {typing && (
                <div className="bot-typing"><i /><i /><i /></div>
              )}
            </div>

            {showChips && (
              <div className="bot-chips">
                {t.chips.map((c, i) => (
                  <button className="bot-chip" key={i} onClick={() => send(c)}>{c}</button>
                ))}
              </div>
            )}

            <form className="bot-foot" onSubmit={(e) => { e.preventDefault(); send(); }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
              />
              <button type="submit" aria-label="Send"><Icon name="send" size={18} /></button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }

  window.Chatbot = Chatbot;
})();
