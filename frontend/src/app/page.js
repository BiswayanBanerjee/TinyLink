"use client";
import AddLinkForm from "@/components/AddLinkForm";
import LinksTable from "@/components/LinksTable";
import { fetchLinks } from "@/lib/api";

export default async function Page() {
  const links = await fetchLinks();

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        TinyLink Dashboard
      </h1>

      <AddLinkForm />

      <LinksTable links={links} />
    </main>
  );
}
