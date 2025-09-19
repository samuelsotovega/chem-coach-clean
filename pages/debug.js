// pages/debug.js
import { useEffect, useState } from "react";

export default function Debug() {
  const [log, setLog] = useState([]);
  const add = (s) => setLog((p) => [...p, s]);

  useEffect(() => {
    (async () => {
      try {
        add("GET /content/lessons.json …");
        const r = await fetch("/content/lessons.json", { cache: "no-store" });
        add(`lessons.json: ${r.status}`);
        const list = r.ok ? await r.json() : [];
        for (const it of list) {
          const url = `/content/lessons/${it.id}.json`;
          const rr = await fetch(url, { cache: "no-store" });
          add(`${url}: ${rr.status}`);
        }
      } catch (e) {
        add("Error: " + String(e));
      }
    })();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Debug</h1>
      <pre>{log.join("\n")}</pre>
    </div>
  );
}
