// Entrada/saída HTTP e validação básica das requisições de documentos.

const documentService = require('../services/documentService');

function requireOwner(req, res) {
  const owner = req.header('x-user-id');
  if (!owner) {
    res.status(400).json({ error: 'Header x-user-id é obrigatório' });
    return null;
  }
  return owner;
}

function upload(req, res) {
  const owner = requireOwner(req, res);
  if (!owner) {
    return undefined;
  }
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const document = documentService.registerUpload(req.file, owner);
  return res.status(201).json(document);
}

function list(req, res) {
  const owner = requireOwner(req, res);
  if (!owner) {
    return undefined;
  }

  return res.json(documentService.listDocumentsByOwner(owner));
}

function download(req, res, next) {
  const owner = requireOwner(req, res);
  if (!owner) {
    return undefined;
  }

  // Erros de domínio (404/403) são lançados de forma síncrona e tratados
  // pelo middleware de erro central em app.js.
  const { document, filePath } = documentService.getDocumentForDownload(req.params.id, owner);

  res.setHeader('X-Content-Type-Options', 'nosniff');
  return res.download(filePath, document.originalName, (error) => {
    if (error) {
      next(error);
    }
  });
}

module.exports = { upload, list, download };
