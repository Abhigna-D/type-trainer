from flask import Flask, render_template, jsonify, request
import random
import json
import os
from datetime import datetime

app = Flask(__name__)

# Word pools for random sentence generation
WORD_POOLS = {
    'subjects': ['The cat', 'A programmer', 'The student', 'My friend', 'The teacher', 'A developer', 'The artist', 'A musician', 'The chef', 'A writer'],
    'verbs': ['quickly types', 'carefully writes', 'slowly reads', 'efficiently codes', 'gracefully dances', 'skillfully plays', 'perfectly executes', 'rapidly completes', 'smoothly operates', 'expertly handles'],
    'objects': ['complex algorithms', 'beautiful melodies', 'intricate patterns', 'challenging problems', 'creative solutions', 'elegant designs', 'innovative concepts', 'technical documentation', 'artistic masterpieces', 'musical compositions'],
    'endings': ['with great precision.', 'under tight deadlines.', 'while learning new skills.', 'to achieve excellence.', 'with remarkable accuracy.', 'in record time.', 'with unwavering focus.', 'despite the challenges.', 'with creative flair.', 'using modern techniques.']
}

# Load sentences from file
def load_sentences():
    sentences_file = os.path.join('data', 'sentences.txt')
    if os.path.exists(sentences_file):
        with open(sentences_file, "r") as file:
            return [line.strip() for line in file if line.strip()]
    return []

# Generate random sentence
def generate_random_sentence():
    return f"{random.choice(WORD_POOLS['subjects'])} {random.choice(WORD_POOLS['verbs'])} {random.choice(WORD_POOLS['objects'])} {random.choice(WORD_POOLS['endings'])}"

# Get sentence pool
def get_sentence_pool():
    file_sentences = load_sentences()
    random_sentences = [generate_random_sentence() for _ in range(10)]
    return file_sentences + random_sentences

sentences = get_sentence_pool()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/sentence")
def get_sentence():
    """Get a random sentence for typing practice"""
    return jsonify({"sentence": random.choice(sentences)})

@app.route("/api/sentences")
def get_sentences():
    """Get multiple sentences for the rolling effect"""
   
    selected = random.sample(sentences, min(2, len(sentences)))
    return jsonify({"sentences": selected})

@app.route("/api/log", methods=["POST"])
def log_session():
    try:
        data = request.get_json()
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "wpm": data.get("wpm", 0),
            "accuracy": data.get("accuracy", 0),
            "sentence": data.get("sentence", ""),
            "time_taken": data.get("time_taken", 0)
        }
        
        log_file = "log.json"
        
        if os.path.exists(log_file):
            with open(log_file, "r") as f:
                logs = json.load(f)
        else:
            logs = []
        
        logs.append(log_entry)
        
        with open(log_file, "w") as f:
            json.dump(logs, f, indent=2)
        
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True)