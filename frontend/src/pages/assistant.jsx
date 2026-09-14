import { useState } from "react";
import Navbar from "../components/Navbar";

function Assistant() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // -----------------------------
    // VOICE INPUT
    // -----------------------------
    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Speech recognition is not supported in this browser. Please use Google Chrome."
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript =
                event.results[0][0].transcript;

            setInput(transcript);
        };

        recognition.onerror = () => {
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    // -----------------------------
    // SEND MESSAGE TO GEMINI
    // -----------------------------
    const handleSend = async () => {
        if (!input.trim() || isLoading) {
            return;
        }

        const userText = input.trim();

        const userMessage = {
            sender: "user",
            text: userText
        };

        // Show user's message immediately
        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8000/api/assistant",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: userText,

                        history: messages.map((msg) => ({
                            role:
                                msg.sender === "user"
                                    ? "user"
                                    : "model",

                            parts: [
                                {
                                    text: msg.text
                                }
                            ]
                        }))
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "AI request failed"
                );
            }

            const aiMessage = {
                sender: "ai",
                text: data.reply
            };

            setMessages((prev) => [
                ...prev,
                aiMessage
            ]);

        } catch (error) {
            console.error("AI error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text:
                        "Sorry, I couldn't connect to the AI assistant right now."
                }
            ]);

        } finally {
            setIsLoading(false);
        }
    };

    // -----------------------------
    // ENTER KEY
    // -----------------------------
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <>
            <Navbar />

            <main className="assistant-page">

                {/* HEADER */}
                <section className="assistant-header">

                    <div className="assistant-icon">
                        🤖
                    </div>

                    <div>
                        <h1>
                            AquaCore AI Assistant
                        </h1>

                        <p>
                            Your smart companion for fish
                            farming and aquaculture.
                        </p>
                    </div>

                </section>


                {/* CHAT CONTAINER */}
                <section className="chat-container">

                    {/* CHAT TOP BAR */}
                    <div className="chat-topbar">

                        <div className="ai-status">

                            <span className="status-dot"></span>

                            <div>
                                <strong>
                                    AquaCore AI
                                </strong>

                                <small>
                                    Online • Ready to help
                                </small>
                            </div>

                        </div>

                    </div>


                    {/* MESSAGES */}
                    <div className="messages">

                        {/* WELCOME SCREEN */}
                        {messages.length === 0 && (

                            <div className="welcome-message">

                                <div className="welcome-icon">
                                    🐟
                                </div>

                                <h2>
                                    Hello! How can I help?
                                </h2>

                                <p>
                                    Ask me about your fish,
                                    water quality, diseases
                                    or aquaculture practices.
                                </p>


                                {/* SUGGESTIONS */}
                                <div className="suggestions">

                                    <button
                                        onClick={() =>
                                            setInput(
                                                "How can I maintain good water quality?"
                                            )
                                        }
                                    >
                                        💧 Water quality
                                    </button>


                                    <button
                                        onClick={() =>
                                            setInput(
                                                "What are common fish diseases?"
                                            )
                                        }
                                    >
                                        🐟 Fish diseases
                                    </button>


                                    <button
                                        onClick={() =>
                                            setInput(
                                                "How can I improve fish health?"
                                            )
                                        }
                                    >
                                        ❤️ Fish health
                                    </button>

                                </div>

                            </div>

                        )}


                        {/* CHAT MESSAGES */}
                        {messages.map((message, index) => (

                            <div
                                key={index}
                                className={
                                    message.sender === "user"
                                        ? "message-row user-row"
                                        : "message-row ai-row"
                                }
                            >

                                {/* AI AVATAR */}
                                {message.sender === "ai" && (

                                    <div className="message-avatar">
                                        🤖
                                    </div>

                                )}


                                {/* MESSAGE */}
                                <div
                                    className={
                                        message.sender === "user"
                                            ? "message user-message"
                                            : "message ai-message"
                                    }
                                >
                                    {message.text}
                                </div>

                            </div>

                        ))}


                        {/* LOADING MESSAGE */}
                        {isLoading && (

                            <div className="message-row ai-row">

                                <div className="message-avatar">
                                    🤖
                                </div>

                                <div className="message ai-message">
                                    AquaCore AI is thinking...
                                </div>

                            </div>

                        )}

                    </div>


                    {/* INPUT AREA */}
                    <div className="input-area">

                        <div className="input-wrapper">

                            <input
                                type="text"
                                placeholder={
                                    isListening
                                        ? "Listening..."
                                        : "Ask AquaCore anything..."
                                }
                                value={input}
                                onChange={(e) =>
                                    setInput(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                            />


                            {/* MICROPHONE */}
                            <button
                                type="button"
                                onClick={startListening}
                                className={
                                    isListening
                                        ? "mic-button listening"
                                        : "mic-button"
                                }
                                title="Speak"
                                disabled={isLoading}
                            >
                                {isListening
                                    ? "🔴"
                                    : "🎤"}
                            </button>

                        </div>


                        {/* SEND BUTTON */}
                        <button
                            type="button"
                            onClick={handleSend}
                            className="send-button"
                            disabled={isLoading}
                        >
                            ➤
                        </button>

                    </div>


                    {/* NOTE */}
                    <p className="assistant-note">
                        AquaCore AI can provide guidance
                        about aquaculture and fish health.
                    </p>

                </section>

            </main>
        </>
    );
}

export default Assistant;