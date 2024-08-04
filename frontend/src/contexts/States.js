"use client";

import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export function AppStates({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loadingModal, setLoadingModal] = useState(false);

  const login = (walletId, secret) => {
    setUser({ walletId, secret });
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify({ walletId, secret }));
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
    if (tmpUser && tmpUser.walletId && tmpUser.secret) {
      const newUser = tmpUser;
      login(newUser.walletId, newUser.secret);
    } else if (!user.walletId || !user.secret) {
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
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useData = () => useContext(Context);
