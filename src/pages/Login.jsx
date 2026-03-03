import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/UseAuth";
import { loginSchema } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await login(data);

    if (result.ok) {
      navigate("/browse", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9b2e2f7e-8f59-4d3c-bc49-1f9d2f02d0f0/1d8e7c8a-5a7f-4f21-9b6f-6a3b5e3c1c9e/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 bg-black/85 p-6 rounded-lg w-full max-w-sm text-white shadow-lg">
        <h1 className="text-2xl font-semibold mb-5 text-center">Sign In</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block mb-1 text-xs">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 text-sm rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-xs">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 text-sm rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 py-2 text-sm rounded font-medium hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
