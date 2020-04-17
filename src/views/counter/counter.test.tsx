import React from 'react';
import { CounterComponent } from './counter-component';
import { renderWithRedux } from '../../test-utils';
import { fireEvent, waitFor, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

beforeEach(() => cleanup());

describe('Counter-component tests', function () {
  const renderCounterComponent = () => {
    const { getByTitle, getByText } = renderWithRedux(<CounterComponent />);

    return {
      getCounterValue: () => getByTitle('counter').querySelector('.current') || getByTitle('counter'), 
      pressIncreaseButton: () => {
        fireEvent.click(getByText(/increase/i));
      },
      pressDecreaseButton: () => {
        fireEvent.click(getByText(/decrease/i));
      },
    };
  };

  it('should render zero when first mounted', function () {
    const { getCounterValue } = renderCounterComponent();

    expect(getCounterValue()).toHaveTextContent('0');
  });

  it('should increase value', async function () {
    const { getCounterValue, pressIncreaseButton } = renderCounterComponent();

    await act(async () => {
      pressIncreaseButton();
    });

    await waitFor(() => {
      expect(getCounterValue()).toHaveTextContent('1');
    });
  });

  it('should decrease value', async function () {
    const { getCounterValue, pressIncreaseButton, pressDecreaseButton } = renderCounterComponent();

    await act(async () => {
      await pressIncreaseButton();
      await pressIncreaseButton();
      await pressIncreaseButton();
      await pressDecreaseButton();
    });

    await waitFor(() => {
      expect(getCounterValue()).toHaveTextContent('2');
    });
  });

  it('should not have negative count', async function () {
    const { getCounterValue, pressDecreaseButton,pressIncreaseButton } = renderCounterComponent();

    await act(async () => {
      pressDecreaseButton();
      pressIncreaseButton()
      pressIncreaseButton()
    });

    await waitFor(() => {
      expect(getCounterValue()).toHaveTextContent('0');
    });
  });
});
