import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { register as registerUser } from "../api/auth";
import Button from "../components/Button";
import InputFloating from "../components/InputFloating";
import { useAuthStore } from "../store/authStore";

export default function Register() {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await registerUser(data);
      useAuthStore.getState().login(result.data, result.token);
      navigate("/"); // Endre til ønsket redirect!
    } catch (error) {
      setError("email", { type: "manual", message: "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-card shadow-card p-6 w-full max-w-[380px] flex flex-col gap-5">
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Create your account
        </h1>
        <p className="text-base text-neutral-dark text-center">
          Sign up and start your journey!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputFloating
            label="Name"
            name="name"
            type="text"
            value={watch("name") || ""}
            onChange={(e) => setValue("name", e.target.value)}
            error={errors.name?.message}
            autoFocus
          />
          <InputFloating
            label="Email Address"
            name="email"
            type="email"
            value={watch("email") || ""}
            onChange={(e) => setValue("email", e.target.value)}
            error={errors.email?.message}
          />
          <InputFloating
            label="Password"
            name="password"
            type="password"
            value={watch("password") || ""}
            onChange={(e) => setValue("password", e.target.value)}
            error={errors.password?.message}
          />

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-base mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
