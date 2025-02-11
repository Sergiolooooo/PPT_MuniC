const { Router } = require('express');
const { validateToken } = require('../validaciones/validateToken');

const {
    postMethod
} = require('../controller/comercios');

const router = Router();


//router.get('/',validateToken ,getMethod); ASI SE USA EL VALIDATE TOKEN

router.get('/', );
router.get('/:id', );
router.post('/', postMethod);
router.post('/login', );
router.put('/', );
router.delete('/:id', );

module.exports = router;