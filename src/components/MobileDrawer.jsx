import { Link } from "react-router-dom";
import logo from "../assets/Logowithwhitetext.png";

export default function MobileDrawer({
  open,
  onClose,
  links,
  isLoggedIn,
  logout,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#6DB67D] text-white">
      {/* Header */}
      <div className="h-16 bg-primary flex items-center px-4 justify-between">
        <Link to="/" onClick={onClose} className="flex items-center h-10">
          <img src={logo} alt="PetAdopt logo" className="h-full w-auto" />
        </Link>
        <button onClick={onClose} aria-label="Close menu" className="p-2">
          <svg
            width={28}
            height={28}
            fill="none"
            stroke="#fff"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Stripe */}
      <div className="h-12 bg-primary-strong-solid" />

      {/* Meny */}
      <div className="flex flex-col flex-grow px-8 pt-8 pb-0 bg-primary-medium-solid">
        <nav className="flex flex-col gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={onClose}
              className="flex justify-between items-center font-bold text-lg hover:underline hover:decoration-secondary underline-offset-4"
            >
              <span>{l.label}</span>
              <span>&gt;</span>
            </Link>
          ))}
        </nav>

        {isLoggedIn && (
          <>
            <div className="h-px bg-white opacity-70 mt-6 mb-4" />{" "}
            {/* streken tett på EditPet */}
            <div
              role="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full text-center font-bold text-lg py-3 cursor-pointer hover:text-secondary hover:underline underline-offset-4"
            >
              Log out
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-center text-xs text-white/90 py-4 border-t border-white/20">
        &copy; 2025 PetAdopt.
      </footer>
    </div>
  );
}
