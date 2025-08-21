import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Profile from './components/Profile';
import UserModal from './components/UserModal';
import Unauthorized from './components/Unauthorized';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
export { UserModal, Profile, Unauthorized };