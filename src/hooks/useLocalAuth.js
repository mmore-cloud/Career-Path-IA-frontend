import { useEffect, useMemo, useState } from "react";
import { initialUsers } from "../data/users";

const USERS_STORAGE_KEY = "careerpath_users";
const ACTIVE_USER_STORAGE_KEY = "careerpath_active_user_id";

export function useLocalAuth() {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      const storedActiveUserId = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);

      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);

        const parsedActiveUserId = Number(storedActiveUserId);
        const activeUserExists = parsedUsers.some(
          (user) => user.id === parsedActiveUserId
        );

        setActiveUserId(activeUserExists ? parsedActiveUserId : null);
      } else {
        setUsers(initialUsers);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
      }
    } catch (error) {
      console.error("Error al cargar usuarios locales:", error);
      setUsers(initialUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoadingAuth && users.length > 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users, isLoadingAuth]);

  useEffect(() => {
    if (activeUserId) {
      localStorage.setItem(ACTIVE_USER_STORAGE_KEY, String(activeUserId));
    } else {
      localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
    }
  }, [activeUserId]);

  const activeUser = useMemo(
    () => users.find((user) => user.id === activeUserId) ?? null,
    [users, activeUserId]
  );

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === password
    );

    if (!foundUser) {
      setAuthError("El email o la contraseña no coinciden con ningún usuario.");
      return false;
    }

    setActiveUserId(foundUser.id);
    setAuthError("");
    return true;
  };

  const register = ({ nombre, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      setAuthError("Ya existe una cuenta registrada con ese Gmail.");
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

    setUsers((currentUsers) => [...currentUsers, newUser]);
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
        user.id === activeUser.id ? { ...user, ...updatedData } : user
      )
    );
  };

  const logout = () => {
    setActiveUserId(null);
    setAuthError("");
  };

  const resetLocalUsers = () => {
    setUsers(initialUsers);
    setActiveUserId(null);
    setAuthError("");
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
    localStorage.removeItem("careerpath_recommended_careers");
    localStorage.removeItem("careerpath_learning_route");
    localStorage.removeItem("careerpath_test_answers");
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