const multer = require('multer'); 
const { getAlbumImagenCommerceById } = require('../models/album_imagenes'); // Ajusta la ruta correcta

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
}).array('files', 8);

const validarArchivos = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'El tamaño del archivo excede 2MB' });
      }
      return res.status(400).json({ success: false, message: err.message });
    }

    // 🔴 Aquí ya multer procesó req.body
    const idComercio = req.body.id_comercio;

    if (req.method === "POST") {
      if (!idComercio) {
        return res.status(400).json({ success: false, message: 'id_comercio es requerido' });
      }

      const imagenesActuales = await getAlbumImagenCommerceById(idComercio);
      if (imagenesActuales.length >= 8) {
        return res.status(400).json({ success: false, message: 'Este comercio ya tiene el máximo de 8 imágenes permitidas.' });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: 'Debes enviar al menos una imagen.' });
      }

      const imagenesRestantes = 8 - imagenesActuales.length;
      if (req.files.length > imagenesRestantes) {
        return res.status(400).json({ success: false, message: `Solo puedes subir ${imagenesRestantes} imágenes más.` });
      }
    }

    return next();
  });
};

module.exports = {
  validarArchivos
};
