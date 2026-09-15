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

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return response;
}

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await request(`${API_PREFIX}/upload`, {
    method: 'POST',
    headers: { 'x-user-id': owner },
    body: formData,
  });

  return response.json();
}

export async function listDocuments(owner) {
  const response = await request(`${API_PREFIX}/documents`, {
    headers: { 'x-user-id': owner },
  });

  return response.json();
}

export async function downloadDocument(id, owner) {
  const response = await request(`${API_PREFIX}/documents/${id}/download`, {
    headers: { 'x-user-id': owner },
  });

  return response.blob();
}
