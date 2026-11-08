"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type HivePosition = {
  id: number;
  x: number;
  y: number;
  ring: number;
  player?: string;
  power?: number;
};

type Player = {
  nickname: string;
  power: number;
    troop2?: number;
  troop3?: number;
};
const players: Player[] = [
  {
  nickname: "Myshkïn",
  power: 34200000,
  troop2: 31500000,
  troop3: 29800000,
},
  { nickname: "iKWAI", power: 32400000 },
  { nickname: "Igor", power: 24000000 },
  { nickname: "leoagasichi", power: 23850000 },
  { nickname: "Molly's", power: 23250000 },
  { nickname: "Медед", power: 22692101 },
  { nickname: "Saalem", power: 22000000 },
  { nickname: "BlueSun", power: 21600000 },
  { nickname: "Capsoul", power: 20600000 },
  { nickname: "LAMDA", power: 20600000 },
  { nickname: "Pamigab", power: 20500000 },
  { nickname: "Daavee", power: 20200000 },
{ nickname: "Aldebaran", power: 19800000 },
{ nickname: "Nimue", power: 19200000 },
{ nickname: "Ragnar", power: 18800000 },
{ nickname: "Titan", power: 18500000 },
{ nickname: "Phoenix", power: 18100000 },
{ nickname: "Kira", power: 17700000 },
{ nickname: "Wolf", power: 17400000 },
{ nickname: "Athena", power: 17100000 },
];


