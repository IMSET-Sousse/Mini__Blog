import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Header() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Mini Blog
        </Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/add" className="mr-4 text-indigo-600 hover:text-indigo-800">
                Ajouter un article
              </Link>
              <button onClick={logout} className="text-indigo-600 hover:text-indigo-800">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 text-indigo-600 hover:text-indigo-800">
                Connexion
              </Link>
              <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

