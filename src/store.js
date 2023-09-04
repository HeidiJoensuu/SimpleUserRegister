import { configureStore,combineReducers } from "@reduxjs/toolkit"
import storageSession from 'redux-persist/lib/storage/session'
import persistReducer from "redux-persist/es/persistReducer"
import userReduser from "./reducers/usersReducer"

const reducers = combineReducers({
    users: userReduser
  })

const persistConfig = {
    key: 'root',
    storage: storageSession
  }

const persistedReducer = persistReducer(persistConfig, reducers)
export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'users/getCurrentUser/rejected',
          'users/getUsersAsList/rejected',
          'users/createUser/rejected',
          'users/removeUser/rejected',
        ],
      },
    }),
})