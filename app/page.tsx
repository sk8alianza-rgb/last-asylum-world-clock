import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>🐝 N3X Command Center</h1>

      <Link href="/clock">
        🌍 World Clock
      </Link>

      <Link href="/roster">
        👥 N3X Roster
      </Link>
    </main>
  );
}