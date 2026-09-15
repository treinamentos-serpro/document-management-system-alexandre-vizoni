// Repositório em memória para os metadados dos documentos.
// Atenção: ao reiniciar o processo, os metadados somem mas os arquivos em
// backend/storage permanecem em disco (limitação conhecida desta fase).
const documents = new Map();

function save(document) {
  documents.set(document.id, document);
  return document;
}

function findAll() {
  return Array.from(documents.values());
}

function findById(id) {
  return documents.get(id);
}

module.exports = { save, findAll, findById };
