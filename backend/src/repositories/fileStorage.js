// Configuração do multer com diskStorage: arquivos ficam apenas em backend/storage.

const crypto = require('node:crypto');
const path = require('node:path');
const multer = require('multer');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STORAGE_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomUUID();
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

module.exports = { upload, STORAGE_DIR };
