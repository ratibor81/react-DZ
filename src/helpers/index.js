import qs from 'qs';

const getItemById = (items, id) => items.find(item => item.id === id);

const getCategoryFromProps = props => {
  const { location } = props;
  return qs.parse(location.search.slice(1)).category;
};
export { getItemById, getCategoryFromProps };
