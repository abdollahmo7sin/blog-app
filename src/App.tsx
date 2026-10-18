import { Route, Routes } from "react-router"
import { RootLayout } from "./layouts/RootLayout"
import { Home } from "./pages/home"
import { Blog } from "./pages/blog"
import { Article } from "./pages/article"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { GuestRoute } from "./components/GuestRoute"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { ArticleForm } from "./pages/articleForm"
import { MyArticles } from "./pages/myArticles"

function App() {

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Article />} />
        <Route element={<GuestRoute />} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path="/articles/new" element={<ArticleForm />} />
          <Route path="/articles/:id/edit" element={<ArticleForm />} />
          <Route path="/my-articles" element={<MyArticles />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
