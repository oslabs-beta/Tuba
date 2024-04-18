const request = require('supertest');
const app = require('../server/server');
const TubaDB = require('../server/models/tubaDB')

let server;

beforeAll((done) => {
  const port = 3000;
  server = app.listen(port, done)
})

afterAll((done) => {
  server.close(() => {
    console.log('Server closed');
    done();
  });
});


describe('Route integration', () => {

  // Verifies that the root path is serving HTML content as expected.
  // describe('/', () => {
  //   describe('GET', () => {
  //     it('responds with 200 status and text/html content type', () => request(server)
  //     .get('/')
  //     .expect('Content-Type', /text\/html/)
  //     .expect(200));
  //   })
  // });

  // Verfies get request to the all data path is responding with 200 status codes and corrent json content is sending
  describe('/errorData/allData', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', async () => {
        await request(server)
          .get('/errorData/allData')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      // Check if errors, services and connections are arrays containing objects
      it('errors, services and connections are in body of response', async () => {
        const response = await request(server)
          .get('/errorData/allData')
          .expect('Content-Type', /application\/json/)
          .expect(200);
        expect(Array.isArray(response.body.services)).toBe(true); 
        expect(response.body.services.every(item => typeof item === 'object' && item !== null)).toBe(true); 
      });
    });
  });

});