import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logowithwhitetext.png";
import { useAuthStore } from "../store/authStore";
import MobileDrawer from "./MobileDrawer";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = !!user;

  const links = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
    ...(isLoggedIn
      ? [
          { to: "/create", label: "CreatePet" },
          { to: "/edit/1", label: "EditPet" },
        ]
      : []),
  ];

  return (
    <nav className="bg-primary border-b border-border-default px-4 py-2 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="flex items-center h-10 md:h-12">
        <img
          src={logo}
          alt="PetAdopt logo"
          className="h-full w-auto"
          draggable={false}
        />
      </Link>

      {/* Desktop-nav */}
      <div className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`
              font-medium text-base px-1 border-b-2 border-transparent transition-colors
              ${
                location.pathname === link.to
                  ? "text-white"
                  : "text-neutral-light"
              }
              hover:border-secondary hover:text-secondary
            `}
          >
            {link.label}
          </Link>
        ))}

        {isLoggedIn && (
          <button
            className="
              ml-4 px-6 py-2 rounded-btn bg-white text-primary font-semibold
              hover:bg-[#F2FAF3] hover:text-secondary hover:shadow-md transition-colors
              border border-primary
            "
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile: burger ↔ X */}
      <button
        className="md:hidden ml-auto p-2"
        onClick={() => setDrawerOpen((prev) => !prev)}
        aria-label={drawerOpen ? "Close menu" : "Open menu"}
      >
        {drawerOpen ? (
          // X-ikon
          <svg
            width={32}
            height={32}
            fill="none"
            stroke="#fff"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
          </svg>
        ) : (
          // Hamburger-ikon
          <svg
            width={32}
            height={32}
            fill="none"
            stroke="#fff"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* MobileDrawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={links}
        isLoggedIn={isLoggedIn}
        logout={() => {
          logout();
          setDrawerOpen(false);
          navigate("/login");
        }}
      />
    </nav>
  );
}
