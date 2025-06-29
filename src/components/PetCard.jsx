import { useState } from "react";
import { Link } from "react-router-dom";

export default function PetCard({ pet }) {
  const { id, name = "Ukjent kjæledyr", image } = pet ?? {};
  const fallback = "https://placedog.net/400/550";
  const [src, setSrc] = useState(image?.url || fallback);

  return (
    <Link
      to={`/pets/${id}`}
      className="
        block overflow-hidden rounded-xl border border-[#AAAAAA] bg-white
        transition duration-300
        hover:border-[#03A9F4] hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]
        hover:-translate-y-[2px] transform
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03A9F4] focus-visible:ring-offset-2
      "
    >
      {/* Bilde med riktig buet avslutning */}
      <div className="relative w-full aspect-[3/4]">
        <img
          src={src}
          alt={image?.alt || name}
          loading="lazy"
          onError={() => setSrc(fallback)}
          className="w-full h-full object-cover"
        />

        {/* Buen SKJÆRER seg inn i bildet (som ønsket) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="w-full h-[40px]"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 20 Q50 0 100 20" fill="white" />
          </svg>
        </div>
      </div>

      {/* Navn-seksjonen rett under buen */}
      <div className="bg-white px-3 pb-3 pt-1 text-center">
        <p className="text-sm font-semibold truncate text-primary">{name}</p>
      </div>
    </Link>
  );
}
