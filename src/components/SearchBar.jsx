import { useState } from "react";
import Input from "./Input";

/* forslag til statiske forslag – kan flyttes til utils */
const speciesOptions = [
  "Small dogs",
  "Large dogs",
  "Cats",
  "Kittens",
  "Puppies",
];
const locationOptions = [
  "Oslo",
  "Bergen",
  "Trondheim",
  "Stavanger",
  "Tromsø",
  "Kristiansand",
];

export default function SearchBar({
  valueSpecies = "",
  valueLocation = "",
  onChangeSpecies,
  onChangeLocation,
}) {
  const [showSpecies, setShowSpecies] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const filtSpecies = speciesOptions.filter((o) =>
    o.toLowerCase().includes(valueSpecies.toLowerCase())
  );
  const filtLocation = locationOptions.filter((o) =>
    o.toLowerCase().includes(valueLocation.toLowerCase())
  );

  return (
    /* YTRE “pille” */
    <div
      className="
        w-full max-w-2xl mx-auto
        flex
        rounded-input bg-white
        border border-border-default
        focus-within:ring-2 focus-within:ring-secondary
        overflow-hidden
      "
    >
      {/* ------- Species ------- */}
      <div className="relative flex-1">
        <Input
          className="border-none rounded-none focus:ring-0"
          placeholder="Search Species, Kitten etc"
          value={valueSpecies}
          onChange={onChangeSpecies}
          onFocus={() => setShowSpecies(true)}
          onBlur={() => setTimeout(() => setShowSpecies(false), 120)}
        />

        {showSpecies && filtSpecies.length > 0 && (
          <ul className="absolute left-0 right-0 z-20 mt-1 rounded-input bg-white border border-border-default shadow-card">
            {filtSpecies.map((o) => (
              <li
                key={o}
                className="px-4 py-2 hover:bg-primary-light cursor-pointer text-neutral-dark"
                onMouseDown={() => {
                  onChangeSpecies({ target: { value: o } });
                  setShowSpecies(false);
                }}
              >
                {o}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* vertikal skille – vises alltid */}
      <div className="w-px bg-border-default self-stretch" />

      {/* ------- Location ------- */}
      <div className="relative flex-1">
        <Input
          className="border-none rounded-none focus:ring-0"
          placeholder="Location "
          value={valueLocation}
          onChange={onChangeLocation}
          onFocus={() => setShowLocation(true)}
          onBlur={() => setTimeout(() => setShowLocation(false), 120)}
        />

        {showLocation && filtLocation.length > 0 && (
          <ul className="absolute left-0 right-0 z-20 mt-1 rounded-input bg-white border border-border-default shadow-card">
            {filtLocation.map((o) => (
              <li
                key={o}
                className="px-4 py-2 hover:bg-primary-light cursor-pointer text-neutral-dark"
                onMouseDown={() => {
                  onChangeLocation({ target: { value: o } });
                  setShowLocation(false);
                }}
              >
                {o}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
