"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Zone = {
  name: string;
  offset: number;
};
type Event = {
  name: string;
  time: string;
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
  const [eventName, setEventName] = useState("");
const [eventTime, setEventTime] = useState("");
const [showEvent, setShowEvent] = useState(false);
const [events, setEvents] = useState<Event[]>([]);
  const [newOffset, setNewOffset] = useState("0");
const [spainOffset, setSpainOffset] = useState("3");

useEffect(() => {
  const savedTime =
    localStorage.getItem("serverTime");

  const savedAt =
    localStorage.getItem("savedAt");

  if (savedTime && savedAt) {
    const elapsed =
      Date.now() - Number(savedAt);

    const correctedTime = new Date(
      new Date(savedTime).getTime() +
        elapsed
    );

    setServerTime(correctedTime);
  }
}, []);

useEffect(() => {
  const saved =
    localStorage.getItem("events");

  if (saved) {
    setEvents(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "events",
    JSON.stringify(events)
  );
}, [events]);

useEffect(() => {
  const timer = setInterval(() => {
    setServerTime((prev) => {
      const updated = new Date(
        prev.getTime() + 1000
      );

      localStorage.setItem(
        "serverTime",
        updated.toISOString()
      );

      localStorage.setItem(
        "savedAt",
        Date.now().toString()
      );

      return updated;
    });
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

  const newTime = new Date();

  newTime.setHours(Number(parts[0]));
  newTime.setMinutes(Number(parts[1]));
  newTime.setSeconds(Number(parts[2]));

  setServerTime(newTime);

  localStorage.setItem(
    "serverTime",
    newTime.toISOString()
  );

  localStorage.setItem(
    "savedAt",
    Date.now().toString()
  );
};
const deleteZone = (
  zoneName: string
) => {
  setZones((prev) =>
    prev.filter(
      (zone) =>
        zone.name !== zoneName
    )
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
const saveEvent = () => {
  if (!eventName.trim()) return;
  if (!eventTime.trim()) return;

  setEvents((prev) => [
    ...prev,
    {
      name: eventName,
      time: eventTime,
    },
  ]);
};

const loadEvent = (
  name: string,
  time: string
) => {
  setEventName(name);
  setEventTime(time);
  setShowEvent(true);
};

const deleteEvent = (
  index: number
) => {
  setEvents((prev) =>
    prev.filter(
      (_, i) => i !== index
    )
  );
};

const copyEventTimes = () => {
  if (!eventTime) return;

let text = "";

text += "🏰 EVENTO DE ALIANZA\n";
text += "══════════════════\n\n";

text += `📌 ${name}\n`;
text += `🕒 Hora servidor: ${eventTime}\n\n`;

text += "🌍 HORARIOS MUNDIALES\n\n";


  zones.forEach((zone) => {
    const [hours, minutes] =
      eventTime.split(":");

    const eventDate = new Date();

    eventDate.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    const convertedDate = new Date(
      eventDate.getTime() +
        (Number(spainOffset) +
          zone.offset) *
          3600000
    );

text += `🌍 ${zone.name} →: ${convertedDate.toLocaleTimeString(
  "es-ES",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    )}\n`;
  });

  navigator.clipboard.writeText(text);

  alert("✅ Horarios copiados");
};

const copySavedEvent = (
  name: string,
  time: string
) => {
let text = "";

text += "🏰 EVENTO DE ALIANZA\n";
text += "══════════════════\n\n";

text += `📌 ${name}\n`;
text += `🕒 Hora servidor: ${time}\n\n`;

text += "🌍 HORARIOS MUNDIALES\n\n";

  zones.forEach((zone) => {
    const [hours, minutes] =
      time.split(":");

    const eventDate = new Date();

    eventDate.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    const convertedDate = new Date(
      eventDate.getTime() +
        (Number(spainOffset) +
          zone.offset) *
          3600000
    );

    text += `${zone.name}: ${convertedDate.toLocaleTimeString(
      "es-ES",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    )}\n`;
  });

  navigator.clipboard.writeText(text);

  alert("✅ Horarios copiados");
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

<Link
  href="/"
  style={{
    display: "inline-block",
    marginBottom: "20px",
    color: "#f59e0b",
    textDecoration: "none",
    fontWeight: "bold",
  }}
>
  🏠 Inicio
</Link>

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

localStorage.setItem(
  "savedAt",
  Date.now().toString()
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

<div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  }}
>
  <h2>📅 Conversor de Eventos</h2>

  <input
    placeholder="Nombre del evento"
    value={eventName}
    onChange={(e) => setEventName(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
    }}
  />

  <input
    placeholder="Hora servidor (HH:MM)"
    value={eventTime}
    onChange={(e) => setEventTime(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
    }}
  />

  <button
    onClick={() => setShowEvent(true)}
    style={{
      padding: "10px 15px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    📅 Calcular
  </button>

<button
  onClick={copyEventTimes}
  style={{
    marginLeft: "10px",
    padding: "10px 15px",
    background: "#9333ea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  📋 Copiar horarios
</button>

<button
  onClick={saveEvent}
  style={{
    marginLeft: "10px",
    padding: "10px 15px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  💾 Guardar evento
</button>

  {showEvent && eventTime && (
    <div style={{ marginTop: "20px" }}>
      <h3>
        🏰 {eventName || "Evento"}
      </h3>

      {zones.map((zone) => {
        const [hours, minutes] =
          eventTime.split(":");

        const eventDate = new Date();

        eventDate.setHours(
          Number(hours),
          Number(minutes),
          0,
          0
        );

        const convertedDate = new Date(
          eventDate.getTime() +
            (Number(spainOffset) +
              zone.offset) *
              3600000
        );

        return (
          <div
            key={`event-${zone.name}`}
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              padding: "5px 0",
            }}
          >
            <span>{zone.name}</span>

            <strong>
              {convertedDate.toLocaleTimeString(
                "es-ES",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}
            </strong>
          </div>
        );
      })}
    </div>
  )}
</div>

<div
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  }}
>
  <h2>📅 Eventos Guardados</h2>

  {events.length === 0 && (
    <p>No hay eventos guardados.</p>
  )}

  {events.map((event, index) => (
    <div
      key={index}
      style={{
        padding: "10px",
        marginBottom: "10px",
        background: "#334155",
        borderRadius: "8px",
      }}
    >
      <strong>{event.name}</strong>

      <div>
        🕒 Servidor: {event.time}
      </div>

<button
  onClick={() => {
    setEventName(event.name);
    setEventTime(event.time);
  }}
  style={{
    marginTop: "10px",
    marginRight: "10px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  ✏️ Editar
</button>
      
      <button
  onClick={() =>
    copySavedEvent(
      event.name,
      event.time
    )
  }
  style={{
    marginTop: "10px",
    background: "#9333ea",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  📋 Copiar
</button>

<button
  onClick={() =>
    deleteEvent(index)
  }
  style={{
    marginTop: "10px",
    marginLeft: "10px",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  🗑 Eliminar
</button>

    </div>
  ))}
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
            <button
  onClick={() =>
    deleteZone(zone.name)
  }
  style={{
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "5px 8px",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "10px",
  }}
>
  🗑
</button>
          </div>
        );
      })}
    </main>
  );
}