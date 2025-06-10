import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <h1 className="text-xl font-bold">
        <Link to="/">PetAdopt</Link>
      </h1>

      <div className="flex gap-4 text-sm">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
