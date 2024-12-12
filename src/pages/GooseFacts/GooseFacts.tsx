import "./GooseFacts.scss"

import { useEffect, useState } from 'react'

import axios from 'axios'

const URL = import.meta.env.VITE_API_URL;

function GooseFacts() {
    const [geese, setGeese] = useState([])
    const [randomFact, setRandomFact] = useState<any>(null)

    const displayRandomFact = () => {
        const randomIndex = Math.floor(Math.random() * geese.length)
        setRandomFact(geese[randomIndex])
    }

    const getData = async () => {
        try {
            const response = await axios.get(`${URL}/geese-trivia`)
            //console.log(response.data.geeseTrivia)
            setGeese(response.data.geeseTrivia)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="goose-facts">
            <h1>Geese Trivia</h1>

            <button onClick={displayRandomFact}>Show Random Fact</button>
            {randomFact && (
                <div>
                    <h2>{randomFact.question}</h2>
                    <p>{randomFact.answer}</p>
                </div>
            )}

        </div>
    )
}

export default GooseFacts