function RosterPanel({
  sortedPlayers,
  selectedPlayer,
  setSelectedPlayer,
  setEditNickname,
  setEditT1,
  setEditT2,
  setEditT3,
}: any) {
  return (
    <div
      style={{
        background: "#102030",
        border: "1px solid #1e3a5f",
        borderRadius: "16px",
        padding: "20px",
       width: "320px",
        maxHeight: "500px",
        overflowY: "auto",
        boxShadow:
          "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      <h3
        style={{
          color: "#f59e0b",
          marginTop: 0,
          marginBottom: 15,
        }}
      >
        👥 Roster N3X
      </h3>

      {sortedPlayers.map((player: any) => (
        <div
          key={player.nickname}
          onClick={() => {
            setSelectedPlayer(player);

            setEditNickname(player.nickname);
            setEditT1(String(player.power));
            setEditT2(String(player.troop2 ?? 0));
            setEditT3(String(player.troop3 ?? 0));
          }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #374151",
            padding: "8px",
            cursor: "pointer",
            borderRadius: "8px",

            background:
              selectedPlayer?.nickname ===
              player.nickname
                ? "#1e3a8a"
                : "transparent",

            boxShadow:
              selectedPlayer?.nickname ===
              player.nickname
                ? "0 0 10px rgba(59,130,246,0.35)"
                : "none",
          }}
        >
          <span>{player.nickname}</span>

          <span>
            {(player.power / 1000000).toFixed(1)}M
          </span>
        </div>
      ))}
    </div>
  );
}



function PlayerEditor({
  selectedPlayer,
  editNickname,
  editT1,
  editT2,
  editT3,
  setEditNickname,
  setEditT1,
  setEditT2,
  setEditT3,
  setSelectedPlayer,
  playersData,
  setPlayersData,
}: any) {


if (!selectedPlayer) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 12,
        padding: 24,
        width: "550px",
        minHeight: "320px",
        border: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
textAlign: "center",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "16px",
          color: "#f59e0b",
          fontSize: "1.8rem",
          textShadow:
            "0 0 10px rgba(245,158,11,0.3)",
        }}
      >
        👤 Editor de jugadores
      </h2>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "1rem",
          lineHeight: 1.6,
        }}
      >
        Selecciona un jugador del roster para
        visualizar o modificar sus estadísticas.
      </p>

      <div
        style={{
          marginTop: 20,
          padding: "16px",
          background: "#1e293b",
          borderRadius: 8,
          border: "1px solid #334155",
        }}
      >
        <h4
          style={{
            marginTop: 0,
            color: "#38bdf8",
          }}
        >
          📊 Centro de control
        </h4>

        <p>👥 Jugadores cargados: {playersData.length}</p>

        <hr
          style={{
            borderColor: "#334155",
            margin: "12px 0",
          }}
        />

        <p>✏️ Modificar tropas y nickname</p>
        <p>💾 Guardar cambios</p>
        <p>🗑️ Eliminar jugadores</p>
        <p>📈 Consultar estadísticas</p>
      </div>
    </div>
  );
}
return (
  <div
    style={{
      marginTop: 12,
      padding: "12px",
      background: "#111827",
      borderRadius: 8,
      width: "550px",
    }}
  >
    <button
      onClick={() => {
        setSelectedPlayer(null);
      }}
    >
      ❌ Deseleccionar jugador
    </button>

      <p>
        <strong>
          {selectedPlayer.nickname}
        </strong>
      </p>

      <p>
        T1:
        {(Number(editT1) / 1000000).toFixed(1)}M
      </p>

      <p>
        T2:
        {(Number(editT2) / 1000000).toFixed(1)}M
      </p>

      <p>
        T3:
        {(Number(editT3) / 1000000).toFixed(1)}M
      </p>

<p>
  TOTAL: {((
    Number(editT1) +
    Number(editT2) +
    Number(editT3)
  ) / 1000000).toFixed(1)}M
</p>

      <h4>Editar valores</h4>

      <p>
        Nickname:
        <input
          value={editNickname}
          onChange={(e) =>
            setEditNickname(e.target.value)
          }
        />
      </p>

 <p>
  T1:
  <input
    value={editT1}
    onChange={(e) => setEditT1(e.target.value)}
    style={{
      marginLeft: 10,
      width: 150,
      background: "white",
      color: "black",
      border: "2px solid red",
    }}
  />
</p>

<p>
  T2:
  <input
    value={editT2}
    onChange={(e) => setEditT2(e.target.value)}
    style={{
      marginLeft: 10,
      width: 150,
    }}
  />
</p>

<p>
  T3:
  <input
    value={editT3}
    onChange={(e) => setEditT3(e.target.value)}
    style={{
      marginLeft: 10,
      width: 150,
    }}
  />
</p>

<button
  onClick={() => {
    if (!selectedPlayer) return;

    const updatedPlayer = {
      ...selectedPlayer,
      nickname: editNickname,
      power: Number(editT1),
      troop2: Number(editT2),
      troop3: Number(editT3),
    };

    setPlayersData(
      playersData.map((player: any) =>
        player.nickname === selectedPlayer.nickname
          ? updatedPlayer
          : player
      )
    );

    setSelectedPlayer(updatedPlayer);
  }}
  style={{
    marginTop: 10,
    padding: "6px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
>
  Guardar
</button>

<button
  onClick={() => {
    if (!selectedPlayer) return;

    const confirmDelete = confirm(
      `¿Eliminar a ${selectedPlayer.nickname}?`
    );

    if (!confirmDelete) return;

    setPlayersData(
      playersData.filter(
        (player: any) =>
          player.nickname !== selectedPlayer.nickname
      )
    );

    setSelectedPlayer(null);
  }}
  style={{
    marginTop: 10,
    marginLeft: 10,
    padding: "6px 12px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
>
  Eliminar jugador
</button>

    </div>
  );
}

export default function Home() {
  const size = 35;

  const [selectedPlayer, setSelectedPlayer] =
    useState<Player | null>(null);
const [editT1, setEditT1] = useState("");
const [editT2, setEditT2] = useState("");
const [editT3, setEditT3] = useState("");

const [selectedSanctuary, setSelectedSanctuary] =
  useState<number | null>(null);

  const [moveMode, setMoveMode] =
  useState(false);

  const [deleteMode, setDeleteMode] =
  useState(false);

  const [createSanctuaryMode, setCreateSanctuaryMode] =
  useState(false);

const [editNickname, setEditNickname] = useState("");

const [newNickname, setNewNickname] =
  useState("");

const [newT1, setNewT1] =
  useState("");

const [newT2, setNewT2] =
  useState("");

const [newT3, setNewT3] =
  useState("");

  const fileInputRef =
     useRef<HTMLInputElement>(null);

    const [assignmentMode, setAssignmentMode] =
  useState<"auto" | "manual">("manual");

const [manualAssignments, setManualAssignments] =
  useState<Record<number, string>>({});

const [playersData, setPlayersData] =
  useState<Player[]>(players);

const [customSanctuaries, setCustomSanctuaries] =
  useState<HivePosition[]>([]);


  const [cityWidth, setCityWidth] = useState(15);

const [cityHeight, setCityHeight] = useState(15);

const [cityName, setCityName] = useState("VALHALLA");

const [loaded, setLoaded] = useState(false);

  const [movingSanctuary, setMovingSanctuary] =
  useState<HivePosition | null>(null);

useEffect(() => {
  const savedPlayers =
    localStorage.getItem("n3x-players");

  if (savedPlayers) {
    setPlayersData(JSON.parse(savedPlayers));
  }

  const savedCityName =
  localStorage.getItem("n3x-city-name");

if (savedCityName) {
  setCityName(savedCityName);
}

const savedCityWidth =
  localStorage.getItem("n3x-city-width");

if (savedCityWidth) {
  setCityWidth(Number(savedCityWidth));
}

const savedCityHeight =
  localStorage.getItem("n3x-city-height");

if (savedCityHeight) {
  setCityHeight(Number(savedCityHeight));
}

}, []);

useEffect(() => {
  const savedAssignments =
    localStorage.getItem(
      "n3x-manual-assignments"
    );

  if (
    savedAssignments &&
    savedAssignments !== "{}"
  ) {
    setManualAssignments(
      JSON.parse(savedAssignments)
    );
  }

  const savedCustomSanctuaries =
    localStorage.getItem(
      "n3x-custom-sanctuaries"
    );

  if (savedCustomSanctuaries) {

    setCustomSanctuaries(
      JSON.parse(savedCustomSanctuaries)
    );
   
  }

  setLoaded(true);
}, []);

useEffect(() => {

  if (!loaded) return;

  localStorage.setItem(
    "n3x-custom-sanctuaries",
    JSON.stringify(customSanctuaries)
  );

}, [customSanctuaries, loaded]);

useEffect(() => {
  if (playersData !== players) {
    localStorage.setItem(
      "n3x-players",
      JSON.stringify(playersData)
    );
  }
}, [playersData]);

useEffect(() => {
  if (
    Object.keys(manualAssignments).length === 0
  ) {
    return;
  }

  localStorage.setItem(
    "n3x-manual-assignments",
    JSON.stringify(
      manualAssignments
    )
  );
}, [manualAssignments]);

useEffect(() => {

  if (!loaded) return;

  localStorage.setItem(
    "n3x-city-name",
    cityName
  );

}, [cityName, loaded]);

useEffect(() => {

  if (!loaded) return;

  localStorage.setItem(
    "n3x-city-width",
    String(cityWidth)
  );

}, [cityWidth, loaded]);

useEffect(() => {

  if (!loaded) return;

  localStorage.setItem(
    "n3x-city-height",
    String(cityHeight)
  );

}, [cityHeight, loaded]);

const CITY_START_X =
  Math.floor((size - cityWidth) / 2);

const CITY_END_X =
  CITY_START_X + cityWidth - 1;

const CITY_START_Y =
  Math.floor((size - cityHeight) / 2);

const CITY_END_Y =
  CITY_START_Y + cityHeight - 1;

 const sortedPlayers = [...playersData].sort(
  (a, b) =>
    (
      b.power +
      (b.troop2 ?? 0) +
      (b.troop3 ?? 0)
    ) -
    (
      a.power +
      (a.troop2 ?? 0) +
      (a.troop3 ?? 0)
    )
);

const sanctuaries = customSanctuaries;

  const hivePower = sanctuaries.map(
  (sanctuary) => {
    const player = playersData.find(
      (p) =>
        p.nickname === sanctuary.player
    );

    return {
      player:
        sanctuary.player ??
        "Vacía",
      power: player?.power ?? 0,
      ring: sanctuary.ring,
    };
  }
);

  return (
 <main
  style={{
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #07131d 0%, #0f1f2e 100%)",
    color: "white",
    padding: "24px",
    fontFamily:
      "Segoe UI, Arial, sans-serif",
  }}
>
  <h1
  style={{
    color: "#f59e0b",
    textAlign: "center",
    marginBottom: "8px",
    fontSize: "2.4rem",
    textShadow:
      "0 0 12px rgba(245,158,11,0.35)",
  }}
>
  🐝 Planificador de Colmena N3X
</h1>

<p
  style={{
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "25px",
  }}
>
  Last Asylum • Servidor 104
</p>

<div
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    marginBottom: "20px",
  }}
>
  <RosterPanel
    sortedPlayers={sortedPlayers}
    selectedPlayer={selectedPlayer}
    setSelectedPlayer={setSelectedPlayer}
    setEditNickname={setEditNickname}
    setEditT1={setEditT1}
    setEditT2={setEditT2}
    setEditT3={setEditT3}
  />

  <PlayerEditor
    selectedPlayer={selectedPlayer}
    editNickname={editNickname}
    editT1={editT1}
    editT2={editT2}
    editT3={editT3}
    setEditNickname={setEditNickname}
    setEditT1={setEditT1}
    setEditT2={setEditT2}
    setEditT3={setEditT3}
    setSelectedPlayer={setSelectedPlayer}
    playersData={playersData}
    setPlayersData={setPlayersData}
  />
</div>

<div
  style={{
    marginTop: 20,
    background: "#102030",
 border: "1px solid #0f172a",
    borderRadius: "16px",
    padding: "20px",
    boxShadow:
      "0 8px 24px rgba(0,0,0,0.35)",
   width: "600px",
  }}
>
  <h3
    style={{
      color: "#d84d23",
      marginTop: 0,
      marginBottom: 15,
    }}
  >
    🐝 Control de Colmenas
  </h3>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "nowrap",
    }}
  >

    <button
      onClick={() => {
        if (
          confirm(
            "¿Restaurar distribución automática?"
          )
        ) {
          setManualAssignments({});
          setSelectedPlayer(null);
          setAssignmentMode("auto");
        }
      }}
style={{
  width: "180px",
  height: "60px",
  background:
    "linear-gradient(135deg, #f59e0b, #ea580c)",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1.15rem",
  boxShadow:
    "0 0 15px rgba(245,158,11,0.35)",
}}
>
  🔄 REINICIAR
    </button>
    <div
  style={{
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginTop: "15px",
  }}
></div>
<button


  onClick={() => {

    setMoveMode(!moveMode);

 if (!moveMode) {
  setCreateSanctuaryMode(false);
  setDeleteMode(false);
}

  }}
  style={{
    width: "180px",
    height: "60px",
    background: moveMode
      ? "linear-gradient(135deg, #0ea5e9, #2563eb)"
      : "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.05rem",
    boxShadow: moveMode
      ? "0 0 15px rgba(14,165,233,0.4)"
      : "none",
  }}
>
  📦 REUBICAR
</button>

<button
  onClick={() => {

    setDeleteMode(!deleteMode);

    if (!deleteMode) {
      setMoveMode(false);
      setCreateSanctuaryMode(false);
    }

  }}
  style={{
    width: "180px",
    height: "60px",
    background: deleteMode
      ? "linear-gradient(135deg, #ef4444, #b91c1c)"
      : "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.05rem",
    boxShadow: deleteMode
      ? "0 0 15px rgba(239,68,68,0.35)"
      : "none",
  }}
>
  🗑 ELIMINAR
</button>

<button
  onClick={() => {

    setCreateSanctuaryMode(
      !createSanctuaryMode
    );

 if (!createSanctuaryMode) {
  setMoveMode(false);
  setDeleteMode(false);
}

  }}
  style={{
    width: "180px",
    height: "60px",
    background: createSanctuaryMode
      ? "linear-gradient(135deg, #22c55e, #16a34a)"
      : "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.05rem",
    boxShadow: createSanctuaryMode
      ? "0 0 15px rgba(34,197,94,0.35)"
      : "none",
  }}
>
  ➕ SANTUARIO
</button>

  </div>

</div>

     <p>
Ciudad: {cityWidth} columnas × {cityHeight} filas
</p>

      <p>
        Jugadores cargados: {players.length}
      </p>

      <div
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  }}
>

