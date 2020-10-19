const { setupDatabase, teardownConnection } = require('../fixtures/db.js');

beforeEach(setupDatabase);
jest.setTimeout(30000);
afterAll(teardownConnection);
