import { configureStore } from '@reduxjs/toolkit'
import { kroryaApi } from './api'
import authSlice from './features/auth/authSlice'
// create store
export const makeStore = () => {
    return configureStore({
        reducer: {
            // Add the generated reducer as a specific top-level slice
            [kroryaApi.reducerPath]: kroryaApi.reducer,
            auth: authSlice,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(kroryaApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']