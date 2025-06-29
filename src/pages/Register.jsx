import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login, register as registerUser } from "../api/auth";
import { createApiKey } from "../auth/create-api-key";
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
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setSuccess(false);
    setErrorMsg("");
    // Payload som Noroff-API forventer
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const registerRes = await registerUser(payload);
      // Her: SJEKK PÅ DATA-NODE
      if (
        registerRes &&
        registerRes.data &&
        registerRes.data.name &&
        registerRes.data.email
      ) {
        setSuccess(true);
        // Logg inn direkte
        try {
          const loginRes = await login({
            email: data.email,
            password: data.password,
          });
          const result = loginRes.data?.data || loginRes.data;
          const userData = {
            name: result.name,
            email: result.email,
          };
          const token = result.accessToken;

          // API key
          let apiKey = sessionStorage.getItem("apiKey");
          if (!apiKey && result.apiKey) {
            apiKey = result.apiKey;
            sessionStorage.setItem("apiKey", apiKey);
          }
          if (!apiKey) {
            apiKey = await createApiKey(token);
            sessionStorage.setItem("apiKey", apiKey);
          }

          useAuthStore.getState().login(userData, token, apiKey);

          // Suksess – umiddelbar redirect
          navigate("/");
        } catch (loginError) {
          setErrorMsg("Bruker opprettet, men innlogging feilet. Prøv manuelt.");
        }
        return;
      }
      // Hvis ikke .data.name/.data.email: API feilet
      throw new Error(
        "Kunne ikke lage bruker – prøv med annet brukernavn/epost."
      );
    } catch (error) {
      // Prøv å parse feilmelding fra Noroff API
      const apiError =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        error.message ||
        "Registration failed";
      setError("email", { type: "manual", message: apiError });
      setErrorMsg(apiError);
      setSuccess(false);
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
        {success && (
          <p className="text-green-600 text-center font-semibold">
            Registration successful! Redirecting...
          </p>
        )}
        {errorMsg && (
          <p className="text-red-600 text-center font-semibold">{errorMsg}</p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          autoComplete="off"
        >
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

          <Button type="submit" variant="primary" fullWidth aria-busy={false}>
            Register
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
