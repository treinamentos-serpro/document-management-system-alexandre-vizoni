// Cliente de API do DMS: todas as chamadas passam pelo prefixo /api (proxy do Vite).

const API_PREFIX = '/api';

async function parseErrorMessage(response) {
  try {
    const data = await response.json();
    return data.error || 'Erro ao comunicar com o servidor';
  } catch {
    return 'Erro ao comunicar com o servidor';
  }
}

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_PREFIX}/upload`, {
    method: 'POST',
    headers: { 'x-user-id': owner },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}

export async function listDocuments() {
  const response = await fetch(`${API_PREFIX}/documents`);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}

export async function downloadDocument(id) {
  const response = await fetch(`${API_PREFIX}/documents/${id}/download`);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.blob();
}
