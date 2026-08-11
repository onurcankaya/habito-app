import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

export default function AppTitle() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="app-logo" className="w-5" />
      <h4>Habito</h4>
    </Link>
  );
}
