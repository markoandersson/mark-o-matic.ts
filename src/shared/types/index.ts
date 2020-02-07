import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export interface CounterState {
  count: number;
}

export interface BackendCallState {
  response: string;
  loading: boolean;
}

export interface RootState {
  counter: CounterState;
  backend: BackendCallState;
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;
