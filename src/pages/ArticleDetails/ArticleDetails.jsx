import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { useAuth } from '../../components/providers/AuthProvider'
import './ArticleDetails.css'
import { Pencil, Trash2 } from 'lucide-react'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
      <br />
      <p>{article.content} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium deserunt commodi nam eaque illo? Fugiat consequuntur reiciendis deleniti, sint inventore beatae nesciunt harum neque asperiores nihil cumque atque nulla nostrum dignissimos ex ullam enim? Praesentium quod velit unde ducimus ex obcaecati quisquam aliquam? Nemo eum suscipit aspernatur excepturi impedit quidem fugiat exercitationem facilis explicabo reiciendis facere aliquid, repudiandae aperiam id obcaecati accusamus corrupti tenetur, qui amet dolorum porro nobis. Dolore, eaque alias, placeat itaque ut maiores distinctio praesentium corrupti accusamus facilis eius nobis iste. Asperiores neque corrupti ut, eaque natus voluptatibus nulla temporibus atque maxime aspernatur nam reiciendis tempore omnis voluptatem maiores obcaecati provident nemo? Ullam libero aliquam quo, voluptatum laboriosam minus, ad iste velit, pariatur eos exercitationem. Saepe necessitatibus quia esse accusamus facere provident repudiandae perspiciatis ratione iste, velit hic sapiente laborum? Beatae ad voluptatibus vel id vitae ex quos dolore, illum fuga, rem consequatur enim sunt ratione, nulla praesentium. Officia, quaerat in molestiae minima ipsam maiores vero. Exercitationem, tempora aperiam consectetur possimus voluptatem eligendi provident pariatur, deleniti dolor asperiores modi perferendis assumenda ullam neque aliquid quisquam! Inventore enim exercitationem vel dolore eligendi nobis sequi blanditiis, ipsa incidunt quos ab alias odio consectetur nulla deleniti voluptate, debitis adipisci rerum aperiam ipsum! Consectetur non ad tenetur aspernatur laboriosam consequatur praesentium perferendis deleniti impedit facere beatae animi voluptatem delectus, molestiae nesciunt sapiente libero magnam voluptas, autem iusto quaerat vitae totam et! Blanditiis quia, inventore reiciendis libero laudantium fugiat mollitia sit quae quis debitis deserunt qui, neque explicabo obcaecati? Commodi illo placeat iusto ipsam voluptate omnis beatae consequuntur perspiciatis debitis non accusantium, corporis, est cum error recusandae ut officia numquam veniam soluta magni nisi quia excepturi! Enim assumenda eligendi harum cupiditate dolore voluptatum velit numquam. Modi consequuntur nisi sed. Quo aspernatur blanditiis maxime nesciunt hic inventore doloribus excepturi molestias id dolorum ut, quasi, officia veritatis, magni omnis dignissimos ullam! Voluptatum eveniet nihil deleniti repellat obcaecati officiis fuga numquam nam, totam reprehenderit enim ad ex facilis eligendi error maxime ullam sunt quae! Fuga, earum officia eaque fugit dolores modi, pariatur corrupti facilis, consectetur vero dignissimos commodi rerum sit totam aspernatur blanditiis dolorem nemo architecto unde eos ex non quod cumque enim. Nesciunt praesentium consequuntur, animi reiciendis vero nobis aspernatur, culpa unde corporis et nostrum recusandae quasi beatae magni ipsum dolor consectetur distinctio. Alias consequatur officiis sunt possimus eos quae eveniet adipisci quibusdam, consequuntur nulla cum natus. Nobis consequuntur, nostrum rerum quod, aspernatur perspiciatis quaerat sapiente, voluptatibus excepturi eos praesentium ipsam nemo omnis ut architecto delectus libero mollitia odio aliquid maiores pariatur nesciunt quas. Labore, culpa sequi nisi repellendus animi similique neque possimus temporibus cumque atque distinctio iusto. Non, possimus optio earum nulla quasi mollitia? Veniam ipsa aliquid officiis dolore in ipsum maxime, eaque praesentium voluptas eos labore accusamus iste nobis asperiores aperiam provident rem obcaecati vel pariatur animi et quisquam aliquam tempore odit! Dolor delectus possimus ut aliquam aspernatur at totam quas incidunt veniam id voluptatem nesciunt iusto quod, voluptates nam hic optio inventore fuga voluptatum nulla? Voluptatum nihil ratione debitis explicabo quod.</p>
      <br />
      <p>Auteur: {article.firstname} {article.lastname}</p>
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