</div>

<div
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    marginTop: "20px",
  }}
></div>
{moveMode && (
  <div
    style={{
      marginTop: "20px",
      marginBottom: "10px",
      padding: "10px",
      background: "rgba(14,165,233,0.15)",
      border: "1px solid #0ea5e9",
      borderRadius: "8px",
      color: "#7dd3fc",
      fontWeight: "bold",
      textAlign: "center",
      transition: "all 0.15s ease",
    }}
  >
    📦 Arrastra una colmena para cambiarla de posición
  </div>
)}

<div
  style={{
    marginTop: 20,
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 20px)`,
    gap: "1px",
    width: "fit-content",
    background: "#1e293b",
    padding: "10px",
    borderRadius: "10px",
  }}
></div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 20px)`,
    gap: "1px",
    width: "fit-content",
    background: "#1e293b",
    padding: "10px",
    borderRadius: "10px",
  }}
>
<div
  style={{
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
    gap: 10,
  }}
>
  <span
    style={{
      color: "white",
      fontWeight: "bold",
    }}
  >
    Ciudad:
  </span>

<p>Nombre:</p>
  <input
  type="text"
  value={cityName}
  onChange={(e) =>
    setCityName(e.target.value)
  }
  placeholder="Nombre ciudad"
 style={{
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #475569",

  background: "#3b261e",
color: "#fbbf24",
fontWeight: "bold",
textTransform: "uppercase",

}}
/>

