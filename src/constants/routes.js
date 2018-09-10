import Loadable from 'react-loadable';
import Loader from '@shared/loader';

export const HOME = '/';
export const SIGN_IN = '/signin';
export const SIGN_UP = '/signup';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/pw-forget';
export const WATCHLIST = '/watchlist';
export const MOVIES = '/movies';

export default [
  {
    path: HOME,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/movies' /* webpackChunkName: "movies-page" */),
      loading: Loader,
    }),
  },
  {
    path: SIGN_IN,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/SignInPage' /* webpackChunkName: "signin-page" */),
      loading: Loader,
    }),
  },
  {
    path: SIGN_UP,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/SignUpPage' /* webpackChunkName: "signup-page" */),
      loading: Loader,
    }),
  },
  {
    path: ACCOUNT,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/AccountPage' /* webpackChunkName: "account-page" */),
      loading: Loader,
    }),
  },
  {
    path: PASSWORD_FORGET,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/auth-manager/PasswordForgetPage' /* webpackChunkName: "passwordforget-page" */),
      loading: Loader,
    }),
  },
  {
    path: `${MOVIES}/:movieId`,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/movie-info' /* webpackChunkName: "movieinfo-page" */),
      loading: Loader,
    }),
  },
  {
    path: WATCHLIST,
    exact: true,
    component: Loadable({
      loader: () =>
        import('@pages/watchlist' /* webpackChunkName: "watchlist-page" */),
      loading: Loader,
    }),
  },
  {
    path: null,
    exact: false,
    component: Loadable({
      loader: () =>
        import('@pages/not-found-page' /* webpackChunkName: "not-found-page" */),
      loading: Loader,
    }),
  },
];
