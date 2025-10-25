// store/index.js
import { configureStore,combineReducers } from '@reduxjs/toolkit'
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage
import NieChecklistSlice from './Checklist/checklistSlice'
const reducers = combineReducers({
  NieChecklistReduce: NieChecklistSlice,
})
// 持久化配置
const persistConfig = {
  key: 'checklist', // localStorage 中的 key
  storage, // 使用 localStorage
  // 可选：指定要持久化的字段
  // whitelist: ['finallyShowCheckboxList', 'basicInformation'], // 只持久化这些字段
  // blacklist: ['tempData'] // 不持久化这些字段
}

// 创建持久化的 reducer
const persistedReducer = persistReducer(persistConfig, reducers)

// 创建 store
export const store = configureStore({
  reducer: {
    Checklist: persistedReducer, // 使用持久化的 reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// 创建 persistor
export const persistor = persistStore(store)