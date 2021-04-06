import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export {store, persistor};