var fs = require('fs');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../server');
var numFiles;

describe('Testing series POST', () => {
  before((done) => {
    fs.readdir('./data', (err, files) => {
      if(err) {
        console.error(err);
      } else {
        numFiles = files.length;
      }
      done();
    });
  });
  it('should respond to POST request by creating a series', (done) => {
    request('localhost:3000')
      .post('/series/')
      .set('Content-Type', 'application/json')
      .send('{"name": "The Wire"}')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        fs.readdir('./data', (err, files) => {
          expect(files.length).to.eql(numFiles + 1);
        });
        done();
      });

  });
});

describe('testing series GET', () => {
  it('should respond to GET request by showing a list of files', (done) => {
    request('localhost:3000')
      .get('/series/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        fs.readdir('./data', (err, files) => {
          expect(files.length).to.eql(res.text.split('\n').length + 1);
        });
        done();
      });
  });
});
