import { useRouter } from "next/router";

export default function Lesson() {
  const router = useRouter();
  const { id } = router.query || {};
  return (
    <div style={{ padding: 16 }}>
      <a href="/">← Back</a>
      <h1>Lesson {id}</h1>
      <p>Route OK. Content will be added in the next batch.</p>
    </div>
  );
}
