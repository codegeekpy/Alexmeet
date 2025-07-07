import google.generativeai as genai
import os
import textwrap

# --- Configuration ---
# It's recommended to store your API key securely, e.g., in an environment variable.
# Replace 'YOUR_GEMINI_API_KEY' with your actual API key for testing purposes,
# but for production, use environment variables (e.g., os.getenv('GEMINI_API_KEY')).
# You can set it like: export GEMINI_API_KEY="your_api_key_here" in your terminal
# or create a .env file and use a library like `python-dotenv`.
try:
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    if not os.getenv('GEMINI_API_KEY'):
        print("Warning: GEMINI_API_KEY environment variable not set.")
        print("Please set it or replace os.getenv('GEMINI_API_KEY') with your key for testing.")
        # For demonstration, you might temporarily hardcode here if you understand the security implications:
        # genai.configure(api_key="YOUR_ACTUAL_API_KEY_HERE")
except ValueError as e:
    print(f"Error configuring Gemini API: {e}")
    print("Please ensure your GEMINI_API_KEY is correctly set.")
    exit()

# Choose a Gemini model. 'gemini-pro' is a good general-purpose model.
# For more advanced use cases (e.g., multimodal), you might choose others.
# Refer to the official documentation for available models: https://ai.google.dev/models/gemini
MODEL_NAME = 'gemini-pro'

def print_wrapped(text, width=80):
    """Helper function to print text wrapped to a specific width."""
    print(textwrap.fill(text, width=width))

def get_gemini_response(prompt):
    """
    Sends a prompt to the Gemini model and returns the generated content.
    Handles potential errors.
    """
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        # For a conversational AI, you'd typically use `start_chat()` and `send_message()`.
        # For single-turn questions, `generate_content()` is sufficient.
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"An error occurred: {e}")
        return "I apologize, but I couldn't process your request at this moment. Please try again."

def chat_assistant():
    """
    Main function to run the AI assistant in a console.
    """
    print("Welcome to the Gemini AI Assistant! Type 'quit' or 'exit' to end the chat.")

    while True:
        user_input = input("You: ").strip()

        if user_input.lower() in ['quit', 'exit']:
            print("Assistant: Goodbye!")
            break

        if not user_input:
            print("Assistant: Please enter something.")
            continue

        assistant_response = get_gemini_response(user_input)
        print("Assistant:")
        print_wrapped(assistant_response)

if __name__ == "__main__":
    chat_assistant()