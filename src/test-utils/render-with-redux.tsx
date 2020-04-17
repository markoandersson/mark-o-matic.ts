import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import createStore from '../store';

export const renderWithRedux = (child: React.ReactElement): RenderResult => {
  return render(<Provider store={createStore()}>{child}</Provider>);
};
