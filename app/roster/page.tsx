"use client";
import Link from "next/link";

import { useMemo, useState } from "react";

type Player = {
  nickname: string;
  power: number;
  troop2?: number;
  troop3?: number;
};

const players: Player[] = [
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

  const filteredPlayers = useMemo(() => {
    return players
      .filter((player) =>
        player.nickname.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.power - a.power);
  }, [search]);

  const totalPower = players.reduce(
    (sum, p) => sum + p.power,
    0
  );

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

      <div style={{ marginBottom: "20px" }}>
        <p>👥 Jugadores: {players.length}</p>

        <p>
          📊 Poder Total:{" "}
          {(totalPower / 1000000).toFixed(1)}M
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
         <strong>
  #{index + 1} {player.nickname}
</strong>


          <div>
            Poder: {(player.power / 1000000).toFixed(1)}M
          </div>

<div>
  Total militar:{" "}
  {(
    (
      player.power +
      (player.troop2 ?? 0) +
      (player.troop3 ?? 0)
    ) / 1000000
  ).toFixed(1)}
  M
</div>

          {!!player.troop2 && (
            <div>
              T2: {(player.troop2 / 1000000).toFixed(1)}M
            </div>
          )}

          {!!player.troop3 && (
            <div>
              T3: {(player.troop3 / 1000000).toFixed(1)}M
            </div>
          )}
        </div>
      ))}
    </main>
  );
}