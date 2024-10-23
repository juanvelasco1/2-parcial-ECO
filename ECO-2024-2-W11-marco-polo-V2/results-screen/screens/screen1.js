// results-screen/screen1.js
import { router, socket } from "../routes.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Resultados en Tiempo Real</h1>
        <ul id="score-list"></ul>
    `;

  // Escuchar el evento 'updateScores' para recibir la lista de jugadores y sus puntuaciones
  socket.on("updateScores", (players) => {
    const scoreList = document.getElementById("score-list");
    scoreList.innerHTML = ""; // Limpiar la lista actual

    // Ordenar jugadores por puntuación de mayor a menor
    players.sort((a, b) => b.score - a.score);

    // Mostrar la lista de jugadores y sus puntuaciones
    players.forEach((player, index) => {
      const playerItem = document.createElement("li");
      playerItem.textContent = `${index + 1}. ${player.nickname} (${player.score} pts)`;
      scoreList.appendChild(playerItem);
    });
  });

  // Escuchar el evento 'notifyGameOver' para cambiar a la pantalla de ganador
  socket.on("notifyGameOver", () => {
    router.navigate("/screen2");
  });
}
