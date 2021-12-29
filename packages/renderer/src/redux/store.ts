import { configureStore } from '@reduxjs/toolkit'
import editorsReducer from './reducers/editors.reducer'

export const store = configureStore({
  reducer: {
    editors: editorsReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
