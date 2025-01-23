import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getArticle, updateArticle } from "../api"

function EditArticle() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticle(id)
      setTitle(data.title)
      setContent(data.content)
    }
    fetchArticle()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateArticle(id, { title, content })
    history.push(`/article/${id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Modifier l'article</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Titre
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
              Contenu
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              rows="6"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Mettre à jour l'article
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditArticle

