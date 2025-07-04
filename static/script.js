// Global variables
let currentSentence = "";
let sentences = [];
let currentIndex = 0;
let startTime = null;
let isTyping = false;
let totalCharacters = 0;
let correctCharacters = 0;
let timerInterval;

// DOM elements
const typingInput = document.getElementById("typing-input");
const currentSentenceEl = document.getElementById("current-sentence");
const prevSentenceEl = document.getElementById("prev-sentence");
const nextSentenceEl = document.getElementById("next-sentence");
const wpmValueEl = document.getElementById("wpm-value");
const accuracyValueEl = document.getElementById("accuracy-value");
const timeValueEl = document.getElementById("time-value");
const progressFillEl = document.getElementById("progress-fill");
const newSentenceBtn = document.getElementById("new-sentence-btn");
const retryBtn = document.getElementById("retry-btn");
const completionModal = document.getElementById("completion-modal");
const continueBtn = document.getElementById("continue-btn");

// Initialize the app
window.addEventListener('load', async function() {
    await loadSentences();
    setupEventListeners();
    await updateSentenceDisplay();
    typingInput.focus();
});

// Load sentences from API
async function loadSentences() {
    try {
        const response = await fetch("/api/sentences");
        const data = await response.json();
        sentences = data.sentences;
        currentIndex = 0;
    } catch (error) {
        console.error("Error loading sentences:", error);
        // Fallback sentences if API fails
        sentences = [
            "The quick brown fox jumps over the lazy dog.",
            "Coding is the art of turning coffee into software.",
            "Practice makes perfect in the world of programming."
        ];
    }
}

// Setup event listeners
function setupEventListeners() {
    typingInput.addEventListener("input", handleTyping);
    newSentenceBtn.addEventListener("click", getNewSentence);
    retryBtn.addEventListener("click", retryCurrentSentence);
    continueBtn.addEventListener("click", continueToNext);
    

    document.addEventListener("click", function(e) {
        if (e.target.id === "completion-modal") {
            // This should close the modal but won't work correctly
            completionModal.style.display = "none";
        }
    });
}

// Update the sentence display with rolling effect
async function updateSentenceDisplay() {
    if (sentences.length === 0) return;
    
    currentSentence = sentences[currentIndex];
    
    // Update sentence display
    currentSentenceEl.querySelector('.sentence-text').textContent = currentSentence;
    
    // Update previous sentence
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : sentences.length - 1;
    prevSentenceEl.querySelector('.sentence-text').textContent = sentences[prevIndex];
    
    // Update next sentence
    const nextIndex = currentIndex < sentences.length - 1 ? currentIndex + 1 : 0;
    nextSentenceEl.querySelector('.sentence-text').textContent = sentences[nextIndex];
    
    // Reset typing state
    resetTypingState();
}

// Handle typing input
function handleTyping(event) {
    const typed = event.target.value;
    
    if (!isTyping && typed.length > 0) {
        startTyping();
    }
    
    if (typed.length === 0) {
        resetTypingState();
        return;
    }
    
    // Update progress
    updateProgress(typed);
    
    // Check for completion
    if (typed === currentSentence) {
        completeTyping();
    }
    
    // Update real-time stats
    updateRealTimeStats(typed);
}

// Start typing session
function startTyping() {
    isTyping = true;
    startTime = new Date();
    totalCharacters = currentSentence.length;
    correctCharacters = 0;
    
    // Start timer
    timerInterval = setInterval(updateTimer, 100);
    
    // Add visual feedback
    typingInput.classList.add('typing-active');
}

// Update progress bar
function updateProgress(typed) {
    const progress = (typed.length / currentSentence.length) * 100;
    progressFillEl.style.width = progress + '%';
}

// Update real-time stats
function updateRealTimeStats(typed) {
    if (!startTime) return;
    
    const currentTime = new Date();
    const timeElapsed = (currentTime - startTime) / 1000;
    
    // Calculate WPM
    const wordsTyped = typed.split(' ').length;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    wpmValueEl.textContent = wpm || 0;
    
    // Calculate accuracy
    correctCharacters = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === currentSentence[i]) {
            correctCharacters++;
        }
    }
    
    const accuracy = Math.round((correctCharacters / typed.length) * 100);
    accuracyValueEl.textContent = accuracy || 100;
}

