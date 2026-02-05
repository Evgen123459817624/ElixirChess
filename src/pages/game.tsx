import "./game.css";
import { useState } from "react";
import kingWhite from "../assets/king-white.png";
import kingBlack from "../assets/king-black.png";
import pawnBlack from "../assets/pawn-black.png";
import knightBlack from "../assets/knight-black.png";
import bishopBlack from "../assets/bishop-black.png";
import rookBlack from "../assets/king-black.png";
import queenBlack from "../assets/queen-black.png";

const piecePrice: Record<string, number> = {
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
};

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

  const [elixirBlack, setElixirBlack] = useState<number>(0);
  const [elixirWhite, setElixirWhite] = useState<number>(0);

  const [selectedShopPiece, setSelectedShopPiece] = useState<
    "pawn" | "knight" | "bishop" | "rook" | "queen" | null
  >(null);

  const handleCellClick = (id: number) => {
    //deselect logic
    if (id === selectedPieceID) {
      setSelectedPieceID(null);
      return;
    }

    //first click - select a piece
    if (
      selectedPieceID === null &&
      board[id].currPiece !== null &&
      board[id].color === colorTurn
    ) {
      setSelectedPieceID(id);
      setSelectedShopPiece(null);
      return;
    }

    //second click - move the piece
    if (selectedPieceID !== null && id !== selectedPieceID) {
      movePiece(selectedPieceID, id);
      setSelectedPieceID(null);
      setSelectedShopPiece(null);
      setColorTurn((prevColorTurn) =>
        prevColorTurn === "white" ? "black" : "white",
      );
      if (colorTurn === "black")
        setElixirBlack((prevElixirCost) => prevElixirCost + 1);
    }

    //placing a selected shop piece
    if (selectedShopPiece !== null) {
      if (colorTurn !== "black") return;

      let cost = piecePrice[selectedShopPiece];

      if (elixirBlack < cost || board[id].canSpawn !== selectedShopPiece)
        return;

      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[id] = {
          ...newBoard[id],
          color: "black",
          currPiece: selectedShopPiece,
          currImg:
            selectedShopPiece === "pawn"
              ? pawnBlack
              : selectedShopPiece === "knight"
                ? knightBlack
                : selectedShopPiece === "bishop"
                  ? bishopBlack
                  : selectedShopPiece === "rook"
                    ? rookBlack
                    : queenBlack,
        };
        return newBoard;
      });
      setElixirBlack((prevElixir) => prevElixir - cost);
      setSelectedShopPiece(null);
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

  const selectPieceShop = (
    piece: "pawn" | "knight" | "bishop" | "rook" | "queen",
  ) => {
    if (colorTurn !== "black") return;
    setSelectedPieceID(null);
    setSelectedShopPiece((prevSelectedShopPiece) => {
      return prevSelectedShopPiece === piece ? null : piece;
    });
  };

  return (
    <>
      <div className="blackShop">
        {elixirBlack}
        <img
          src={pawnBlack}
          alt=""
          onClick={() => selectPieceShop("pawn")}
          className={selectedShopPiece === "pawn" ? "selectedShopPiece" : ""}
        />
        <img
          src={knightBlack}
          alt=""
          onClick={() => selectPieceShop("knight")}
          className={selectedShopPiece === "knight" ? "selectedShopPiece" : ""}
        />
        <img
          src={bishopBlack}
          alt=""
          onClick={() => selectPieceShop("bishop")}
          className={selectedShopPiece === "bishop" ? "selectedShopPiece" : ""}
        />
        <img
          src={queenBlack}
          alt=""
          onClick={() => selectPieceShop("queen")}
          className={selectedShopPiece === "queen" ? "selectedShopPiece" : ""}
        />
      </div>
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
