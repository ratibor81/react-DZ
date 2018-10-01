import axios from 'axios';

const API_KEY = '532f680f186ee3009db06b2e2efe9aab';
const BASE_URL = 'https://api.themoviedb.org/3';

const getVideos = ({ id, onSuccess, onError }) => {
  const url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-EN`;

  return axios
    .get(url)
    .then(response => response.data.results[0])
    .then(onSuccess)
    .catch(error => onError(JSON.stringify(error)));
};

export default getVideos;
