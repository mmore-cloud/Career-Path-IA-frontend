import { useEffect, useState } from "react";
import { initialUsers } from "../data/users";

const USERS_STORAGE_KEY = "careerpath_users";
const ACTIVE_USER_STORAGE_KEY = "careerpath_active_user_id";
const TEST_ANSWERS_STORAGE_KEY = "careerpath_test_answers";
const RECOMMENDED_CAREERS_STORAGE_KEY = "careerpath_recommended_careers";
const LEARNING_ROUTE_STORAGE_KEY = "careerpath_learning_route";
const ROUTE_PROGRESS_STORAGE_KEY = "careerpath_route_progress";

function getStoredUsers() {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

    if (!storedUsers) {
      return initialUsers;
    }

    const parsedUsers = JSON.parse(storedUsers);

    return Array.isArray(parsedUsers) ? parsedUsers : initialUsers;
  } catch {
    return initialUsers;
  }
}

function getStoredActiveUserId() {
  const storedActiveUserId = localStorage.getItem(
    ACTIVE_USER_STORAGE_KEY,
  );

  if (storedActiveUserId === null) {
    return null;
  }

  const parsedActiveUserId = Number(storedActiveUserId);

  return Number.isNaN(parsedActiveUserId)
    ? null
    : parsedActiveUserId;
}

export function useLocalAuth() {
  const [users, setUsers] = useState(getStoredUsers);
  const [activeUserId, setActiveUserId] = useState(
    getStoredActiveUserId,
  );
  const [authError, setAuthError] = useState("");

  const isLoadingAuth = false;

  const activeUser =
    users.find((user) => user.id === activeUserId) ?? null;

  // Guarda los usuarios cuando cambian.
  useEffect(() => {
    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(users),
    );
  }, [users]);

  // Mantiene la sesión sincronizada con localStorage.
  useEffect(() => {
    if (activeUser) {
      localStorage.setItem(
        ACTIVE_USER_STORAGE_KEY,
        String(activeUser.id),
      );
    } else {
      localStorage.removeItem(
        ACTIVE_USER_STORAGE_KEY,
      );
    }
  }, [activeUser]);

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === password,
    );

    if (!foundUser) {
      setAuthError(
        "El email o la contraseña no coinciden con ningún usuario.",
      );

      return false;
    }

    setActiveUserId(foundUser.id);
    setAuthError("");

    return true;
  };

  const register = ({
    nombre,
    email,
    password,
  }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === normalizedEmail,
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

  const logout = () => {
    setActiveUserId(null);
    setAuthError("");
  };

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