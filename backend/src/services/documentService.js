// Regras de negócio de upload, listagem e download de documentos.

const crypto = require('node:crypto');
const documentRepository = require('../repositories/documentRepository');
const { resolveFilePath } = require('../repositories/fileStorage');

// Erros de domínio carregam o statusCode para o middleware de erro do app.js.
class DocumentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DocumentNotFoundError';
    this.statusCode = 404;
  }
}

class DocumentAccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DocumentAccessDeniedError';
    this.statusCode = 403;
  }
}

function registerUpload(file, owner) {
  const document = {
    id: crypto.randomUUID(),
    originalName: file.originalname,
    storedName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    owner,
  };
  return documentRepository.save(document);
}

function listDocumentsByOwner(owner) {
  return documentRepository.findAll().filter((document) => document.owner === owner);
}

function getDocumentForDownload(id, owner) {
  const document = documentRepository.findById(id);
  if (!document) {
    throw new DocumentNotFoundError(`Documento ${id} não encontrado`);
  }
  if (document.owner !== owner) {
    throw new DocumentAccessDeniedError('Você não tem permissão para baixar este documento');
  }
  return { document, filePath: resolveFilePath(document.storedName) };
}

module.exports = {
  registerUpload,
  listDocumentsByOwner,
  getDocumentForDownload,
  DocumentNotFoundError,
  DocumentAccessDeniedError,
};
