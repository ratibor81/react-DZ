import axios from 'axios';

const API_KEY = '532f680f186ee3009db06b2e2efe9aab';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const searchMovie = ({ title, pageNum }) => {
  const url = `${BASE_URL}?api_key=${API_KEY}&language=en-EN&query=${title}&page=${pageNum}`;

  return axios.get(url).then(response => response.data.results);
};

export default searchMovie;
