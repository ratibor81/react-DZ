import Loadable from 'react-loadable';
import Loader from '@shared/loader';

export const MoviesPage = Loadable({
  loader: () => import('@pages/movies' /* webpackChunkName: "movies-page" */),
  loading: Loader,
});

export const SignInPage = Loadable({
  loader: () =>
    import('@pages/auth-manager/SignInPage' /* webpackChunkName: "signin-page" */),
  loading: Loader,
});

export const SignUpPage = Loadable({
  loader: () =>
    import('@pages/auth-manager/SignUpPage' /* webpackChunkName: "signup-page" */),
  loading: Loader,
});

export const AccountPage = Loadable({
  loader: () =>
    import('@pages/auth-manager/AccountPage' /* webpackChunkName: "account-page" */),
  loading: Loader,
});

export const PasswordForgetPage = Loadable({
  loader: () =>
    import('@pages/auth-manager/PasswordForgetPage' /* webpackChunkName: "passwordforget-page" */),
  loading: Loader,
});

export const MovieInfoPage = Loadable({
  loader: () =>
    import('@pages/movie-info' /* webpackChunkName: "movieinfo-page" */),
  loading: Loader,
});

export const WatchListPage = Loadable({
  loader: () =>
    import('@pages/watchlist' /* webpackChunkName: "watchlist-page" */),
  loading: Loader,
});

export const NotFoundPage = Loadable({
  loader: () =>
    import('@pages/not-found-page' /* webpackChunkName: "not-found-page" */),
  loading: Loader,
});
