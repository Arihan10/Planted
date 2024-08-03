"use client";

import { useData } from "@/contexts/States";
import styles from "@/styles/components/Navbar.module.scss";
import Link from "next/link";
export default function Navbar() {
  const { logout, isLoggedIn } = useData();
  return (
    <nav id={styles.navbar}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/explore">explore</Link>
        </li>
        <li>
          <Link href="/my-plants">My plants</Link>
        </li>
        <li>
          <Link href="/add-plant">Add a plant</Link>
        </li>
        <li>
          <button
            onClick={() => {
              if (isLoggedIn) logout();
              else {
                if (window.location.pathname !== "/login")
                  window.location.replace("/login");
              }
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
