import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import filterReducer from './slices/filterSlices'
import ticketsReducer from './slices/tickets'

const rootReducer = combineReducers({
    filters: filterReducer,
    tickets: ticketsReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

const store = configureStore({
    reducer: rootReducer,
})


export default store 