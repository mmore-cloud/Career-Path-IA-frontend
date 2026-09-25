import { useState } from "react";
import logoCareerPath from "../assets/CareerPath.jpeg";
import { menuItems } from "../data/menuItems";

function AppNavbar({ paginaActual, cambiarPagina }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const navegar = (pagina) => {
    cambiarPagina(pagina);
    setMenuAbierto(false);
  };

  return (
    <header className="sticky-top bg-dark shadow">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          <button
            type="button"
            className="navbar-brand d-flex align-items-center gap-3 border-0 bg-transparent p-0"
            onClick={() => navegar("inicio")}
          >
            <img
              src={logoCareerPath}
              alt="Logo de CareerPath AI"
              width="52"
              height="52"
              className="rounded-3 border border-info object-fit-cover"
            />

            <span className="text-start">
              <span className="d-block fw-bold text-white">
                CareerPath <span className="text-info">AI</span>
              </span>

              <small className="d-none d-sm-block text-white-50">
                Descubrí tu próximo paso
              </small>
            </span>
          </button>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarCareerPath"
            aria-expanded={menuAbierto}
            aria-label="Abrir menú de navegación"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
            id="navbarCareerPath"
          >
            <ul className="navbar-nav ms-auto gap-lg-2 pt-4 pt-lg-0">
              {menuItems.map((item) => (
                <li className="nav-item" key={item.id}>
                  <button
                    type="button"
                    className={`nav-link btn btn-link text-start rounded-pill px-lg-3 ${
                      paginaActual === item.id
                        ? "active bg-primary text-white"
                        : "text-white-50"
                    }`}
                    onClick={() => navegar(item.id)}
                  >
                    {item.number !== "00" && (
                      <span className="small text-info me-2">
                        {item.number}
                      </span>
                    )}

                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-lg-none mt-4 p-3 rounded-4 bg-black bg-opacity-25 border border-secondary">
              <p className="text-info small fw-bold text-uppercase mb-2">
                Tu recorrido
              </p>

              <p className="text-white-50 small mb-0">
                Navegá por las etapas de orientación vocacional.
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-info" style={{ height: "3px" }}></div>
    </header>
  );
}

export default AppNavbar;