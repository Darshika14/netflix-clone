import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/signUpSchema";
import { useAuth } from "../hooks/UseAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await signup(data);

    console.log(data, result);
    if (result.ok) {
      navigate("/browse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9b2e2f7e-8f59-4d3c-bc49-1f9d2f02d0f0/1d8e7c8a-5a7f-4f21-9b6f-6a3b5e3c1c9e/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 bg-black/85 p-6 rounded-lg w-full max-w-sm text-white shadow-lg">
        <h1 className="text-2xl font-semibold mb-5 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="">
            <label className="block mb-1 text-xs">Username</label>
            <input
              type="text"
              className="w-full p-2 text-sm rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="">
            <label className="block mb-1 text-xs">Email</label>
            <input
              type="email"
              className="w-full p-2 text-sm rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className=" relative">
            <label className="block mb-1 text-xs">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 text-sm rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-8 text-gray-400"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-3 relative">
            <label className="block mb-1 text-xs">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full p-2 text-sm rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-8 text-gray-400"
            >
              {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button className="w-full bg-red-600 py-2 text-sm rounded font-medium hover:bg-red-700 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
