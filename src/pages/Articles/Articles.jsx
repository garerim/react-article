import React from 'react'
import { useEffect, useState } from 'react'
import { Link, Outlet, useSearchParams } from 'react-router'
import './Articles.css'
import { useAuth } from '../../components/providers/AuthProvider'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import { CirclePlus } from 'lucide-react'
import { useTheme } from '../../components/providers/ThemeProvider'

const backendUrl = import.meta.env.BACKEND_URL || 'http://localhost:5000';

export default function Articles() {

  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('query') || '';

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      updateSearchParams({ query: value });
    } else {
      const currentParams = Object.fromEntries([...searchParams]);
      const { query, ...updatedParams } = currentParams;
      setSearchParams(updatedParams);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    updateSearchParams({ category: value });
  };

  const updateSearchParams = (newParams) => {
    const currentParams = Object.fromEntries([...searchParams]);
    const updatedParams = { ...currentParams, ...newParams };
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    fetch(`${backendUrl}/articles`)
      .then(response => response.json())
      .then(data => setArticles(data))

    fetch(`${backendUrl}/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) &&
    (searchParams.get('category') ? article.category_id === parseInt(searchParams.get('category')) : true)
  );

  return (
    <div className={`articles-page ${theme}`}>
      <div className='articles-page-header'>
        <h1>Articles</h1>
        <div className='articles-page-header-actions'>
          <select onChange={handleCategoryChange}>
            <option value=''>Toutes les catégories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
          <input type="text" placeholder='Rechercher un article' value={search} onChange={handleSearch} />
        </div>
      </div>
      <div className='articles-page-content'>
        <div className='articles-sidebar'>
          <div className='articles-list'>
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} search={search} />
            ))}
          </div>
          {user && (
            <Link className='articles-sidebar-button' to='/articles/create'>
              <button>
                <CirclePlus />
                Créer un article
              </button>
            </Link>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  )
}
