import { useState } from "react";
import Input from "./Input";

const speciesOptions = [
  "Small Dogs",
  "Large Dogs",
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
  // Optional: onSearchSubmit, osv.
}) {
  const [showSpeciesDropdown, setShowSpeciesDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Filtered suggestions (case-insensitive)
  const filteredSpecies = speciesOptions.filter((opt) =>
    opt.toLowerCase().includes(valueSpecies.toLowerCase())
  );
  const filteredLocations = locationOptions.filter((opt) =>
    opt.toLowerCase().includes(valueLocation.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto gap-3 md:flex-row md:gap-4">
      {/* SPECIES FIELD */}
      <div className="relative flex-1">
        <Input
          name="species"
          placeholder="Search Species, Kitten, etc"
          value={valueSpecies}
          onChange={onChangeSpecies}
          onFocus={() => setShowSpeciesDropdown(true)}
          onBlur={() => setTimeout(() => setShowSpeciesDropdown(false), 120)}
          autoComplete="off"
        />
        {/* Dropdown */}
        {showSpeciesDropdown && filteredSpecies.length > 0 && (
          <ul className="absolute left-0 right-0 z-20 mt-1 rounded-input bg-white border border-border-default shadow-card">
            {filteredSpecies.map((option) => (
              <li
                key={option}
                className="px-4 py-2 text-base text-neutral-dark hover:bg-primary-light cursor-pointer transition"
                onMouseDown={() => {
                  onChangeSpecies({ target: { value: option } });
                  setShowSpeciesDropdown(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* VERTICAL DIVIDER på desktop */}
      <div className="hidden md:flex items-center px-2">
        <div className="w-px h-8 bg-border-default" />
      </div>
      {/* LOCATION FIELD */}
      <div className="relative flex-1">
        <Input
          name="location"
          placeholder="Location etc"
          value={valueLocation}
          onChange={onChangeLocation}
          onFocus={() => setShowLocationDropdown(true)}
          onBlur={() => setTimeout(() => setShowLocationDropdown(false), 120)}
          autoComplete="off"
        />
        {showLocationDropdown && filteredLocations.length > 0 && (
          <ul className="absolute left-0 right-0 z-20 mt-1 rounded-input bg-white border border-border-default shadow-card">
            {filteredLocations.map((option) => (
              <li
                key={option}
                className="px-4 py-2 text-base text-neutral-dark hover:bg-primary-light cursor-pointer transition"
                onMouseDown={() => {
                  onChangeLocation({ target: { value: option } });
                  setShowLocationDropdown(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
