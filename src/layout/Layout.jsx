import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useInitAuth } from "../hooks/useInitAuth";

export default function Layout() {
  useInitAuth(); // <--  Auth må initialiseres før innhold
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
