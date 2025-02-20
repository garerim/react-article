import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../components/providers/AuthProvider'
import './CreateArticle.css'


const backendUrl = import.meta.env.BACKEND_URL || 'http://localhost:5000';

export default function CreateArticle() {

    const navigate = useNavigate();
    const { user } = useAuth();
    const authToken = localStorage.getItem('authToken');

    if (!user) {
        navigate('/articles');
    }

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`${backendUrl}/categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${backendUrl}/articles`, {
            method: 'POST',
            body: JSON.stringify({ title, content, category_id: categoryId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (response.ok) {
                navigate(`/articles?query=${title}`);
                setTitle('');
                setContent('');
                setCategoryId('');
            } else {
                console.error('Error:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

  return (
    <div className="create-article-page">
        <h1>Créer un article</h1>
        <form className="create-article-form" onSubmit={handleSubmit}>
            <input className="create-article-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Titre' />
            <textarea className="create-article-textarea" type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Contenu' />
            <select className="create-article-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Sélectionnez une catégorie</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                ))}
            </select>
            <button className="create-article-button" type="submit">Créer</button>
        </form>
    </div>
  )
}
