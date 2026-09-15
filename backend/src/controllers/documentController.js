// Entrada/saída HTTP e validação básica das requisições de documentos.

const path = require('node:path');
const documentService = require('../services/documentService');
const { STORAGE_DIR } = require('../repositories/fileStorage');

function upload(req, res) {
  const owner = req.header('x-user-id');
  if (!owner) {
    return res.status(400).json({ error: 'Header x-user-id é obrigatório' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const document = documentService.registerUpload(req.file, owner);
  return res.status(201).json(document);
}

function list(req, res) {
  return res.json(documentService.listDocuments());
}

function download(req, res) {
  try {
    const document = documentService.getDocumentById(req.params.id);
    const filePath = path.join(STORAGE_DIR, document.storedName);

    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`);
    return res.sendFile(filePath);
  } catch (error) {
    if (error instanceof documentService.DocumentNotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    throw error;
  }
}

module.exports = { upload, list, download };
