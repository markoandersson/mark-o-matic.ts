import React from 'react';
import { CounterComponent } from './counter-component';
import { renderWithRedux } from '../../test-utils';
import { fireEvent } from '@testing-library/react';

describe('Counter-component tests', function() {
  const renderCounterComponent = () => {
    const { getByTitle, getByText } = renderWithRedux(<CounterComponent />);

    return {
      counter: getByTitle('counter'),
      increaseButton: getByText(/increase/i),
      decreaseButton: getByText(/decrease/i)
    };
  };

  it('should render zero when first mounted', function() {
    const { counter } = renderCounterComponent();

    expect(counter).toHaveTextContent('0');
  });

  it('should increase value', function() {
    const { counter, increaseButton } = renderCounterComponent();
    fireEvent.click(increaseButton);

    expect(counter).toHaveTextContent('1');
  });

  it('should decrease value', function() {
    const { counter, increaseButton, decreaseButton } = renderCounterComponent();

    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(decreaseButton);

    expect(counter).toHaveTextContent('1');
  });

  it('should not have negative count', function() {
    const { counter, decreaseButton } = renderCounterComponent();
    fireEvent.click(decreaseButton);

    expect(counter).toHaveTextContent('0');
  });
});
