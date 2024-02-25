import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from "../slices/cartSlice";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer=combineReducers({cart:cartReducer});
const persistConfig={
  key:'root',
  storage,
  version:1,
}

const persistedReducer=persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefualtMiddleware)=>
    getDefualtMiddleware({
      serializableCheck:false,
    }),

});

export const persistor= persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

