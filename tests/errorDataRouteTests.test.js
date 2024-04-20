const request = require('supertest');
const server = require('../server/server');
const db = require('../server/models/tubaDB');


afterAll(async () => {
  await db.end();
  await server.close();
})

describe('Server Route Tests', () => {
  
  describe('Root path fetch', () => {

    describe("test: /", () => {
      it("request successful to fetch index.html from 'dist' build folder", async () => {
        const response  = await request(server)
          .get('/')
          .expect(200);
      });
    });
  });

  describe('Integration testing errorData routes', () => {
    
    describe('test: /errorData/allData', () => {
      it('responds with 200 status and application/json content type', async () => {
        await request(server)
          .get('/errorData/allData')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('errors, services and connections are in body of response', async () => {
        const response  = await request(server)
          .get('/errorData/allData')
        expect(Array.isArray(response.body.services)).toBe(true)
        expect(Array.isArray(response.body.errors)).toBe(true)
        expect(Array.isArray(response.body.connections)).toBe(true)
        expect(response.body.services.every(item => typeof item === 'object' && item !== null)).toBe(true)
        expect(response.body.errors.every(item => typeof item === 'object' && item !== null)).toBe(true)
        expect(response.body.connections.every(item => typeof item === 'object' && item !== null)).toBe(true)
      });
    // end errorData/allData
    });
    
    describe('test: /errorData/allErrors', () => {
      it('responds with 200 status and application/json content type', async () => {
        await request(server)
          .get('/errorData/allData')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('errors are in body of response with correct format', async () => {
        const response = await request(server)
          .get('/errorData/allErrors')
        expect(Array.isArray(response.body.errors)).toBe(true)
        expect(response.body.errors.every(item => typeof item === 'object' && item !== null)).toBe(true)
      });
    // end errorData/allErrors
    });

    describe('test: /errorData/newErrors/:err_time', () => {
      it('responds with 200 status and application/json content type', async () => {
        await request(server)
          .get('/errorData/newErrors/1710290245997')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

    // end errorData/newErrors
    });

    describe('test: /errorData/allServices', () => {
      it('responds with 200 status and application/json content type', async () => {
        await request(server)
          .get('/errorData/allServices')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('services are in body of response with correct format', async () => {
        const response = await request(server)
          .get('/errorData/allServices')
        expect(Array.isArray(response.body.services)).toBe(true)
        expect(response.body.services.every(item => typeof item === 'object' && item !== null)).toBe(true)
      });
    // end errorData/allServices
    });

    describe('test: /errorData/allConnections', () => {
      it('responds with 200 status and application/json content type', async () => {
        await request(server)
          .get('/errorData/allConnections')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('connections are in body of response with correct format', async () => {
        const response = await request(server)
          .get('/errorData/allConnections')
        expect(Array.isArray(response.body.connections)).toBe(true)
        expect(response.body.connections.every(item => typeof item === 'object' && item !== null)).toBe(true)
      });
    // end /errorData/allConnections
    });

  // end integration errorData
  });
// end server route tests  
});