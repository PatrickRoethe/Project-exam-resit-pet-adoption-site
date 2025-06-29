import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPet } from "../api/pets";
import Button from "../components/Button";
import InputFloating from "../components/InputFloating";

export default function CreatePet() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

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

      await createPet(petData);
      setSuccess("Pet listed successfully!");
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-card shadow-card p-6 w-full max-w-[380px] flex flex-col gap-5">
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Create Adoption listing
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          {/* Gender radio */}
          <div className="flex items-center gap-4">
            <span>Gender:</span>
            <label>
              <input type="radio" value="Male" {...register("gender")} /> Male
            </label>
            <label>
              <input type="radio" value="Female" {...register("gender")} />{" "}
              Female
            </label>
          </div>
          {/* Size dropdown */}
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
            placeholder="Short description (optional)"
            {...register("description")}
            error={errors.description?.message}
          />
          <InputFloating
            label="Image url"
            placeholder="https://images.dog.ceo/breeds/labrador/n02099712_2529.jpg"
            {...register("imageUrl", {
              required: "Image is required. Please upload a photo of your pet.",
            })}
            error={errors.imageUrl?.message}
          />
          <span className="text-xs text-gray-500 -mt-2 mb-1">
            Listings with photos are adopted much faster!
          </span>
          <InputFloating
            label="Image alt text"
            placeholder="E.g. White cat looking up"
            {...register("imageAlt", {
              required: "Alt text is required (describe the image).",
            })}
            error={errors.imageAlt?.message}
          />
          {/* Checkbox for confirmation */}
          <label className="flex items-center gap-2 text-sm mt-2 mb-2">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            I confirm this pet is ready for adoption
          </label>
          {apiError && (
            <span className="text-sm" style={{ color: "#D32F2F" }}>
              {apiError}
            </span>
          )}
          {success && <span className="text-green-700 text-sm">{success}</span>}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={!confirmed}
          >
            {submitting ? "Creating..." : "Create listing"}
          </Button>
        </form>
      </div>
    </div>
  );
}
