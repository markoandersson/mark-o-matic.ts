import * as Factory from 'factory.ts';
import { BackendResponse } from '../views/backend-call/backend-call';
import faker from 'faker';

/***
 * Test data builder for BackendResponse-interface. With only single property, this builder doesn't make that much sense, but with more complex objects
 * it's easy to get ready-populated object with randomized data which can be then overwritten in the tests with values specific to that test.
 */
export const BackendResponseBuilder = Factory.Sync.makeFactory<BackendResponse>({
  response: faker.lorem.word()
});
