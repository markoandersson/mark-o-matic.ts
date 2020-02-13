import { createReducer, Dispatch } from '@reduxjs/toolkit';
import { createPrefixedActionCreator } from '../../shared/action-creator';
import { RSAA } from 'redux-api-middleware';
import Get from 'lodash/get';
import { message } from 'antd';
import { AppThunk, BackendCallState, RootState } from '../../shared/types';

const createAction = createPrefixedActionCreator('mark-o-matic.js/backend-call');

const fetchDataFromBackendStart = createAction('fetchDataFromBackendStart');
const fetchDataFromBackendSuccess = createAction<BackendResponse>('fetchDataFromBackendSuccess');
const fetchDataFromBackendFailure = createAction<Error>('fetchDataFromBackendFailure');

export interface BackendRequest {
  request: string;
}

export interface BackendResponse {
  response: string;
}

const initialState: BackendCallState = {
  response: '',
  loading: false
};

const fetchDataFromBackend = (request: BackendRequest): AppThunk => (dispatch: Dispatch) => {
  const url = `http://localhost:5001/api/hello?request=${request.request}`;
  return dispatch({
    [RSAA]: {
      endpoint: url,
      method: 'GET',
      types: [fetchDataFromBackendStart.type, fetchDataFromBackendSuccess.type, fetchDataFromBackendFailure.type]
    }
  });
};

export const selectors = {
  isLoading: (state: RootState): boolean => Get(state, 'backend.loading', false),
  getResponse: (state: RootState) => state.backend.response
};

export const actions = {
  fetchDataFromBackend
};

export default createReducer(initialState, builder => {
  builder
    .addCase(fetchDataFromBackendStart, state => {
      state.loading = true;
      state.response = '';
    })
    .addCase(fetchDataFromBackendSuccess, (state, action) => {
      state.loading = false;
      state.response = Get(action, 'payload.response', 'Invalid response');
      message.success('Fetch succeeded!');
    })
    .addCase(fetchDataFromBackendFailure, state => {
      state.loading = false;
      state.response = 'Failed to fetch data';
      message.error('Fetch failed');
    });
});
