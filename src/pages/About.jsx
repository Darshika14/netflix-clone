import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema } from "../schemas/feedbackSchema";

const About = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      favoriteGenres: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    alert("Thank you for your detailed feedback");
    reset();
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
          Feedback Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName")}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              />
              <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <input
                type="number"
                placeholder="Age"
                {...register("age", { valueAsNumber: true })}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              />
              <p className="text-red-500 text-sm">{errors.age?.message}</p>
            </div>

            <div>
              <select
                {...register("gender")}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <p className="text-red-500 text-sm">{errors.gender?.message}</p>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Subscription Plan
            </label>
            <select
              {...register("subscriptionPlan")}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            >
              <option value="">Select Plan</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
            <p className="text-red-500 text-sm">
              {errors.subscriptionPlan?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              How often do you use Netflix?
            </label>
            <select
              {...register("usageFrequency")}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            >
              <option value="">Select Option</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <p className="text-red-500 text-sm">
              {errors.usageFrequency?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Favorite Genres</label>
            <div className="grid grid-cols-2 gap-2">
              {["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"].map(
                (genre) => (
                  <label key={genre} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={genre}
                      {...register("favoriteGenres")}
                    />
                    {genre}
                  </label>
                )
              )}
            </div>
            <p className="text-red-500 text-sm">
              {errors.favoriteGenres?.message}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Would you recommend Netflix?
            </label>
            <div className="flex gap-4">
              <label>
                <input type="radio" value="Yes" {...register("recommend")} />{" "}
                Yes
              </label>
              <label>
                <input type="radio" value="No" {...register("recommend")} /> No
              </label>
            </div>
            <p className="text-red-500 text-sm">{errors.recommend?.message}</p>
          </div>

          <div>
            <select
              {...register("rating", { valueAsNumber: true })}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            >
              <option value="">Rate Netflix (1-5)</option>
              <option value={1}>1 ⭐</option>
              <option value={2}>2 ⭐</option>
              <option value={3}>3 ⭐</option>
              <option value={4}>4 ⭐</option>
              <option value={5}>5 ⭐</option>
            </select>
            <p className="text-red-500 text-sm">{errors.rating?.message}</p>
          </div>

          <div>
            <textarea
              rows={5}
              placeholder="Write detailed feedback..."
              {...register("feedback")}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            />
            <p className="text-red-500 text-sm">{errors.feedback?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-semibold"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;
