import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

interface State {
  token: string;
  name: string;
  loggedIn: boolean;
  userId: number
  email: string
  exp: number
}

const initialState: State = {
  name: '',
  loggedIn: false,
  userId: 0,
  email: '',
  exp: 0,
  token: ''
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorageSync('user'),
  withComputed((store) => ({
    expired: () => store.exp() < Date.now() / 1000,
    isLoggedIn: () => store.exp() > Date.now() / 1000 && store.loggedIn(),
  })),
  withMethods((store) => ({
    login(user: Partial<State>, token: string) {
      patchState(store, {
        token: token,
        name: user.name,
        loggedIn: true,
        userId: user.userId,
        email: user.email,
        exp: user.exp
      });
    },
    logout() {
      patchState(store, { ...initialState, loggedIn: false });
    },
    snapshot() {
      return {
        token: store.token(),
        name: store.name(),
        loggedIn: store.loggedIn(),
        userId: store.userId(),
        email: store.email(),
        exp: store.exp(),
        expired: store.exp() < Date.now() / 1000,
      };
    },

  }))
);

