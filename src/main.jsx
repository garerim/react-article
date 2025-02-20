import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './components/providers/AuthProvider.jsx'
import Header from './components/Header/Header.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <BrowserRouter>
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
          <Header />
          <App />
        </div>
      </BrowserRouter>
  </AuthProvider>
)
