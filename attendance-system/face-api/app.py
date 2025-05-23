from flask import Flask, request, jsonify
import face_recognition
import numpy as np
import os

app = Flask(__name__)

# In-memory face database (you can replace this with a persistent DB if needed)
DB = {}

# Save images to a folder (optional, useful for logs)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/register-face', methods=['POST'])
def register_face():
    file = request.files['image']
    name = request.form['name']

    # Save uploaded image for reference
    file_path = os.path.join(UPLOAD_FOLDER, f"{name}.jpg")
    file.save(file_path)

    image = face_recognition.load_image_file(file_path)
    encodings = face_recognition.face_encodings(image)

    if encodings:
        DB[name] = encodings[0].tolist()
        return jsonify({'status': 'success', 'message': f'{name} registered'})
    return jsonify({'status': 'fail', 'message': 'No face found'})

@app.route('/recognize-face', methods=['POST'])
def recognize_face():
    file = request.files['image']
    image = face_recognition.load_image_file(file)
    encodings = face_recognition.face_encodings(image)

    if not encodings:
        return jsonify({'status': 'fail', 'message': 'No face detected'})

    unknown_encoding = encodings[0]
    for name, known_encoding in DB.items():
        match = face_recognition.compare_faces([np.array(known_encoding)], unknown_encoding)
        if match[0]:
            return jsonify({'status': 'recognized', 'name': name})

    return jsonify({'status': 'unrecognized', 'message': 'Face not recognized'})

if __name__ == '__main__':
    app.run(port=5001)
