import { createContext, useEffect, useMemo, useState } from "react";
import { loginUser, signupUser } from "../services/authService";

const SESSION_KEY = "nfx_session";

export const AuthContext = createContext(null);

function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function loadUserList(userId) {
  if (!userId) return [];

  const raw = localStorage.getItem(`nfx_mylist_${userId}`);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());
  const [myList, setMyList] = useState(() => loadUserList(loadSession()?.id));

  useEffect(() => {
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
      setMyList([]);
      return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    setMyList(loadUserList(user.id));
  }, [user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`nfx_mylist_${user.id}`, JSON.stringify(myList));
  }, [myList, user]);

  async function signup(payload) {
    const response = signupUser(payload);

    if (!response.ok) {
      return response;
    }

    setUser(response.user);
    return response;
  }

  async function login(payload) {
    const response = loginUser(payload);

    if (!response.ok) {
      return response;
    }

    setUser(response.user);
    return response;
  }

  function logout() {
    setUser(null);
    console.log("Hello");
  }

  function toggleMyList(movieId) {
    setMyList((prev) => {
      if (prev.includes(movieId)) {
        return prev.filter((id) => id !== movieId);
      }

      return [...prev, movieId];
    });
  }

  const value = useMemo(
    () => ({
      user,
      myList,
      isAuthenticated: Boolean(user),
      signup,
      login,
      logout,
      toggleMyList,
    }),
    [user, myList]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
