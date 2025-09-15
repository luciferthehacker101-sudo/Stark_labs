# VETAN - Internship Recommendation Engine

**VETAN (विकसित एकाग्र तकनीक अवसर नवयुवा)** is a simple, lightweight recommendation engine designed to help candidates in the PM Internship Scheme find internships that perfectly match their skills, interests, and location preferences.

## The Problem

The PM Internship Scheme portal lists hundreds of opportunities, which can be overwhelming for many applicants, especially first-generation learners from rural areas with limited digital exposure. This often leads to misaligned applications and missed opportunities.

## The Solution

VETAN simplifies this process by providing **3-5 highly personalized internship suggestions** instead of a long, confusing list. It acts as a friendly digital career counselor, helping candidates make informed choices with confidence.

## ✨ Features

-   **🤖 Smart Recommendations:** Uses an advanced matching system to connect user profiles with the best internship opportunities.
-   **🗣️ Multi-Language Support:** The interface is available in English, Hindi, Tamil, Telugu, and Marathi to ensure accessibility for a diverse, pan-India user base.
-   **📝 Simple & Intuitive Form:** Captures basic but essential candidate inputs: education, skills, interests, and location.
-   **📱 Fully Responsive:** Works seamlessly on mobile phones, tablets, and desktops, catering to users with varying devices.
-   **⚡ Lightweight & Fast:** Built with modern web technologies without a complex setup, ensuring it runs well even on low-spec devices and slower internet connections.

## 🛠️ Tech Stack

-   **Frontend:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Recommendation Engine:** [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/) via the `@google/genai` SDK
-   **Deployment:** Runs directly in the browser using ES Modules and an `importmap`. No build step required!

## 🚀 How It Works

1.  **Language Selection:** The user first selects their preferred language for the interface.
2.  **Profile Submission:** The user fills out a simple form detailing their qualifications and preferences.
3.  **Profile Analysis:** The user's profile, along with a curated list of 200+ internships, is processed to find the best matches.
4.  **Intelligent Matching:** The system acts as an expert career counselor for Indian youth. It analyzes the user's profile against skill requirements, sector interests, location, and the accessibility of the role for first-time interns.
5.  **Displaying Results:** The system returns the IDs of the top 3-5 recommendations, which are then displayed to the user as clean, easy-to-understand cards.

## 📂 Project Structure

```
.
├── components/         # Reusable React components (Form, Cards, etc.)
├── context/            # React context for state management (Localization)
├── data/               # Static data, like the list of internships
├── services/           # Logic for interacting with the backend service
├── App.tsx             # Main application component
├── index.tsx           # Entry point for the React application
└── index.html          # The main HTML file with importmaps
```

## 🏃‍♀️ Getting Started

This project is designed to run directly in the browser with no build process.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/vetan-internship-advisor.git
    cd vetan-internship-advisor
    ```

2.  **API Key Configuration:**
    This application is designed to use an API key provided through the `process.env.API_KEY` environment variable. Ensure this is configured in your deployment environment.

3.  **Run a local server:**
    Serve the project's root directory using a simple local web server. For example, using Python:
    ```bash
    python -m http.server
    ```
    Or using Node.js with the `serve` package:
    ```bash
    npx serve .
    ```

4.  Open your browser and navigate to the local server's address (e.g., `http://localhost:8000`).

## Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
