import Loadable from 'react-loadable';
import Loader from '@shared/loader';

export const HOME = '/';
export const SIGN_IN = '/signin';
export const SIGN_UP = '/signup';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/pw-forget';
export const WATCHLIST = '/watchlist';
export const MOVIES = '/movies';

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
  SIGN_IN: {
    path: SIGN_IN,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/SignInPage' /* webpackChunkName: "signin-page" */),
      loading: Loader,
    }),
  },
  SIGN_UP: {
    path: SIGN_UP,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/SignUpPage' /* webpackChunkName: "signup-page" */),
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
  PASSWORD_FORGET: {
    path: PASSWORD_FORGET,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/PasswordForgetPage' /* webpackChunkName: "passwordforget-page" */),
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
