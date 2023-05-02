
import './index.css';
import { createRoot } from 'react-dom/client'
import reportWebVitals from './reportWebVitals';
import App from './App';
const root = document.getElementById('root')
if (root)
  createRoot(root).render(<App />
  )
reportWebVitals();
