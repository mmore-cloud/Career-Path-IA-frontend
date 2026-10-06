import { useEffect, useMemo, useState } from "react";
import { initialUsers } from "../data/users";

const USERS_STORAGE_KEY = "careerpath_users";
const ACTIVE_USER_STORAGE_KEY = "careerpath_active_user_id";
const TEST_ANSWERS_STORAGE_KEY = "careerpath_test_answers";
const RECOMMENDED_CAREERS_STORAGE_KEY = "careerpath_recommended_careers";
const LEARNING_ROUTE_STORAGE_KEY = "careerpath_learning_route";
const ROUTE_PROGRESS_STORAGE_KEY = "careerpath_route_progress";

export function useLocalAuth() {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  // Recupera usuarios y sesión guardados.
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      const storedActiveUserId = localStorage.getItem(
        ACTIVE_USER_STORAGE_KEY,
      );

      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);

        setUsers(parsedUsers);

        const parsedActiveUserId =
          storedActiveUserId !== null
            ? Number(storedActiveUserId)
            : null;

        const activeUserExists =
          parsedActiveUserId !== null &&
          parsedUsers.some(
            (user) => user.id === parsedActiveUserId,
          );

        setActiveUserId(
          activeUserExists
            ? parsedActiveUserId
            : null,
        );
      } else {
        setUsers(initialUsers);

        localStorage.setItem(
          USERS_STORAGE_KEY,
          JSON.stringify(initialUsers),
        );
      }
    } catch (error) {
      console.error(
        "Error al cargar usuarios locales:",
        error,
      );

      setUsers(initialUsers);

      localStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify(initialUsers),
      );

      setActiveUserId(null);
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  // Mantiene los usuarios sincronizados con localStorage.
  useEffect(() => {
    if (!isLoadingAuth && users.length > 0) {
      localStorage.setItem(
        USERS_STORAGE_KEY,
        JSON.stringify(users),
      );
    }
  }, [users, isLoadingAuth]);

  // Mantiene la sesión activa en localStorage.
  useEffect(() => {
    if (isLoadingAuth) {
      return;
    }

    if (activeUserId !== null) {
      localStorage.setItem(
        ACTIVE_USER_STORAGE_KEY,
        String(activeUserId),
      );
    } else {
      localStorage.removeItem(
        ACTIVE_USER_STORAGE_KEY,
      );
    }
  }, [activeUserId, isLoadingAuth]);

  // Obtiene el usuario que tiene la sesión iniciada.
  const activeUser = useMemo(
    () =>
      users.find(
        (user) => user.id === activeUserId,
      ) ?? null,
    [users, activeUserId],
  );

  const login = ({ email, password }) => {
    const normalizedEmail =
      email.trim().toLowerCase();

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
          normalizedEmail &&
        user.password === password,
    );

    if (!foundUser) {
      setAuthError(
        "El email o la contraseña no coinciden con ningún usuario.",
      );

      return false;
    }

    setActiveUserId(foundUser.id);

    localStorage.setItem(
      ACTIVE_USER_STORAGE_KEY,
      String(foundUser.id),
    );

    setAuthError("");

    return true;
  };

  const register = ({
    nombre,
    email,
    password,
  }) => {
    const normalizedEmail =
      email.trim().toLowerCase();

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        normalizedEmail,
    );

    if (emailExists) {
      setAuthError(
        "Ya existe una cuenta registrada con ese Gmail.",
      );

      return false;
    }

    const newUser = {
      id: Date.now(),
      nombre: nombre.trim(),
      email: normalizedEmail,
      password,
      intereses: [],
      habilidades: [],
      testCompletado: false,
    };

    setUsers((currentUsers) => [
      ...currentUsers,
      newUser,
    ]);

    setActiveUserId(newUser.id);

    localStorage.setItem(
      ACTIVE_USER_STORAGE_KEY,
      String(newUser.id),
    );

    setAuthError("");

    return true;
  };

  const updateActiveUser = (updatedData) => {
    if (!activeUser) {
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === activeUser.id
          ? {
              ...user,
              ...updatedData,
            }
          : user,
      ),
    );
  };

  // Cierra solamente la sesión actual.
  const logout = () => {
    setActiveUserId(null);
    setAuthError("");

    localStorage.removeItem(
      ACTIVE_USER_STORAGE_KEY,
    );
  };

  // Restaura los datos locales del proyecto.
  const resetLocalUsers = () => {
    const confirmar = window.confirm(
      "Se eliminarán el test, los resultados y la ruta guardada. ¿Querés continuar?",
    );

    if (!confirmar) {
      return;
    }

    setUsers(initialUsers);
    setActiveUserId(null);
    setAuthError("");

    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(initialUsers),
    );

    localStorage.removeItem(
      ACTIVE_USER_STORAGE_KEY,
    );

    localStorage.removeItem(
      TEST_ANSWERS_STORAGE_KEY,
    );

    localStorage.removeItem(
      RECOMMENDED_CAREERS_STORAGE_KEY,
    );

    localStorage.removeItem(
      LEARNING_ROUTE_STORAGE_KEY,
    );

    localStorage.removeItem(
      ROUTE_PROGRESS_STORAGE_KEY,
    );
  };

  return {
    users,
    activeUser,
    isAuthenticated: Boolean(activeUser),
    isLoadingAuth,
    authError,
    login,
    register,
    updateActiveUser,
    logout,
    resetLocalUsers,
  };
}