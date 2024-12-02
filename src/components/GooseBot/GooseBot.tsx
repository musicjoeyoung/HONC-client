import "./GooseBot.scss"

import { useEffect, useRef, useState } from "react"

import axios from "axios"

const GooseBot = () => {
    const [userMessage, setUserMessage] = useState<string>("")
    const [messages, setMessages] = useState<{ text: string; from: "user" | "bot" }[]>([])

    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(event.target.value)
    }

    const getData = async (e: React.FormEvent) => {
        e.preventDefault()

        const userMessageObj: { text: string; from: "user" | "bot" } = { text: userMessage, from: "user" }
        setMessages((prevMessages) => [...prevMessages, userMessageObj])

        try {
            const res = await axios.post("http://localhost:8787/api/chat", {
                message: userMessage,
            })

            const botResponseObj: { text: string; from: "user" | "bot" } = { text: res.data.message, from: "bot" }
            setMessages((prevMessages) => [...prevMessages, botResponseObj])

            setUserMessage("")
        } catch (error) {
            console.log(error)
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
            <form className="chat__input" onSubmit={getData}>
                <input
                    className="chat__input-field"
                    type="text"
                    placeholder="Ask the Goose Bot something"
                    value={userMessage}
                    onChange={handleMessageChange}
                />
                <button className="chat__input-button" type="submit">Send</button>
            </form>
        </div>
    )
}

export default GooseBot
