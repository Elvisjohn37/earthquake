import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './../components/map/slice'

let store = configureStore({
    reducer: {
        map: mapReducer,
    },
})

export default store
