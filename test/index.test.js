'use strict'
const assert = require('assert');
const { server, sequelize } = require('../server');
const request = require('supertest');

const testObjPOST = {
  "symbol": "AAA",
  "rates": [
    {
      "type": "e-Rate",
      "buy": "10.0001",
      "sell": "9.0001"
    },
    {
      "type": "Bank Notes",
      "buy": "10.0001",
      "sell": "9.0001"
    }
    , {
      "type": "TT Counter",
      "buy": "10.0001",
      "sell": "9.0001"
    }
  ],
  "date": "2021-05-20"
}

const testObjPUT = {
  "symbol": "SGD",
  "rates": [
    {
      "type": "e-Rate",
      "buy": "10.0001",
      "sell": "9.0001"
    },
    {
      "type": "Bank Notes",
      "buy": "10.0001",
      "sell": "9.0001"
    }
    , {
      "type": "TT Counter",
      "buy": "10.0001",
      "sell": "9.0001"
    }
  ],
  "date": "2021-05-20"
}

describe('API tests', () => {
  before(async () => {
    // wait for db connection
    await sequelize.authenticate();
  });

  it('Server is available', (done) => {
    request(server)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .then(response => {
        assert(response.text, 'Server is online!')
        done();
      })
      .catch(err => done(err))
  });

  it('Scraping process', (done) => {
    request(server)
      .get('/api/indexing')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .then(response => {
        assert(response.text, 'Scrapping process was executed successfully!')
        done();
      })
      .catch(err => done(err))
  }).timeout(60000);

  it('Get Records With Date', (done) => {
    request(server)
      .get('/api/kurs?startdate=2021-05-20&enddate=2021-05-20')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(response => {
        assert(typeof response.body, 'object')
        done();
      })
      .catch(err => done(err))
  });

  it('Get Records With Symbol', (done) => {
    request(server)
      .get('/api/kurs?startdate=2021-05-20&enddate=2021-05-20&symbol=SGD')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(response => {
        assert(typeof response.body, 'object')
        done();
      })
      .catch(err => done(err))
  });

  it('Create Record', (done) => {
    request(server)
      .post('/api/kurs')
      .set('Accept', 'application/json')
      .send(testObjPOST)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(response => {
        assert(typeof response.body, 'object')
        done();
      })
      .catch(err => done(err))
  });

  it('Update Record', (done) => {
    request(server)
      .put('/api/kurs')
      .set('Accept', 'application/json')
      .send(testObjPUT)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .then(response => {
        assert(typeof response.body, 'object')
        done();
      })
      .catch(err => done(err))
  });

  it('Delete Record By Date', (done) => {
    request(server)
      .delete('/api/kurs/2021-05-20')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done)
  });

  after(() => {
    sequelize.close();
    process.exit();
  });
});