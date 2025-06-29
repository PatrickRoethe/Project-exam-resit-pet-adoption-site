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
  /* midlertidige states til søk/filter */
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState(null);

  /* pets hentet fra API */
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  /* paginering */
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage, setPetsPerPage] = useState(calcPetsPerPage);

  /* oppdater petsPerPage ved vindus-resize */
  useEffect(() => {
    function handleResize() {
      setPetsPerPage(calcPetsPerPage());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(pets.length / petsPerPage);
  const start = (currentPage - 1) * petsPerPage;
  const visiblePets = pets.slice(start, start + petsPerPage);

  /* hent data én gang når komponenten monteres */
  useEffect(() => {
    fetch("https://v2.api.noroff.dev/pets")
      .then((res) => res.json())
      .then((json) => setPets(json?.data ?? json))
      .catch((err) => {
        console.error("Kunne ikke hente pets:", err);
        setPets([]);
      })
      .finally(() => setLoading(false));
  }, []);

  /* hopp til side 1 hvis resize har krympet antall sider */
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  return (
    <main className="bg-primary-light min-h-screen">
      {/* ---------- HERO ---------- */}
      <section
        className="
          relative flex flex-col items-center justify-center text-center
          text-white px-4 pt-10 pb-[160px] md:pb-[180px]
        "
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <SearchBar
          valueSpecies={species}
          valueLocation={location}
          onChangeSpecies={(e) => setSpecies(e.target.value)}
          onChangeLocation={(e) => setLocation(e.target.value)}
        />

        <h1 className="mt-8 text-2xl font-bold md:text-[28px] text-primary">
          Find your new best friend
        </h1>
        <h2 className="mt-2 text-base md:text-lg text-neutral-light">
          Browse available pets
        </h2>

        {/* BADGES */}
        <div className="absolute -bottom-16 md:-bottom-20 w-full flex justify-center z-10">
          <FilteringBadges selected={filter} onChange={setFilter} />
        </div>

        {/* Grønn stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-primary z-0" />
      </section>

      {/* ---------- GRID ---------- */}
      <section className="px-4 pt-24 pb-12">
        {loading ? (
          <p className="text-center text-sm text-neutral-dark">
            Laster kjæledyr …
          </p>
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
