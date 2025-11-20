export const API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchLinks() {
  const res = await fetch(`${API}/api/links`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch links");
  return res.json();
}

export async function createLink(data) {
  const res = await fetch(`${API}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteLink(code) {
  const res = await fetch(`${API}/api/links/${code}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function fetchLinkStats(code) {
  const res = await fetch(`${API}/api/links/${code}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}
