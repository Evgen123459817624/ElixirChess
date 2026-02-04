import "./game.css";
import { useState } from "react";
import kingWhite from "../assets/king-white.png";
import kingBlack from "../assets/king-black.png";

interface Cell {
  id: number;
  isDark: boolean;
  row: number;
  col: number;
  canSpawn: string | null;
  currPiece: string | null;
  color: "white" | "black" | null;
  currImg: string | null;
}

const createInitialBoard = (): Cell[] => {
  const cells: Cell[] = [];
  for (let i = 0; i < 64; i++) {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const isDark = (row + col) % 2 === 1;
    let canSpawn: string | null = null;
    let color: "white" | "black" | null = null;
    let currPiece: string | null = null;
    let currImg: string | null = null;

    if (row === 1 || row === 6) {
      canSpawn = "pawn";
      color = row === 1 ? "black" : "white";
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
        currPiece = "king";
        if (row === 0) {
          currImg = kingBlack;
        } else {
          currImg = kingWhite;
        }
      }
      color = row === 0 ? "black" : "white";
    }
    cells.push({
      id: i,
      isDark,
      row,
      col,
      canSpawn,
      color,
      currPiece,
      currImg,
    });
  }
  return cells;
};

export function Game() {
  const [board, setBoard] = useState<Cell[]>(createInitialBoard());
  const [selectedPieceID, setSelectedPieceID] = useState<number | null>(null);
  const [colorTurn, setColorTurn] = useState<"white" | "black">("white");

  const handleCellClick = (id: number) => {
    if (
      selectedPieceID === null &&
      board[id].currPiece !== null &&
      board[id].color === colorTurn
    ) {
      setSelectedPieceID(id);
      return;
    }

    if (selectedPieceID !== null && id !== selectedPieceID) {
      movePiece(selectedPieceID, id);
      setSelectedPieceID(null);
      setColorTurn((prevColorTurn) =>
        prevColorTurn === "white" ? "black" : "white",
      );
    }
  };

  const movePiece = (from: number, to: number) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];

      newBoard[to] = {
        ...newBoard[to],
        currPiece: newBoard[from].currPiece,
        color: newBoard[from].color,
        currImg: newBoard[from].currImg,
      };

      newBoard[from] = {
        ...newBoard[from],
        currPiece: null,
        color: null,
        currImg: null,
      };

      return newBoard;
    });
  };

  return (
    <>
      <div className="board">
        {board.map((cell) => (
          <div
            key={cell.id}
            className={`cell ${cell.isDark ? "black" : "white"} ${selectedPieceID === cell.id ? "selected" : ""}`}
            onClick={() => handleCellClick(cell.id)}
          >
            {cell.currPiece && (
              <span className={`piece`}>
                <img src={cell.currImg || ""} alt={`${cell.color} king`} />
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
