import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

const MovieCard = ({ movie, onClick }) => {
  const [imgError, setImgError] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const showBrokenImage = !imageUrl || imgError;

  const firstLetter = movie.title?.charAt(0)?.toUpperCase() || "M";

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer transform hover:scale-105 transition duration-300"
    >
      <div className="aspect-[2/3] w-full rounded-md overflow-hidden">
        {showBrokenImage ? (
          <div
            className="w-full h-full flex items-center justify-center
            bg-gradient-to-br from-purple-600 to-indigo-700
            text-white text-4xl font-bold"
          >
            {firstLetter}
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={movie.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
          <p className="text-white text-sm font-semibold text-center px-2">
            {movie.title}
          </p>
        </div>
      </div>
    </div>
  );
};

const Grid = () => {
  const navigate = useNavigate();
  const { movies } = useOutletContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => navigate(`/browse/${movie.id}`)}
        />
      ))}
    </div>
  );
};

export default Grid;
