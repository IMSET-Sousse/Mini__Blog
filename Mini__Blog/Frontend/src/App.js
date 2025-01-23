import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Header from "./components/Header"
import ArticleList from "./components/ArticleList"
import ArticleDetail from "./components/ArticleDetail"
import AddArticle from "./components/AddArticle"
import EditArticle from "./components/EditArticle"
import Login from "./components/Login"
import Register from "./components/Register"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  const [bgColor, setBgColor] = useState(getRandomColor())

  function getRandomColor() {
    const colors = ["#FDF2F8", "#FCE7F3", "#FAE8FF", "#F3E8FF", "#EEF2FF", "#E0F2FE", "#E0FFFF"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Switch>
              <Route exact path="/" component={ArticleList} />
              <Route path="/article/:id" component={ArticleDetail} />
              <PrivateRoute path="/add" component={AddArticle} />
              <PrivateRoute path="/edit/:id" component={EditArticle} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Redirect to="/" />
            </Switch>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

