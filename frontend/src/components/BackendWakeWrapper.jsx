"use client";

import { useEffect, useState } from "react";
import styles from "./BackendWakeWrapper.module.css";

export default function BackendWakeWrapper({ children }) {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/healthz`;

        const res = await fetch(url, { cache: "no-store" });

        if (res.ok) {
          setBackendReady(true);
        }
      } catch (err) {
        // Backend still sleeping → retry
      }
    }

    check();

    const interval = setInterval(check, 1500); // ping every 1.5s
    return () => clearInterval(interval);
  }, []);

  if (!backendReady) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
        <p>Waking up backend...</p>
      </div>
    );
  }

  return children;
}
