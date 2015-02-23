require('node-jsx').install();
var express     = require('express')
var app         = express();
var compression = require('compression');
var morgan      = require('morgan');
var React       = require('react/addons');
var ejs         = require('ejs');

var ReactApp    = React.createFactory(require('./DemoPage'));
var staticPath  = __dirname + '/dist/';
var port        = 5000;

app.use(morgan());
app.use(compression());

function sendStaticFile(name) {
  return function (_, res) {
    var content = React.renderToString(ReactApp({}));
    res.render(staticPath + name, {content: content});
  };
}

app.use(express.static(staticPath));
app.get('/', sendStaticFile('index.ejs'));
app.get('*', sendStaticFile('index.ejs'));

app.listen(port, console.log.bind(this, 'Port: ' + port));
