const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png/;
  const mimetype = allowedExtensions.test(file.mimetype);
  const extname = allowedExtensions.test(file.originalname.split('.').pop().toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error('Formato no permitido. Solo JPG, JPEG, PNG.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: fileFilter
}).single('imagen'); // ✅ cambio aquí

const validarUnaImagen = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'El archivo excede 2MB.' });
      }
      return res.status(400).json({ success: false, message: err.message });
    }

    return next();
  });
};

module.exports = {
  validarUnaImagen
};
