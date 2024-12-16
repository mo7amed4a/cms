import { Link } from "react-router-dom";
import "../../styles/tailwind.css";
export function App() {
  return (
    <div className="app bg-red-500 p-4">
      Page
      <Link to={"/plugins/documentation/about"}>Documentation</Link>
    </div>
  );
}
