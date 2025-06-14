import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      useAuthStore.getState().login(result.data, result.token);
      console.log(" Registration completed");
      navigate("/"); // home
    } catch (error) {
      console.log(" Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <input placeholder="Name" {...register("name", { required: true })} />
      <input placeholder="Email" {...register("email", { required: true })} />
      <input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      <button type="submit">Register</button>
    </form>
  );
}
