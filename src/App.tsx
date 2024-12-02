import "./App.scss"

import GooseBot from "./components/GooseBot/GooseBot"
import GooseFacts from "./components/GooseFacts/GooseFacts"

const App = () => {
  return (
    <>
      <GooseFacts />
      <GooseBot />
    </>
  )
}
export default App