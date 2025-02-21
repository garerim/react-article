import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './components/providers/AuthProvider.jsx'
import { ThemeProvider } from './components/providers/ThemeProvider.jsx'
import Header from './components/Header/Header.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
          <Header />
          <App />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
)
