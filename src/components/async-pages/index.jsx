import Loadable from 'react-loadable';
import Loader from '../shared-ui/loader';

export const SignInPage = Loadable({
  loader: () =>
    import('../auth-manager/SignInPage' /* webpackChunkName: "signin-page" */),
  loading: Loader,
});

export const SignUpPage = Loadable({
  loader: () =>
    import('../auth-manager/SignUpPage' /* webpackChunkName: "signup-page" */),
  loading: Loader,
});

export const AccountPage = Loadable({
  loader: () =>
    import('../auth-manager/AccountPage' /* webpackChunkName: "account-page" */),
  loading: Loader,
});

export const PasswordForgetPage = Loadable({
  loader: () =>
    import('../auth-manager/PasswordForgetPage' /* webpackChunkName: "passwordforget-page" */),
  loading: Loader,
});

export const MovieInfoPage = Loadable({
  loader: () =>
    import('../movie-info' /* webpackChunkName: "movieinfo-page" */),
  loading: Loader,
});

export const WatchListPage = Loadable({
  loader: () =>
    import('../watch-list' /* webpackChunkName: "watchlist-page" */),
  loading: Loader,
});

export const NotFoundPage = Loadable({
  loader: () =>
    import('../not-found-page' /* webpackChunkName: "not-found-page" */),
  loading: Loader,
});
