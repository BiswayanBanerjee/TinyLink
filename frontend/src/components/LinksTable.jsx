"use client";

import styles from "./LinksTable.module.css";
import { deleteLink, fetchLinks } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LinksTable({ links }) {
  const router = useRouter();
  const [data, setData] = useState(links); // initial server data
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");

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
    try {
      const res = await deleteLink(code);

      if (res?.error) {
        setErrorMsg("Failed to delete link");
        setTimeout(() => setErrorMsg(""), 2000);
        return;
      }

      router.refresh();
      setSuccessMsg("Link deleted");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (e) {
      setErrorMsg("Network error");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  }

  const filtered = data.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <h2>Your Links</h2>

      <input
        type="text"
        placeholder="Search by URL or code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

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
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No results found for "{search}"
                </td>
              </tr>
            ) : (
              filtered.map((link) => (
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
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
