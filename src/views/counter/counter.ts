import { createReducer } from '@reduxjs/toolkit';
import { createPrefixedActionCreator } from '../../shared/action-creator';
import Get from 'lodash/get';
import { CounterState, RootState } from '../../shared/types';

const ACTION_PREFIX = 'mark-o-matic.ts/counter';
const createAction = createPrefixedActionCreator(ACTION_PREFIX);

const initialState: CounterState = {
  count: 0
};

export const actions = {
  increaseCounter: createAction<number>('increase', (value: number = 1) => ({
    payload: value
  })),
  decreaseCounter: createAction<number>('decrease', (value: number = -1) => ({
    payload: value
  })),
  resetCounter: createAction('reset')
};

export const selectors = {
  count: (state: RootState) => Get(state, 'counter.count', 0)
};

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.increaseCounter, (state, action) => {
      state.count = state.count + (action.payload || 1);
    })
    .addCase(actions.decreaseCounter, (state, action) => {
      state.count = state.count + (action.payload || -1);
      if (state.count < 0) {
        state.count = 0;
      }
    })
    .addCase(actions.resetCounter, state => {
      state.count = 0;
    });
});
