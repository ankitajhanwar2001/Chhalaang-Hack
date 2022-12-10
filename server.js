const express = require('express');
const path= require('path');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
const Land = require('./models/area.js');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

// const url = "mongodb://localhost/jaikisan";


// (async()=>{
//   mongoose.connect(url);
// })();

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'uploads/image', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 

app.use(express.static('uploads'));

app.post('/upload', imageUpload.single('photo'), (req, res) => {
    res.render('upload.ejs',{im_loc: req.file.filename});
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/officer', (req, res) => {
  res.render('officer.ejs');
})

app.get('/agent', (req, res) => {
  res.render('agent.ejs');
})

app.get('/map', (req, res) => {
  res.render('map.ejs');
})

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});