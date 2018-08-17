const getAllMovies = state => state.movies.items;

const getWatchlist = state => state.movies.watchlist;

const getCurrentFilter = state => state.filter;

export { getAllMovies, getWatchlist, getCurrentFilter };
