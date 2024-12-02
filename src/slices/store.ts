import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { appSlice } from './appSlice'

const reducers = {
  [appSlice.name]: appSlice.reducer,
}

const rootReducer = combineReducers(reducers)

export const store = configureStore({
  reducer: rootReducer,
})

export const getState = store.getState
export const dispatch = store.dispatch
