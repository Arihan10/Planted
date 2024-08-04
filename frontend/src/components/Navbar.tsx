"use client";

import { useData } from "@/contexts/States";
import styles from "@/styles/components/Navbar.module.scss";
import Link from "next/link";
export default function Navbar() {
  const { logout, isLoggedIn, currentPage } = useData();
  return (
    <nav id={styles.navbar}>
      <ul>
        <li className={`${currentPage == "Explore" ? styles.active : ""}`}>
          <Link href="/explore">Explore</Link>
        </li>
        <li className={`${currentPage == "My plants" ? styles.active : ""}`}>
          <Link href="/my-plants">My plants</Link>
        </li>
        <li className={`${currentPage == "Add a plant" ? styles.active : ""}`}>
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
