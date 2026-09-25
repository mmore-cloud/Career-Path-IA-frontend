import { useState } from "react";

import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Test from "./pages/Test";
import Resultados from "./pages/Resultados";
import Ruta from "./pages/Ruta";

function App() {
  const [paginaActual, setPaginaActual] = useState("inicio");

  const mostrarPagina = () => {
    if (paginaActual === "perfil") return <Perfil />;
    if (paginaActual === "test") return <Test />;
    if (paginaActual === "resultados") return <Resultados />;
    if (paginaActual === "ruta") return <Ruta />;

    return <Home cambiarPagina={setPaginaActual} />;
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <AppNavbar
        paginaActual={paginaActual}
        cambiarPagina={setPaginaActual}
      />

      <main className="flex-grow-1">
        {mostrarPagina()}
      </main>

      <Footer />
    </div>
  );
}

export default App;