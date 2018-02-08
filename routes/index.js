const express = require('express');
const multer = require('multer');
const router = express.Router();
const Picture = require('../models/picture');

const upload = multer({ dest: './public/uploads/' });

/* GET home page. */
router.get('/', (req, res, next) => {
  Picture.find({}, (err, pictures) => {
    if (err) {
      return next(err);
    }
    
    const data = {
      pictures: pictures
    }
    res.render('index', data);
  })
});


router.post('/upload', upload.single('photo'), (req, res, next) => {
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
