import os
import re
import json
import sqlite3
import uuid
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, g
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app) 

# Initialize SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# --- FOLDER CONFIGURATION ---
BASE_DIR = 'hiring_data'
RESUME_DIR = os.path.join(BASE_DIR, 'resumes')
POSTERS_DIR = os.path.join(BASE_DIR, 'posters')
DATABASE = 'hiring_os.db'

os.makedirs(RESUME_DIR, exist_ok=True)
os.makedirs(POSTERS_DIR, exist_ok=True)

# --- SQLITE CONFIGURATION ---
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT,
            email TEXT UNIQUE,
            password_hash TEXT,
            full_name TEXT,
            phone TEXT,
            created_at TIMESTAMP,
            last_login TIMESTAMP,
            status TEXT,
            current_status TEXT,
            resume_url TEXT,
            company_name TEXT,
            designation TEXT
        )''')
        cursor.execute('''CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            company TEXT,
            location TEXT,
            type TEXT,
            salary TEXT,
            apply_link TEXT,
            poster_url TEXT,
            posted_at TIMESTAMP
        )''')
        cursor.execute('''CREATE TABLE IF NOT EXISTS meeting_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_id INTEGER,
            receiver_id INTEGER,
            status TEXT,
            room_id TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            FOREIGN KEY(sender_id) REFERENCES users(id),
            FOREIGN KEY(receiver_id) REFERENCES users(id)
        )''')
        db.commit()

init_db()

# --- VALIDATION HELPERS ---
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email)

def is_strong_password(password):
    if len(password) < 8: return False
    if not re.search(r'[A-Za-z]', password): return False
    if not re.search(r'\d', password): return False
    return True

# ==========================================
#          AUTH ROUTES
# ==========================================
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        role = request.form.get('role')
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        full_name = request.form.get('full_name', '').strip()
        phone = request.form.get('phone', '').strip()

        if not all([role, email, password, full_name]):
            return jsonify({"error": "Missing mandatory fields."}), 400
            
        if not is_valid_email(email):
            return jsonify({"error": "Invalid email format."}), 400
            
        if not is_strong_password(password):
            return jsonify({"error": "Password must be 8+ chars with letters and numbers."}), 400

        db = get_db()
        cursor = db.cursor()
        
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        if cursor.fetchone():
            return jsonify({"error": "Email already exists."}), 409
            
        password_hash = generate_password_hash(password, method='pbkdf2:sha256')
        
        current_status = None
        resume_url = None
        company_name = None
        designation = None

        if role == 'seeker':
            current_status = request.form.get('current_status')
            if 'resume' in request.files:
                file = request.files['resume']
                filename = secure_filename(file.filename)
                unique_filename = f"cv_{datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
                file.save(os.path.join(RESUME_DIR, unique_filename))
                resume_url = f"http://127.0.0.1:5000/api/files/resumes/{unique_filename}"
        elif role == 'recruiter':
            company_name = request.form.get('company_name')
            designation = request.form.get('designation')

        cursor.execute('''INSERT INTO users 
            (role, email, password_hash, full_name, phone, created_at, status, current_status, resume_url, company_name, designation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
            (role, email, password_hash, full_name, phone, datetime.now(), "active", current_status, resume_url, company_name, designation)
        )
        db.commit()
        
        return jsonify({"message": f"Successfully registered as {role.capitalize()}!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')

        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()

        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({"error": "Invalid credentials."}), 401

        cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (datetime.now(), user['id']))
        db.commit()

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": str(user['id']),
                "role": user['role'],
                "full_name": user['full_name'],
                "email": user['email']
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/profile/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT id, role, email, full_name, phone, created_at, last_login, status, current_status, resume_url, company_name, designation FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        if not user: return jsonify({"error": "User not found"}), 404
        
        user_dict = dict(user)
        user_dict['id'] = str(user_dict['id'])
        return jsonify(user_dict), 200
    except Exception as e:
        return jsonify({"error": "Error fetching profile"}), 400

@app.route('/api/users', methods=['GET'])
def get_all_users():
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT id, role, email, full_name FROM users")
        users = []
        for row in cursor.fetchall():
            row_dict = dict(row)
            row_dict['id'] = str(row_dict['id'])
            row_dict['name'] = row_dict['full_name']
            users.append(row_dict)
        return jsonify({"users": users}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
#          MEETING REQUEST ROUTES
# ==========================================
@app.route('/api/request/send', methods=['POST'])
def send_request():
    data = request.json
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    
    if str(sender_id) == str(receiver_id):
        return jsonify({"error": "Cannot send request to self"}), 400
        
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute("SELECT id, status FROM meeting_requests WHERE sender_id = ? AND receiver_id = ? AND status IN ('pending', 'accepted')", (sender_id, receiver_id))
    existing = cursor.fetchone()
    if existing:
        return jsonify({"error": f"Request already exists (status: {existing['status']})"}), 409
        
    cursor.execute('''INSERT INTO meeting_requests (sender_id, receiver_id, status, created_at, updated_at) 
                      VALUES (?, ?, ?, ?, ?)''', (sender_id, receiver_id, 'pending', datetime.now(), datetime.now()))
    db.commit()
    
    # WebSocket Event
    if str(receiver_id) in active_users:
        emit('incoming_knock', {}, room=active_users[str(receiver_id)], namespace='/')
    
    return jsonify({"message": "Request sent successfully"}), 201

@app.route('/api/request/pending/<receiver_id>', methods=['GET'])
def get_pending_requests(receiver_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''SELECT mr.id, mr.sender_id, mr.created_at, u.full_name as sender_name, u.role as sender_role 
                      FROM meeting_requests mr 
                      JOIN users u ON mr.sender_id = u.id 
                      WHERE mr.receiver_id = ? AND mr.status = 'pending' ''', (receiver_id,))
    requests = []
    for row in cursor.fetchall():
        row_dict = dict(row)
        row_dict['id'] = str(row_dict['id'])
        row_dict['sender_id'] = str(row_dict['sender_id'])
        requests.append(row_dict)
    return jsonify(requests), 200

@app.route('/api/requests/<user_id>', methods=['GET'])
def get_all_user_requests(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''SELECT * FROM meeting_requests 
                      WHERE sender_id = ? OR receiver_id = ?''', (user_id, user_id))
    requests = []
    for row in cursor.fetchall():
        row_dict = dict(row)
        row_dict['id'] = str(row_dict['id'])
        row_dict['sender_id'] = str(row_dict['sender_id'])
        row_dict['receiver_id'] = str(row_dict['receiver_id'])
        requests.append(row_dict)
    return jsonify(requests), 200

@app.route('/api/request/accept/<request_id>', methods=['POST'])
def accept_request(request_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM meeting_requests WHERE id = ?", (request_id,))
    req = cursor.fetchone()
    if not req or req['status'] != 'pending':
        return jsonify({"error": "Invalid request or already processed"}), 400
        
    room_id = str(uuid.uuid4())
    cursor.execute("UPDATE meeting_requests SET status = 'accepted', room_id = ?, updated_at = ? WHERE id = ?", 
                   (room_id, datetime.now(), request_id))
    db.commit()
    
    # Auto-redirect WebSocket ping to sender
    if str(req['sender_id']) in active_users:
        emit('request_accepted', {"room_id": room_id}, room=active_users[str(req['sender_id'])], namespace='/')
        
    return jsonify({"status": "accepted", "room_id": room_id}), 200

@app.route('/api/request/reject/<request_id>', methods=['POST'])
def reject_request(request_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE meeting_requests SET status = 'rejected', updated_at = ? WHERE id = ?", 
                   (datetime.now(), request_id))
    db.commit()
    return jsonify({"status": "rejected"}), 200

@app.route('/api/request/undo', methods=['POST'])
def undo_request():
    data = request.json
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM meeting_requests WHERE sender_id = ? AND receiver_id = ? AND status = 'pending'", (sender_id, receiver_id))
    db.commit()
    
    # Notify target user to refresh
    if str(receiver_id) in active_users:
        emit('incoming_knock', {}, room=active_users[str(receiver_id)], namespace='/')
        
    return jsonify({"status": "undone"}), 200


# ==========================================
#          JOB BOARD ROUTES
# ==========================================
@app.route('/api/jobs/upload', methods=['POST'])
def upload_job():
    try:
        title = request.form.get('title')
        company = request.form.get('company')
        location = request.form.get('location')
        type_ = request.form.get('type')
        salary = request.form.get('salary')
        apply_link = request.form.get('apply_link')
        posted_at = datetime.now()
        
        poster_url = None
        if 'poster' in request.files:
            file = request.files['poster']
            filename = secure_filename(file.filename)
            unique_filename = f"job_{datetime.now().strftime('%Y%m%d%H%M%S')}_{filename}"
            file.save(os.path.join(POSTERS_DIR, unique_filename))
            poster_url = f"http://127.0.0.1:5000/api/files/posters/{unique_filename}"

        db = get_db()
        cursor = db.cursor()
        cursor.execute('''INSERT INTO jobs (title, company, location, type, salary, apply_link, poster_url, posted_at) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
                       (title, company, location, type_, salary, apply_link, poster_url, posted_at))
        db.commit()
        return jsonify({"message": "Job Posted!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM jobs ORDER BY posted_at DESC")
    jobs = []
    for row in cursor.fetchall():
        row_dict = dict(row)
        row_dict['id'] = str(row_dict['id'])
        jobs.append(row_dict)
    return jsonify(jobs), 200

# ==========================================
#          FILE SERVING ROUTES
# ==========================================
@app.route('/api/files/resumes/<filename>')
def serve_resume(filename):
    return send_from_directory(RESUME_DIR, filename)

@app.route('/api/files/posters/<filename>')
def serve_poster(filename):
    return send_from_directory(POSTERS_DIR, filename)

# ==========================================
#          SOCKET.IO
# ==========================================
active_users = {}

@socketio.on('connect')
def handle_connect():
    pass

@socketio.on('disconnect')
def handle_disconnect():
    for user_id, sid in list(active_users.items()):
        if sid == request.sid:
            del active_users[user_id]
            break

@socketio.on('register_user')
def handle_register(data):
    user_id = data.get('user_id')
    if user_id:
        active_users[str(user_id)] = request.sid

@socketio.on('call_request')
def handle_call(data):
    target_user_id = data.get('target_user')
    if str(target_user_id) in active_users:
        target_sid = active_users[str(target_user_id)]
        emit('incoming_call', {
            'caller_name': data.get('caller_name'),
            'room_id': data.get('room_id')
        }, room=target_sid)

if __name__ == '__main__':
    print("🚀 App running on http://127.0.0.1:5000 - Switched back to SQLite complete workflow logic!")
    socketio.run(app, debug=True, port=5000)