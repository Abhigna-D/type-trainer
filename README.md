# Project: Vibe Typing Speed Trainer 2025

## Overview

This project is a **modern, interactive web-based Typing Speed Trainer** using **Python (Flask)** and **JavaScript** with a futuristic slot machine-style interface. Students will interact with AI/LLM to complete and enhance this project by adding functionality, reviewing generated code, and debugging.

---

## Features

- **Slot Machine Style Interface**: Rolling sentence display with neon aesthetics
- **Real-time Statistics**: WPM, Accuracy, and Time tracking
- **Dynamic Sentence Generation**: Both file-based and algorithmically generated sentences
- **Session Logging**: JSON-based session tracking
- **Modern UI**: Glassmorphism design with particle effects
- **Responsive Design**: Works on desktop and mobile

---

## How to Run

1. Clone this repository
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the application:

```bash
python app.py
```

4. Visit `http://127.0.0.1:5000/` in your browser

---

## File Structure

```
typing-trainer/
│   app.py
│   README.md
│   requirements.txt
│   log.json (created after first session)
│
├───utils/
│       sentences.txt
│       sentence_generator.py
│
├───static/
│       script.js
│       style.css
│
└───templates/
        index.html
```

---

## Student Tasks & Bug Hunt

### **Initial Main Prompt (Use this to start your chat with the LLM)**

```
I am working on a Vibe Typing Speed Trainer project using Python Flask and JavaScript. This is a modern web app with a slot machine-style interface. The app has several bugs that I need to identify and fix. I will provide you with all the files. Please review the code thoroughly and help me:

1. Identify and fix any bugs you find
2. Add missing functionality for the tasks listed
3. Ensure the app behaves correctly as a typing trainer
4. Make the code production-ready

Please ask me specific questions about any bugs or issues you discover, and guide me through the debugging process step by step. Don't just provide solutions - help me understand what's wrong and why.
```

### **Task 1: Real-Time Character Highlighting**

**Student Prompt for LLM:**

```
I want to add real-time character highlighting to show correct (green) and incorrect (red) characters as the user types. I tried implementing it but the highlighting doesn't seem to work properly. Can you help me debug this feature and implement it correctly? The highlighting should update the sentence display in real-time.
```

### **Task 2: Fix Rolling Sentence System**

**Student Prompt for LLM:**

```
The slot machine rolling effect for sentences isn't working correctly. I'm only getting 2 sentences instead of 3, and the visual rolling animation seems broken. Can you help me debug the sentence loading system and fix the rolling animation? The app should show previous, current, and next sentences with a smooth rolling effect.
```

### **Task 3: Session Logging & Retry Functionality**

**Student Prompt for LLM:**

```
I need to implement proper session logging and a retry system. The retry button should work correctly, and all typing sessions should be logged to a JSON file. Can you help me debug the current logging system and add the retry functionality? Sometimes the modal doesn't close properly either.
```

### **Task 4: Fix Modal and Event Handling**

**Student Prompt for LLM:**

```
The completion modal has some issues - it doesn't close when clicking outside, and some event handlers seem broken. Can you help me debug the modal system and fix the event handling? The modal should close properly and the continue button should work smoothly.
```

---

## Learning Objectives

By completing this project, students will:

- Master Flask-JavaScript communication
- Understand real-time DOM manipulation
- Learn debugging techniques with AI assistance
- Practice modern web development patterns
- Gain experience with responsive design
- Understand JSON-based data logging

---

## Deliverables

1. **Bug-free, fully functional typing trainer**
2. **All 4 tasks completed and working**
3. **Clean, commented code**
4. **Understanding of Flask + JavaScript integration**
5. **Documented debugging process**

---

## Advanced Features (Optional)

- Add keyboard shortcuts (Ctrl+Enter for new sentence)
- Implement difficulty levels
- Add sound effects and animations
- Create user profiles and statistics
- Add multiplayer functionality
- Implement themes and customization

---

## Ready to Code?

Start by running the app and testing its current functionality. Then use the main prompt with your preferred LLM to begin the debugging adventure!

**Remember**: The goal is not just to fix bugs, but to understand why they exist and how to prevent them in the future. Happy coding!
