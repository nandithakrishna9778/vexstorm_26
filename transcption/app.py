import streamlit as st
import os
from groq import Groq
from dotenv import load_dotenv

# --- BACKEND LOGIC ---
load_dotenv()
# Ensure your API key is set in a .env file or your system environment variables
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class InterviewPanel:
    def __init__(self):
        self.tech_lead_prompt = "You are a Senior Technical Lead. Evaluate the candidate's technical depth, system architecture knowledge, and identify if they are just repeating 'LeetCode' answers or truly understand the concepts."
        self.bar_raiser_prompt = "You are a Hiring Bar Raiser. Your job is to find contradictions between the Resume and the Interview Transcript. Look for 'red flags' and challenge the Tech Lead's assumptions."

    def analyze_candidate(self, resume, transcript, jd):
        # 1. Technical Lead Assessment
        tech_analysis = self._ask_agent(self.tech_lead_prompt, 
            f"JD: {jd}\nResume: {resume}\nTranscript: {transcript}\nTask: Analyze technical competency.")

        # 2. Bar Raiser Assessment
        consistency_check = self._ask_agent(self.bar_raiser_prompt, 
            f"Resume Claims: {resume}\nInterview Performance: {transcript}\nTask: Find discrepancies.")

        # 3. Final Consensus
        consensus = self._ask_agent("You are the Hiring Committee Chair.", 
            f"Review these two internal reports and provide a final Hire/No-Hire verdict.\nTech Report: {tech_analysis}\nConsistency Report: {consistency_check}")

        return {
            "tech_lead_report": tech_analysis,
            "consistency_report": consistency_check,
            "final_verdict": consensus
        }

    def _ask_agent(self, role, content):
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile", # Groq's fast, highly capable model
            messages=[
                {"role": "system", "content": role},
                {"role": "user", "content": content}
            ]
        )
        return response.choices[0].message.content

# --- FRONTEND UI ---
st.set_page_config(page_title="Autonomous Interview Panel", page_icon="🤖", layout="wide")

st.title("🤖 Autonomous Technical Interview Evaluator")
st.markdown("Evaluating candidates by analyzing the **Resume**, **Interview Transcript**, and **Job Description** to reach a hiring consensus.")
st.divider()

st.header("1. Candidate Inputs")
st.markdown("Define your test inputs below as required by the challenge.")

col1, col2, col3 = st.columns(3)

with col1:
    jd_input = st.text_area("Job Description", height=250, 
                            value="Senior Backend Engineer. \nSkills: Python, Distributed Systems, AWS.")
with col2:
    resume_input = st.text_area("Candidate Resume", height=250, 
                                value="John Doe.\n5 years at TechCorp.\nExpert in AWS and System Design. Led migration to sharded MongoDB.")
with col3:
    transcript_input = st.text_area("Interview Transcript", height=250, 
                                    value="Interviewer: How do you handle database scaling?\nCandidate: I usually just use a bigger instance. I haven't really dealt with sharding.\nInterviewer: Your resume says you led a migration to a sharded MongoDB cluster?\nCandidate: Oh, I mean... I was on the team when that happened.")

st.divider()
evaluate_btn = st.button("🚀 Run Autonomous Panel Evaluation", type="primary", use_container_width=True)

if evaluate_btn:
    if not jd_input or not resume_input or not transcript_input:
        st.warning("Please fill in all input fields to proceed.")
    else:
        with st.spinner("Agents are reviewing the candidate... This happens fast!"):
            try:
                panel = InterviewPanel()
                results = panel.analyze_candidate(resume_input, transcript_input, jd_input)
                
                st.success("Evaluation Complete!")
                
                st.header("2. Agent Reasoning Logs")
                st.markdown("Trace of how the agents challenged the inputs.")
                
                log_col1, log_col2 = st.columns(2)
                
                with log_col1:
                    with st.expander("🛠️ Tech Lead Assessment", expanded=True):
                        st.write(results["tech_lead_report"])
                        
                with log_col2:
                    with st.expander("🕵️ Bar Raiser (Consistency) Report", expanded=True):
                        st.warning(results["consistency_report"])
                        
                st.header("3. Final Committee Consensus")
                
                if "NO HIRE" in results["final_verdict"].upper():
                    st.error(results["final_verdict"])
                else:
                    st.success(results["final_verdict"])
                
            except Exception as e:
                st.error(f"An error occurred: {e}")
                st.markdown("Make sure your `GROQ_API_KEY` is set correctly.")