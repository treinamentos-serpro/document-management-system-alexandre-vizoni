// Regras de negócio de upload, listagem e download de documentos.

const crypto = require('node:crypto');
const documentRepository = require('../repositories/documentRepository');

class DocumentNotFoundError extends Error {}

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

function listDocuments() {
  return documentRepository.findAll();
}

function getDocumentById(id) {
  const document = documentRepository.findById(id);
  if (!document) {
    throw new DocumentNotFoundError(`Documento ${id} não encontrado`);
  }
  return document;
}

module.exports = {
  registerUpload,
  listDocuments,
  getDocumentById,
  DocumentNotFoundError,
};
