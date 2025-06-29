import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Button from "../components/Button";
import InputFloating from "../components/InputFloating"; // <-- Bruk denne!
import { useAuthStore } from "../store/authStore";

export default function Login() {
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
      const result = await login(data);
      useAuthStore.getState().login(result.data, result.token);
      window.location.href = "/"; //dashbord om tid//
    } catch (error) {
      setError("email", { type: "manual", message: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white rounded-card shadow-card p-6 w-full max-w-[380px] flex flex-col gap-5">
        <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Sign in to your account
        </h1>
        <p className="text-base text-neutral-dark text-center">
          Manage your listings and adoption requests in one place.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputFloating
            label="Email Address"
            name="email"
            type="email"
            value={watch("email") || ""}
            onChange={(e) => setValue("email", e.target.value)}
            error={errors.email?.message}
            autoFocus
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
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-base mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-secondary hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
