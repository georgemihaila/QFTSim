
import './index.css'
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { HUD } from './components'
import { InfoOverlay } from './components/InfoOverlay'
import GUI from 'lil-gui'

const root = document.getElementById('root')
if (root)
  createRoot(root).render(<App />)
reportWebVitals()
