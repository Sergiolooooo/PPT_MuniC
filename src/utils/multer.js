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
}).array('files', 8); // Hasta 8 imágenes

const validarArchivos = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'El tamaño del archivo excede el límite de 2MB' });
      }
      return res.status(400).json({ success: false, message: err.message });
    }

    const metodo = req.method;

    // Solo en POST, la imagen es obligatoria
    if (metodo === "POST") {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: 'Debes enviar al menos una imagen.' });
      }
    }

    // En PUT la imagen es opcional
    return next();
  });
};

module.exports = {
  validarArchivos
};
