import React, { useState, useEffect } from 'react'
import './ArticleCard.css'
import { NavLink } from 'react-router';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ArticleCard({ article, search }) {

    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await fetch(`${backendUrl}/categories/${article.category_id}`);
            const data = await response.json();
            setCategory(data);
        }

        fetchCategory();
    }, [article.category_id]);

    return (
        <NavLink className='article-card' to={`/articles/${article.id}?query=${search}`}>
            {article.title}
            <span>par {article.firstname} {article.lastname}</span>
            <div className='badge-categorie' style={{ backgroundColor: category ? category.color : '#000' }}>
                {article.category_title}
            </div>
        </NavLink>
    )
}


