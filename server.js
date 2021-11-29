// const express = require('express');
//
// const app = express();
//
// app.use(express.static('./dist/ngx-admin'));
//
// app.get('/*', (req, res) =>
//   res.sendFile('index.html', {root: 'dist/ngx-admin/'}),
// );
//
// app.listen(process.env.PORT || 8080);

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});
