import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await login(data);
      useAuthStore.getState().login(result.data, result.token);
      console.log(" Login completed");
      navigate("/"); // home
    } catch (error) {
      console.log(" Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <input placeholder="Email" {...register("email", { required: true })} />
      <input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      <button type="submit">Log in</button>
    </form>
  );
}
