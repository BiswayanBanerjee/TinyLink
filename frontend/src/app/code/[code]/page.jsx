"use client";

import { use, useState, useEffect } from "react";
import { fetchLinkStats } from "@/lib/api";
import styles from "./page.module.css";

export default function StatsPage({ params }) {
  const { code } = use(params);   // ⭐ FIXED HERE

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchLinkStats(code);
        if (!res) setError("Link not found.");
        else setData(res);
      } catch (err) {
        setError("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <h1>Loading Stats…</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1>Stats for "{data.code}"</h1>

      <div className={styles.box}>
        <p><strong>URL:</strong> {data.url}</p>
        <p><strong>Total Clicks:</strong> {data.totalClicks}</p>
        <p><strong>Last Clicked:</strong>
          {data.lastClicked
            ? new Date(data.lastClicked).toLocaleString()
            : "Never"}
        </p>
        <p><strong>Created At:</strong> 
          {new Date(data.createdAt).toLocaleString()}
        </p>
      </div>

      <a href="/" className={styles.btn}>← Back</a>
    </div>
  );
}
