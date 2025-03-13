import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import JudgeQuiz from './pages/JudgeQuiz'
import ChoiceQuiz from './pages/ChoiceQuiz'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/judge" element={<JudgeQuiz />} />
        <Route path="/choice" element={<ChoiceQuiz />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 