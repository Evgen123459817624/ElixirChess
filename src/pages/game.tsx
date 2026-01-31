import "./game.css";

export function Game() {
  const board = [];

  for (let i = 0; i < 64; i++) {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const isDark = (row + col) % 2 === 1;
    let canSpawn: string = "";
    if (row === 1 || row === 6) {
      canSpawn = "pawn";
    } else if (row === 0 || row === 7) {
      if (col === 0 || col === 7) {
        canSpawn = "rook";
      } else if (col === 1 || col === 6) {
        canSpawn = "knight";
      } else if (col === 2 || col === 5) {
        canSpawn = "bishop";
      } else if (col === 3) {
        canSpawn = "queen";
      } else if (col === 4) {
        canSpawn = "king";
      }
    }
    board.push({ id: i, isDark, row, col, canSpawn });
  }

  return (
    <>
      <div className="board">
        {board.map((cell) => (
          <div
            key={cell.id}
            className={`cell ${cell.isDark ? "black" : "white"}`}
          ></div>
        ))}
      </div>
    </>
  );
}
