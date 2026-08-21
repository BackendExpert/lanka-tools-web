import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { RoleProvider } from './context/RoleContext.jsx'
import AppRouter from './router/index.jsx'
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RoleProvider>
          <AppRouter />
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)