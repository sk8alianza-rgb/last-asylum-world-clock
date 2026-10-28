"use client";

import { useEffect, useState } from "react";

type Zone = {
  name: string;
  offset: number;
};

export default function Home() {
  const [serverTime, setServerTime] = useState(
    new Date(2024, 0, 1, 7, 29, 30)
  );

  const [serverInput, setServerInput] = useState("07:29:30");

const [zones, setZones] = useState<Zone[]>([
  { name: "🇪🇸 España", offset: 0 },
  { name: "🇷🇺 Moscú", offset: 2 },
  { name: "🇷🇺 Rusia +7", offset: 4 },
  { name: "🇧🇷 Brasil", offset: -4 },
  { name: "🇺🇸 New York", offset: -6 },
  { name: "🇯🇵 Japón", offset: 8 },
]);

  const [newCountry, setNewCountry] = useState("");
  const [newOffset, setNewOffset] = useState("0");
const [spainOffset, setSpainOffset] = useState("3");
  useEffect(() => {
    const savedTime = localStorage.getItem("serverTime");

    if (savedTime) {
      setServerTime(new Date(savedTime));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setServerTime((prev) => new Date(prev.getTime() + 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour12: false,
    });
  };

  const updateServerTime = () => {
    const parts = serverInput.split(":");

    if (parts.length !== 3) {
      alert("Usa el formato HH:MM:SS");
      return;
    }

    const newTime = new Date(serverTime);

    newTime.setHours(Number(parts[0]));
    newTime.setMinutes(Number(parts[1]));
    newTime.setSeconds(Number(parts[2]));

    setServerTime(newTime);

    localStorage.setItem(
      "serverTime",
      newTime.toISOString()
    );
  };

  const addZone = () => {
    if (!newCountry.trim()) return;

    setZones([
      ...zones,
      {
        name: newCountry,
        offset: Number(newOffset),
      },
    ]);

    setNewCountry("");
    setNewOffset("0");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🌍 Last Asylum World Clock
      </h1>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h2>🕒 Hora del Servidor</h2>

        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#f97316",
            marginBottom: "15px",
          }}
        >
          {formatTime(serverTime)}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input
            value={serverInput}
            onChange={(e) => setServerInput(e.target.value)}
            placeholder="07:29:30"
            style={{
              padding: "10px",
              width: "140px",
              background: "#ffffff",
              color: "#f97316",
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "8px",
              border: "2px solid #f97316",
            }}
          />

          <button
            onClick={updateServerTime}
            style={{
              padding: "10px 15px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Actualizar
          </button>

          <button
            onClick={() => {
              const now = new Date();

              setServerTime(now);

              localStorage.setItem(
                "serverTime",
                now.toISOString()
              );
            }}
            style={{
              padding: "10px 15px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Hora Actual
          </button>

        </div>

<div
  style={{
    marginTop: "15px",
    color: "#cbd5e1",
  }}
>
  Referencia España ↔ Servidor

  <input
    type="number"
    value={spainOffset}
    onChange={(e) => setSpainOffset(e.target.value)}
    style={{
      width: "60px",
      marginLeft: "10px",
      padding: "5px",
      textAlign: "center",
      borderRadius: "6px",
    }}
  />
</div>

<div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  }}
>
  <input
    placeholder="País o zona"
    value={newCountry}
    onChange={(e) => setNewCountry(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "8px",
    }}
  />

  <input
    type="number"
    placeholder="Dif."
    value={newOffset}
    onChange={(e) => setNewOffset(e.target.value)}
    style={{
      width: "80px",
      padding: "10px",
      borderRadius: "8px",
    }}
  />

  <button
    onClick={addZone}
    style={{
      padding: "10px 15px",
      background: "#f97316",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    ➕ Añadir
  </button>
</div>



</div>

      {zones.map((zone) => {
      const localTime = new Date(
  serverTime.getTime() +
    (Number(spainOffset) + zone.offset) * 3600000
);

        const hour = localTime.getHours();

        let timeColor = "#22c55e";
        let status = "🟢";

        if (hour < 8) {
          status = "🔴";
          timeColor = "#ef4444";
        } else if (hour >= 22) {
          status = "🟡";
          timeColor = "#f59e0b";
        }

        return (
          <div
            key={zone.name}
            style={{
              background: "#1e293b",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
<span>
  {status} {zone.name} (
  {zone.offset >= 0 ? "+" : ""}
  {zone.offset}h servidor)
</span>

            <strong
              style={{
                color: timeColor,
                fontSize: "20px",
              }}
            >
              {formatTime(localTime)}
            </strong>
          </div>
        );
      })}
    </main>
  );
}