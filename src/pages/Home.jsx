import { useQuery } from "@tanstack/react-query";
import { fetchMovies, searchMovies } from "../api/home";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { LayoutGrid, Table, ArrowLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";

function Home() {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: trendingData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => fetchMovies(API_KEY),
  });

  const { data: searchData, isFetching: isSearching } = useQuery({
    queryKey: ["search-movies", debouncedSearchTerm],
    queryFn: () => searchMovies(API_KEY, debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 2,
  });

  if (isLoading) {
    return <div className="text-white p-6">Loading movies...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-6">
        Error fetching movies: {error.message}
      </div>
    );
  }

  const isTableView = location.pathname.includes("table-view");

  const moviesToShow =
    debouncedSearchTerm.length > 2
      ? (searchData?.results ?? [])
      : (trendingData?.results ?? []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/browse")}
              className="flex items-center gap-2 px-4 py-2
                bg-white/5 backdrop-blur-md
                border border-white/10
                rounded-xl
                hover:bg-white/10
                transition-all duration-200"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                {debouncedSearchTerm.length > 2
                  ? "Search Results"
                  : "Trending Now"}
              </h1>

              {isSearching && (
                <p className="text-sm text-gray-400 mt-1">Searching...</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2
                  bg-white/5 border border-white/10
                  rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-white/20
                  text-sm placeholder-gray-400"
              />
            </div>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => navigate("/browse")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  !isTableView
                    ? "bg-white text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>

              <button
                onClick={() => navigate("/browse/table-view")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isTableView
                    ? "bg-white text-black shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Table View"
              >
                <Table size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          {moviesToShow.length === 0 && debouncedSearchTerm.length > 2 ? (
            <p className="text-gray-400 text-center py-10">No movies found.</p>
          ) : (
            <Outlet context={{ movies: moviesToShow }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
