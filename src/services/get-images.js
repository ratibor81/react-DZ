import axios from 'axios';

const API_KEY = '532f680f186ee3009db06b2e2efe9aab';
const BASE_URL = 'https://api.themoviedb.org/3';

const getImages = ({ id, onSuccess, onError }) => {
  const url = `${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`;

  return axios
    .get(url)
    .then(response => response.data.backdrops)
    .then(onSuccess)
    .catch(error => onError(JSON.stringify(error)));
};

export default getImages;
