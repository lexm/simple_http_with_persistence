var fs = require('fs');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../routes/seriesRoutes');

describe('Testing series POST', () => {
  before((done) => {
    var numFiles;
    fs.readdir('../data', (err, files) => {
      numFiles = files.length;
      done();
    });
  });
  it('should respond to POST request by creating a series', (done) => {
    request('localhost:3000')
      .post('/series')
      .set('Content-Type', 'application/json')
      .send('{"name": "The Wire"}')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(400);
        fs.readdir('../data', (err, files) => {
          expect(files.length).to.eql(numFiles + 1);
        });
        done();
      });

  });
});
