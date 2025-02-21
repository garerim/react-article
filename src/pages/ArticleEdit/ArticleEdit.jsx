import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import { useAuth } from '../../components/providers/AuthProvider'
import './ArticleEdit.css'


const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ArticleEdit() {

    const navigate = useNavigate();
    const { user } = useAuth();
    const authToken = localStorage.getItem('authToken');

    const { id } = useParams();

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

        fetch(`${backendUrl}/articles/${id}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setCategoryId(data.category_id);
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${backendUrl}/articles/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content, category_id: categoryId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => {
            if (response.ok) {
                navigate(`/articles?query=${title}`);
                window.location.reload();
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
    <div className="edit-article-page">
        <div className="edit-article-header">
            <Link to={`/articles/${id}`}>
                <button className="edit-article-button">
                    Retour
                </button>
            </Link>
            <h2>Modifier un article</h2>
        </div>
        <form className="edit-article-form" onSubmit={handleSubmit}>
            <input className="edit-article-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Titre' />
            <textarea className="edit-article-textarea" type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Contenu' />
            <select className="edit-article-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Sélectionnez une catégorie</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                ))}
            </select>
            <button className="edit-article-button" type="submit">Modifier</button>
        </form>
    </div>
  )
}
