import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuración de persistencia
const persistConfig = {
  key: 'root', // Clave bajo la cual se guarda el estado en storage
  storage, // Tipo de almacenamiento (localStorage en este caso)
};

const persistedReducerAuth = persistReducer(persistConfig, authReducer);
const persistedReducerApp = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducerAuth, // Agregar más reducers aquí
    app: persistedReducerApp,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesario para manejar correctamente los datos serializables en redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
