import React, { useState, useEffect } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import { getArticle, deleteArticle } from "../api"
import { useAuth } from "../context/AuthContext"

function ArticleDetail() {
  const [article, setArticle] = useState(null)
  const { id } = useParams()
  const history = useHistory()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticle(id)
      setArticle(data)
    }
    fetchArticle()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      await deleteArticle(id)
      history.push("/")
    }
  }

  if (!article) return <div className="text-center py-4">Chargement...</div>

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">{article.title}</h1>
        <p className="text-gray-600 mb-6">{article.content}</p>
        {isAuthenticated && (
          <div className="flex justify-end space-x-4">
            <Link to={`/edit/${article.id}`} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Modifier
            </Link>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleDetail

