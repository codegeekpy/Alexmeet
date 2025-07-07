# AIxMeet: UX/UI Design & Functionality Brief

This document outlines the purpose, functionality, and design goals for each page of the AIxMeet application. It serves as a script to guide the UX and UI design process, ensuring a cohesive and user-centric experience.

---

## 1. Discovery Feed (Home Page: `/`)

*   **Purpose:** To provide a dynamic and personalized landing experience, immediately showcasing the event's value and encouraging exploration.
*   **Key Functionalities:**
    *   **Real-Time AI Assistant:** Users can ask natural language questions to get event suggestions (e.g., "What's a good talk on AI startups?").
    *   **Trending Talks Carousel:** Displays popular or highly-rated sessions in an interactive, visually appealing carousel.
    *   **Recommended People:** Shows a list of potential networking connections based on the user's profile and interests.
*   **Core Components:**
    *   AI Assistant Input Card
    *   Carousel for talks (Image, Title, Speaker, Tags)
    *   Grid of "Recommended for You" cards (Avatar, Name, Title, Match %, Reason, Profile Button)
*   **UX/UI Goals:**
    *   **Engage Immediately:** The page should be visually engaging and immediately useful, demonstrating the app's value upfront.
    *   **Promote Discovery:** Encourage users to explore different facets of the event through varied content modules.
    *   **Prioritize AI Interaction:** The AI assistant should be a prominent feature, inviting user input.
    *   **Visual Polish:** Use high-quality imagery and a clean layout to make content appealing and professional.

---

## 2. My Agenda (`/agenda`)

*   **Purpose:** To allow users to create and view a personalized event schedule tailored to their specific interests and goals.
*   **Key Functionalities:**
    *   **Preference Input:** Users input their interests (e.g., via tags) and event goals (free text).
    *   **AI-Powered Generation:** A single button triggers an AI flow that processes preferences, session data, and availability to generate a conflict-free schedule.
    *   **Schedule Display:** The recommended schedule is displayed in a clear, timeline-style format.
*   **Core Components:**
    *   Preferences form (Input fields, Textarea, Button).
    *   Timeline/list view for the generated schedule.
    *   Schedule item cards (Title, Time, Location, Reason for recommendation).
    *   Loading state/skeleton UI to provide feedback while the agenda is being generated.
*   **UX/UI Goals:**
    *   **Simplicity:** Make the process of generating an agenda feel effortless (one-click magic).
    *   **Build Trust:** Clearly display the reason for each recommendation to show the user the AI is working for them.
    *   **Clarity:** The timeline view should be easy to read and understand at a glance, helping users navigate their day.

---

## 3. AI Matchmaking (`/matchmaking`)

*   **Purpose:** To help attendees discover and connect with the most relevant people at the event based on deep compatibility.
*   **Key Functionalities:**
    *   **View Matches:** An AI-generated list of recommended attendees is displayed upon page load.
    *   **Match Details:** Each match card shows the person's info, a match percentage, and a concise explanation ("Why this match?").
    *   **Meeting Warm-Up:** Users can click a button to generate a pre-meeting briefing (summary, conversation starters, key questions) for a specific match.
*   **Core Components:**
    *   Grid of Match Cards (Avatar, Name, Title, Company, Match %, Progress Bar, Reason).
    *   Dialog/Modal for the "Meeting Warm-Up" feature.
    *   Loading states for both initial matches and the warm-up generation.
*   **UX/UI Goals:**
    *   **Actionable Insights:** Don't just show a list of people; provide context and tools (like the warm-up) to facilitate a real connection.
    *   **Explainability:** Build user trust by providing clear, concise explanations for each match.
    *   **Seamless Flow:** The transition from seeing a match to getting a meeting warm-up should be smooth and intuitive.

---

## 4. Post-Event Follow-Up (`/follow-up`)

*   **Purpose:** To simplify and automate the tedious process of post-event networking by generating personalized follow-up emails.
*   **Key Functionalities:**
    *   **View Connections:** Displays a list of people the user met or connected with.
    *   **Generate Drafts:** A button triggers an AI flow to write personalized email drafts for each connection, referencing shared interests or conversations.
    *   **Review & Use Emails:** The generated emails are displayed in an accordion, allowing the user to review, copy, and edit them before sending.
*   **Core Components:**
    *   List of connections (Avatar, Name, Company).
    *   "Generate Follow-ups" button.
    *   Accordion component to display email drafts (Recipient, Subject, Body).
*   **UX/UI Goals:**
    *   **Efficiency:** Streamline a typically manual task into a simple, two-step process (generate, review).
    *   **Control:** Make it clear that these are AI-generated *drafts* that the user can (and should) review and own.
    *   **Organization:** The accordion interface allows for easy review of multiple emails without cluttering the screen.

---

## 5. Organizer Dashboard (`/dashboard`)

*   **Purpose:** To provide event organizers with a high-level, real-time overview of event analytics and attendee engagement.
*   **Key Functionalities:**
    *   **Display Key Metrics:** Shows critical stats like Total Attendees, Engagement Rate, and Average Session Rating in prominent cards.
    *   **Visualize Data:** Presents complex data through charts (Session Ratings, Interest Distribution) and a heatmap for engagement hot-spots.
*   **Core Components:**
    *   Stat Cards for key numbers.
    *   Bar Chart component.
    *   Pie Chart component.
    *   Heatmap grid.
*   **UX/UI Goals:**
    *   **Information at a Glance:** Data should be easily digestible through clear, well-labeled visualizations.
    *   **Professional & Clean:** The dashboard should have a polished and data-centric design aesthetic.
    *   **Action-Oriented:** The layout should help organizers quickly identify trends and insights.

---

## 6. Your Profile (`/profile`)

*   **Purpose:** To allow users to manage their personal information, which is the fuel for the AI to personalize their entire event experience.
*   **Key Functionalities:**
    *   **Edit Profile:** Users can update their name, company, title, interests, and event goals.
*   **Core Components:**
    *   Avatar display and upload functionality.
    *   Profile Form with various input fields (Text, Checkboxes, Textarea).
    *   "Update Profile" button with a toast notification for clear feedback.
*   **UX/UI Goals:**
    *   **Communicate Value:** Make it clear *why* this information is being collected (e.g., "This helps us find your best matches").
    *   **Effortless Editing:** The form should be easy to use and provide clear validation messages on errors.
    *   **Reassurance:** Provide positive and clear feedback (e.g., a "Profile Updated!" toast) upon successful submission.
