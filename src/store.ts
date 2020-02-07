import { configureStore } from '@reduxjs/toolkit';
import Counter from './views/counter';
import BackendReducer from './views/backend-call';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    counter: Counter,
    backend: BackendReducer
  },
  middleware: [apiMiddleware, thunk]
});

export default store;
