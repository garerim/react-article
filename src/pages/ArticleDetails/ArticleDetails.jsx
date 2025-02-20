import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useAuth } from '../../components/providers/AuthProvider'
import './ArticleDetails.css'
import { Pencil, Trash2 } from 'lucide-react'

const backendUrl = import.meta.env.BACKEND_URL || 'http://localhost:5000';

export default function ArticleDetails() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const authToken = localStorage.getItem('authToken');

  const [article, setArticle] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${backendUrl}/articles/${id}`)
      .then(response => response.json())
      .then(data => setArticle(data))
  }, [id]);

  if (!article) {
    return <div>Loading...</div>
  }

  const handleDelete = () => {
    fetch(`${backendUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(() => {
        navigate('/articles');
        window.location.reload();
      })
      .catch(error => console.error('Error deleting article:', error));
  }

  return (
    <div className='article-details-container'>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <p>Créé le: {new Date(article.created_at).toLocaleString()}</p>
      <p>Catégorie: {article.category_title}</p>
      {(user && user.id === article.user_id) && (
        <div className='article-details-actions'>
          <Link to={`/articles/${id}/edit`}>
            <button className='edit-button'>
              <Pencil width={16} height={16} />
              Modifier
            </button>
          </Link>
          <button className='delete-button' onClick={() => handleDelete()}>
            <Trash2 width={16} height={16} />
            Supprimer
            </button>
        </div>
      )}
    </div>
  )
}
