import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInitAuth } from "../hooks/useInitAuth"; // <-- LEGG TIL DENNE

export default function Layout() {
  useInitAuth(); // <-- KALL DEN ALLER ØVERST
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
