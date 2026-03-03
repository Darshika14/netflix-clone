import { useNavigate } from "react-router-dom";

function LayoutPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
      navigate("/login");
    }

    const handleSignUp = () => {
      navigate("/signup");
    }

  return (
    <div className="relative h-screen w-full bg-black">
      
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9b2e2f7e-8f59-4d3c-bc49-1f9d2f02d0f0/1d8e7c8a-5a7f-4f21-9b6f-6a3b5e3c1c9e/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center"></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col h-full text-white">

        <div className="flex justify-between items-center px-8 py-6">
          <h2 className="text-3xl font-bold text-red-600 tracking-wide">
            NETFLIX
          </h2>

         
        </div>

        <div className="flex flex-col justify-center items-center flex-grow text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold max-w-3xl">
            Unlimited movies, TV shows and more
          </h2>

          <p className="mt-4 text-lg md:text-2xl">
            Watch anywhere. Cancel anytime.
          </p>

          <div className="mt-8 flex gap-4 flex-col sm:flex-row">
            <button
              onClick={handleLogin}
              className="bg-red-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition"
            >
              Login
            </button>

            <button
              onClick={handleSignUp}
              className="bg-white text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition"
            >
              Sign Up
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LayoutPage;
