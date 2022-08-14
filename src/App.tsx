import { Route, Routes } from 'react-router-dom'
import './App.css'
import TopBar from './components/TopBar'
import useNavigation from './hooks/useNavigation'
import Home from './pages/Home'
import Settings from './pages/Settings'
import SupportedGames from './pages/SupportedGames'

function App() {
  // * Hooks
  useNavigation()

  return (
    <div className="flex h-screen w-screen flex-col bg-primary-dark">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/supported-games" element={<SupportedGames />} />
      </Routes>
    </div>
  )
}

export default App
