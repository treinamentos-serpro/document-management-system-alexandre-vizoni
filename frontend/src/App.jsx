import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { listDocuments } from './services/api';

const DEFAULT_OWNER = 'usuario-demo';

export default function App() {
  const [owner, setOwner] = useState(DEFAULT_OWNER);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');

  const refreshDocuments = useCallback(async () => {
    try {
      const data = await listDocuments(owner);
      setDocuments(data);
      setError('');
    } catch (listError) {
      setError(listError.message);
    }
  }, [owner]);

  useEffect(() => {
    refreshDocuments();
  }, [refreshDocuments]);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Document Management System</h1>

      <label htmlFor="owner">Usuário</label>{' '}
      <input
        id="owner"
        type="text"
        value={owner}
        onChange={(event) => setOwner(event.target.value)}
      />

      <UploadComponent owner={owner} onUploaded={refreshDocuments} />

      {error && <p role="alert">{error}</p>}

      <DocumentList documents={documents} owner={owner} />
    </main>
  );
}
