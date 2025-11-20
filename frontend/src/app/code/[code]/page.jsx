import { fetchLinkStats } from "@/lib/api";
import styles from "./page.module.css";

export default async function StatsPage({ params }) {
  const data = await fetchLinkStats(params.code);

  if (!data) {
    return (
      <div className={styles.wrapper}>
        <h1>Not Found</h1>
        <p>No link exists with code: {params.code}</p>
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
        <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
      </div>

      <a href="/" className={styles.btn}>← Back</a>
    </div>
  );
}
