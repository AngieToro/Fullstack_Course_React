import { configureStore } from '@reduxjs/toolkit'
import acnedotesReducer from '../reducers/acnedotesReducer'
import acnedotesFilter from '../reducers/acnedotesFilter'
import acnedotesNotification from '../reducers/acnedotesNotification'

const store = configureStore({
    reducer: {
        acnedotes: acnedotesReducer,
        filter: acnedotesFilter,
        notification: acnedotesNotification
    }
})

export default store