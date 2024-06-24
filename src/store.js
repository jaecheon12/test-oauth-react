
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import settingReducer from "./features/reducers/settingSlice";

const rootReducer = combineReducers({
  settingReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
  
export default store;
