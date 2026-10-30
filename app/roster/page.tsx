"use client";
import Link from "next/link";

import { useMemo, useState, useEffect } from "react";

type Player = {
  nickname: string;
  power: number;
  troop2?: number;
  troop3?: number;
};

const initialPlayers: Player[] = [
  { nickname: "«Алекс»", power: 0 },
  { nickname: "Myshkïn", power: 34200000, troop2: 31500000, troop3: 29800000 },
  { nickname: "iKWAI", power: 32400000 },
  { nickname: "LAMDA", power: 20600000 },
  { nickname: "Molly", power: 23250000 },
  { nickname: "•ВЕSTия•", power: 0 },
  { nickname: "Franceska06", power: 0 },
  { nickname: "Sonitachan", power: 0 },
  { nickname: "БОННИ", power: 0 },
  { nickname: "Pamigab", power: 20500000 },
  { nickname: "leoagasichi", power: 23850000 },
  { nickname: "DocileLion", power: 0 },
  { nickname: "Capsoul", power: 20600000 },
  { nickname: "NowFuture", power: 0 },
  { nickname: "Lianevc", power: 0 },
  { nickname: "DdZm", power: 0 },
  { nickname: "Dratin", power: 0 },
  { nickname: "TamiTamii", power: 0 },
  { nickname: "bluesun", power: 21600000 },
  { nickname: "Friar", power: 0 },
  { nickname: "Миротина", power: 0 },
  { nickname: "YourBannyWrote", power: 0 },
  { nickname: "Zharita", power: 0 },
  { nickname: "DarthKronos", power: 0 },
  { nickname: "•Amoras", power: 0 },
  { nickname: "VanHelsing15", power: 0 },
  { nickname: "Daavee", power: 20200000 },
  { nickname: "keskia", power: 0 },
  { nickname: "GuardianofFenrir", power: 0 },
  { nickname: "Juuujuuu", power: 0 },
  { nickname: "Suu1", power: 0 },
  { nickname: "loaking", power: 0 },
  { nickname: "CullenBlack‡", power: 0 },
  { nickname: "olimpero007", power: 0 },
  { nickname: "DoctoraSari", power: 0 },
  { nickname: "DrJaoMaGo", power: 0 },
  { nickname: "Fely5900", power: 0 },
  { nickname: "Stefy93", power: 0 },
  { nickname: "Miztli-Mish", power: 0 },
  { nickname: "Virguiniss", power: 0 },
  { nickname: "acori90", power: 0 },
  { nickname: "flaca", power: 0 },
  { nickname: "Jaayc", power: 0 },
  { nickname: "Sebille", power: 0 },
  { nickname: "xytras", power: 0 },
  { nickname: "daena", power: 0 },
  { nickname: "QueenCalabaza", power: 0 },
  { nickname: "SNAKEYES1", power: 0 },
  { nickname: "Pilll", power: 0 },
  { nickname: "Gildartz", power: 0 },
  { nickname: "GuerreiraMilady", power: 0 },
  { nickname: "MadameBr", power: 0 },
  { nickname: "Nellyer", power: 0 },
  { nickname: "IDrFeelGoodI", power: 0 },
  { nickname: "xelator", power: 0 },
  { nickname: "leandroSCCP", power: 0 },
  { nickname: "ღMaria~", power: 0 },
  { nickname: "Pagan", power: 0 },
  { nickname: "shileMistik", power: 0 },
  { nickname: "Norstrom", power: 0 },
  { nickname: "SandiFarga", power: 0 },
  { nickname: "Mals149", power: 0 },
  { nickname: "MyLittleBonni", power: 0 },
  { nickname: "gato•black", power: 0 },
  { nickname: "anticmex", power: 0 },
  { nickname: "EduinZurcido", power: 0 },
  { nickname: "Aurtam", power: 0 },
  { nickname: "Willfer", power: 0 },
  { nickname: "Myshan", power: 0 },
  { nickname: "LordJFabR", power: 0 },
  { nickname: "MichiMicte", power: 0 },
  { nickname: "Isumairu", power: 0 },
  { nickname: "Yuse191", power: 0 },
  { nickname: "DrMatanzana", power: 0 },
  { nickname: "JavierNh", power: 0 },
  { nickname: "LuceroSerraty", power: 0 },
  { nickname: "oargve", power: 0 },
  { nickname: "DanyxHylian", power: 0 },
  { nickname: "Labrys83~Lnz", power: 0 },
  { nickname: "PetaZ", power: 0 },
  { nickname: "Diana33", power: 0 },
  { nickname: "Leon3586", power: 0 },
  { nickname: "Marcelo-jmd", power: 0 },
  { nickname: "Doctor1ChpgCIK", power: 0 },
  { nickname: "Orianablcd", power: 0 },
  { nickname: "ilhanki", power: 0 },
  { nickname: "Bluesunshine", power: 0 },
  { nickname: "doc-black", power: 0 },
  { nickname: "Tali2479", power: 0 },
  { nickname: "piliwis", power: 0 },
];

