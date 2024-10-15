import { configureStore } from '@reduxjs/toolkit';

import { isSSR } from '@/utils';

import authReducer from './authorization/slice';
import credentialReducer from './credentials/credentialSlice';
import { dailystreakReducer } from './dailystreak';
import { dashboardReducer } from './dashboard';
import { achievementsReducer } from './dashboard/achievements';
import educationReducer from './education/educationSlice';
import experienceReducer from './exp/experienceSlice';
import friendsReducer from './friends/slice';
import { NotificationsReducer } from './notifications';
import onboardingReducer from './onboarding/slice';
import { storeProductReducer } from './storeProducts';

import type { EnhancedStore } from '@reduxjs/toolkit';
let store: EnhancedStore;

// TODO: fix internal function parameter type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStore = (preloadedState?: any) =>
  configureStore({
    reducer: {
      auth: authReducer,
      onboarding: onboardingReducer,
      friends: friendsReducer,
      storeProduct: storeProductReducer,
      dashboard: dashboardReducer,
      notifications: NotificationsReducer,
      dailyStreak: dailystreakReducer,
      achievements: achievementsReducer,
      experience: experienceReducer,
      education: educationReducer,
      credential: credentialReducer,
    },
    preloadedState,
  });

export const initializeStore = (preloadedState?: RootState): Store => {
  // Create new store if there is no existing one
  let newStore = store ?? createStore(preloadedState);

  // If we have both store and preloaded state, merge them
  if (preloadedState && store) {
    newStore = createStore({ ...store.getState(), ...preloadedState });

    // Assign store only on client
    // keep it undefined on backend
    if (!isSSR()) {
      store = newStore;
    }
  }

  // For SSG and SSR always create a new store
  // without setting it to the `store` object to avoid memory leaks
  if (isSSR()) {
    return newStore;
  }

  // If we are on client and store is not created
  if (!store) {
    store = newStore;
  }

  return newStore;
};

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
