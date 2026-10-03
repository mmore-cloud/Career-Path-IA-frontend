import { useState } from "react";

const initialLoginData = {
  email: "",
  password: "",
};

const initialRegisterData = {
  nombre: "",
  email: "",
  password: "",
};

function LoginForm({ onLogin, onRegister, authError, isLoading }) {
  const [mode, setMode] = useState("login");
  const [loginData, setLoginData] = useState(initialLoginData);
  const [registerData, setRegisterData] = useState(initialRegisterData);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setRegisterData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    onLogin(loginData);
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    const registered = onRegister(registerData);

    if (registered) {
      setRegisterData(initialRegisterData);
    }
  };

  return (
    <section className="row justify-content-center cp-fade-up">
      <div className="col-lg-7 col-xl-6">
        <article className="card border-0 shadow-lg rounded-4 cp-auth-card">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <span className="badge rounded-pill text-bg-info mb-3 cp-soft-badge">
                <i className="bi bi-shield-lock me-2"></i>
                Acceso local
              </span>

              <h1 className="h3 fw-bold mb-3">
                {mode === "login"
                  ? "Iniciar sesión"
                  : "Crear cuenta"}
              </h1>

              <p className="text-secondary mb-0">
                {mode === "login"
                  ? "Ingresá para completar tu perfil vocacional."
                  : "Creá tu cuenta con nombre, Gmail y contraseña."}
              </p>
            </div>

            <div className="d-flex gap-2 mb-4 cp-auth-tabs">
              <button
                type="button"
                className={`btn rounded-pill flex-fill ${
                  mode === "login" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setMode("login")}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Iniciar sesión
              </button>

              <button
                type="button"
                className={`btn rounded-pill flex-fill ${
                  mode === "register" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setMode("register")}
              >
                <i className="bi bi-person-plus me-2"></i>
                Crear cuenta
              </button>
            </div>

            {authError && (
              <div className="alert alert-danger rounded-4" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {authError}
              </div>
            )}

            {mode === "login" && (
              <form onSubmit={handleLoginSubmit} className="cp-fade-up">
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="loginEmail">
                    <i className="bi bi-envelope me-2 text-primary"></i>
                    Gmail
                  </label>

                  <input
                    className="form-control form-control-lg"
                    id="loginEmail"
                    name="email"
                    type="email"
                    placeholder="morena@careerpath.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="form-label fw-semibold"
                    htmlFor="loginPassword"
                  >
                    <i className="bi bi-key me-2 text-primary"></i>
                    Contraseña
                  </label>

                  <input
                    className="form-control form-control-lg"
                    id="loginPassword"
                    name="password"
                    type="password"
                    placeholder="123456"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    disabled={isLoading}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg rounded-pill w-100 fw-semibold cp-btn-animated"
                  type="submit"
                  disabled={isLoading}
                >
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  Entrar
                </button>
              </form>
            )}

            {mode === "register" && (
              <form onSubmit={handleRegisterSubmit} className="cp-fade-up">
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="nombre">
                    <i className="bi bi-person me-2 text-primary"></i>
                    Nombre
                  </label>

                  <input
                    className="form-control form-control-lg"
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={registerData.nombre}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                    htmlFor="registerEmail"
                  >
                    <i className="bi bi-envelope me-2 text-primary"></i>
                    Gmail
                  </label>

                  <input
                    className="form-control form-control-lg"
                    id="registerEmail"
                    name="email"
                    type="email"
                    placeholder="tuemail@gmail.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="form-label fw-semibold"
                    htmlFor="registerPassword"
                  >
                    <i className="bi bi-key me-2 text-primary"></i>
                    Contraseña
                  </label>

                  <input
                    className="form-control form-control-lg"
                    id="registerPassword"
                    name="password"
                    type="password"
                    placeholder="Creá una contraseña"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg rounded-pill w-100 fw-semibold cp-btn-animated"
                  type="submit"
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Crear cuenta
                </button>
              </form>
            )}

            <div className="mt-4 p-3 bg-light rounded-4">
              <p className="fw-semibold mb-2">
                <i className="bi bi-people me-2 text-primary"></i>
                Usuarios precargados
              </p>

              <p className="small text-secondary mb-0">
                Ya hay 5 usuarios locales cargados. Todos usan la contraseña{" "}
                <strong>123456</strong>.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default LoginForm;