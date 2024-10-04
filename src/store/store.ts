import { configureStore } from '@reduxjs/toolkit'
import { habitReducer } from './habit_slice'

export const store= configureStore({
  reducer: {
    habits:habitReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch