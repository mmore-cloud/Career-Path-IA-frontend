import { useState } from "react";
import { NavLink } from "react-router-dom";
import logoCareerPath from "../assets/CareerPath.jpeg";
import { menuItems } from "../data/menuItems";

function AppNavbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const claseLinkEscritorio = ({ isActive }) =>
    `nav-link cp-nav-link rounded-pill px-3 ${
      isActive ? "active" : ""
    }`;

  const claseLinkMobile = ({ isActive }) =>
    `cp-mobile-link text-decoration-none ${
      isActive ? "active" : ""
    }`;

  return (
    <header className="sticky-top bg-dark shadow cp-header-react">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center gap-3 text-decoration-none p-0"
            onClick={cerrarMenu}
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
          </NavLink>

          <button
            className="navbar-toggler cp-menu-button"
            type="button"
            aria-controls="navbarCareerPath"
            aria-expanded={menuAbierto}
            aria-label="Abrir menú de navegación"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav ms-auto gap-2">
              {menuItems.map((item) => (
                <li className="nav-item" key={item.id}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={claseLinkEscritorio}
                  >
                    {item.number !== "00" && (
                      <span className="small text-info me-2">
                        {item.number}
                      </span>
                    )}

                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="bg-info cp-navbar-line"></div>

      {menuAbierto && (
        <>
          <button
            className="cp-menu-backdrop d-lg-none"
            type="button"
            aria-label="Cerrar menú"
            onClick={cerrarMenu}
          ></button>

          <div className="cp-mobile-menu d-lg-none" id="navbarCareerPath">
            <div className="cp-mobile-panel">
              <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                <div>
                  <p className="text-info small fw-bold text-uppercase mb-1">
                    CareerPath AI
                  </p>

                  <h2 className="h5 text-white fw-bold mb-0">
                    Tu recorrido
                  </h2>
                </div>

                <button
                  className="btn btn-outline-light rounded-circle cp-close-button"
                  type="button"
                  aria-label="Cerrar menú"
                  onClick={cerrarMenu}
                >
                  ×
                </button>
              </div>

              <p className="text-white-50 small mb-4">
                Navegá por las etapas de orientación vocacional.
              </p>

              <ul className="list-unstyled d-grid gap-2 mb-4">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={claseLinkMobile}
                      onClick={cerrarMenu}
                    >
                      <span className="cp-mobile-number">
                        {item.number}
                      </span>

                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="border border-secondary rounded-4 p-3 bg-black bg-opacity-25">
                <p className="text-info small fw-bold text-uppercase mb-2">
                  Tu elección
                </p>

                <p className="text-white-50 small mb-0">
                  Avanzá a tu ritmo y explorá las secciones del proyecto.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default AppNavbar;