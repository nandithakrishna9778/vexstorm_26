import { useState, useRef } from "react";

const COLORS = {
  cream: "#F5F0E8", creamDark: "#EDE7D9", ink: "#1A1714", inkLight: "#4A4540",
  inkFaint: "#9A9590", rust: "#C8472B", rustLight: "#E8C5BE", rustPale: "#FBF1EF",
  gold: "#B8860B", teal: "#1D6B72", tealLight: "#D0EBED",
  border: "#D8D2C8", borderStrong: "#B8B0A4", white: "#FDFCFA"
};

const S = {
  page: { fontFamily: "'IBM Plex Mono', monospace", background: COLORS.cream, minHeight: "100vh", color: COLORS.ink },
  nav: { background: COLORS.white, borderBottom: `1px solid ${COLORS.border}`, padding: "0 2rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 0 },
  brand: { fontFamily: "serif", fontWeight: 900, fontSize: "1.3rem", letterSpacing: "-0.02em" },
  badge: { fontSize: "0.55rem", fontWeight: 600, color: COLORS.rust, background: COLORS.rustPale, border: `1px solid ${COLORS.rustLight}`, padding: "0.1rem 0.35rem", borderRadius: 2, textTransform: "uppercase", letterSpacing: "0.06em", marginLeft: 6 },
  navLinks: { display: "flex", gap: 4, listStyle: "none" },
  navLink: { fontSize: "0.65rem", fontWeight: 500, color: COLORS.inkLight, padding: "0.35rem 0.7rem", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em", border: "1px solid transparent", cursor: "pointer", textDecoration: "none" },
  navLinkActive: { color: COLORS.rust, background: COLORS.rustPale, border: `1px solid ${COLORS.rustLight}` },
  wrap: { padding: "2rem 2.5rem 4rem" },
  eyebrow: { fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: COLORS.rust, marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: 8 },
  h1: { fontFamily: "serif", fontWeight: 900, fontSize: "2.2rem", letterSpacing: "-0.025em", marginBottom: "0.25rem" },
  pageHeader: { paddingBottom: "1.5rem", borderBottom: `1px solid ${COLORS.border}`, marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
  label: { fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.inkLight, marginBottom: 6, display: "block" },
  labelSub: { fontWeight: 400, textTransform: "none", letterSpacing: 0, color: COLORS.inkFaint, fontSize: "0.58rem" },
  textarea: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", background: COLORS.white, border: `1px solid ${COLORS.border}`, color: COLORS.ink, padding: "0.8rem 0.9rem", borderRadius: 4, resize: "vertical", lineHeight: 1.65, width: "100%", outline: "none", transition: "border-color 0.18s" },
  textareaActive: { borderColor: COLORS.teal },
  dropZone: { background: COLORS.white, border: `1.5px dashed ${COLORS.borderStrong}`, borderRadius: 4, padding: "2rem", textAlign: "center", cursor: "pointer", minHeight: 140, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" },
  dropZoneOk: { borderColor: COLORS.teal, background: COLORS.tealLight },
  counter: { fontSize: "0.57rem", color: COLORS.inkFaint, textAlign: "right", marginTop: 4 },
  counterActive: { color: COLORS.teal },
  runBtn: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", background: COLORS.ink, color: COLORS.white, border: "none", padding: "0.8rem 1.8rem", borderRadius: 4, cursor: "pointer" },
  runBtnDisabled: { opacity: 0.45, pointerEvents: "none" },
  errBox: { background: "#FDF2F0", border: `1px solid #EEC5BC`, borderRadius: 4, padding: "0.9rem 1.1rem", fontSize: "0.72rem", color: COLORS.rust, marginBottom: "1rem", lineHeight: 1.7 },
  tabs: { display: "flex", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.creamDark },
  tab: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", padding: "0.8rem 1.3rem", color: COLORS.inkFaint, cursor: "pointer", border: "none", background: "none", borderBottom: "2px solid transparent" },
  tabOn: { color: COLORS.rust, borderBottomColor: COLORS.rust, background: COLORS.white },
  rbody: { padding: "1.8rem" },
  sumcard: { background: COLORS.cream, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${COLORS.teal}`, borderRadius: 4, padding: "1.1rem 1.3rem", fontSize: "0.81rem", color: COLORS.inkLight, lineHeight: 1.75 },
  sbar: { display: "grid", gridTemplateColumns: "150px 1fr 32px", alignItems: "center", gap: "0.9rem", marginBottom: "0.8rem" },
  sbl: { fontSize: "0.64rem", color: COLORS.inkLight },
  sbt: { height: 5, background: COLORS.creamDark, borderRadius: 3, overflow: "hidden" },
  sbv: { fontFamily: "serif", fontWeight: 700, fontSize: "0.82rem", textAlign: "right" },
  ringWrap: { position: "relative", width: 120, height: 120, flexShrink: 0 },
  ringCenter: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  ringNum: { fontFamily: "serif", fontWeight: 900, fontSize: "2rem", color: COLORS.ink, lineHeight: 1 },
  ringSub: { fontSize: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.inkFaint },
  dcard: (t) => ({ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.9rem", padding: "1.1rem", borderRadius: 4, border: `1px solid ${t==="crit"?"#EEC5BC":t==="warn"?"#E8D99A":"#B0DDE0"}`, background: t==="crit"?"#FDF2F0":t==="warn"?"#FFFBF0":"#EEF7F8", alignItems: "flex-start", marginBottom: 10 }),
  dbadge: (t) => ({ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.56rem", fontWeight: 600, padding: "0.18rem 0.45rem", borderRadius: 2, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap", background: t==="crit"?COLORS.rust:t==="warn"?COLORS.gold:COLORS.teal, color: "#fff" }),
  tcard: { background: COLORS.ink, borderRadius: 6, overflow: "hidden", marginBottom: 10 },
  tchead: { display: "flex", alignItems: "center", gap: 10, padding: "0.65rem 0.9rem", borderBottom: "1px solid rgba(255,255,255,0.07)" },
  tcagent: (cls) => ({ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.57rem", fontWeight: 600, padding: "0.16rem 0.45rem", borderRadius: 2, textTransform: "uppercase", letterSpacing: "0.05em", background: cls==="tc-r"?"rgba(29,107,114,0.35)":cls==="tc-t"?"rgba(200,71,43,0.35)":cls==="tc-g"?"rgba(184,134,11,0.35)":"rgba(255,255,255,0.14)", color: cls==="tc-r"?"#6ECCD3":cls==="tc-t"?"#F4957F":cls==="tc-g"?"#DCBA60":"rgba(255,255,255,0.85)" }),
  tcbody: { padding: "0.9rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 },
  vchip: (d) => ({ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "serif", fontWeight: 900, fontSize: "1.8rem", padding: "0.65rem 2rem", borderRadius: 6, marginBottom: "0.7rem", letterSpacing: "-0.02em", background: d==="hire"?"#D4EDDA":d==="no"?"#FDF2F0":"#F5EDD0", color: d==="hire"?"#1A5C2A":d==="no"?COLORS.rust:"#7A5A00" }),
  vbox: (t) => ({ background: COLORS.cream, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "1.1rem", textAlign: "left", flex: 1 }),
  vboxTitle: (t) => ({ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, color: t==="str"?"#1A6630":COLORS.rust }),
  nsc: { background: COLORS.ink, borderRadius: 6, padding: "1.3rem", textAlign: "left", marginTop: 12 },
  nsi: { display: "flex", alignItems: "flex-start", gap: 12, padding: "0.55rem 0", borderBottom: "1px solid rgba(255,255,255,0.07)" },
  nsn: { width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.45)", flexShrink: 0, marginTop: 2 },
  nst: { fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55 },
  progWrap: { flex: 1, display: "flex", flexDirection: "column", gap: 6 },
  progLabel: { fontSize: "0.62rem", color: COLORS.rust, textTransform: "uppercase", letterSpacing: "0.08em" },
  progTrack: { height: 3, background: COLORS.border, borderRadius: 2, overflow: "hidden" },
};

export default function ResumeChecker() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [txText, setTxText] = useState("");
  const [fileLabel, setFileLabel] = useState("Drop resume here");
  const [fileSub, setFileSub] = useState("TXT · DOCX — or click to browse");
  const [fileOk, setFileOk] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const fileRef = useRef();

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function readFile(file) {
    if (!file) return;
    setFileLabel("⏳ Reading " + file.name + "...");
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      setResumeText(text);
      setFileLabel("✓ " + file.name + " — loaded into text field");
      setFileSub(Math.round(file.size / 1000) + " KB · Edit below if needed");
      setFileOk(true);
    };
    reader.onerror = () => setFileLabel("✗ Failed to read — paste text instead");
    reader.readAsText(file);
  }

  async function run() {
    setError("");
    if (!resumeText.trim() || resumeText.trim().length < 30) {
      setError("Please paste your resume text below — or upload a TXT/DOCX file to auto-fill it.");
      return;
    }

    setRunning(true);
    setData(null);

    try {
      setProgress(8);  setProgressLabel("Resume Analyst parsing timeline and claims...");
      await sleep(600);
      setProgress(22); setProgressLabel("Technical Interrogator evaluating depth...");
      await sleep(500);
      setProgress(42); setProgressLabel("Gap Detector cross-referencing discrepancies...");
      await sleep(400);
      setProgress(60); setProgressLabel("Calling AI panel — analysing your content...");

      const prompt = buildPrompt(resumeText.trim(), jdText.trim(), txText.trim());

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2800,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.error?.message || "HTTP " + res.status);
      }

      const apiData = await res.json();
      const raw = apiData.content.map(b => b.text || "").join("").trim();

      setProgress(85); setProgressLabel("Consensus Engine synthesising verdict...");
      await sleep(400);

      // Parse JSON — strip any markdown fences
      let parsed;
      const clean = raw.replace(/^```json\s*/m, "").replace(/^```\s*/m, "").replace(/```\s*$/m, "").trim();
      try {
        parsed = JSON.parse(clean);
      } catch (_) {
        const m = clean.match(/\{[\s\S]*\}/);
        if (!m) throw new Error("AI returned unparseable response. Please try again.");
        parsed = JSON.parse(m[0]);
      }

      setProgress(100); setProgressLabel("Evaluation complete.");
      await sleep(300);

      setData(parsed);
      setActiveTab("overview");

    } catch (err) {
      setError("Analysis failed: " + err.message);
    } finally {
      setRunning(false);
    }
  }

  function buildPrompt(resume, jd, tx) {
    return `You are a 4-agent autonomous hiring panel. Analyse the candidate data below.
Return ONLY a raw JSON object. No markdown fences, no explanation, no prose before or after. Just the JSON.

=== RESUME ===
${resume}
${jd ? "\n=== JOB DESCRIPTION ===\n" + jd : ""}
${tx ? "\n=== INTERVIEW TRANSCRIPT ===\n" + tx : ""}

IMPORTANT RULES:
- All findings MUST reference specific names, dates, companies, skills, technologies from the actual input above
- DO NOT invent or hallucinate content not present in the input
- Use the FULL 0-100 score range honestly — a weak resume should score 20-40, a strong one 80-95
- If no transcript: note it in the trace body, do not fabricate interview findings
- score should be the weighted average of all dimension values

Return this exact JSON (replace all angle-bracket placeholders with real content):
{
  "score": <integer 0-100 — honest overall score>,
  "dimensions": [
    {"label":"Technical Depth","value":<0-100>,"color":"#1D6B72"},
    {"label":"Experience Match","value":<0-100>,"color":"#1D6B72"},
    {"label":"Claim Consistency","value":<0-100>,"color":"#C8472B"},
    {"label":"Communication","value":<0-100>,"color":"#1D6B72"},
    {"label":"Leadership Evidence","value":<0-100>,"color":"#B8860B"}
  ],
  "summary": "2-3 sentences mentioning the candidate's actual name, specific companies and roles found in the resume",
  "discrepancies": [
    {
      "type": "crit",
      "badge": "Critical",
      "title": "Specific title",
      "text": "Specific finding quoting actual content from the resume"
    }
  ],
  "trace": [
    {"cls":"tc-r","label":"Resume Analyst","title":"Initial Parse","body":"Specific findings about actual resume content — names, dates, claims"},
    {"cls":"tc-t","label":"Technical Interrogator","title":"Depth Assessment","body":"Assessment of technical claims in the resume"},
    {"cls":"tc-g","label":"Gap Detector","title":"Cross-Reference","body":"Specific discrepancies or gaps found"},
    {"cls":"tc-c","label":"Consensus Engine","title":"Final Ruling","body":"Final vote with reasoning"}
  ],
  "verdict": {
    "decision": "hire",
    "label": "Strong Hire",
    "subtitle": "Brief one-sentence verdict with actual score",
    "strengths": ["Specific strength from resume", "Another specific strength", "Third specific strength"],
    "risks": ["Specific risk from resume", "Another specific risk", "Third specific risk"],
    "actions": [
      {"n": "1", "text": "Specific required action"},
      {"n": "2", "text": "Another specific required action"}
    ]
  }
}`;
  }

  // ── Render helpers ──────────────────────────────────────────────────────────

  function ScoreRing({ score }) {
    const r = 50, circ = 2 * Math.PI * r;
    const offset = circ * (1 - score / 100);
    const col = score >= 75 ? COLORS.teal : score >= 50 ? COLORS.gold : COLORS.rust;
    return (
      <div style={S.ringWrap}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="60" cy="60" r={r} fill="none" stroke={COLORS.creamDark} strokeWidth="8" />
          <circle cx="60" cy="60" r={r} fill="none" stroke={col} strokeWidth="8"
            strokeDasharray={`${circ.toFixed(1)}`} strokeDashoffset={`${offset.toFixed(1)}`} strokeLinecap="round" />
        </svg>
        <div style={S.ringCenter}>
          <div style={S.ringNum}>{score}</div>
          <div style={S.ringSub}>/ 100</div>
        </div>
      </div>
    );
  }

  function Overview() {
    if (!data) return null;
    return (
      <div>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <ScoreRing score={Math.max(0, Math.min(100, data.score || 0))} />
          <div style={{ flex: 1 }}>
            {(data.dimensions || []).map((dim, i) => (
              <div key={i} style={S.sbar}>
                <div style={S.sbl}>{dim.label}</div>
                <div style={S.sbt}>
                  <div style={{ height: "100%", borderRadius: 3, width: `${dim.value}%`, background: dim.color }} />
                </div>
                <div style={S.sbv}>{dim.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={S.sumcard}>
          <strong style={{ color: COLORS.ink }}>Panel Summary: </strong>
          {data.summary}
        </div>
      </div>
    );
  }

  function Discrepancies() {
    if (!data) return null;
    const items = data.discrepancies || [];
    if (!items.length) return <div style={S.sumcard}>No significant discrepancies detected.</div>;
    return (
      <div>
        {items.map((item, i) => (
          <div key={i} style={S.dcard(item.type)}>
            <span style={S.dbadge(item.type)}>{item.badge}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.81rem", marginBottom: 4, color: COLORS.ink }}>{item.title}</div>
              <div style={{ fontSize: "0.77rem", color: COLORS.inkLight, lineHeight: 1.65, fontWeight: 300 }}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function Trace() {
    if (!data) return null;
    const traces = data.trace || [];
    if (!traces.length) return <div style={S.sumcard}>No trace data.</div>;
    return (
      <div>
        {traces.map((t, i) => (
          <div key={i} style={S.tcard}>
            <div style={S.tchead}>
              <span style={S.tcagent(t.cls)}>{t.label}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.64rem", color: "rgba(255,255,255,0.4)" }}>{t.title}</span>
            </div>
            <div style={S.tcbody}>{t.body}</div>
          </div>
        ))}
      </div>
    );
  }

  function Verdict() {
    if (!data) return null;
    const v = data.verdict || {};
    const dec = v.decision || "cond";
    const ico = dec === "hire" ? "✓" : dec === "no" ? "✗" : "⚡";
    return (
      <div style={{ textAlign: "center" }}>
        <div style={S.vchip(dec)}>{ico} {v.label}</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.64rem", color: COLORS.inkFaint, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>{v.subtitle}</div>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={S.vbox("str")}>
            <div style={S.vboxTitle("str")}>Strengths</div>
            {(v.strengths || []).map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: "0.77rem", color: COLORS.inkLight, padding: "0.2rem 0", borderBottom: `1px solid ${COLORS.border}`, fontWeight: 300 }}>
                <span style={{ color: "#1A6630", fontWeight: 600, flexShrink: 0 }}>✓</span>{s}
              </div>
            ))}
          </div>
          <div style={S.vbox("risk")}>
            <div style={S.vboxTitle("risk")}>Risks & Red Flags</div>
            {(v.risks || []).map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 8, fontSize: "0.77rem", color: COLORS.inkLight, padding: "0.2rem 0", borderBottom: `1px solid ${COLORS.border}`, fontWeight: 300 }}>
                <span style={{ color: COLORS.rust, fontSize: "0.65rem", flexShrink: 0, marginTop: 2 }}>⚠</span>{r}
              </div>
            ))}
          </div>
        </div>
        <div style={S.nsc}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.57rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>// Required actions before extending offer</div>
          {(v.actions || []).map((a, i) => (
            <div key={i} style={{ ...S.nsi, borderBottom: i < v.actions.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div style={S.nsn}>{a.n}</div>
              <div style={S.nst}>{a.text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "disc", label: "Discrepancies" },
    { id: "trace", label: "Agent Trace" },
    { id: "verdict", label: "Verdict" },
  ];

  return (
    <div style={S.page}>
      {/* NAV */}
      <div style={S.nav}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={S.brand}>HirePanel</span>
          <span style={S.badge}>AI Beta</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["Home","Resume Checker","Jobs","Search"].map(l => (
            <span key={l} style={{ ...S.navLink, ...(l === "Resume Checker" ? S.navLinkActive : {}) }}>{l}</span>
          ))}
        </div>
        <span style={{ ...S.navLink, background: COLORS.ink, color: COLORS.white, border: "none", fontSize: "0.65rem" }}>Post a Role</span>
      </div>

      <div style={S.wrap}>
        {/* PAGE HEADER */}
        <div style={S.pageHeader}>
          <div>
            <div style={S.eyebrow}><span style={{ width: 20, height: 1, background: COLORS.rust, display: "inline-block" }} />01 — Resume Intelligence</div>
            <h1 style={S.h1}>Resume Checker</h1>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: COLORS.inkFaint, textAlign: "right", lineHeight: 1.7 }}>
            Paste your resume + optional inputs<br />to run the full multi-agent panel.
          </div>
        </div>

        {/* ROW 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.8rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={S.label}>Upload File <span style={S.labelSub}>(TXT/DOCX — auto-fills text below)</span></label>
            <div
              style={{ ...S.dropZone, ...(fileOk ? S.dropZoneOk : {}) }}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); readFile(e.dataTransfer.files[0]); }}
            >
              <div style={{ fontSize: "1.6rem", opacity: 0.4 }}>📎</div>
              <div style={{ fontWeight: 600, fontSize: "0.82rem" }}>{fileLabel}</div>
              <div style={{ fontSize: "0.68rem", color: COLORS.inkFaint }}>{fileSub}</div>
              <input ref={fileRef} type="file" accept=".txt,.docx" style={{ display: "none" }} onChange={e => readFile(e.target.files[0])} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={S.label}>Resume Text <span style={S.labelSub}>(required — paste or auto-filled from upload)</span></label>
            <textarea
              style={{ ...S.textarea, ...(resumeText ? S.textareaActive : {}), minHeight: 140 }}
              rows={7}
              placeholder={"Name: Alex Chen\nSenior Engineer at Acme Corp (2021–2024)\nSkills: Python, Go, Kubernetes...\n\n— Paste your full resume here —"}
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
            />
            <div style={{ ...S.counter, ...(resumeText.length > 0 ? S.counterActive : {}) }}>
              {resumeText.length > 0 ? resumeText.length + " chars" : "0 characters"}
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.8rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={S.label}>Job Description <span style={S.labelSub}>(optional)</span></label>
            <textarea
              style={{ ...S.textarea, ...(jdText ? S.textareaActive : {}), minHeight: 110 }}
              rows={5}
              placeholder="We are looking for a Staff Engineer to lead architecture..."
              value={jdText}
              onChange={e => setJdText(e.target.value)}
            />
            <div style={{ ...S.counter, ...(jdText.length > 0 ? S.counterActive : {}) }}>
              {jdText.length > 0 ? jdText.length + " chars" : "0 chars — optional"}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={S.label}>Interview Transcript <span style={S.labelSub}>(optional)</span></label>
            <textarea
              style={{ ...S.textarea, ...(txText ? S.textareaActive : {}), minHeight: 110 }}
              rows={5}
              placeholder={"Q: Walk me through your system design approach...\nA: I usually start by clarifying constraints..."}
              value={txText}
              onChange={e => setTxText(e.target.value)}
            />
            <div style={{ ...S.counter, ...(txText.length > 0 ? S.counterActive : {}) }}>
              {txText.length > 0 ? txText.length + " chars" : "0 chars — optional"}
            </div>
          </div>
        </div>

        {/* RUN BAR */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.2rem 0 1.8rem" }}>
          <button
            style={{ ...S.runBtn, ...(running ? S.runBtnDisabled : {}) }}
            onClick={run}
            disabled={running}
          >
            ⚡ Run Multi-Agent Panel
          </button>
          {running && (
            <div style={S.progWrap}>
              <div style={S.progLabel}>{progressLabel}</div>
              <div style={S.progTrack}>
                <div style={{ height: "100%", borderRadius: 2, width: `${progress}%`, background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.rust})`, transition: "width 0.55s ease" }} />
              </div>
            </div>
          )}
        </div>

        {/* ERROR */}
        {error && <div style={S.errBox}>⚠ {error}</div>}

        {/* RESULTS */}
        {data && (
          <div style={{ border: `1px solid ${COLORS.border}`, borderRadius: 6, overflow: "hidden", background: COLORS.white }}>
            <div style={S.tabs}>
              {TABS.map(t => (
                <button key={t.id} style={{ ...S.tab, ...(activeTab === t.id ? S.tabOn : {}) }} onClick={() => setActiveTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div style={S.rbody}>
              {activeTab === "overview" && <Overview />}
              {activeTab === "disc" && <Discrepancies />}
              {activeTab === "trace" && <Trace />}
              {activeTab === "verdict" && <Verdict />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}