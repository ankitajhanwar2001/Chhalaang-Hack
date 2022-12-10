"use strict";

var express = require('express');

var path = require('path');

var multer = require('multer');

var upload = multer({
  dest: __dirname + '/uploads/images'
});
var app = express();
var PORT = 3000;
app.set("view engine", "ejs");
var imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'uploads/image',
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  }
});
var imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB

  },
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'));
    }

    cb(undefined, true);
  }
});
app.use(express["static"]('uploads'));
app.post('/upload', imageUpload.single('photo'), function (req, res) {
  res.render('upload.ejs', {
    im_loc: req.file.filename
  });
}, function (error, req, res, next) {
  res.status(400).send({
    error: error.message
  });
});
app.get('/', function (req, res) {
  res.render('index.ejs');
});
app.get('/officer', function (req, res) {
  res.render('officer.ejs');
});
app.get('/agent', function (req, res) {
  res.render('agent.ejs');
});
app.get('/map', function (req, res) {
  res.render('map.ejs');
});
app.listen(PORT, function () {
  console.log('Listening at ' + PORT);
});
//# sourceMappingURL=server.dev.js.map
