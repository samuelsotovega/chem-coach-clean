// pages/index.js
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/content/lessons.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j) => {
        setItems(j);
        setLoading(false);
      })
      .catch((e) => {
        setErr(String(e));
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: 16 }}>Loading…</div>;
  if (err) return <div style={{ padding: 16 }}>Failed to load lessons: {err}</div>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1>Chem Coach</h1>
      <p>Your daily FE/PE Chemical micro-lessons.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {items.map((it) => (
          <div key={it.id} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{it.id}. {it.title}</strong>
                {typeof it.estimate_min === "number" && (
                  <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.7, border: "1px solid #eee", padding: "2px 6px", borderRadius: 8 }}>
                    ~{it.estimate_min} min
                  </span>
                )}
              </div>
              <Link href={`/lesson/${it.id}`} style={{ background: "#0b5fff", color: "white", padding: "6px 12px", borderRadius: 8, textDecoration: "none" }}>
                Start
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
