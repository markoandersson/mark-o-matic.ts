import { Server } from 'miragejs';

export const createMockServer = ( environment: string = 'development'):Server => {
  return new Server({
    environment,
    
    routes() {
      this.urlPrefix = 'http://localhost:5001';
      this.namespace = '/api'

      this.get('/hello', (schema, request) => {
        return {
          response: 'hello ' + request.queryParams.request + '!'
        };
      });
    }
  }
  );
}