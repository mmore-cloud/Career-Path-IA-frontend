import { Route, Routes } from "react-router-dom";

import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Test from "./pages/Test";
import Resultados from "./pages/Resultados";
import Ruta from "./pages/Ruta";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <ScrollToTop />

      <AppNavbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/test" element={<Test />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/ruta" element={<Ruta />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;