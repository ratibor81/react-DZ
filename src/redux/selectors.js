export const getAllMovies = state => state.movies.items;

export const getWatchlist = state => state.movies.watchlist;

export const getSearchMovies = state => state.movies.search;

export const getMovieTitle = state => state.movies.title;

export const getMovieGenreId = state => state.movies.genreId;

export const getMoviesByGenreId = state => state.movies.byGenre;

export const getError = state => state.errors;

export const getExtendInfo = state => state.moviecard.info;
