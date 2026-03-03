export const fetchMovies = async (key) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return res.json();
};

export const searchMovies = async (key, query) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`
  );

  if (!res.ok) {
    throw new Error("Failed to search movies");
  }

  return res.json();
};
