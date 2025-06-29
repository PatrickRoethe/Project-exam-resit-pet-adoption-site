import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getPet } from "../api/pets";

export default function PetDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Share/copy link
  function handleShare() {
    const url = window.location.origin + location.pathname;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  useEffect(() => {
    async function fetchPet() {
      setLoading(true);
      setError("");
      try {
        const { data } = await getPet(id);
        setPet(data);
      } catch (err) {
        setError("Could not fetch pet info.");
      } finally {
        setLoading(false);
      }
    }
    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Pet not found.
      </div>
    );
  }

  // Owner info
  const ownerName = pet.owner?.name || "Unknown";
  const ownerEmail = pet.owner?.email || "Not available";

  return (
    <div className="min-h-screen w-full flex justify-center bg-primary-medium">
      <div
        className="
          w-full max-w-2xl
          mx-auto
          my-0
          md:my-12
          px-0 md:px-8
          py-0 md:py-8
        "
      >
        <div className="bg-[#eaf4ea] rounded-2xl shadow-xl p-4 md:p-8 flex flex-col items-center w-full">
          {/* TOP NAV */}
          <div className="flex justify-between items-center w-full px-2 md:px-4 pt-2 pb-4">
            <Link
              to="/"
              className="text-lg md:text-xl font-medium text-gray-700"
            >
              &lt; Back to home page
            </Link>
            <button
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition"
              onClick={handleShare}
              aria-label="Copy link to this page"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 md:w-7 md:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9M12 15v-6m0 0l-3.75 3.75M12 9l3.75 3.75"
                />
              </svg>
              <span className="text-lg md:text-xl">Share</span>
              {copied && (
                <span className="ml-2 text-xs text-green-600 font-medium">
                  Copied!
                </span>
              )}
            </button>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center w-full px-0 md:px-4 pb-4">
            <div
              className="bg-gray-200 rounded-lg w-full flex justify-center items-center"
              style={{ minHeight: 220, maxWidth: "100%" }}
            >
              {pet.image?.url ? (
                <img
                  src={pet.image.url}
                  alt={pet.image.alt || pet.name}
                  className="object-cover w-full h-[240px] max-w-xl rounded"
                  style={{ maxHeight: 320 }}
                />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>
          </div>

          {/* INFO / CONTACT */}
          <div className="flex flex-col md:flex-row gap-6 w-full px-0 pb-2 md:pb-4">
            {/* Info box */}
            <div className="bg-white rounded-xl shadow-card flex-1 p-4 md:p-6 flex flex-col min-w-[180px]">
              <h2 className="font-bold text-2xl md:text-3xl text-primary mb-3">
                {pet.name}
              </h2>
              <div className="flex flex-col text-base md:text-lg gap-1">
                <div>
                  <b>Breed:</b> {pet.breed || "-"}
                </div>
                <div>
                  <b>Location:</b> {pet.location || "-"}
                </div>
                <div>
                  <b>Age:</b> {pet.age || "-"}
                </div>
                <div>
                  <b>Sex:</b> {pet.gender || "-"}
                </div>
                <div>
                  <b>Size:</b> {pet.size || "-"}
                </div>
              </div>
            </div>
            {/* Contact box – only visible here on desktop */}
            <div className="hidden md:flex bg-white rounded-xl shadow-card flex-1 p-4 md:p-6 flex-col min-w-[180px]">
              <h2 className="font-bold text-2xl md:text-3xl text-primary mb-3">
                Contact
              </h2>
              <div className="flex flex-col text-base md:text-lg gap-1">
                <div>
                  <b>Name:</b> {ownerName}
                </div>
                <div>
                  <b>Email:</b> {ownerEmail}
                </div>
              </div>
            </div>
          </div>

          {/* MEET BOX */}
          <div
            className="bg-white rounded-xl shadow-card w-full p-4 md:p-6 mb-6 mt-0 md:mx-0 mx-auto"
            style={{ maxWidth: "100%" }}
          >
            <h3 className="text-primary font-bold text-2xl md:text-3xl mb-2">
              Meet {pet.name}
            </h3>
            <div className="text-base md:text-lg text-gray-800 whitespace-pre-line">
              {pet.description || "No description provided."}
            </div>
          </div>

          {/* Contact box – only visible on mobile */}
          <div className="flex md:hidden bg-white rounded-xl shadow-card w-full p-4 mb-6 flex-col">
            <h2 className="font-bold text-2xl text-primary mb-2">Contact</h2>
            <div className="flex flex-col text-base gap-1">
              <div>
                <b>Name:</b> {ownerName}
              </div>
              <div>
                <b>Email:</b> {ownerEmail}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
