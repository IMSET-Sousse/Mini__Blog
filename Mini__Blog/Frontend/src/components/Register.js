import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { register } from "../api"

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(username, password)
      history.push("/login")
    } catch (error) {
      console.error("Erreur d'inscription:", error)
      // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register

