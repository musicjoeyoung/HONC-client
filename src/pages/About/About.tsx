import './About.scss'

const About = () => {
    return (
        <div className="about">
            <h1>About HONC.ai</h1>

            <p>This application was built for the HONCathon, using the HONC stack: Hono, Drizzle, Neon, Cloudflare, and Fiberplane.</p>

            <div className="about__features">
                <div className="about__feature-card">
                    <h2>GooseImages 🎨</h2>
                    <p>An AI-powered image generation tool that creates unique goose-themed artwork. Users can input custom prompts to generate creative goose illustrations using Cloudflare's Workers AI image generation models.</p>
                </div>

                <div className="about__feature-card">
                    <h2>GooseFacts 📚</h2>
                    <p>A curated collection of fascinating facts about geese. Discover interesting information about different goose species, their behaviors, and characteristics. Updated regularly with verified facts from reliable sources.</p>
                </div>

                <div className="about__feature-card">
                    <h2>GooseBot 🤖</h2>
                    <p>An interactive chatbot with a goose personality. Engage in fun conversations, ask questions about geese, and receive playful responses. Built using modern natural language processing technology.</p>
                </div>
            </div>
        </div>
    )
}

export default About