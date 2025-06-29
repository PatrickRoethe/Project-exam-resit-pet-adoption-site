import { useEffect, useState } from "react";
import hero from "../assets/HeroBanner.png";
import FilteringBadges from "../components/FilteringBadges";
import Pagination from "../components/Pagination";
import PetCard from "../components/PetCard";
import SearchBar from "../components/SearchBar";

/* ───────── helper for posts-per-page ───────── */
function calcPetsPerPage() {
  const w = window.innerWidth;
  if (w >= 1280) return 20; // desktop  5×4
  if (w >= 640) return 12; // tablet   3×4
  return 8; // mobil    2×4
}

export default function Home() {
  /* ---------- søk & filter ---------- */
  const [speciesText, setSpeciesText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [badge, setBadge] = useState(null); // "dog" | "cat" | "other" | null

  /* ---------- data ---------- */
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- paginering ---------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage, setPetsPerPage] = useState(calcPetsPerPage);

  /* juster antall pr side ved resize */
  useEffect(() => {
    const h = () => setPetsPerPage(calcPetsPerPage());
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  /* hent ALLE dyr én gang (flere sider) */
  useEffect(() => {
    (async () => {
      try {
        let page = 1,
          last = false,
          all = [];
        while (!last) {
          const res = await fetch(
            `https://v2.api.noroff.dev/pets?limit=100&page=${page}`
          );
          const json = await res.json();
          all = [...all, ...(json?.data ?? [])];
          last = json?.meta?.isLastPage;
          page++;
        }
        console.log("Alle species fra API:", [
          ...new Set(all.map((p) => p.species)),
        ]);
        setPets(all);
      } catch (err) {
        console.error("Kunne ikke hente pets:", err);
        setPets([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------- filtrering ---------- */
  const filteredPets = pets.filter((pet) => {
    const s = (pet.species || "").toLowerCase(); // normalisert species

    // badge-filter
    if (badge === "dog" && s !== "dog") return false;
    if (badge === "cat" && s !== "cat") return false;
    if (badge === "other" && (s === "dog" || s === "cat")) return false;

    // fritekst species/name/breed
    if (speciesText.trim()) {
      const q = speciesText.toLowerCase();
      const hay = (pet.name + pet.species + pet.breed).toLowerCase();
      if (!hay.includes(q)) return false;
    }

    // lokasjon
    if (locationText.trim()) {
      if (!pet.location?.toLowerCase().includes(locationText.toLowerCase()))
        return false;
    }
    return true;
  });

  /* ---------- paginering ---------- */
  const totalPages = Math.max(1, Math.ceil(filteredPets.length / petsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const start = (currentPage - 1) * petsPerPage;
  const visiblePets = filteredPets.slice(start, start + petsPerPage);

  /* hopp til side 1 når filter endres */
  useEffect(() => setCurrentPage(1), [speciesText, locationText, badge]);

  /* ---------- UI ---------- */
  return (
    <main className="bg-primary-light min-h-screen">
      {/* ---------- HERO ---------- */}
      <section
        className="
          relative flex flex-col items-center justify-center text-center
          text-white px-4 pt-10 pb-[160px] md:pb-[180px]"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <SearchBar
          valueSpecies={speciesText}
          valueLocation={locationText}
          onChangeSpecies={(e) => setSpeciesText(e.target.value)}
          onChangeLocation={(e) => setLocationText(e.target.value)}
        />

        <h1 className="mt-8 text-2xl font-bold md:text-[28px] text-primary">
          Find your new best friend
        </h1>
        <h2 className="mt-2 text-base md:text-lg text-neutral-light">
          Browse available pets
        </h2>

        {/* BADGES */}
        <div className="absolute -bottom-16 md:-bottom-20 w-full flex justify-center z-10">
          <FilteringBadges
            selected={badge}
            onChange={(val) => setBadge(val === badge ? null : val)}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-primary z-0" />
      </section>

      {/* ---------- GRID ---------- */}
      <section className="px-4 pt-24 pb-12">
        {loading ? (
          <p className="text-center text-sm text-neutral-dark">Laster …</p>
        ) : (
          <div className="mx-auto max-w-7xl grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-5">
            {visiblePets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </section>

      {/* ---------- PAGINATION ---------- */}
      {!loading && totalPages > 1 && (
        <section className="pb-12 flex justify-center items-center gap-4">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </section>
      )}
    </main>
  );
}
