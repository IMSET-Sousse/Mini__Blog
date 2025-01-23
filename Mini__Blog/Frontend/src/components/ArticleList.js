import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getArticles } from "../api"

function ArticleList() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles()
      setArticles(data)
    }
    fetchArticles()
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/article/${article.id}`} className="text-indigo-600 hover:text-indigo-800">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{article.content.substring(0, 100)}...</p>
            <Link to={`/article/${article.id}`} className="text-indigo-600 hover:text-indigo-800">
              Lire la suite
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleList

