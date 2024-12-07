import "./App.scss"

import GooseBot from "./components/GooseBot/GooseBot"
import GooseFacts from "./components/GooseFacts/GooseFacts"
import GooseImages from "./components/GooseImages/GooseImages"

const App = () => {
  return (
    <>
      <GooseFacts />
      <GooseBot />
      <GooseImages />
    </>
  )
}
export default App