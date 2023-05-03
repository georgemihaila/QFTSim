
import './index.css'
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { HUD } from './components'
import { InfoOverlay } from './components/InfoOverlay'
const root = document.getElementById('root')
if (root)
  createRoot(root).render(<App />)

const overlay = document.getElementById('overlay')
if (overlay)
  createRoot(overlay).render(<InfoOverlay />)
reportWebVitals()
