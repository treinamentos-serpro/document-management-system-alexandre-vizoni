// Configuração do multer com diskStorage: arquivos ficam apenas em backend/storage.

const crypto = require('node:crypto');
const path = require('node:path');
const multer = require('multer');

const STORAGE_DIR = path.join(__dirname, '..', '..', 'storage');
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STORAGE_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomUUID();
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE_BYTES } });

// Único ponto que conhece onde os arquivos ficam gravados em disco.
function resolveFilePath(storedName) {
  return path.join(STORAGE_DIR, storedName);
}

module.exports = { upload, resolveFilePath };
