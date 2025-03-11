const multer = require('multer'); 

const storage = multer.memoryStorage(); // Almacena archivos en memoria

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png/; // Extensiones permitidas
  const mimetype = allowedExtensions.test(file.mimetype); 
  const extname = allowedExtensions.test(file.originalname.split('.').pop().toLowerCase()); 

  if (mimetype && extname) {
    return cb(null, true); // ✅ Archivo válido
  } else {
    return cb(new Error('Formato de archivo no permitido. Solo se permiten imágenes (JPG, JPEG, PNG).'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB por archivo
  fileFilter: fileFilter 
}).array('files', 8); // Permitir hasta 10 archivos a la vez

const validarArchivos = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'El tamaño del archivo excede el límite de 2MB' });
      }
      return res.status(400).json({ success: false, message: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No se enviaron imágenes.' });
    }

    return next();
  });
};

module.exports = {
  validarArchivos
};
