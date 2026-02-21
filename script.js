/* ═══════════════════════════════════════════════════
   AXIONHIRE — COMPLETE JAVASCRIPT
   Multi-Agent Autonomous Interview Panel System
   ═══════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────
// JOB DATA
// ─────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    title: 'Staff Software Engineer',
    company: 'Meridian Labs',
    logo: 'M', color: '#00ff88', bg: 'rgba(0,255,136,0.12)',
    location: 'Remote', type: 'Full-time', salary: '$220–260k', posted: '2d ago',
    category: ['engineering', 'remote'],
    tags: ['Go', 'Kubernetes', 'Distributed Systems', 'gRPC'],
    about: 'Meridian Labs builds infrastructure for real-time data pipelines serving 500M events/day. Our engineering culture prizes deep technical ownership and first-principles thinking.',
    responsibilities: [
      'Design and own distributed systems across our data ingestion layer',
      'Lead cross-functional technical projects with 3–5 engineers',
      'Define technical roadmap for reliability and scale',
      'Partner with Product to translate business requirements into architecture decisions',
      'Drive code review culture and engineering standards across the org'
    ],
    requirements: [
      '8+ years of software engineering experience',
      'Deep expertise in Go or Rust in production systems at scale',
      'Experience with Kubernetes at scale (1000+ nodes)',
      'Track record of designing systems for >10M req/s',
      'Strong written communication — we are async-first'
    ],
    nice: ['Experience in stream processing (Kafka, Flink)', 'Open-source contributions', 'Prior startup experience'],
    skills: ['Go', 'Rust', 'Kubernetes', 'gRPC', 'PostgreSQL', 'Redis', 'Kafka']
  },
  {
    id: 2,
    title: 'Senior ML Engineer',
    company: 'Velox AI',
    logo: 'V', color: '#ff6b35', bg: 'rgba(255,107,53,0.12)',
    location: 'San Francisco, CA', type: 'Hybrid', salary: '$200–240k', posted: '1w ago',
    category: ['ml', 'engineering'],
    tags: ['PyTorch', 'LLMs', 'MLOps', 'Python'],
    about: 'Velox AI is building the reasoning layer for enterprise AI. We serve Fortune 500 companies who need reliable, auditable AI intelligence at scale.',
    responsibilities: [
      'Fine-tune and evaluate large language models for domain-specific tasks',
      'Build ML pipelines from data ingestion to model serving',
      'Collaborate with research team to productionize experimental models',
      'Own model monitoring, A/B testing, and rollback infrastructure',
      'Mentor junior ML engineers and establish best practices'
    ],
    requirements: [
      '5+ years ML engineering experience',
      'Production experience with LLMs (fine-tuning, RLHF, evaluation)',
      'Strong Python skills with PyTorch or JAX',
      'Experience with distributed training (multi-GPU or multi-node)',
      'BS/MS/PhD in Computer Science, ML, or related field'
    ],
    nice: ['Published ML research', 'Experience with vLLM or TGI', 'Familiarity with CUDA optimization'],
    skills: ['Python', 'PyTorch', 'LLMs', 'MLOps', 'CUDA', 'Kubernetes', 'Hugging Face']
  },
  {
    id: 3,
    title: 'Engineering Manager',
    company: 'Prism Health',
    logo: 'P', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)',
    location: 'New York, NY', type: 'Hybrid', salary: '$230–270k', posted: '3d ago',
    category: ['leadership', 'engineering'],
    tags: ['Team Leadership', 'React', 'Node.js', 'Healthcare'],
    about: 'Prism Health modernizes clinical operations for hospital systems. We handle sensitive data at scale under strict HIPAA compliance.',
    responsibilities: [
      'Manage a team of 8–12 engineers across 2 product squads',
      'Partner with product and design to define quarterly roadmaps',
      'Own hiring, performance reviews, and career growth for your team',
      'Maintain high technical standards without blocking delivery velocity'
    ],
    requirements: [
      '3+ years engineering management experience',
      'Prior hands-on engineering experience (5+ years as IC)',
      'Experience managing teams shipping consumer or enterprise products',
      'HIPAA and healthcare compliance experience preferred',
      'Excellent stakeholder communication — can work with C-suite'
    ],
    nice: ['Experience scaling teams from 5 to 20+', 'Startup experience', 'Technical product management background'],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Team Leadership']
  },
  {
    id: 4,
    title: 'Principal Platform Architect',
    company: 'Orbital Systems',
    logo: 'O', color: '#38bdf8', bg: 'rgba(56,189,248,0.12)',
    location: 'Remote', type: 'Full-time', salary: '$260–310k', posted: '5d ago',
    category: ['engineering', 'leadership', 'remote'],
    tags: ['Architecture', 'AWS', 'Platform Engineering', 'Security'],
    about: 'Orbital Systems provides cloud infrastructure tooling for aerospace and defense customers. Security-first culture with extremely high reliability standards.',
    responsibilities: [
      'Define multi-year technical vision for core platform infrastructure',
      'Drive architectural decisions across 40+ engineers in 5 teams',
      'Build and maintain relationships with key infrastructure vendors and partners',
      'Own platform reliability SLAs — 99.999% uptime requirements'
    ],
    requirements: [
      '12+ years software engineering, 3+ as architect or principal engineer',
      'Deep AWS expertise (Certified Solutions Architect Professional preferred)',
      'Experience designing systems with zero-downtime requirements',
      'Excellent written and verbal communication for executive audiences',
      'US citizenship required — position involves government contracts'
    ],
    nice: ['Active security clearance', 'FedRAMP experience', 'Aerospace or defense domain knowledge'],
    skills: ['AWS', 'Terraform', 'Kubernetes', 'Zero Trust Security', 'Platform Engineering']
  },
  {
    id: 5,
    title: 'DevOps / Platform Lead',
    company: 'Canopy Finance',
    logo: 'C', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',
    location: 'Austin, TX', type: 'Hybrid', salary: '$185–215k', posted: '1d ago',
    category: ['engineering'],
    tags: ['Terraform', 'CI/CD', 'AWS', 'SRE', 'Fintech'],
    about: 'Canopy Finance powers small business lending infrastructure. We process $500M in monthly transactions and are scaling rapidly across the US.',
    responsibilities: [
      'Own CI/CD pipelines across 30+ microservices',
      'Design and implement observability stack — metrics, tracing, alerting',
      'Lead infrastructure-as-code initiatives across the engineering org',
      'Participate in on-call rotation for platform incidents (~4 weeks/year)'
    ],
    requirements: [
      '6+ years in DevOps, SRE, or Platform Engineering roles',
      'Expert-level Terraform and Kubernetes in production',
      'Strong AWS background — EKS, RDS, S3, IAM, VPC',
      'Experience working in fintech or other regulated industries',
      'SOC 2 Type II compliance experience'
    ],
    nice: ['Datadog or Honeycomb experience', 'GitOps with ArgoCD or Flux', 'Python scripting'],
    skills: ['Terraform', 'Kubernetes', 'AWS', 'CI/CD', 'Datadog', 'ArgoCD', 'Python']
  },
  {
    id: 6,
    title: 'Senior Data Engineer',
    company: 'Nomad Analytics',
    logo: 'N', color: '#10b981', bg: 'rgba(16,185,129,0.12)',
    location: 'Remote', type: 'Full-time', salary: '$170–205k', posted: '4d ago',
    category: ['engineering', 'ml', 'remote'],
    tags: ['dbt', 'Spark', 'Snowflake', 'Python', 'Airflow'],
    about: 'Nomad Analytics delivers data intelligence for e-commerce brands. Our warehouse processes 2B events/month across 400+ enterprise clients.',
    responsibilities: [
      'Build and maintain data pipelines from raw events to BI-ready models',
      'Own data quality monitoring, SLA management and alerting systems',
      'Collaborate with analytics team to define and standardize core metrics',
      'Optimize Snowflake warehouse performance and manage query costs'
    ],
    requirements: [
      '5+ years data engineering or analytics engineering experience',
      'Expert-level SQL and strong Python for pipeline orchestration',
      'Strong dbt skills — all transformation logic lives in dbt here',
      'Production experience with Snowflake or BigQuery at scale',
      'Airflow or Dagster experience for pipeline orchestration'
    ],
    nice: ['Apache Spark for large-scale batch processing', 'Analytics engineering background', 'dbt Certified Developer'],
    skills: ['Python', 'SQL', 'dbt', 'Snowflake', 'Airflow', 'Apache Spark', 'Tableau']
  }
];

// ─────────────────────────────────────────────────────
// SAMPLE PREFILL DATA
// ─────────────────────────────────────────────────────
const SAMPLE_JD = {
  title: 'Staff Software Engineer',
  text: `We are looking for a Staff Software Engineer to join our platform team at Meridian Labs.

RESPONSIBILITIES:
- Architect and own distributed data pipeline systems serving 500M+ events/day
- Lead technical design reviews and mentor senior engineers
- Define reliability and scalability roadmap for core infrastructure
- Drive engineering standards: code review, testing, incident response

REQUIREMENTS:
- 8+ years software engineering experience
- Expert-level Go in production distributed systems
- Deep Kubernetes knowledge (cluster operations, custom controllers, operators)
- Experience designing for high throughput (>10M requests/second)
- Strong async communication skills — we are a remote-first team

NICE TO HAVE:
- Kafka or Flink stream processing experience
- Open-source contributions to infrastructure tooling
- Startup experience building 0→1 systems

TECH STACK: Go, Kubernetes, PostgreSQL, Redis, gRPC, Kafka, Prometheus`
};

const SAMPLE_RESUME = `ALEX RIVERA
Staff Software Engineer | alex.rivera@email.com | GitHub: @arivera

EXPERIENCE

Senior Staff Engineer — CloudBase Inc (2021–Present)
- Designed microservices architecture serving 8M requests/day on Kubernetes
- Led migration of monolith to 40+ microservices; reduced latency by 60%
- Mentored team of 6 engineers; established code review and testing standards
- Managed PostgreSQL clusters with 99.95% uptime SLA

Senior Software Engineer — DataFlow Systems (2018–2021)
- Built real-time event streaming pipelines using Go and Kafka
- Implemented gRPC service mesh for 12 internal services
- Wrote custom Kubernetes operators for database provisioning

Software Engineer — StartupXYZ (2016–2018)
- Full-stack development in Go and React
- Set up initial CI/CD using GitHub Actions and Docker

SKILLS
Languages: Go (8 years), Python (4 years), SQL
Infrastructure: Kubernetes, Docker, Terraform, Helm, Prometheus, Grafana
Databases: PostgreSQL, Redis, ClickHouse
Messaging: Kafka, RabbitMQ
Cloud: AWS (EKS, RDS, S3, EC2)

EDUCATION
B.S. Computer Science — State University (2016)

NOTABLE PROJECTS
- Open-sourced a Kubernetes admission webhook used by 200+ companies
- Contributed to etcd documentation and minor bug fixes`;

const SAMPLE_TRANSCRIPT = `INTERVIEWER: Thanks for joining us, Alex. Let's dive into your distributed systems experience. Walk me through the architecture of the highest-scale system you've built.

ALEX: Sure. At CloudBase, I designed a microservices platform handling about 8 million requests per day. We used Kubernetes for orchestration and had a service mesh for inter-service communication.

INTERVIEWER: You mentioned "about 8 million per day" — can you break that down by peak QPS? What did the traffic pattern look like?

ALEX: Hmm, we had peaks around lunchtime and evenings. I'd say maybe... a few hundred requests per second at peak? We had auto-scaling set up so it mostly just handled itself.

INTERVIEWER: Your resume mentions custom Kubernetes operators. Can you explain the controller reconciliation loop you implemented?

ALEX: Yeah, so the operator would watch for Custom Resource Definitions and then... provision the databases based on the spec. We used the controller-runtime library. It would check the desired state against actual state and reconcile.

INTERVIEWER: What's the difference between a Watch and a List-Watch in Kubernetes informers, and why does it matter for operator reliability?

ALEX: That's a good question. I think the Watch streams events from the API server, and List-Watch does a full list first then watches. We used the standard library so it handled a lot of that for us automatically.

INTERVIEWER: Your resume says you reduced latency by 60% during the monolith migration. What was the baseline latency and what specifically drove that improvement?

ALEX: The baseline was around 800ms for most requests. We got it down to about 300ms. The main improvements came from eliminating synchronous calls between modules — they became async via Kafka — and we also moved some computation closer to the data.

INTERVIEWER: Good. Now, tell me about a distributed systems failure you caused and how you debugged it.

ALEX: We had an incident where one of the Kafka consumers fell behind and caused a cascade. We identified it through Grafana dashboards — the consumer lag metric spiked. We scaled up the consumer group and added back-pressure handling.

INTERVIEWER: How did you determine root cause — was it a throughput issue, a processing latency issue, or something else entirely?

ALEX: We looked at the metrics and it seemed like the consumer was slow. We added more instances and it resolved within 20 minutes. I think it was a combination of higher-than-usual traffic and a slow database query in the consumer processing logic.`;

// ─────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);
}

// ─────────────────────────────────────────────────────
// PREFILL HELPERS
// ─────────────────────────────────────────────────────
function prefillJD() {
  document.getElementById('jd-title').value = SAMPLE_JD.title;
  document.getElementById('jd-text').value  = SAMPLE_JD.text;
}
function prefillResume() {
  document.getElementById('candidate-name').value = 'Alex Rivera';
  document.getElementById('resume-text').value    = SAMPLE_RESUME;
}
function prefillTranscript() {
  document.getElementById('transcript-text').value = SAMPLE_TRANSCRIPT;
}

// ─────────────────────────────────────────────────────
// PANEL STATE
// ─────────────────────────────────────────────────────
function setStatus(state, text) {
  const dot    = document.querySelector('.status-dot');
  const status = document.getElementById('panel-status');
  dot.className = 'status-dot ' + state;
  status.innerHTML = `<span class="status-dot ${state}"></span> ${text}`;
}

function showSection(id) {
  ['output-idle', 'output-loading', 'output-results'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  const target = document.getElementById(id);
  if (target) target.style.display = (id === 'output-results') ? 'flex' : 'block';
}

function resetPanel() {
  showSection('output-idle');
  setStatus('idle', 'AWAITING INPUT');
  document.getElementById('run-btn').disabled = false;
  document.getElementById('run-btn-text').textContent = '⚡ LAUNCH PANEL EVALUATION';
  // Reset scores
  ['sc-resume','sc-jd','sc-tech','sc-cons','sc-comm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.width = '0%'; el.className = 'score-fill'; }
  });
  ['sn-resume','sn-jd','sn-tech','sn-cons','sn-comm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '—';
  });
}

// ─────────────────────────────────────────────────────
// LOADING LOG HELPERS
// ─────────────────────────────────────────────────────
function addLogLine(agentName, text, isError = false) {
  const log = document.getElementById('loading-log');
  const line = document.createElement('div');
  line.className = 'log-line' + (isError ? ' error' : '');
  line.innerHTML = `<span class="agent-tag">[${agentName}]</span>${text}`;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function setProgress(pct, agentLabel) {
  document.getElementById('loading-bar').style.width = pct + '%';
  document.getElementById('loading-agent-name').textContent = agentLabel;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─────────────────────────────────────────────────────
// MULTI-AGENT AI ENGINE (Claude API)
// ─────────────────────────────────────────────────────

async function callClaude(systemPrompt, userContent) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userContent }]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.content.map(b => b.text || '').join('');
}

// ─── AGENT 1: RESUME PARSER ─────────────────────────
async function agentResumeParser(jobTitle, jdText, candidateName, resumeText) {
  const system = `You are the Resume Parser Agent in an autonomous hiring panel.
Your job: analyze a candidate's resume against a job description and produce a structured JSON assessment.
Be objective, precise, and critical. Do NOT be generous — identify real gaps.

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{
  "candidateName": "...",
  "yearsOfExperience": number,
  "topSkills": ["skill1", "skill2", "skill3"],
  "missingRequiredSkills": ["skill1", "skill2"],
  "experienceGaps": ["gap1", "gap2"],
  "claimsToVerify": ["claim1", "claim2"],
  "resumeQualityScore": number (0-100),
  "summary": "2-3 sentence summary of resume quality"
}`;

  const user = `JOB TITLE: ${jobTitle}

JOB DESCRIPTION:
${jdText}

CANDIDATE: ${candidateName}

RESUME:
${resumeText}`;

  const raw = await callClaude(system, user);

  // Strip markdown code fences if present
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

// ─── AGENT 2: CONTRADICTION HUNTER ──────────────────
async function agentContradictionHunter(jobTitle, jdText, resumeText, transcriptText, resumeParserOutput) {
  const system = `You are the Contradiction Hunter Agent in an autonomous hiring panel.
Your job: compare the candidate's resume claims against their interview transcript to find contradictions, vague answers, and gaps in demonstrated knowledge.
Be ruthlessly analytical. Surface what the resume promises vs what the interview revealed.

Return ONLY valid JSON (no markdown, no extra text):
{
  "contradictions": [
    { "claim": "resume claim", "reality": "what interview revealed", "severity": "HIGH|MEDIUM|LOW" }
  ],
  "vagueAnswers": ["question or topic where candidate was evasive"],
  "strongMoments": ["moment where candidate demonstrated real depth"],
  "consistencyScore": number (0-100),
  "communicationScore": number (0-100),
  "agentVerdict": "HIRE|HOLD|NO_HIRE",
  "agentReasoning": "2-3 sentences explaining verdict"
}`;

  const user = `JOB: ${jobTitle}

RESUME PARSER FINDINGS:
${JSON.stringify(resumeParserOutput, null, 2)}

RESUME:
${resumeText}

INTERVIEW TRANSCRIPT:
${transcriptText}`;

  const raw = await callClaude(system, user);
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

// ─── AGENT 3: JD MATCHER ────────────────────────────
async function agentJDMatcher(jobTitle, jdText, resumeText, transcriptText, resumeParserOutput, contradictionOutput) {
  const system = `You are the JD Matcher Agent in an autonomous hiring panel.
Your job: score how well this candidate meets each requirement in the job description, and produce a final panel verdict.
Consider both resume evidence AND interview transcript evidence.
Weight required qualifications higher than nice-to-haves.

Return ONLY valid JSON (no markdown, no extra text):
{
  "requirementScores": [
    { "requirement": "requirement text", "score": number (0-100), "evidence": "brief evidence or gap" }
  ],
  "overallJDMatchScore": number (0-100),
  "technicalDepthScore": number (0-100),
  "finalVerdict": "STRONG_HIRE|HIRE|NO_HIRE",
  "confidenceLevel": "HIGH|MEDIUM|LOW",
  "verdictSummary": "2-3 sentence final panel summary",
  "detailedReasoning": "paragraph of thorough reasoning combining all agent findings"
}`;

  const user = `JOB TITLE: ${jobTitle}

FULL JOB DESCRIPTION:
${jdText}

RESUME PARSER FINDINGS:
${JSON.stringify(resumeParserOutput, null, 2)}

CONTRADICTION HUNTER FINDINGS:
${JSON.stringify(contradictionOutput, null, 2)}

RESUME:
${resumeText}

INTERVIEW TRANSCRIPT:
${transcriptText}`;

  const raw = await callClaude(system, user);
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

// ─────────────────────────────────────────────────────
// RENDER RESULTS
// ─────────────────────────────────────────────────────
function getScoreClass(n) {
  if (n >= 75) return 'high';
  if (n >= 50) return 'mid';
  return 'low';
}

function animateScore(fillId, numId, value) {
  const fill = document.getElementById(fillId);
  const num  = document.getElementById(numId);
  if (!fill || !num) return;
  fill.className = 'score-fill ' + getScoreClass(value);
  setTimeout(() => {
    fill.style.width = value + '%';
    num.textContent  = value + '%';
  }, 100);
}

function toggleAgent(id) {
  const body = document.getElementById('agent-body-' + id);
  const icon = document.getElementById('agent-toggle-' + id);
  if (!body) return;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open');
  icon.textContent = isOpen ? '▾' : '▴';
}

function chipClass(verdict) {
  if (!verdict) return 'chip-hold';
  const v = verdict.toUpperCase();
  if (v.includes('NO_HIRE') || v.includes('NO HIRE')) return 'chip-nohire';
  if (v.includes('HIRE')) return 'chip-hire';
  return 'chip-hold';
}

function chipLabel(verdict) {
  if (!verdict) return 'HOLD';
  const v = verdict.toUpperCase();
  if (v.includes('NO_HIRE') || v.includes('NO HIRE')) return 'NO HIRE';
  if (v.includes('STRONG')) return 'STRONG HIRE';
  if (v.includes('HIRE')) return 'HIRE';
  return 'HOLD';
}

function renderResults(parserOut, contradictionOut, matcherOut) {
  // ── Scores ──────────────────────────
  const resumeScore    = parserOut.resumeQualityScore       || 0;
  const jdMatchScore   = matcherOut.overallJDMatchScore     || 0;
  const techScore      = matcherOut.technicalDepthScore     || 0;
  const consScore      = contradictionOut.consistencyScore  || 0;
  const commScore      = contradictionOut.communicationScore|| 0;

  setTimeout(() => animateScore('sc-resume', 'sn-resume', resumeScore),  100);
  setTimeout(() => animateScore('sc-jd',     'sn-jd',     jdMatchScore), 250);
  setTimeout(() => animateScore('sc-tech',   'sn-tech',   techScore),    400);
  setTimeout(() => animateScore('sc-cons',   'sn-cons',   consScore),    550);
  setTimeout(() => animateScore('sc-comm',   'sn-comm',   commScore),    700);

  // ── Verdict Banner ─────────────────
  const verdict    = matcherOut.finalVerdict || 'HOLD';
  const banner     = document.getElementById('verdict-banner');
  const vValue     = document.getElementById('verdict-value');
  const vConf      = document.getElementById('verdict-confidence');

  vValue.textContent = chipLabel(verdict);
  vConf.textContent  = (matcherOut.confidenceLevel || '') + ' CONFIDENCE — ' + (matcherOut.verdictSummary || '');

  banner.className = 'verdict-banner';
  if (verdict.includes('NO')) banner.classList.add('no-hire');
  else banner.classList.add('strong-hire');

  // ── Agent Report Cards ─────────────
  const reports = document.getElementById('agent-reports');
  reports.innerHTML = `
    <!-- Agent 1: Resume Parser -->
    <div class="agent-card">
      <div class="agent-card-header" onclick="toggleAgent('parser')">
        <div class="agent-card-name">
          <span class="agent-icon">📄</span>
          RESUME PARSER AGENT
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span class="agent-verdict-chip chip-hire">${resumeScore}% QUALITY</span>
          <span class="agent-toggle" id="agent-toggle-parser">▾</span>
        </div>
      </div>
      <div class="agent-card-body open" id="agent-body-parser">
        <strong style="color:#e2e2e2;font-size:12px">SUMMARY</strong><br>
        ${parserOut.summary || '—'}<br><br>
        <strong style="color:#e2e2e2;font-size:12px">TOP SKILLS FOUND</strong><br>
        ${(parserOut.topSkills || []).join(', ') || '—'}<br><br>
        ${parserOut.missingRequiredSkills && parserOut.missingRequiredSkills.length > 0 ? `
        <strong style="color:#ff3d3d;font-size:12px">MISSING REQUIRED SKILLS</strong><br>
        ${parserOut.missingRequiredSkills.join(', ')}<br><br>` : ''}
        ${parserOut.experienceGaps && parserOut.experienceGaps.length > 0 ? `
        <strong style="color:#ffd700;font-size:12px">EXPERIENCE GAPS FLAGGED</strong><br>
        ${parserOut.experienceGaps.join(' · ')}<br><br>` : ''}
        <strong style="color:#e2e2e2;font-size:12px">CLAIMS TO VERIFY IN INTERVIEW</strong><br>
        ${(parserOut.claimsToVerify || []).map(c => `→ ${c}`).join('<br>') || '—'}
      </div>
    </div>

    <!-- Agent 2: Contradiction Hunter -->
    <div class="agent-card">
      <div class="agent-card-header" onclick="toggleAgent('hunter')">
        <div class="agent-card-name">
          <span class="agent-icon">⚔️</span>
          CONTRADICTION HUNTER AGENT
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span class="agent-verdict-chip ${chipClass(contradictionOut.agentVerdict)}">${chipLabel(contradictionOut.agentVerdict)}</span>
          <span class="agent-toggle" id="agent-toggle-hunter">▾</span>
        </div>
      </div>
      <div class="agent-card-body open" id="agent-body-hunter">
        <strong style="color:#e2e2e2;font-size:12px">AGENT REASONING</strong><br>
        ${contradictionOut.agentReasoning || '—'}<br><br>
        ${contradictionOut.strongMoments && contradictionOut.strongMoments.length > 0 ? `
        <strong style="color:#00ff88;font-size:12px">STRONG MOMENTS</strong><br>
        ${contradictionOut.strongMoments.map(s => `✓ ${s}`).join('<br>')}<br><br>` : ''}
        ${contradictionOut.vagueAnswers && contradictionOut.vagueAnswers.length > 0 ? `
        <strong style="color:#ffd700;font-size:12px">VAGUE / EVASIVE ANSWERS</strong><br>
        ${contradictionOut.vagueAnswers.map(v => `⚠ ${v}`).join('<br>')}` : ''}
      </div>
    </div>

    <!-- Agent 3: JD Matcher -->
    <div class="agent-card">
      <div class="agent-card-header" onclick="toggleAgent('matcher')">
        <div class="agent-card-name">
          <span class="agent-icon">🎯</span>
          JD MATCHER AGENT
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span class="agent-verdict-chip ${chipClass(matcherOut.finalVerdict)}">${chipLabel(matcherOut.finalVerdict)}</span>
          <span class="agent-toggle" id="agent-toggle-matcher">▾</span>
        </div>
      </div>
      <div class="agent-card-body open" id="agent-body-matcher">
        <strong style="color:#e2e2e2;font-size:12px">REQUIREMENT SCORES</strong><br><br>
        ${(matcherOut.requirementScores || []).map(r => `
          <div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="font-size:11px;color:#888">${r.requirement}</span>
              <span style="font-family:var(--font-mono);font-size:11px;color:${r.score >= 70 ? '#00ff88' : r.score >= 40 ? '#ffd700' : '#ff3d3d'}">${r.score}%</span>
            </div>
            <div style="font-size:11px;color:#555;font-style:italic">${r.evidence}</div>
          </div>`).join('')}
      </div>
    </div>
  `;

  // ── Discrepancies ───────────────────
  const discBlock = document.getElementById('disc-block');
  const discList  = document.getElementById('disc-list');
  const discs     = contradictionOut.contradictions || [];

  if (discs.length > 0) {
    discBlock.style.display = 'block';
    discList.innerHTML = discs.map(d => `
      <div class="disc-item">
        <span class="disc-bullet">[${d.severity}]</span>
        <div>
          <strong style="color:#e2e2e2;font-size:12px">CLAIM:</strong> ${d.claim}<br>
          <strong style="color:#ff3d3d;font-size:12px">REVEALED:</strong> ${d.reality}
        </div>
      </div>
    `).join('');
  } else {
    discBlock.style.display = 'none';
  }

  // ── Final Reasoning ─────────────────
  document.getElementById('reasoning-text').textContent =
    matcherOut.detailedReasoning || matcherOut.verdictSummary || '—';

  showSection('output-results');
  setStatus('done', 'EVALUATION COMPLETE');
}

// ─────────────────────────────────────────────────────
// MAIN RUN FUNCTION
// ─────────────────────────────────────────────────────
async function runPanel() {
  const jobTitle       = document.getElementById('jd-title').value.trim();
  const jdText         = document.getElementById('jd-text').value.trim();
  const candidateName  = document.getElementById('candidate-name').value.trim();
  const resumeText     = document.getElementById('resume-text').value.trim();
  const transcriptText = document.getElementById('transcript-text').value.trim();

  // Validate
  if (!jobTitle || !jdText) {
    alert('Please fill in the Job Description (title and description) before running evaluation.');
    return;
  }
  if (!resumeText) {
    alert('Please paste a resume before running evaluation.');
    return;
  }
  if (!transcriptText) {
    alert('Please paste an interview transcript before running evaluation.');
    return;
  }

  // UI: start loading
  document.getElementById('run-btn').disabled = true;
  document.getElementById('run-btn-text').textContent = '⏳ EVALUATING...';
  document.getElementById('loading-log').innerHTML = '';
  showSection('output-loading');
  setStatus('running', 'PANEL IN SESSION');

  try {
    // ── AGENT 1: Resume Parser ──────────
    setProgress(5, 'RESUME PARSER AGENT');
    addLogLine('RESUME PARSER', 'Initializing agent...');
    await sleep(300);
    addLogLine('RESUME PARSER', `Parsing resume for "${candidateName || 'candidate'}"...`);
    addLogLine('RESUME PARSER', `Cross-referencing against "${jobTitle}" requirements...`);
    setProgress(20, 'RESUME PARSER AGENT — ANALYZING');

    const parserOut = await agentResumeParser(jobTitle, jdText, candidateName, resumeText);

    setProgress(33, 'RESUME PARSER AGENT — COMPLETE');
    addLogLine('RESUME PARSER', `Resume quality score: ${parserOut.resumeQualityScore}%`);
    addLogLine('RESUME PARSER', `Top skills found: ${(parserOut.topSkills || []).join(', ')}`);
    if (parserOut.missingRequiredSkills?.length) {
      addLogLine('RESUME PARSER', `⚠ Missing required: ${parserOut.missingRequiredSkills.join(', ')}`);
    }
    addLogLine('RESUME PARSER', `Flagged ${(parserOut.claimsToVerify || []).length} claims for transcript verification.`);
    await sleep(400);

    // ── AGENT 2: Contradiction Hunter ───
    setProgress(38, 'CONTRADICTION HUNTER AGENT');
    addLogLine('CONTRADICTION HUNTER', 'Initializing agent...');
    await sleep(300);
    addLogLine('CONTRADICTION HUNTER', 'Comparing resume claims against interview transcript...');
    addLogLine('CONTRADICTION HUNTER', `Verifying ${(parserOut.claimsToVerify || []).length} flagged claims...`);
    setProgress(58, 'CONTRADICTION HUNTER AGENT — HUNTING');

    const contradictionOut = await agentContradictionHunter(
      jobTitle, jdText, resumeText, transcriptText, parserOut
    );

    setProgress(66, 'CONTRADICTION HUNTER AGENT — COMPLETE');
    addLogLine('CONTRADICTION HUNTER', `Consistency score: ${contradictionOut.consistencyScore}%`);
    addLogLine('CONTRADICTION HUNTER', `Found ${(contradictionOut.contradictions || []).length} contradiction(s).`);
    if (contradictionOut.vagueAnswers?.length) {
      addLogLine('CONTRADICTION HUNTER', `⚠ ${contradictionOut.vagueAnswers.length} vague/evasive answer(s) detected.`);
    }
    addLogLine('CONTRADICTION HUNTER', `Agent verdict: ${contradictionOut.agentVerdict}`);
    await sleep(400);

    // ── AGENT 3: JD Matcher ─────────────
    setProgress(70, 'JD MATCHER AGENT');
    addLogLine('JD MATCHER', 'Initializing agent...');
    await sleep(300);
    addLogLine('JD MATCHER', `Scoring candidate against all requirements for "${jobTitle}"...`);
    addLogLine('JD MATCHER', 'Weighting required qualifications vs. nice-to-haves...');
    setProgress(88, 'JD MATCHER AGENT — SCORING');

    const matcherOut = await agentJDMatcher(
      jobTitle, jdText, resumeText, transcriptText, parserOut, contradictionOut
    );

    setProgress(100, 'PANEL DELIBERATION COMPLETE');
    addLogLine('JD MATCHER', `JD match score: ${matcherOut.overallJDMatchScore}%`);
    addLogLine('JD MATCHER', `Technical depth: ${matcherOut.technicalDepthScore}%`);
    addLogLine('JD MATCHER', `━━ FINAL VERDICT: ${matcherOut.finalVerdict} (${matcherOut.confidenceLevel} CONFIDENCE) ━━`);
    await sleep(600);

    // ── Render Results ──────────────────
    renderResults(parserOut, contradictionOut, matcherOut);

  } catch (err) {
    addLogLine('PANEL SYSTEM', `Fatal error: ${err.message}`, true);
    setStatus('error', 'EVALUATION FAILED');
    document.getElementById('run-btn').disabled = false;
    document.getElementById('run-btn-text').textContent = '⚡ RETRY EVALUATION';
    console.error('Panel evaluation error:', err);
    alert(`Evaluation failed: ${err.message}\n\nMake sure you are running this through a Claude-powered environment.`);
  }
}

// ─────────────────────────────────────────────────────
// JOBS PAGE
// ─────────────────────────────────────────────────────
function renderJobs(filter) {
  const grid     = document.getElementById('jobs-grid');
  const filtered = filter === 'all' ? JOBS : JOBS.filter(j => j.category.includes(filter));

  grid.innerHTML = filtered.map(job => `
    <div class="job-card" onclick="openJobModal(${job.id})">
      <div class="jc-company">
        <div class="jc-logo" style="background:${job.bg};color:${job.color}">${job.logo}</div>
        <div>
          <div class="jc-company-name">${job.company}</div>
          <div class="jc-location">${job.location}</div>
        </div>
      </div>
      <div class="jc-title">${job.title}</div>
      <div class="jc-tags">
        <span class="jtag">${job.type}</span>
        ${job.tags.slice(0, 3).map(t => `<span class="jtag hi">${t}</span>`).join('')}
      </div>
      <div class="jc-footer">
        <div>
          <div class="jc-salary">${job.salary}</div>
          <div class="jc-time">${job.posted}</div>
        </div>
        <div class="jc-arrow">→</div>
      </div>
    </div>
  `).join('');
}

function filterJobs(cat, btn) {
  document.querySelectorAll('.flt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderJobs(cat);
}

// ─────────────────────────────────────────────────────
// JOB MODAL
// ─────────────────────────────────────────────────────
let activeJobData = null;

function openJobModal(id) {
  activeJobData = JOBS.find(j => j.id === id);
  const j = activeJobData;

  document.getElementById('modal-logo').style.cssText =
    `background:${j.bg};color:${j.color}`;
  document.getElementById('modal-logo').textContent = j.logo;

  document.getElementById('modal-company-name').textContent = j.company;
  document.getElementById('modal-job-title').textContent    = j.title;

  document.getElementById('modal-chips').innerHTML = `
    <span class="jtag hi">${j.salary}</span>
    <span class="jtag">${j.type}</span>
    <span class="jtag">${j.location}</span>
    <span class="jtag">${j.posted}</span>
  `;

  document.getElementById('modal-content').innerHTML = `
    <div class="md-section">
      <h4>ABOUT ${j.company.toUpperCase()}</h4>
      <p>${j.about}</p>
    </div>
    <div class="md-section">
      <h4>RESPONSIBILITIES</h4>
      <ul>${j.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>
    <div class="md-section">
      <h4>REQUIREMENTS</h4>
      <ul>${j.requirements.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>
    <div class="md-section">
      <h4>NICE TO HAVE</h4>
      <ul>${j.nice.map(n => `<li>${n}</li>`).join('')}</ul>
    </div>
    <div class="md-section">
      <h4>TECH STACK</h4>
      <div class="md-tags">${j.skills.map(s => `<span class="jtag hi">${s}</span>`).join('')}</div>
    </div>
  `;

  document.getElementById('job-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeJobModal() {
  document.getElementById('job-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(event) {
  if (event && event.target === document.getElementById('job-modal')) {
    closeJobModal();
  }
}

function loadJobToPanel() {
  if (!activeJobData) return;
  closeJobModal();
  document.getElementById('jd-title').value = activeJobData.title;
  document.getElementById('jd-text').value  =
    `${activeJobData.about}\n\nRESPONSIBILITIES:\n${activeJobData.responsibilities.map(r => '- ' + r).join('\n')}\n\nREQUIREMENTS:\n${activeJobData.requirements.map(r => '- ' + r).join('\n')}\n\nNICE TO HAVE:\n${activeJobData.nice.map(n => '- ' + n).join('\n')}\n\nTECH STACK: ${activeJobData.skills.join(', ')}`;
  showPage('panel');
}

// Escape key closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeJobModal();
});

// ─────────────────────────────────────────────────────
// SEARCH PAGE
// ─────────────────────────────────────────────────────
function renderSearchList(query) {
  const q        = (query || '').toLowerCase();
  const list     = document.getElementById('search-list');
  const filtered = q
    ? JOBS.filter(j =>
        j.title.toLowerCase().includes(q)   ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)||
        j.type.toLowerCase().includes(q)    ||
        j.salary.toLowerCase().includes(q)  ||
        j.skills.some(s  => s.toLowerCase().includes(q)) ||
        j.tags.some(t    => t.toLowerCase().includes(q)) ||
        j.category.some(c=> c.toLowerCase().includes(q))
      )
    : JOBS;

  document.getElementById('search-count').textContent =
    `Showing ${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;

  list.innerHTML = filtered.map(j => {
    const matchPct = q ? Math.min(99, Math.floor(60 + Math.random() * 36)) : null;
    return `
      <div class="search-item" onclick="openJobModal(${j.id})">
        <div class="si-logo" style="background:${j.bg};color:${j.color}">${j.logo}</div>
        <div class="si-info">
          <div class="si-title">${j.title}</div>
          <div class="si-meta">
            <span>${j.company}</span>
            <span>${j.location}</span>
            <span>${j.salary}</span>
            <span>${j.posted}</span>
          </div>
          <div class="si-tags">
            ${j.skills.slice(0, 4).map(s =>
              `<span class="jtag" style="font-size:10px;padding:2px 7px">${s}</span>`
            ).join('')}
          </div>
        </div>
        <div class="si-actions">
          ${matchPct ? `<div class="match-badge">${matchPct}% match</div>` : ''}
          <div class="si-arrow">→</div>
        </div>
      </div>`;
  }).join('');
}

function doSearch() {
  renderSearchList(document.getElementById('search-input').value);
}

function quickSearch(term) {
  document.getElementById('search-input').value = term;
  renderSearchList(term);
}

// ─────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────
renderJobs('all');
renderSearchList('');