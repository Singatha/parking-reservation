import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/index"
import Register from "./pages/register/index"
import List from "./pages/list/index"
import Reservations from "./pages/reservations"
import PageNotFound from "./pages/pagenotfound/index"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<List />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
