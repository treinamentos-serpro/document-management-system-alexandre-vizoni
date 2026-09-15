// Definição dos endpoints de documentos, delegando para os controllers.

const { Router } = require('express');
const documentController = require('../controllers/documentController');
const { upload } = require('../repositories/fileStorage');

const router = Router();

router.post('/upload', upload.single('file'), documentController.upload);
router.get('/documents', documentController.list);
router.get('/documents/:id/download', documentController.download);

module.exports = router;
