import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Game } from "./pages/game";
import { Home } from "./pages/home";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<div>404 - You are lost, friend.</div>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