export default function Home() {
  const [search, setSearch] = useState("");
const [editingPlayer, setEditingPlayer] =
  useState<string | null>(null);

  const [newNickname, setNewNickname] = useState("");
const [newT1, setNewT1] = useState("");
const [newT2, setNewT2] = useState("");
const [newT3, setNewT3] = useState("");

const [roster, setRoster] = useState<Player[]>(() => {
  if (typeof window !== "undefined") {
    const saved =
      localStorage.getItem("n3xRoster");

    if (saved) {
      return JSON.parse(saved);
    }
  }

  return initialPlayers;

});

useEffect(() => {
  localStorage.setItem(
    "n3xRoster",
    JSON.stringify(roster)
  );
}, [roster]);

  const filteredPlayers = useMemo(() => {
    return roster
      .filter((player) =>
        player.nickname.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.power - a.power);
}, [search, roster]);

const totalPower = roster.reduce(
  (sum, p) => sum + p.power,
  0
);


const totalT2 = roster.reduce(
  (sum, p) => sum + (p.troop2 ?? 0),
  0
);

const totalT3 = roster.reduce(
  (sum, p) => sum + (p.troop3 ?? 0),
  0
);
const updatePlayerField = (
  nickname: string,
  field: "power" | "troop2" | "troop3",
  value: number
) => {
  setRoster((prev) =>
    prev.map((player) =>
      player.nickname === nickname
        ? {
            ...player,
            [field]: value,
          }
        : player
    )
  );
};

const addPlayer = () => {
  if (!newNickname.trim()) return;

  const newPlayer: Player = {
    nickname: newNickname.trim(),
    power: Number(newT1) || 0,
    troop2: Number(newT2) || 0,
    troop3: Number(newT3) || 0,
  };

  setRoster((prev) => [...prev, newPlayer]);

  setNewNickname("");
  setNewT1("");
  setNewT2("");
  setNewT3("");
};

const deletePlayer = (nickname: string) => {
  if (
    !window.confirm(
      `¿Eliminar a ${nickname} del roster?`
    )
  ) {
    return;
  }

  setRoster((prev) =>
    prev.filter(
      (player) =>
        player.nickname !== nickname
    )
  );
};

const exportRoster = () => {
const data = JSON.stringify(
  roster,
  null,
  2
);

  const blob = new Blob(
    [data],
    {
      type: "application/json",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download = "n3x-roster.json";

  a.click();

  URL.revokeObjectURL(url);
};

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>🐝 N3X Roster</h1>

<button
  onClick={exportRoster}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "15px",
  }}
>
  💾 Exportar roster
</button>

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
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  }}
>
  <h3>➕ Nuevo jugador</h3>

  <input
    placeholder="Nickname"
    value={newNickname}
    onChange={(e) =>
      setNewNickname(e.target.value)
    }
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
    }}
  />

  <input
    placeholder="T1"
    value={newT1}
    onChange={(e) => setNewT1(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
    }}
  />

  <input
    placeholder="T2"
    value={newT2}
    onChange={(e) => setNewT2(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
    }}
  />

  <input
    placeholder="T3"
    value={newT3}
    onChange={(e) => setNewT3(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px",
    }}
  />

  <button
    onClick={addPlayer}
    style={{
      background: "#16a34a",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    ➕ Añadir jugador
  </button>
</div>
      <div style={{ marginBottom: "20px" }}>
        <p>👥 Jugadores: {roster.length}</p>

    <p>
  ⚔️ Total T1: {(totalPower / 1000000).toFixed(1)}M
</p>

<p>
  🛡️ Total T2: {(totalT2 / 1000000).toFixed(1)}M
</p>

<p>
  🏹 Total T3: {(totalT3 / 1000000).toFixed(1)}M
</p>
      </div>

   <input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  placeholder="🔍 Buscar jugador..."
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    background: "#1e293b",
    color: "white",
    border: "2px solid #f59e0b",
    fontSize: "16px",
  }}
/>
   
      {filteredPlayers.map((player, index) => (
        <div
          key={player.nickname}
          style={{
            background: "#1e293b",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  }}
>
  <strong
    style={{
      fontSize: "18px",
      color: "#f59e0b",
    }}
  >
    #{index + 1} {player.nickname}
  </strong>

  <button
    onClick={() =>
      setEditingPlayer(
        editingPlayer === player.nickname
          ? null
          : player.nickname
      )
    }
    style={{
      background: "#2563eb",
      border: "none",
      color: "white",
      padding: "8px 12px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    {editingPlayer === player.nickname
      ? "Cerrar"
      : "✏️ Editar"}
  </button>
</div>

{editingPlayer === player.nickname && (
  <>

          <div>
  T1: {(player.power / 1000000).toFixed(1)}M


            <input
 type="text"
inputMode="numeric"
  defaultValue={player.power}
onChange={(e) =>
  updatePlayerField(
    player.nickname,
    "power",
    Number(e.target.value)
  )
}

  style={{
    width: "100%",
    marginTop: "8px",
    padding: "8px",
    borderRadius: "6px",
  }}
/>
          </div>



          <div style={{ marginTop: "10px" }}>
  T2

  <input
   type="text"
inputMode="numeric"
   defaultValue={player.troop2 ?? 0}
    onChange={(e) =>
      updatePlayerField(
        player.nickname,
        "troop2",
        Number(e.target.value)
      )
    }
    style={{
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      marginTop: "5px",
    }}
  />
</div>

      <div style={{ marginTop: "10px" }}>
  T3

  <input
   type="text"
inputMode="numeric"
   defaultValue={player.troop3 ?? 0}
    onChange={(e) =>
      updatePlayerField(
        player.nickname,
        "troop3",
        Number(e.target.value)
      )
    }
    style={{
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      marginTop: "5px",
    }}
  />

<button
  onClick={() =>
    deletePlayer(player.nickname)
  }
  style={{
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
  }}
>
  🗑️ Eliminar jugador
</button>

</div>
  </>
)}
  </div>
   ))}

    </main>
  );
}