// Update timer display
function updateTimer() {
    if (!startTime) return;
    
    const currentTime = new Date();
    const timeElapsed = (currentTime - startTime) / 1000;
    timeValueEl.textContent = Math.round(timeElapsed);
}

// Complete typing session
function completeTyping() {
    isTyping = false;
    clearInterval(timerInterval);
    
    const endTime = new Date();
    const timeElapsed = (endTime - startTime) / 1000;
    const words = currentSentence.split(' ').length;
    const wpm = Math.round((words / timeElapsed) * 60);
    const accuracy = Math.round((correctCharacters / totalCharacters) * 100);
    
    // Log the session
    logSession(wpm, accuracy, timeElapsed);
    
    // Show completion modal
    showCompletionModal(wpm, accuracy, timeElapsed);
    
    // Show retry button
    retryBtn.style.display = "inline-block";
    
    // Remove typing active class
    typingInput.classList.remove('typing-active');
}

// Show completion modal
function showCompletionModal(wpm, accuracy, timeElapsed) {
    document.getElementById('final-wpm').textContent = wpm;
    document.getElementById('final-accuracy').textContent = accuracy + '%';
    document.getElementById('final-time').textContent = Math.round(timeElapsed) + 's';
    
    completionModal.style.display = "block";
    
    // Add completion animation
    setTimeout(() => {
        completionModal.classList.add('show');
    }, 100);
}

// Log typing session
async function logSession(wpm, accuracy, timeElapsed) {
    try {
        const response = await fetch("/api/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                wpm: wpm,
                accuracy: accuracy,
                sentence: currentSentence,
                time_taken: timeElapsed
            })
        });
        
        if (response.ok) {
            console.log("Session logged successfully");
        }
    } catch (error) {
        console.error("Error logging session:", error);
    }
}

// Get new sentence
async function getNewSentence() {
    await loadSentences();
    currentIndex = 0;
    await updateSentenceDisplay();
    typingInput.focus();
}

// Retry current sentence
function retryCurrentSentence() {
    resetTypingState();
    typingInput.focus();
    retryBtn.style.display = "none";
}

// Continue to next sentence
function continueToNext() {
    completionModal.style.display = "none";
    completionModal.classList.remove('show');
    
    // Move to next sentence
    currentIndex = (currentIndex + 1) % sentences.length;
    updateSentenceDisplay();
    
    retryBtn.style.display = "none";
    typingInput.focus();
}

// Reset typing state
function resetTypingState() {
    isTyping = false;
    startTime = null;
    correctCharacters = 0;
    totalCharacters = 0;
    
    // Clear timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Reset input
    typingInput.value = "";
    typingInput.classList.remove('typing-active');
    
    // Reset progress
    progressFillEl.style.width = "0%";
    
    // Reset stats
    wpmValueEl.textContent = "0";
    accuracyValueEl.textContent = "100";
    timeValueEl.textContent = "0";
}

// Add character highlighting functionality
function highlightCharacters(typed) {
    const sentenceText = currentSentenceEl.querySelector('.sentence-text');
    let highlightedText = "";
    
    for (let i = 0; i < currentSentence.length; i++) {
        const char = currentSentence[i];
        
        if (i < typed.length) {
            if (typed[i] === char) {
                highlightedText += `<span class="correct">${char}</span>`;
            } else {
                highlightedText += `<span class="incorrect">${char}</span>`;
            }
        } else {
            highlightedText += char;
        }
    }
    
    sentenceText.innerHTML = highlightedText;
}

// Animate the slot machine effect
function animateSlotMachine() {
    const wheel = document.getElementById('sentence-wheel');
    
    
    wheel.style.transformY = 'translateY(-60px)';
    
    setTimeout(() => {
        wheel.style.transformY = 'translateY(0px)';
    }, 500);
}

// Add some visual enhancements
function addTypingEffects() {
    // Add particle effects or other visual enhancements
    // This is a placeholder for future enhancements
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter for new sentence
    if (e.ctrlKey && e.key === 'Enter') {
        getNewSentence();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        completionModal.style.display = "none";
    }
});

// Add focus management
document.addEventListener('click', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
        typingInput.focus();
    }
});