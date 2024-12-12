import "./GooseBot.scss"

import { useEffect, useRef, useState } from "react"

import axios from "axios"

const URL = import.meta.env.VITE_API_URL;

const GooseBot = () => {
    const [userMessage, setUserMessage] = useState("")
    const [messages, setMessages] = useState<{ text: string; from: "user" | "bot" }[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(event.target.value)
    }

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!userMessage.trim()) return

        const userMessageObj = { text: userMessage, from: "user" as const }
        setMessages(prev => [...prev, userMessageObj])

        setIsLoading(true)
        try {
            const res = await axios.post(`${URL}/chat`, {
                message: userMessage,
            })

            const botResponseObj = { text: res.data.message, from: "bot" as const }
            setMessages(prev => [...prev, botResponseObj])

            setUserMessage("")
        } catch (error) {
            console.error('Chat error:', error)
            const errorMessage = { text: "HONK! Something went wrong!", from: "bot" as const }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <div className="chat">
            <div className="chat__header">
                <h1 className="chat__title">Goose Bot</h1>
            </div>
            <div className="chat__messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat__message chat__message--${message.from}`}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="chat__input" onSubmit={sendMessage}>
                <input
                    className="chat__input-field"
                    type="text"
                    placeholder={isLoading ? "Goose is thinking..." : "Ask the Goose Bot!"}
                    value={userMessage}
                    onChange={handleMessageChange}
                    disabled={isLoading}
                />
                <button
                    className="chat__input-button"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "..." : "Send"}
                </button>
            </form>
        </div>
    )
}

export default GooseBot