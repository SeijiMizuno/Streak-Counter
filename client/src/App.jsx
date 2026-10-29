import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './components/Home'
import Activity from './components/Activity'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
