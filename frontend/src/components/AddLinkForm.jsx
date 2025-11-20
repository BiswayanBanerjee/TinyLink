"use client";

import { useState } from "react";
import { createLink } from "@/lib/api";
import styles from "./AddLinkForm.module.css";
import { useRouter } from "next/navigation";

export default function AddLinkForm() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    // FRONTEND URL VALIDATION
    try {
      new URL(url);
    } catch {
      setMsg("Enter a valid URL.");
      setLoading(false);
      return;
    }

    const res = await createLink({ url, code });

    if (res.error) {
      setMsg(res.error); // backend error like "code exists"
    } else {
      setMsg("Link created successfully!");
      setUrl("");
      setCode("");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create Short Link</h2>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Custom code (optional)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>

      {msg && <p className={styles.msg}>{msg}</p>}
    </form>
  );
}
