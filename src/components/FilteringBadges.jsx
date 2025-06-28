import CatIcon from "../assets/Cat.png";
import DogIcon from "../assets/Dog.png";
import OtherIcon from "../assets/Otheranimal.png";

const BADGES = [
  { label: "Dogs", value: "dog", icon: DogIcon },
  { label: "Cats", value: "cat", icon: CatIcon },
  { label: "Other Animals", value: "other", icon: OtherIcon },
];

export default function FilteringBadges({ selected, onChange }) {
  return (
    <div
      className="
        flex gap-4 md:gap-6 xl:gap-[24px]
        justify-center
        mb-6 md:mb-8 xl:mb-[34px]
      "
      aria-label="Filter pets by category"
    >
      {BADGES.map((badge) => {
        const isSelected = selected === badge.value;
        return (
          <button
            key={badge.value}
            type="button"
            onClick={() => onChange(badge.value)}
            className={`
              flex flex-col items-center px-4 py-3
              rounded-badges
              border-2
              bg-white
              transition-all
              select-none
              shadow-none
              focus:outline-none
              focus-visible:ring-2 focus-visible:ring-secondary
              ${
                isSelected
                  ? "border-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.12)]"
                  : "border-border-default hover:border-[#AAAAAA] cursor-pointer"
              }
            `}
            aria-pressed={isSelected}
          >
            <img
              src={badge.icon}
              alt={badge.label}
              className="w-7 h-7 md:w-9 md:h-9 xl:w-11 xl:h-11 mb-2"
              draggable={false}
              // Tilpass ikonstørrelse på desktop
            />
            <span
              className={`
                font-medium
                text-primary
                text-sm md:text-base xl:text-lg
                ${isSelected ? "font-semibold" : ""}
              `}
            >
              {badge.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
