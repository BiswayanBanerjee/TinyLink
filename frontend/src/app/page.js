"use client";

import AddLinkForm from "@/components/AddLinkForm";
import LinksTable from "@/components/LinksTable";
import { fetchLinks } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchLinks();
        setLinks(res);
      } catch (err) {
        setError("Failed to load links. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading Dashboard…</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: "40px", textAlign: "center", color: "red" }}>
        <h2>{error}</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        TinyLink Dashboard
      </h1>

      <AddLinkForm setLinks={setLinks} />
      <LinksTable links={links} setLinks={setLinks} />
    </main>
  );
}
