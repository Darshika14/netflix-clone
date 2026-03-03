import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  const movieDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  const castDetials = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: async () => {
      const [movie, cast] = await Promise.all([
        axios.get(movieDetails),
        axios.get(castDetials),
      ]);
      return { movie: movie.data, cast: cast.data };
    },
    enabled: !!movieId,
    // staleTime: 5 * 1000,
  });

  if (isLoading) {
    return <div className="text-white p-6">Loading movie...</div>;
  }
  const { movie, cast } = data ?? {};

  if (isError) {
    return (
      <div className="text-red-500 p-6">
        Error fetching movie: {error.message}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="m-2">
      <h1 className="text-3xl font-bold mb-4 px-2">{movie.title}</h1>

      <div className="flex gap-1">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded mb-1"
            style={{
              height: "200px",
              width: "200px",
            }}
          />
        )}

        <div>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>

      <h2 className="text-xl mt-4 mb-2">Cast</h2>

      <ul className="h-9">
        {cast?.cast.map((actor) => (
          <li key={actor.id}>{actor.name}, </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;
