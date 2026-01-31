import "./home.css";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="page">
      <h2>Welcome to Elixir Chess!</h2>
      <p>Discover a new way of playing chess.</p>
      <div className="buttons">
        <div>
          <Link to="/">
            <button
              onClick={() =>
                alert(
                  "This feature is under development. Try the other mode for now!"
                )
              }
            >
              1 player
            </button>
          </Link>
        </div>
        <div>
          <Link to="/game">
            <button>2 players</button>
          </Link>
        </div>
      </div>

      <div className="footer">
        <p>Made with ❤️ by Popusoi Eugen.</p>
      </div>
    </div>
  );
}
