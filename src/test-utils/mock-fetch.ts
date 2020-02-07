import { FetchMock } from 'jest-fetch-mock';
const fetchMock = fetch as FetchMock;

const params = { status: 200, headers: { 'Content-Type': 'application/json' } };

export const mockApiError = (message = 'Error') => {
  return fetchMock.mockReject(new Error(message));
};

/**
 * Will return given response when next fetch api call is triggered
 */
export const mockApiResponse = (response: object) => {
  return fetchMock.mockResponse(JSON.stringify(response), params);
};

export const resetMockedResponses = () => {
  fetchMock.resetMocks();
};
