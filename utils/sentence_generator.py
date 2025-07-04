import random

def get_random_sentence():
    words = [
        "coding", "fluid", "interaction", "react", "flask",
        "python", "debug", "speed", "AI", "prompt",
        "accuracy", "error", "loop", "logic", "stack"
    ]
    sentence = " ".join(random.choices(words, k=random.randint(5, 9)))
    return sentence.capitalize() + "."