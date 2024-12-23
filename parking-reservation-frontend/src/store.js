import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import parkingReservationReducer from './features/parkingReservation/parkingReservationSlice'
import { mediaApi } from './services/parkingReservation'

export const store = configureStore({
  reducer: {
    parkingReservation: parkingReservationReducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mediaApi.middleware),
})

setupListeners(store.dispatch)
