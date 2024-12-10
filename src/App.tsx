import "./App.scss"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import GooseBot from "./pages/GooseBot/GooseBot"
import GooseFacts from "./pages/GooseFacts/GooseFacts"
import GooseImages from "./pages/GooseImages/GooseImages"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goose-bot" element={<GooseBot />} />
        <Route path="/goose-facts" element={<GooseFacts />} />
        <Route path="/goose-images" element={<GooseImages />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App