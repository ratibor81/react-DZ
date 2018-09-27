import Loadable from 'react-loadable';
import Loader from '@shared/loader';

export const HOME = '/';
export const SIGN_IN = '/signin';
export const ACCOUNT = '/account';
export const WATCHLIST = '/watchlist';
export const MOVIES = '/movies';
export const SEARCH = '/search';

export default {
  HOME: {
    path: HOME,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/movies' /* webpackChunkName: "movies-page" */),
      loading: Loader,
    }),
  },
  SEARCH: {
    path: SEARCH,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/search-page' /* webpackChunkName: "search-page" */),
      loading: Loader,
    }),
  },
  SIGN_IN: {
    path: SIGN_IN,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/SignInPage' /* webpackChunkName: "signin-page" */),
      loading: Loader,
    }),
  },
  ACCOUNT: {
    path: ACCOUNT,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/AccountPage' /* webpackChunkName: "account-page" */),
      loading: Loader,
    }),
  },
  MOVIS_BY_GENRE: {
    path: MOVIES,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/movies-by-genre' /* webpackChunkName: "movies-by-genre-page" */),
      loading: Loader,
    }),
  },
  MOVIE_INFO: {
    path: `${MOVIES}/:movieId`,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/movie-info' /* webpackChunkName: "movieinfo-page" */),
      loading: Loader,
    }),
  },
  WATCHLIST: {
    path: WATCHLIST,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/watchlist' /* webpackChunkName: "watchlist-page" */),
      loading: Loader,
    }),
  },
  NOT_FOUND: {
    path: null,
    exact: false,
    component: Loadable({
      loader: () =>
        import('@pages/not-found-page' /* webpackChunkName: "not-found-page" */),
      loading: Loader,
    }),
  },
};