<p>Ancho:</p>

<input
  type="number"
  value={cityWidth}
  onChange={(e) =>
    setCityWidth(Number(e.target.value))
  }
  style={{
    width: "50px",
     marginLeft: "5px",
  }}
/>

<p>Alto:</p>

<input
  type="number"
  value={cityHeight}
  onChange={(e) =>
    setCityHeight(Number(e.target.value))
  }
  style={{
    width: "50px",
     marginLeft: "5px",
  }}
/>
</div>

{Array.from({ length: size * size }).map((_, index) => {

         const row = Math.floor(index / size);
          const col = index % size;

          const isCity =
  row >= CITY_START_Y &&
  row <= CITY_END_Y &&
  col >= CITY_START_X &&
  col <= CITY_END_X;

          let isSanctuary = false;
          let ringNumber: number | null = null;
          let playerName: string | null = null;
let isCenterCell = false;
let isNameRow = false;
let sanctuaryX = -1;
let sanctuaryY = -1;
let currentSanctuaryIndex = -1;
let currentSanctuaryId = -1;
let isSanctuaryCenter = false;
let isOuterSanctuaryCell = false;
 

          sanctuaries.forEach(
  ({ x, y, ring, player }, sanctuaryIndex) => {
if (
  col >= x &&
  col < x + 3 &&
  row >= y &&
  row < y + 3


) {

  sanctuaryX = x;
sanctuaryY = y;
  
  isNameRow = row === y + 1;

isSanctuaryCenter =
  col === x + 1 &&
  row === y + 1;

  isOuterSanctuaryCell =
  !isCenterCell;

  isSanctuary = true;
  ringNumber = ring;
  playerName = player ?? null;

if (
  manualAssignments[
    sanctuaries[sanctuaryIndex].id
  ]
) {
  playerName =
    manualAssignments[
      sanctuaries[sanctuaryIndex].id
    ];
}

  currentSanctuaryIndex =
    sanctuaryIndex;

    currentSanctuaryId =
  sanctuaries[sanctuaryIndex].id;

  isCenterCell =
    col === x + 1 &&
    row === y + 1;
}
          });

          return (
            <div
  key={index}
  title={
  isSanctuary
    ? playerName
      ? `${playerName}`
      : `Colmena libre`
    : `X:${col} Y:${row}`
}

onMouseDown={() => {
  if (
    moveMode &&
    isSanctuary
  ) {

    setCreateSanctuaryMode(false);
setDeleteMode(false);

    setMovingSanctuary({
      id: customSanctuaries[currentSanctuaryIndex].id,
      x: sanctuaryX,
      y: sanctuaryY,
      ring: ringNumber ?? 99,
      player: playerName || undefined,
    });
  }
}}

onMouseUp={() => {
  if (
    moveMode &&
    movingSanctuary &&
    !isSanctuary &&
    !isCity
  ) {

    const updatedSanctuaries =
      customSanctuaries.map((s) => {

        return s.x === movingSanctuary.x &&
          s.y === movingSanctuary.y
          ? {
              ...s,
              x: col,
              y: row,
            }
          : s;
      });

    setCustomSanctuaries(updatedSanctuaries);

    setMovingSanctuary(null);
  }
}}

 onClick={() => {

if (moveMode) {
 /*
  if (isSanctuary && !movingSanctuary) {

setMovingSanctuary({
  id: customSanctuaries[currentSanctuaryIndex].id,
  x: sanctuaryX,
  y: sanctuaryY,
  ring: ringNumber ?? 99,
  player: playerName || undefined,
});

    return;
  }
*/

/*
  if (
    movingSanctuary &&
    !isSanctuary &&
    !isCity
  ) {

const updatedSanctuaries =
  customSanctuaries.map((s) => {

    return s.x === movingSanctuary.x &&
      s.y === movingSanctuary.y
      ? {
          ...s,
          x: col,
          y: row,
        }
      : s;
  });

    setCustomSanctuaries(updatedSanctuaries);

  setMovingSanctuary(null);

  return;
}
  */
}

if (
  createSanctuaryMode &&
  !isSanctuary &&
  !isCity
) {
setCustomSanctuaries([
  ...customSanctuaries,
{
  id: Date.now(),
  x: col,
  y: row,
  ring: customSanctuaries.length + 1,
}
]);

  return;
}

 if (
  deleteMode &&
  isSanctuary
) {

  setCustomSanctuaries(
    customSanctuaries.filter(
      (s) =>
        !(
          s.x === sanctuaryX &&
          s.y === sanctuaryY
        )
    )
  );

  return;
}

if (assignmentMode === "manual") {

  if (!selectedPlayer) {

    const newAssignments = {
      ...manualAssignments,
    };

  delete newAssignments[
  currentSanctuaryId
];

    setManualAssignments(
      newAssignments
    );

    return;
  }

  const newAssignments = {
    ...manualAssignments,
  };

  Object.keys(newAssignments).forEach(
    (key) => {
      if (
        newAssignments[
          Number(key)
        ] === selectedPlayer.nickname
      ) {
        delete newAssignments[
          Number(key)
        ];
      }
    }
  );
newAssignments[
  currentSanctuaryId
] = selectedPlayer.nickname;

  setManualAssignments(
    newAssignments
  );

  return;
}

  if (playerName) {
    const player = sortedPlayers.find(
      (p) => p.nickname === playerName
    );

    setSelectedPlayer(player ?? null);

    if (player) {
      setEditNickname(player.nickname);

      setEditT1(String(player.power));
      setEditT2(String(player.troop2 ?? 0));
      setEditT3(String(player.troop3 ?? 0));
    }
  }
}}

style={{
  width: 20,
  height: 20,
borderRadius: "0",

border: isSanctuary
  ? moveMode
    ? "1px solid #38bdf8"
    : "none"
  : isCity
  ? "1px solid #fde68a"
  : "0.5px solid #334155",

   outline: isSanctuary ? "none" : undefined,

background: isCity
  ? "#f59e0b"
  : isSanctuary
  ? playerName
    ? ringNumber === 1
      ? "#0ea5e9"
      : "#7c3aed"
    : "#475569"
  : "#1e293b",

boxShadow:
  movingSanctuary &&
  sanctuaryX === movingSanctuary.x &&
  sanctuaryY === movingSanctuary.y
    ? "0 0 20px #22c55e"
    : isSanctuary
    ? playerName
      ? ringNumber === 1
        ? "0 0 6px rgba(14,165,233,0.45)"
        : "0 0 6px rgba(139,92,246,0.45)"
      : "0 0 4px rgba(71,85,105,0.3)"
    : "none",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transition: "all 0.15s ease",

  position: "relative",
  overflow: "visible",

  opacity:
  movingSanctuary &&
  sanctuaryX === movingSanctuary.x &&
  sanctuaryY === movingSanctuary.y
    ? 0.6
    : 1,

    
  cursor:
  moveMode &&
  isSanctuary
    ? (
        movingSanctuary &&
        sanctuaryX === movingSanctuary.x &&
        sanctuaryY === movingSanctuary.y
      )
      ? "grabbing"
      : "grab"
    : "pointer",

  fontSize: "9px",
  fontWeight: "bold",
  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  color: "#cbd5e1",
}}
 
 >
 {isSanctuary ? (
<span
style={{
  color: "#f8f5f5d7",
  fontSize: "8px",
  fontWeight: "bold",
  textAlign: "center",
  lineHeight: "1",
  textShadow: "2px 2px 2px rgba(0,0,0,1)",

  position: "absolute",
  inset: 0,

  width: "60px",
left: "-10px",
whiteSpace: "nowrap",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  zIndex: 10,
  pointerEvents: "none",
}}
>

{isNameRow && col === sanctuaryX
  ? (
      playerName
        ? String(playerName).substring(0, 10)
        : String(ringNumber)
    )
  : ""}
  </span>
) : !isCity ? (
  <span>{col}</span>
) : null}
            </div>
          );
        })}
