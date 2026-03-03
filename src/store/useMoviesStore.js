import { create } from "zustand";

export const useMoviesStore = create((set) => ({
  selectedMovie: null,
  isOpen: false,

  openMovie: (movieId) => {
    return set({
      selectedMovie: movieId,
      isOpen: true,
    });
  },

  closeMovie: () =>
    set({
      selectedMovie: null,
      isOpen: false,
    }),
}));
