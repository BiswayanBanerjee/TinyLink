"use client";

import styles from "./LinksTable.module.css";
import { deleteLink, fetchLinks } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LinksTable({ links }) {
  const router = useRouter();
  const [data, setData] = useState(links); // initial server data

  // Auto-refresh every 3 seconds
  useEffect(() => {
    async function load() {
      try {
        const updated = await fetchLinks();
        setData(updated);
      } catch (err) {
        console.error("Refresh failed:", err);
      }
    }

    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  async function handleDelete(code) {
    await deleteLink(code);
    router.refresh();
  }

  return (
    <div className={styles.wrapper}>
      <h2>Your Links</h2>

      {data.length === 0 ? (
        <p className={styles.empty}>No links yet. Add one above!</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>URL</th>
              <th>Clicks</th>
              <th>Last Clicked</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((link) => (
              <tr key={link.code}>
                <td>{link.code}</td>

                <td className={styles.url}>{link.url}</td>

                <td>{link.totalClicks}</td>

                <td>
                  {link.lastClicked
                    ? new Date(link.lastClicked).toLocaleString()
                    : "—"}
                </td>

                <td className={styles.actions}>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_API_URL}/${link.code}`
                      )
                    }
                  >
                    Copy
                  </button>

                  <button
                    className={styles.delete}
                    onClick={() => handleDelete(link.code)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
