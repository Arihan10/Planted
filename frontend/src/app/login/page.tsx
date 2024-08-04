"use client";

import { useState, useEffect } from "react";
import { useData } from "@/contexts/States";
import styles from "@/styles/pages/Login.module.scss";

export default function Login() {
  const { login, setCurrentPage } = useData();
  const [walletId, setWalletId] = useState("");
  const [seed, setSeed] = useState("");

  const { setLoadingModal } = useData();

  const handleLogin = (e: any) => {
    e.preventDefault();

    setLoadingModal(true);
    let randomNumber = Math.random() * 3 + 1;
    // TODO: login
    setTimeout(() => {
      login(walletId, seed);
      setLoadingModal(false);
    }, randomNumber * 1000);
  };

  // Update page title
  useEffect(() => {
    setCurrentPage("");
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
          placeholder="Seed"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
