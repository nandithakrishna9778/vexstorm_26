import asyncio
import websockets
import json
from datetime import datetime

# The file where your ATS model will look for data
TRANSCRIPT_FILE = "interview_data.txt"

async def handle_connection(websocket):
    print("New connection established with browser.")
    try:
        async for message in websocket:
            data = json.loads(message)
            
            if data.get("type") == "transcription":
                candidate_text = data.get("text")
                timestamp = datetime.now().strftime("%H:%M:%S")
                
                # Print live to terminal
                print(f"[{timestamp}] CANDIDATE: {candidate_text}")
                
                # Save to file
                with open(TRANSCRIPT_FILE, "a", encoding="utf-8") as f:
                    f.write(f"[{timestamp}] {candidate_text}\n")
                            
    except websockets.exceptions.ConnectionClosed:
        print("Connection closed.")

async def main():
    # Reset the file for a new session
    with open(TRANSCRIPT_FILE, "w", encoding="utf-8") as f:
        f.write(f"--- Session Started: {datetime.now()} ---\n")
        
    async with websockets.serve(handle_connection, "localhost", 8080):
        print("Backend Server Running on port 8080. Waiting for candidate...")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())