import "./App.scss"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import About from "./pages/About/About"
import Footer from "./components/Footer/Footer"
import GooseBot from "./pages/GooseBot/GooseBot"
import GooseFacts from "./pages/GooseFacts/GooseFacts"
import GooseImages from "./pages/GooseImages/GooseImages"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar"

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="content">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/goose-bot" element={<GooseBot />} />
              <Route path="/goose-facts" element={<GooseFacts />} />
              <Route path="/goose-images" element={<GooseImages />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
export default App