</div>

{selectedPlayer && (
  <div
    style={{
      marginTop: 20,
      padding: 12,
      background: "#111827",
      borderRadius: 8,
      maxWidth: 400,
    }}
  >
    <h3>Jugador seleccionado</h3>

<button
  onClick={() => {
    setSelectedPlayer(null);
  }}
  style={{
    marginTop: 10,
    padding: "6px 12px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
>
  ❌ Deseleccionar jugador
</button>

<p>
  T3 en playersData:
  {
    playersData.find(
      (p) => p.nickname === "Myshkïn"
    )?.troop3
  }
</p>

    <p>
      <strong>{selectedPlayer.nickname}</strong>
    </p>

  <p>
  T1: {(Number(editT1) / 1000000).toFixed(1)}M
</p>

<p>
  T2: {(Number(editT2) / 1000000).toFixed(1)}M
</p>

<p>
 T3: {(Number(editT3) / 1000000).toFixed(1)}M


    
      TOTAL: {((
  Number(editT1) +
  Number(editT2) +
  Number(editT3)
) / 1000000).toFixed(1)}M
    </p>
    <hr />

<h4>Editar valores</h4>

<p>
  Nickname:
  <input
    value={editNickname}
    onChange={(e) =>
      setEditNickname(e.target.value)
    }
    style={{
      marginLeft: 10,
      width: 120,
    }}
  />
</p>

<p>
  T1:
  <input
    value={editT1}
    onChange={(e) => setEditT1(e.target.value)}
    style={{ marginLeft: 10, width: 120 }}
  />
</p>

<p>
  T2:
  <input
    value={editT2}
    onChange={(e) => setEditT2(e.target.value)}
    style={{ marginLeft: 10, width: 120 }}
  />
</p>

<p>
  T3:
  <input
    value={editT3}
    onChange={(e) => setEditT3(e.target.value)}
    style={{ marginLeft: 10, width: 120 }}
  />
</p>
<button
  onClick={() => {
    if (!selectedPlayer) return;

    const updatedPlayer = {
      ...selectedPlayer,
        nickname: editNickname,
      power: Number(editT1),
      troop2: Number(editT2),
      troop3: Number(editT3),
    };

    setPlayersData(
      playersData.map((player) =>
        player.nickname === selectedPlayer.nickname
          ? updatedPlayer
          : player
      )
    );

    setSelectedPlayer(updatedPlayer);
  }}
  style={{
    marginTop: 10,
    padding: "6px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
>
  Guardar
</button>

<button
  onClick={() => {
    if (!selectedPlayer) return;

    const confirmDelete = confirm(
      `¿Eliminar a ${selectedPlayer.nickname}?`
    );

    if (!confirmDelete) return;

    setPlayersData(
      playersData.filter(
        (player) =>
          player.nickname !==
          selectedPlayer.nickname
      )
    );

    setSelectedPlayer(null);
  }}
  style={{
    marginTop: 10,
    marginLeft: 10,
    padding: "6px 12px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }}
>
  Eliminar jugador
</button>
  </div>
)}



<div
  style={{
    marginTop: 20,
  }}
>
  <button
    onClick={() => {
 const dataStr = JSON.stringify(
  {
    players: playersData,
    assignments: manualAssignments,
  },
  null,
  2
);

      const blob = new Blob([dataStr], {
        type: "application/json",
      });

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "n3x-roster.json";

      link.click();

      URL.revokeObjectURL(url);
    }}
    style={{
      padding: "8px 14px",
      background: "#8b5cf6",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    📤 Exportar roster
  </button>

  <button
    onClick={() =>
      fileInputRef.current?.click()
    }
    style={{
      marginLeft: 10,
      padding: "8px 14px",
      background: "#0ea5e9",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    📥 Importar roster
  </button>

 <input
  type="file"
  accept=".json"
  ref={fileInputRef}
  style={{ display: "none" }}
  onChange={(event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = (e) => {
      try {
    const importedData =
  JSON.parse(
    e.target?.result as string
  );

if (importedData.players) {

  setPlayersData(
    importedData.players
  );

  setManualAssignments(
    importedData.assignments ?? {}
  );

} else {

  setPlayersData(
    importedData
  );

}

        alert(
          "Roster importado correctamente"
        );
      } catch {
        alert(
          "El archivo no es válido"
        );
      }
    };

    reader.readAsText(file);
  }}
/>
</div>


      <div style={{ marginTop: 20 }}>
        <p>🟫 Ciudad central 13×13</p>
        <p>🟦 Ring 1</p>
        <p>🟧 Ring 2</p>
      </div>
    </main>
  );
}