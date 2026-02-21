/* jobs-data.js — shared job listings used by jobs.html and search.html */
const JOBS = [
  {
    id: 1,
    title: "Staff Software Engineer",
    company: "Nexus Systems",
    initials: "NS",
    logoColor: "#1D3A6B",
    logoBg: "#D0D9EB",
    type: "remote",
    category: "engineering",
    badge: "New",
    badgeType: "tag-teal",
    salary: "$210k – $260k",
    location: "Remote (US)",
    posted: "2d ago",
    skills: ["System Design", "Distributed Systems", "Go", "Kubernetes", "gRPC"],
    summary: "Lead architecture decisions for our core platform serving 50M+ concurrent users. You'll drive technical strategy for infrastructure, mentor a team of senior engineers, and own reliability initiatives across the stack.",
    responsibilities: [
      "Architect and implement distributed systems at 50M+ user scale",
      "Lead technical design reviews and the RFC process",
      "Mentor a cross-functional team of 6 senior engineers",
      "Define and execute the infrastructure technical roadmap",
      "Partner with product and security on cross-cutting concerns"
    ],
    requirements: [
      "8+ years backend/infrastructure engineering experience",
      "Deep understanding of distributed systems and consensus algorithms",
      "Strong Go or Rust proficiency with production-grade code",
      "Kubernetes at scale — cluster management, autoscaling, networking",
      "Proven track record of technical leadership and mentorship"
    ],
    panel: {
      verdict: "conditional",
      resumeAgent: "Validates timeline depth, leadership scope, and architecture ownership evidence",
      interviewFocus: "System design depth, failure mode reasoning, incident ownership, tradeoff articulation",
      gapRisk: "Leadership claims vs individual contributor interview patterns",
      agentNote: "High-signal role. Resume inflation common at Staff level — verify leadership scope with references."
    }
  },
  {
    id: 2,
    title: "ML Engineer — Foundation Models",
    company: "Luminary AI",
    initials: "LA",
    logoColor: "#1D6B5A",
    logoBg: "#C8E8E2",
    type: "hybrid",
    category: "data",
    badge: "Hot",
    badgeType: "tag-rust",
    salary: "$180k – $230k",
    location: "San Francisco + Remote",
    posted: "1d ago",
    skills: ["PyTorch", "LLMs", "RLHF", "Distributed Training", "Python"],
    summary: "Join the core team building next-generation foundation models. You'll design training pipelines, build evaluation harnesses, and work on alignment techniques at the frontier of AI research and engineering.",
    responsibilities: [
      "Design and run large-scale training experiments on multi-GPU clusters",
      "Build RLHF and DPO pipelines and evaluation frameworks",
      "Collaborate with research team on novel architecture experiments",
      "Optimize distributed training efficiency and throughput",
      "Contribute to safety evaluation and alignment research"
    ],
    requirements: [
      "Strong Python and PyTorch with production ML engineering experience",
      "Experience training or fine-tuning large language models",
      "Knowledge of RLHF, DPO, or related alignment techniques",
      "Familiarity with GPU cluster management and distributed training frameworks",
      "ML research background or publications a strong plus"
    ],
    panel: {
      verdict: "hire",
      resumeAgent: "Checks training scale, GPU hours, model size, publication record",
      interviewFocus: "ML fundamentals depth — backprop, optimization, architecture tradeoffs — not just API usage",
      gapRisk: "Research-level claims vs engineering execution capability",
      agentNote: "Ask candidates to explain a training failure they debugged. Shallow answers reveal surface-level familiarity."
    }
  },
  {
    id: 3,
    title: "Senior Product Designer",
    company: "Orbit Studio",
    initials: "OS",
    logoColor: "#5A3B8A",
    logoBg: "#E2D5F5",
    type: "remote",
    category: "design",
    badge: null,
    badgeType: null,
    salary: "$140k – $175k",
    location: "Remote (Global)",
    posted: "3d ago",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping", "A/B Testing"],
    summary: "Shape the experience of a product used by 5M designers worldwide. You'll own end-to-end design for core features, evolve our design system, and influence product direction through research-grounded decisions.",
    responsibilities: [
      "Lead design for complex, high-impact product features end-to-end",
      "Own and evolve the company design system across platforms",
      "Plan and execute qualitative and quantitative user research",
      "Run design critiques and build a strong feedback culture",
      "Present and defend design decisions to executive stakeholders"
    ],
    requirements: [
      "5+ years product design experience at high-growth companies",
      "Expert Figma proficiency with complex component libraries",
      "Experience building and scaling design systems",
      "Strong portfolio demonstrating complex, data-informed product work",
      "Proven ability to plan and run user research studies"
    ],
    panel: {
      verdict: "hire",
      resumeAgent: "Evaluates portfolio depth, system-level thinking, and research rigor — not just visual craft",
      interviewFocus: "Design decision frameworks, tradeoff reasoning under constraints, user empathy depth",
      gapRisk: "Visual execution excellence masking weak systems or research capability",
      agentNote: "Request a portfolio walkthrough where candidate explains what they would do differently in hindsight."
    }
  },
  {
    id: 4,
    title: "Principal Data Engineer",
    company: "Datastride",
    initials: "DS",
    logoColor: "#7A3B20",
    logoBg: "#F0DACD",
    type: "onsite",
    category: "data",
    badge: null,
    badgeType: null,
    salary: "$190k – $245k",
    location: "New York, NY",
    posted: "5d ago",
    skills: ["Apache Spark", "dbt", "Snowflake", "Airflow", "Python", "Kafka"],
    summary: "Architect the data infrastructure that powers decisions for Fortune 500 clients. You'll design lakehouse patterns, lead a team of 8 data engineers, and own the technical vision for our data platform.",
    responsibilities: [
      "Architect enterprise data lakehouse solutions for client engagements",
      "Lead technical direction and growth of the data platform team",
      "Design real-time streaming and large-scale batch processing systems",
      "Establish data quality, governance, and observability standards",
      "Own client-facing technical architecture discussions and reviews"
    ],
    requirements: [
      "8+ years data engineering with demonstrable impact at scale",
      "Expert Spark and Snowflake with tuning and optimization experience",
      "Strong dbt and Airflow in production environments",
      "Experience leading and growing engineering teams",
      "Excellent client-facing communication and executive presence"
    ],
    panel: {
      verdict: "nohire",
      resumeAgent: "Validates pipeline throughput claims, technology breadth, and client impact ownership",
      interviewFocus: "Architecture tradeoffs, data modeling depth, team conflict resolution, client dynamics",
      gapRisk: "Scale claims (TB/PB processed) unverified — candidates often inherit without owning",
      agentNote: "Ask for specific throughput numbers and what they personally designed vs inherited. Vague answers are disqualifying."
    }
  },
  {
    id: 5,
    title: "Product Manager — AI Features",
    company: "Loopline",
    initials: "LL",
    logoColor: "#1D4D72",
    logoBg: "#C8DDE8",
    type: "hybrid",
    category: "product",
    badge: "New",
    badgeType: "tag-teal",
    salary: "$155k – $195k",
    location: "Austin + Remote",
    posted: "1d ago",
    skills: ["AI/ML Strategy", "Product Roadmapping", "SQL", "A/B Testing", "Stakeholder Mgmt"],
    summary: "Define and ship AI-powered features for our B2B SaaS platform used by 3,000+ enterprise clients. You'll work at the intersection of ML capability and real user needs, driving measurable adoption and retention impact.",
    responsibilities: [
      "Own and evolve the AI feature roadmap for the core product suite",
      "Collaborate with ML engineers to assess feasibility and define evaluation metrics",
      "Define success metrics, design experiments, and iterate based on results",
      "Conduct user interviews, market research, and competitive analysis",
      "Communicate product vision and progress to executive and client stakeholders"
    ],
    requirements: [
      "4+ years product management at B2B SaaS companies",
      "Track record shipping AI/ML-powered features in production",
      "Strong data fluency — SQL comfort, experiment design, metrics ownership",
      "Technical background in CS, engineering, or data science preferred",
      "Experience with enterprise client relationships and sales cycles"
    ],
    panel: {
      verdict: "hire",
      resumeAgent: "Checks AI feature shipping record, direct metrics ownership, and cross-functional leadership scope",
      interviewFocus: "Product thinking depth, AI literacy (real vs buzzword), prioritization frameworks under constraint",
      gapRisk: "AI understanding depth vs surface-level familiarity — many PMs claim AI experience without engineering substance",
      agentNote: "Ask candidate to explain a specific AI feature decision they made, including what they deprioritized and why."
    }
  },
  {
    id: 6,
    title: "Senior Frontend Engineer",
    company: "Clarity UI",
    initials: "CU",
    logoColor: "#1A5E3A",
    logoBg: "#C8E8D5",
    type: "remote",
    category: "engineering",
    badge: null,
    badgeType: null,
    salary: "$155k – $200k",
    location: "Remote (EU / US)",
    posted: "4d ago",
    skills: ["React", "TypeScript", "Web Performance", "Design Systems", "Accessibility"],
    summary: "Build the component library used by 200k+ developers worldwide. You care deeply about performance budgets, accessibility, and developer experience — and you can articulate why in code review.",
    responsibilities: [
      "Build and maintain a production React component library at scale",
      "Drive web performance initiatives with measurable Core Web Vitals improvements",
      "Establish frontend architecture standards and patterns across the org",
      "Collaborate with design to implement pixel-perfect, accessible components",
      "Write comprehensive documentation, API references, and usage examples"
    ],
    requirements: [
      "5+ years React and TypeScript in production environments",
      "Deep understanding of browser rendering, JS engine, and performance debugging",
      "Experience building or contributing to design systems",
      "Strong WCAG accessibility knowledge and implementation practice",
      "Open source contributions or technical writing a significant plus"
    ],
    panel: {
      verdict: "hire",
      resumeAgent: "Evaluates measurable performance wins, open source footprint, component architecture decisions",
      interviewFocus: "React internals, accessibility implementation, performance profiling, API design thinking",
      gapRisk: "Feature-level React work masking lack of systems-level frontend thinking",
      agentNote: "Show a real component PR to review. How candidates read others' code reveals more than their portfolio does."
    }
  }
];

