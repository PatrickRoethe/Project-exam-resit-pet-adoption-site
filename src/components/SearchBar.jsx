import { useState } from "react";
import Input from "./Input";

export default function SearchBar({
  valueSpecies = "",
  valueLocation = "",
  onChangeSpecies,
  onChangeLocation,
  suggestionsSpecies = [],
  suggestionsLocation = [],
}) {
  const [openSpecies, setOpenSpecies] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  /* filtrer forslag mens brukeren skriver */
  const specOpts = suggestionsSpecies.filter((s) =>
    s.toLowerCase().includes(valueSpecies.toLowerCase())
  );
  const locOpts = suggestionsLocation.filter((l) =>
    l.toLowerCase().includes(valueLocation.toLowerCase())
  );

  const inputCls =
    "bg-neutral-light text-sm sm:text-base border-none rounded-none focus:ring-0 text-neutral-dark placeholder-neutral-dark";

  return (
    <div
      className="
        w-full max-w-2xl mx-auto flex
        rounded-input bg-white border border-border-default
        focus-within:ring-2 focus-within:ring-secondary overflow-visible"
    >
      {/* ---------- Species ---------- */}
      <div className="relative flex-1">
        <Input
          placeholder="Search Species, Kitten etc"
          className={inputCls}
          value={valueSpecies}
          onChange={onChangeSpecies}
          onFocus={() => setOpenSpecies(true)}
          onBlur={() => setTimeout(() => setOpenSpecies(false), 100)}
        />
        {openSpecies && specOpts.length > 0 && (
          <ul
            className="
              absolute inset-x-0 z-30 mt-1 max-h-48 overflow-auto
              rounded-input bg-neutral-light border border-border-default shadow-card"
          >
            {specOpts.map((opt) => (
              <li
                key={opt}
                className="px-4 py-2 hover:bg-primary-light cursor-pointer text-neutral-dark"
                onMouseDown={() => {
                  onChangeSpecies({ target: { value: opt } });
                  setOpenSpecies(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* vertikal skille */}
      <div className="w-px bg-border-default self-stretch" />

      {/* ---------- Location ---------- */}
      <div className="relative flex-1">
        <Input
          placeholder="Location"
          className={inputCls}
          value={valueLocation}
          onChange={onChangeLocation}
          onFocus={() => setOpenLocation(true)}
          onBlur={() => setTimeout(() => setOpenLocation(false), 100)}
        />
        {openLocation && locOpts.length > 0 && (
          <ul
            className="
              absolute inset-x-0 z-30 mt-1 max-h-48 overflow-auto
              rounded-input bg-neutral-light border border-border-default shadow-card"
          >
            {locOpts.map((opt) => (
              <li
                key={opt}
                className="px-4 py-2 hover:bg-primary-light cursor-pointer text-neutral-dark"
                onMouseDown={() => {
                  onChangeLocation({ target: { value: opt } });
                  setOpenLocation(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
