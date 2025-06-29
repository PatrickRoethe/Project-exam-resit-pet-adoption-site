import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { deletePet, getMyPets, getPet, updatePet } from "../api/pets";
import Button from "../components/Button";
import InputFloating from "../components/InputFloating";
import { useAuthStore } from "../store/authStore";

// Enkel UUIDv4 validator
function isUUID(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str
  );
}

export default function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hent alle dine pets for dropdown
  useEffect(() => {
    async function fetchMyPetsList() {
      try {
        if (user?.name) {
          const pets = await getMyPets(user.name);
          const filteredPets = pets.filter(
            (pet) => pet.owner?.name === user.name
          );
          setMyPets(filteredPets);
        }
      } catch {
        // ignorer, ikke vis error
      }
    }
    fetchMyPetsList();
  }, [user]);

  // Hent denne petten om uuid er gyldig
  useEffect(() => {
    if (!user || !id || !isUUID(id)) {
      setApiError("");
      setLoading(false);
      reset({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        size: "",
        color: "",
        description: "",
        adoptionStatus: "Available",
        location: "",
        imageUrl: "",
        imageAlt: "",
      });
      return;
    }
    async function fetchData() {
      setLoading(true);
      setApiError("");
      try {
        const { data } = await getPet(id);
        reset({
          name: data?.name || "",
          species: data?.species || "",
          breed: data?.breed || "",
          age: data?.age ?? "",
          gender: data?.gender || "",
          size: data?.size || "",
          color: data?.color || "",
          description: data?.description || "",
          adoptionStatus: data?.adoptionStatus || "Available",
          location: data?.location || "",
          imageUrl: data?.image?.url || "",
          imageAlt: data?.image?.alt || "",
        });
      } catch (error) {
        setApiError("Could not fetch pet data. Try refreshing?");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, user, reset]);

  const onSubmit = async (data) => {
    if (!confirmed) return;
    setSubmitting(true);
    setApiError("");
    setSuccess("");
    try {
      const petData = {
        name: data.name,
        species: data.species,
        breed: data.breed || "",
        age: data.age ? Number(data.age) : 0,
        gender: data.gender || "",
        size: data.size || "",
        color: data.color || "",
        description: data.description || "",
        adoptionStatus: data.adoptionStatus || "",
        location: data.location || "",
        image: {
          url: data.imageUrl,
          alt: data.imageAlt,
        },
      };
      await updatePet(id, petData);
      setSuccess("Pet updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      if (error && error.errors && Array.isArray(error.errors)) {
        setApiError(error.errors.map((e) => e.message).join(". "));
      } else if (error.message) {
        setApiError(error.message);
      } else {
        setApiError("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Bytt pet fra dropdown
  const handlePetSelect = (e) => {
    const newId = e.target.value;
    if (newId && newId !== id) {
      navigate(`/edit/${newId}`);
    }
  };

  // Slett
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    setSubmitting(true);
    setApiError("");
    try {
      await deletePet(id);
      setSuccess("Pet deleted!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setApiError(error.message || "Delete failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-card shadow-card p-6 w-full max-w-[380px] flex flex-col gap-5">
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Edit Adoption listing
        </h1>
        {/* Dropdown for å bytte mellom dine pets */}
        {myPets.length > 0 && (
          <select
            className="input input-bordered mb-2"
            value={isUUID(id) ? id : ""}
            onChange={handlePetSelect}
          >
            <option value="">Choose your pet</option>
            {myPets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        )}
        {/* CASE 1: Ingen pet valgt */}
        {!isUUID(id) ? (
          <div className="text-center py-8 text-gray-500">
            Choose your pet to edit.
          </div>
        ) : loading ? (
          // CASE 2: Laster
          <div className="text-center py-8">Loading...</div>
        ) : (
          // CASE 3: Form og slett-knapp
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <InputFloating
                label="Name"
                placeholder="E.g. Luna"
                {...register("name", { required: "Name is required" })}
                error={errors.name?.message}
              />
              <InputFloating
                label="Species"
                placeholder="E.g. Cat"
                {...register("species", { required: "Species is required" })}
                error={errors.species?.message}
              />
              <InputFloating
                label="Breed"
                placeholder="E.g. Persian"
                {...register("breed")}
                error={errors.breed?.message}
              />
              <InputFloating
                label="Age"
                type="number"
                placeholder="E.g. 2"
                {...register("age")}
                error={errors.age?.message}
              />
              <div className="flex items-center gap-4">
                <span>Gender:</span>
                <label>
                  <input type="radio" value="Male" {...register("gender")} />{" "}
                  Male
                </label>
                <label>
                  <input type="radio" value="Female" {...register("gender")} />{" "}
                  Female
                </label>
              </div>
              <select
                {...register("size")}
                className="input input-bordered"
                defaultValue=""
              >
                <option value="">Select size (optional)</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <InputFloating
                label="Color"
                placeholder="E.g. White"
                {...register("color")}
                error={errors.color?.message}
              />
              <InputFloating
                label="Location"
                placeholder="E.g. Oslo"
                {...register("location")}
                error={errors.location?.message}
              />
              <InputFloating
                label="Description"
                placeholder="Write a description about your pet…"
                {...register("description")}
                error={errors.description?.message}
              />
              <InputFloating
                label="Image url"
                placeholder="Must be a valid external URL"
                {...register("imageUrl", { required: "Image is required." })}
                error={errors.imageUrl?.message}
              />
              <InputFloating
                label="Image alt text"
                placeholder="Short image description"
                {...register("imageAlt", { required: "Alt text is required." })}
                error={errors.imageAlt?.message}
              />
              <select
                {...register("adoptionStatus")}
                className="input input-bordered"
                defaultValue=""
              >
                <option value="">Adoption status drop down</option>
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Adopted">Adopted</option>
              </select>
              <label className="flex items-center gap-2 text-sm mt-2 mb-2">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                />
                I confirm I have reviewed all changes before submitting
              </label>
              {apiError && (
                <span className="text-sm" style={{ color: "#D32F2F" }}>
                  {apiError}
                </span>
              )}
              {success && (
                <span className="text-green-700 text-sm">{success}</span>
              )}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={!confirmed || submitting}
              >
                {submitting ? "Updating..." : "Edit listing"}
              </Button>
            </form>
            <Button
              onClick={handleDelete}
              variant="danger"
              fullWidth
              disabled={submitting}
            >
              Delete listing
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
