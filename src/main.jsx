import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Residence pages are prerendered from this exact React tree, so hydrate them
// in place rather than clearing the server-rendered markup and painting it again.
if (root.dataset.reactPrerender === 'true') {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
