import { Route, Routes } from "react-router"
import { RootLayout } from "./layouts/RootLayout"
import { Home } from "./pages/home"
import { Blog } from "./pages/blog"
import { Article } from "./pages/article"
import { Login } from "./pages/login"
import { Register } from "./pages/register"

function App() {

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
