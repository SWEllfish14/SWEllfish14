const request = require('supertest');
const app = require('../index.js');


describe('GET', () => {
    test('Dovrebbe ritornare il numero di guasti', async () => {
        const req =  request(app).get('/numeroGuasti');
        expect(req).toBeGreaterThan(0);
    });

    test
  });