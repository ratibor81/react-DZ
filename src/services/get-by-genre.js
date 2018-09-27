import axios from 'axios';

const API_KEY = '532f680f186ee3009db06b2e2efe9aab';
const BASE_URL = 'https://api.themoviedb.org/3/discover';

const getMoviesByGenreId = ({ genreId, pageNum }) => {
  const url = `${BASE_URL}/movie?api_key=${API_KEY}&language=en-EN&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}&with_genres=${genreId}`;

  return axios.get(url).then(response => response.data.results);
};

export default getMoviesByGenreId;
