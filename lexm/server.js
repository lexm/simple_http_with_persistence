var http = require('http');
var seriesRouter = require(__dirname + '/routes/seriesRoutes').seriesRouter;

http.createServer(seriesRouter.route()).listen(3000, () => {
  console.log('server up on 3000');
});
