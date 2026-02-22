import streamlit as st
import os
import fitz  # PyMuPDF
from groq import Groq
from dotenv import load_dotenv

# --- 1. PAGE CONFIGURATION ---
st.set_page_config(page_title="VEXSTORM26 | Hiring Panel", layout="wide", page_icon="")

# --- 2. CUSTOM STYLE ---
st.markdown("""
    <style>
    :root { --cream: #F5F0E8; --ink: #1A1714; --rust: #C8472B; --white: #FDFCFA; }
    .stApp { background-color: var(--cream); }
    .stApp p, .stApp label, .stApp span, .stApp li { color: var(--ink) !important; font-weight: 500 !important; }
    
    /* File Uploader Fix */
    [data-testid="stFileUploaderFileName"], [data-testid="stFileUploaderFileData"],
    [data-testid="stFileUploadDropzone"] div { color: var(--white) !important; }
    .stFileUploader { background-color: #262730; border-radius: 8px; border: 2px dashed var(--rust); }

    /* Custom Boxes for Reports and Questions */
    .question-box { background-color: #E3F2FD; color: #0D47A1 !important; padding: 20px; border-radius: 8px; border-left: 6px solid #1976D2; margin-bottom: 15px; }
    .tech-report { background-color: #F8F9FA; color: #1A1714 !important; padding: 20px; border-radius: 8px; border-left: 6px solid #4A90E2; margin-bottom: 15px; }
    .consistency-report { background-color: #FFF9C4; color: #5D4037 !important; padding: 20px; border-radius: 8px; border-left: 6px solid #F57F17; margin-bottom: 15px; }
    .verdict-hire { background-color: #E8F5E9; color: #1B5E20 !important; padding: 25px; border-radius: 12px; border: 3px solid #2E7D32; }
    .verdict-nohire { background-color: #FFEBEE; color: #B71C1C !important; padding: 25px; border-radius: 12px; border: 3px solid #C62828; }
    
    .question-box *, .tech-report *, .consistency-report *, .verdict-hire *, .verdict-nohire * { color: inherit !important; }
    
    div.stButton > button { background-color: var(--rust) !important; color: var(--white) !important; font-weight: bold !important; }
    </style>
    """, unsafe_allow_html=True)

# --- 3. BACKEND LOGIC ---
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key) if api_key else None

def extract_text_from_file(uploaded_file):
    if not uploaded_file: return ""
    if uploaded_file.name.lower().endswith('.pdf'):
        try:
            with fitz.open(stream=uploaded_file.getvalue(), filetype="pdf") as doc:
                return "".join([page.get_text() for page in doc])
        except Exception as e:
            st.error(f"PDF Error: {e}"); return ""
    return uploaded_file.getvalue().decode("utf-8")

class InterviewPanel:
    def _call_agent(self, role, content):
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "system", "content": role}, {"role": "user", "content": content}],
            temperature=0.3 # Slightly higher for creative questions
        )
        return response.choices[0].message.content

    def generate_questions(self, resume, jd):
        prompt = "You are a Technical Interviewer. Based on the JD and Resume, generate 5 deep technical questions that test the candidate's actual experience versus their claims. Focus on 'How' and 'Why' questions."
        return self._call_agent(prompt, f"JD: {jd}\nResume: {resume}")

    def analyze(self, resume, transcript, jd):
        tech = self._call_agent("Senior Tech Lead", f"Evaluate depth. JD: {jd}\nTranscript: {transcript}")
        consistency = self._call_agent("Bar Raiser", f"Find contradictions. Resume: {resume}\nTranscript: {transcript}")
        chair_prompt = "Hiring Chair. If Tech is deep and no lies found, HIRE. Start with [HIRE] or [NO-HIRE]."
        verdict = self._call_agent(chair_prompt, f"Tech: {tech}\nConsistency: {consistency}")
        return {"tech": tech, "consistency": consistency, "verdict": verdict}

# --- 4. UI LAYOUT ---
st.title("Tech Transcription")
st.divider()

col1, col2, col3 = st.columns(3)
with col1:
    jd_input = st.text_area(" Job Description", height=250)
with col2:
    st.markdown("**Candidate Resume**")
    res_method = st.radio("Input Method:", ("Upload PDF/TXT", "Paste Text"), horizontal=True)
    if res_method == "Upload PDF/TXT":
        res_file = st.file_uploader("Upload Resume", type=["pdf", "txt"], label_visibility="collapsed")
        resume_content = extract_text_from_file(res_file) if res_file else ""
    else:
        resume_content = st.text_area("Paste Resume Text", height=185, label_visibility="collapsed")
with col3:
    transcript_input = st.text_area(" Interview Transcript", height=250, placeholder="Questions will help you fill this...")

# --- AUTO-QUESTION GENERATOR ---
st.markdown("###  Step 1: Prepare Interview Questions")
if st.button("Generate Targeted Interview Questions", use_container_width=True, key="gen_q_btn"):
    if not jd_input or not resume_content:
        st.warning("Please provide both the Job Description and Resume to generate questions.")
    else:
        with st.spinner("Analyzing profile to create questions..."):
            panel = InterviewPanel()
            questions = panel.generate_questions(resume_content, jd_input)
            st.markdown(f'<div class="question-box"><strong>Suggested Interview Questions:</strong><br><br>{questions}</div>', unsafe_allow_html=True)

st.divider()

# --- EVALUATION ENGINE ---
st.markdown("### Step 2: Final Evaluation")
if st.button(" RUN FULL PANEL EVALUATION", use_container_width=True, key="eval_btn"):
    if not jd_input or not resume_content or not transcript_input:
        st.warning("All inputs (JD, Resume, and Transcript) are required for evaluation.")
    else:
        with st.spinner("Agents are deliberating..."):
            panel = InterviewPanel()
            results = panel.analyze(resume_content, transcript_input, jd_input)
            
            st.header("Agent Reasoning Logs")
            l_c, r_c = st.columns(2)
            with l_c:
                st.markdown("### Tech Lead")
                st.markdown(f'<div class="tech-report">{results["tech"]}</div>', unsafe_allow_html=True)
            with r_c:
                st.markdown("### Bar Raiser")
                st.markdown(f'<div class="consistency-report">{results["consistency"]}</div>', unsafe_allow_html=True)
            
            st.header(" Final Consensus")
            if "[HIRE]" in results["verdict"].upper():
                st.markdown(f'<div class="verdict-hire"><strong>Final Verdict: HIRE</strong><br><br>{results["verdict"].replace("[HIRE]", "")}</div>', unsafe_allow_html=True)
            else:
                st.markdown(f'<div class="verdict-nohire"><strong>Final Verdict: NO-HIRE</strong><br><br>{results["verdict"].replace("[NO-HIRE]", "")}</div>', unsafe_allow_html=True)
