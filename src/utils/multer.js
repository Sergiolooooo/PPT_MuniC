const multer = require('multer'); 

const storage = multer.memoryStorage(); // O tu configuración de almacenamiento

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png/; // Extensiones permitidas
  const mimetype = allowedExtensions.test(file.mimetype); // Verifica el tipo MIME
  const extname = allowedExtensions.test(file.originalname.split('.').pop().toLowerCase()); // Verifica la extensión

  if (mimetype && extname) {
    return cb(null, true); // ✅ Archivo válido
  } else {
    return cb(new Error('Formato de archivo no permitido. Solo se permiten imágenes (JPG, JPEG, PNG).'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB por archivo
  fileFilter: fileFilter //validación de tipo de archivo
}).array('files', 10);

const validarArchivos = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'El tamaño del archivo excede el límite de 2MB' });
      }
      return res.status(400).json({ success: false, message: err.message });
    }

    return next();
  });
};

module.exports = {
  validarArchivos
};
