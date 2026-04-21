import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './providers/AuthProvider'
import UserProvider from './providers/UserProvider'
import ThemeProvider from './providers/ThemeProvider'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
)
