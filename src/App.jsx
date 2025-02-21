import './App.css'
import { Routes, Route } from 'react-router'
import Home from './pages/Home/Home.jsx'
import Articles from './pages/Articles/Articles.jsx'
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login.jsx'
import Profile from './pages/Profile/Profile.jsx'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails.jsx'
import CreateArticle from './pages/CreateArticle/CreateArticle.jsx'
import ArticleEdit from './pages/ArticleEdit/ArticleEdit.jsx'
import React, { useEffect } from 'react'
import { useTheme } from './components/providers/ThemeProvider'

function App() {
    const { theme } = useTheme()

    useEffect(() => {
        const rootElement = document.documentElement
        rootElement.classList.remove('light', 'dark')
        rootElement.classList.add(theme)
    }, [theme])

    return (
        <div style={{ width: '100%', flex: 1, overflowY: 'hidden' }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} >
                    <Route path="/articles/:id" element={<ArticleDetails />} />
                    <Route path="/articles/:id/edit" element={<ArticleEdit />} />
                </Route>
                <Route path="/articles/create" element={<CreateArticle />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    )
}

export default App
