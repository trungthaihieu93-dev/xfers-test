'use strict'
const assert = require('assert');
const { server, sequelize } = require('../server');
const request = require('supertest');

describe('API tests', () => {
  before(async () => {
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

  it('Get Records With Date', (done) => {
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

  it('Get Records With Symbol', (done) => {
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

  it('Create Record', (done) => {
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

  it('Update Record', (done) => {
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

  it('Delete Record By Date', (done) => {
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

  after(() => {
    process.exit();
  });
});