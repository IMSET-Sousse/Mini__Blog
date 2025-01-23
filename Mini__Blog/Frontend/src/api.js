import axios from "axios"

const API_URL = "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password })
  return response.data.token
}

export const register = async (username, password) => {
  const response = await api.post("/auth/register", { username, password })
  return response.data
}

export const logout = () => {
  // Ici, vous pouvez ajouter une logique côté serveur si nécessaire
}

export const getArticles = async () => {
  const response = await api.get("/articles")
  return response.data
}

export const getArticle = async (id) => {
  const response = await api.get(`/articles/${id}`)
  return response.data
}

export const addArticle = async (article) => {
  const response = await api.post("/articles", article)
  return response.data
}

export const updateArticle = async (id, article) => {
  const response = await api.put(`/articles/${id}`, article)
  return response.data
}

export const deleteArticle = async (id) => {
  const response = await api.delete(`/articles/${id}`)
  return response.data
}

