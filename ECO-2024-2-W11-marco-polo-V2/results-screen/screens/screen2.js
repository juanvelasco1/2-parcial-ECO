// results-screen/screen2.js
import { router, socket } from "../routes.js";

export default function renderScreen2() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Pantalla de Ganador</h1>
        <h2 id="winner-message"></h2>
        <ul id="final-score-list"></ul>
        <button id="sort-alphabetically" style="margin-top: 1rem;">Ordenar Alfabéticamente</button>
    `;

  socket.on("updateScores", (players) => {
    const winnerMessage = document.getElementById("winner-message");
    const finalScoreList = document.getElementById("final-score-list");

    // Buscar al ganador
    const winner = players.find((player) => player.score >= 100);
    if (winner) {
      winnerMessage.textContent = `¡Felicidades, ${winner.nickname}! Has ganado el juego.`;

      // Mostrar la lista de jugadores ordenados por puntuación
      finalScoreList.innerHTML = ""; // Limpiar la lista anterior
      players.sort((a, b) => b.score - a.score);
      players.forEach((player, index) => {
        const playerItem = document.createElement("li");
        playerItem.textContent = `${index + 1}. ${player.nickname} (${player.score} pts)`;
        finalScoreList.appendChild(playerItem);
      });
    }

    // Mostrar el botón de "Ordenar Alfabéticamente" después de la actualización de la lista
    const sortButton = document.getElementById("sort-alphabetically");
    sortButton.style.display = "block";
  });

  // Función para ordenar alfabéticamente al presionar el botón
  document.getElementById("sort-alphabetically").addEventListener("click", () => {
    const finalScoreList = document.getElementById("final-score-list");
    const sortedPlayers = Array.from(finalScoreList.children).sort((a, b) =>
      a.textContent.localeCompare(b.textContent)
    );
    finalScoreList.innerHTML = ""; // Limpiar lista actual
    sortedPlayers.forEach((playerItem) => finalScoreList.appendChild(playerItem));
  });
}
