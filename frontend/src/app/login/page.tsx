"use client";

import { useState } from "react";
import { useData } from "@/contexts/States";
import styles from "@/styles/pages/Login.module.scss";

export default function Login() {
  const { login } = useData();
  const [walletId, setWalletId] = useState("");
  const [secret, setSecret] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    let randomNumber = Math.random() * 3 + 1;
    setTimeout(() => {
      login(walletId, secret);
    }, randomNumber * 1000);
  };
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
