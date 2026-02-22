import streamlit as st
import os
from groq import Groq
from dotenv import load_dotenv
from streamlit_mic_recorder import speech_to_text

# --- BACKEND LOGIC ---
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class InterviewPanel:
    def __init__(self):
        self.tech_lead_prompt = "You are a Senior Technical Lead. Evaluate the candidate's technical depth, system architecture knowledge, and identify if they are just repeating 'LeetCode' answers or truly understand the concepts."
        self.bar_raiser_prompt = "You are a Hiring Bar Raiser. Your job is to find contradictions between the Resume and the Interview Transcript. Look for 'red flags' and challenge the Tech Lead's assumptions."
        
        # NEW: The Copilot Agent for generating questions
        self.question_generator_prompt = """You are an expert technical interviewer co-pilot. 
        Your goal is to suggest 3 highly specific, challenging follow-up questions for the human interviewer to ask right now. 
        Base these on the Job Description, the Resume, and specifically the LAST thing said in the Interview Transcript. 
        If the transcript is empty, suggest 3 hard-hitting starting questions based on the resume. 
        Keep the questions punchy and conversational. Format as a bulleted list."""

    def generate_questions(self, resume, transcript, jd):
        # NEW: Method to trigger the question generator
        prompt_content = f"JD: {jd}\nResume: {resume}\nCurrent Transcript: {transcript}\nTask: Generate 3 follow-up questions."
        return self._ask_agent(self.question_generator_prompt, prompt_content)

    def analyze_candidate(self, resume, transcript, jd):
        tech_analysis = self._ask_agent(self.tech_lead_prompt, 
            f"JD: {jd}\nResume: {resume}\nTranscript: {transcript}\nTask: Analyze technical competency.")

        consistency_check = self._ask_agent(self.bar_raiser_prompt, 
            f"JD: {jd}\nResume Claims: {resume}\nInterview Performance: {transcript}\nTask: Find discrepancies.")

        consensus = self._ask_agent("You are the Hiring Committee Chair.", 
            f"Review these two internal reports and provide a final Hire/No-Hire verdict.\nTech Report: {tech_analysis}\nConsistency Report: {consistency_check}")

        return {
            "tech_lead_report": tech_analysis,
            "consistency_report": consistency_check,
            "final_verdict": consensus
        }

    def _ask_agent(self, role, content):
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile", 
            messages=[
                {"role": "system", "content": role},
                {"role": "user", "content": content}
            ]
        )
        return response.choices[0].message.content

# --- FRONTEND UI ---
st.set_page_config(page_title="Autonomous Interview Panel", page_icon="🤖", layout="wide")

st.title("🤖 Autonomous Technical Interview Evaluator")
st.markdown("Evaluating candidates using **Chrome's built-in Speech-to-Text** and Groq's multi-agent consensus.")
st.divider()

st.header("1. Candidate Inputs")
col1, col2 = st.columns(2)

with col1:
    jd_input = st.text_area("Job Description", height=200, 
                            value="Senior Backend Engineer. \nSkills: Python, Distributed Systems, AWS.")
with col2:
    resume_input = st.text_area("Candidate Resume", height=200, 
                                value="John Doe.\n5 years at TechCorp.\nExpert in AWS and System Design.")

st.divider()

st.header("2. Live Interview Transcription & AI Co-pilot")
st.markdown("Record the interview. Use the Co-pilot to generate follow-up questions based on the candidate's latest answers.")

# Initialize session states
if "transcript" not in st.session_state:
    st.session_state.transcript = ""
if "suggested_questions" not in st.session_state:
    st.session_state.suggested_questions = ""

# Layout for transcription and the co-pilot button
trans_col, copilot_col = st.columns([3, 1])

with trans_col:
    spoken_text = speech_to_text(
        language='en',
        start_prompt="🎙️ Click to Start Speaking",
        stop_prompt="⏹️ Click to Stop & Save",
        just_once=True,
        key='STT'
    )
    
    # Append new speech to the transcript automatically
    if spoken_text:
        st.session_state.transcript += f"\n{spoken_text}"

    transcript_input = st.text_area("Live Transcript Editor", value=st.session_state.transcript, height=200)

with copilot_col:
    st.write("") # Spacing to align with the text area
    st.write("")
    if st.button("💡 Suggest Next Questions", type="secondary", use_container_width=True):
        if not jd_input or not resume_input:
            st.error("Need JD and Resume first!")
        else:
            with st.spinner("Thinking..."):
                panel = InterviewPanel()
                st.session_state.suggested_questions = panel.generate_questions(resume_input, transcript_input, jd_input)

# Display the pop-up questions if they exist
if st.session_state.suggested_questions:
    st.info(f"**💡 AI Co-pilot Suggestions:**\n\n{st.session_state.suggested_questions}")

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
                
                st.header("3. Agent Reasoning Logs")
                log_col1, log_col2 = st.columns(2)
                
                with log_col1:
                    with st.expander("🛠️ Tech Lead Assessment", expanded=True):
                        st.write(results["tech_lead_report"])
                        
                with log_col2:
                    with st.expander("🕵️ Bar Raiser (Consistency) Report", expanded=True):
                        st.warning(results["consistency_report"])
                        
                st.header("4. Final Committee Consensus")
                if "NO HIRE" in results["final_verdict"].upper():
                    st.error(results["final_verdict"])
                else:
                    st.success(results["final_verdict"])
                
            except Exception as e:
                st.error(f"An error occurred: {e}")