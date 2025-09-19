// pages/lesson/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Lesson() {
  const router = useRouter();
  const { id } = router.query || {};
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/content/lessons/${id}.json`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j) => {
        setData(j);
        setErr("");
        setLoading(false);
      })
      .catch((e) => {
        setErr(String(e));
        setData(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: 16 }}>Loading…</div>;
  if (err) return (
    <div style={{ padding: 16 }}>
      Failed to load lesson {id}: {err}
      <div style={{ marginTop: 12 }}>
        <Link href="/" style={{ textDecoration: "underline" }}>Back to list</Link>
      </div>
    </div>
  );
  if (!data) return null;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <Link href="/" style={{ textDecoration: "underline" }}>&larr; Back</Link>
      <h1>{data.id}: {data.title}</h1>
      {data.estimate_min ? <p>~{data.estimate_min} min</p> : null}

      {data.objectives?.length ? (
        <>
          <h3>Objectives</h3>
          <ul>{data.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
        </>
      ) : null}

      {data.sections?.map((s, i) => (
        <section key={i} style={{ marginTop: 16 }}>
          <h3>{s.heading}</h3>
          {s.body.map((p, j) => <p key={j}>{p}</p>)}
        </section>
      ))}

      {data.examples?.length ? (
        <>
          <h3 style={{ marginTop: 24 }}>Worked Examples</h3>
          {data.examples.map((ex, i) => (
            <div key={i} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <strong>{ex.title}</strong>
              <p>{ex.statement}</p>
              <ol>{ex.solution_steps.map((s, k) => <li key={k}>{s}</li>)}</ol>
              {ex.answer ? <p><em>Answer:</em> {ex.answer}</p> : null}
            </div>
          ))}
        </>
      ) : null}

      {data.quiz?.length ? (
        <>
          <h3 style={{ marginTop: 24 }}>Practice (MCQ)</h3>
          {data.quiz.map((q) => (
            <div key={q.n} style={{ marginBottom: 14 }}>
              <div><strong>Q{q.n}.</strong> {q.question}</div>
              <ul>{q.choices.map((c, i) => <li key={i}>{c}</li>)}</ul>
              <div><em>Solution:</em> {q.answer} — {q.explanation}</div>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}
