import CatIcon from "../assets/Cat.png";
import DogIcon from "../assets/Dog.png";
import OtherIcon from "../assets/Otheranimal.png";

/* ───── Badge-konfig ───── */
const BADGES = [
  { label: "Dogs", value: "dog", icon: DogIcon },
  { label: "Cats", value: "cat", icon: CatIcon },
  { label: "Other Animals", value: "other", icon: OtherIcon },
];

/* ───── Component ───── */
export default function FilteringBadges({ selected, onChange }) {
  return (
    <div
      className="
        flex justify-center
        gap-4  md:gap-6  xl:gap-8
        mb-6  md:mb-8 xl:mb-[34px]"
      aria-label="Filter pets by category"
    >
      {BADGES.map(({ label, value, icon }) => {
        const isActive = selected === value;

        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(value)}
            className={`
              w-24 h-24            md:w-28 md:h-28          xl:w-32 xl:h-32
              flex flex-col items-center justify-center
              rounded-badges bg-white select-none transition-all duration-150
              text-primary font-medium text-sm md:text-base xl:text-lg
              border-2
              ${
                isActive
                  ? /* ACTIVE  – blå kant, skygge OG *lift* */
                    "border-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.25)] -translate-y-[2px]"
                  : /* IDLE / HOVER */
                    "border-border-default hover:border-[#AAAAAA] cursor-pointer"
              }
              focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary
            `}
          >
            <img
              src={icon}
              alt={label}
              className="
                w-8 h-8   md:w-10 md:h-10   xl:w-12 xl:h-12
                mb-2 pointer-events-none select-none"
              draggable={false}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
