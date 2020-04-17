import React from 'react';
import { renderWithRedux } from '../../test-utils';
import { BackendCallComponent } from './backend-call-component';
import { fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { BackendResponseBuilder } from '../../test-utils/backend-call-test-data-builder';
import { act } from 'react-dom/test-utils';
import { createMockServer } from '../../mock-server';
import { Response, Server } from 'miragejs';

describe('Test backend call component', function () {
  let server: Server;

  beforeEach(() => {
    server = createMockServer('test');
  });

  afterEach(() => server.shutdown());
  
  const renderComponent = () => {
    const { getByText, container } = renderWithRedux(<BackendCallComponent />);

    return {
      button: getByText(/fetch from back-end/i),
      getLabel: async () => await waitFor(() => getByText(/response/i), { container }),
    };
  };

  const callBackendAndGetLabel = async () => {
    const { button, getLabel } = renderComponent();

    await act(async () => {
      fireEvent.click(button);
    });

    return getLabel();
  };

  it('should call backend and display response', async function () {
    const response = BackendResponseBuilder.build({
      response: 'hello',
    });

    server.get('/hello',() => response  )

    const label = await callBackendAndGetLabel();

    await waitFor(() =>  {
      expect(label).toHaveTextContent('hello');
    } )
  });

  it('should handle invalid response', async function () {

    server.get('/hello', () => ({wrongkey: 'wrong value'}))
    
    const label = await callBackendAndGetLabel();

    await waitFor(() => {
      expect(label).toHaveTextContent('Invalid response');
    })
  });

  it('should handle fetch failure', async function () {
    server.get('/hello', () => {
      return new Response(500, {}, { 'errors': ['Failed to fetch data'] })
    })
    const label = await callBackendAndGetLabel();

    await waitFor(() => {
      expect(label).toHaveTextContent('Failed');
    })
  });
});
