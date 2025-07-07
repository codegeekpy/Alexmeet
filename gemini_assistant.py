import os
import textwrap
from groq import Groq

# --- Configuration ---
# It's recommended to store your API key securely, e.g., in an environment variable.
# For production, use environment variables (e.g., os.getenv('GROQ_API_KEY')).
# You can set it like: export GROQ_API_KEY="your_api_key_here" in your terminal
# or create a .env file and use a library like `python-dotenv`.
try:
    # The client uses the GROQ_API_KEY environment variable by default.
    client = Groq(api_key=os.getenv('GROQ_API_KEY'))
    if not os.getenv('GROQ_API_KEY'):
        print("Warning: GROQ_API_KEY environment variable not set.")
        print("Please set it for the script to work.")
        # For demonstration, you might temporarily hardcode here if you understand the security implications:
        # client = Groq(api_key="YOUR_ACTUAL_GROQ_API_KEY_HERE")
except Exception as e:
    print(f"Error configuring Groq API: {e}")
    print("Please ensure your GROQ_API_KEY is correctly set.")
    exit()

# Choose a Groq model. 'llama3-8b-8192' is a good general-purpose model.
# Refer to the official documentation for available models: https://console.groq.com/docs/models
MODEL_NAME = 'llama3-8b-8192'

def print_wrapped(text, width=80):
    """Helper function to print text wrapped to a specific width."""
    print(textwrap.fill(text, width=width))

def get_groq_response(prompt):
    """
    Sends a prompt to the Groq model and returns the generated content.
    Handles potential errors.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model=MODEL_NAME,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"An error occurred: {e}")
        return "I apologize, but I couldn't process your request at this moment. Please try again."

def chat_assistant():
    """
    Main function to run the AI assistant in a console.
    """
    print("Welcome to the Groq AI Assistant! Type 'quit' or 'exit' to end the chat.")

    while True:
        user_input = input("You: ").strip()

        if user_input.lower() in ['quit', 'exit']:
            print("Assistant: Goodbye!")
            break

        if not user_input:
            print("Assistant: Please enter something.")
            continue

        assistant_response = get_groq_response(user_input)
        print("Assistant:")
        print_wrapped(assistant_response)

if __name__ == "__main__":
    chat_assistant()
