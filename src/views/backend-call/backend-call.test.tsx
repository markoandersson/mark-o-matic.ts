import React from 'react';
import { mockApiResponse, renderWithRedux, resetMockedResponses, mockApiError } from '../../test-utils';
import { BackendCallComponent } from './backend-call-component';
import { fireEvent } from '@testing-library/react';
import { waitForElement } from '@testing-library/dom';

describe('Test backend call component', function() {
  afterEach(() => {
    resetMockedResponses();
  });

  const renderComponent = () => {
    const { getByText, container } = renderWithRedux(<BackendCallComponent />);

    return {
      button: getByText(/fetch from back-end/i),
      getLabel: async () => await waitForElement(() => getByText(/response/i), { container })
    };
  };

  const callBackendAndGetLabel = async () => {
    const { button, getLabel } = renderComponent();

    fireEvent.click(button);
    return await getLabel();
  };

  it('should call backend and display response', async function() {
    mockApiResponse({
      response: 'hello'
    });

    const label = await callBackendAndGetLabel();

    expect(label).toHaveTextContent('hello');
  });

  it('should handle invalid response', async function() {
    mockApiResponse({
      wrongkey: 'wrong value'
    });

    const label = await callBackendAndGetLabel();

    expect(label).toHaveTextContent('Invalid response');
  });

  it('should handle fetch failure', async function() {
    mockApiError('Failed to fetch data');

    const label = await callBackendAndGetLabel();

    expect(label).toHaveTextContent('Failed');
  });
});