/* Shared helpers */
const TYPE_TAG = {
  remote: ['tag-teal', 'Remote'],
  hybrid: ['tag-gold', 'Hybrid'],
  onsite: ['tag-ink', 'On-site']
};

const VERDICT_MAP = {
  hire:        { chip: 'chip-hire',        label: '✓ Recommended Hire' },
  conditional: { chip: 'chip-conditional', label: '⚡ Conditional Hire' },
  nohire:      { chip: 'chip-nohire',      label: '✗ No Hire' }
};

function buildModalHTML(j) {
  const v = VERDICT_MAP[j.panel.verdict];
  const [ttClass, ttLabel] = TYPE_TAG[j.type];
  return `
    <div class="modal-top">
      <div>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.85rem">
          <div class="company-logo-box" style="background:${j.logoBg};color:${j.logoColor};width:50px;height:50px;font-size:1.1rem">${j.initials}</div>
          <div>
            <div style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--ink-faint);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.2rem">${j.company}</div>
            <h2 style="font-family:'Playfair Display',serif;font-weight:900;font-size:1.5rem;letter-spacing:-0.02em">${j.title}</h2>
          </div>
        </div>
        <div style="display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center">
          <span class="tag ${ttClass}">${ttLabel}</span>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:0.68rem;color:var(--ink-faint)">📍 ${j.location}</span>
          <span style="font-family:'Playfair Display',serif;font-weight:700;font-size:1rem">${j.salary}</span>
          <span style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:var(--ink-faint)">Posted ${j.posted}</span>
        </div>
      </div>
      <button class="modal-close-btn" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <div class="modal-section-title">Role Overview</div>
        <p>${j.summary}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Responsibilities</div>
        <ul>${j.responsibilities.map(r=>`<li>${r}</li>`).join('')}</ul>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Requirements</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
          ${j.requirements.map(r=>`<div style="display:flex;gap:0.5rem;font-size:0.82rem;color:var(--ink-light);line-height:1.6;font-weight:300"><span style="color:var(--rust);flex-shrink:0">→</span>${r}</div>`).join('')}
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Required Skills</div>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem">
          ${j.skills.map(s=>`<span class="skill-chip" style="font-size:0.72rem;padding:0.3rem 0.7rem">${s}</span>`).join('')}
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">AI Panel Evaluation Criteria</div>
        <div class="panel-criteria-box">
          <div class="pcb-title">// What the autonomous panel examines for this role</div>
          <div class="pcb-verdict-chips">
            <span class="pcb-chip ${v.chip}">${v.label}</span>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:0.65rem;color:rgba(255,255,255,0.35);align-self:center">Sample evaluation outcome</span>
          </div>
          <div class="pcb-grid">
            <div><div class="pcb-item-label">Resume Agent Focus</div><div class="pcb-item-text">${j.panel.resumeAgent}</div></div>
            <div><div class="pcb-item-label">Technical Interrogator Focus</div><div class="pcb-item-text">${j.panel.interviewFocus}</div></div>
            <div><div class="pcb-item-label">Primary Gap Risk</div><div class="pcb-item-text" style="color:#F4957F">${j.panel.gapRisk}</div></div>
            <div><div class="pcb-item-label">Panel Note</div><div class="pcb-item-text" style="color:rgba(255,255,255,0.5);font-style:italic">${j.panel.agentNote}</div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a href="resume.html" class="btn btn-primary">Evaluate a Candidate →</a>
      <button class="btn btn-outline" onclick="closeModal()">Close</button>
    </div>`;
}

function openJob(id) {
  const j = JOBS.find(x => x.id === id);
  document.getElementById('modalInner').innerHTML = buildModalHTML(j);
  document.getElementById('jobModal').classList.add('open');
}

function closeModal() { document.getElementById('jobModal').classList.remove('open'); }

function handleModalClick(e) {
  if (e.target === document.getElementById('jobModal')) closeModal();
}