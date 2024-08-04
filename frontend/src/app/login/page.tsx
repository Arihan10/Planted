"use client";

import { useState, useEffect } from "react";
import { useData } from "@/contexts/States";
import styles from "@/styles/pages/Login.module.scss";

export default function Login() {
  const { login } = useData();
  const [walletId, setWalletId] = useState("");
  const [secret, setSecret] = useState("");

  const { setLoadingModal } = useData();

  const handleLogin = (e: any) => {
    e.preventDefault();

    setLoadingModal(true);
    let randomNumber = Math.random() * 3 + 1;
    // TODO: login
    setTimeout(() => {
      login(walletId, secret);
      setLoadingModal(false);
    }, randomNumber * 1000);
  };

  // Update page title
  useEffect(() => {
    document.title = "Planted | Login";
  }, []);
  return (
    <main id={styles.login} className="background">
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.title}>Login</div>
        <input
          type="text"
          placeholder="Wallet ID"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
