"use client";

import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export function AppStates({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loadingModal, setLoadingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  const login = (walletId, seed) => {
    setUser({ walletId, seed });
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify({ walletId, seed }));
    if (window.location.pathname === "/login") {
      window.location.replace("/explore");
    }
  };

  const addAlert = ({ message, type, time }) => {
    let tmp = [...alerts];
    tmp.push({
      message,
      type,
      time,
    });
    setAlerts(tmp);
  };

  const logout = () => {
    setUser({});
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    window.location.replace("/login");
  };

  useEffect(() => {
    let tmpUser = JSON.parse(localStorage.getItem("user"));
    if (tmpUser && tmpUser.walletId && tmpUser.seed) {
      const newUser = tmpUser;
      login(newUser.walletId, newUser.seed);
    } else if (!user.walletId || !user.seed) {
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    } else {
      if (window.location.pathname === "/login") {
        window.location.replace("/plants");
      }
    }
  }, []);

  return (
    <Context.Provider
      value={{
        alerts,
        setAlerts,
        addAlert,
        logout,
        login,
        isLoggedIn,
        user,
        loadingModal,
        setLoadingModal,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useData = () => useContext(Context);
