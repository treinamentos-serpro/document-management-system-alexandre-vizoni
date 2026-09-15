import DownloadButton from './DownloadButton';

// Lista os documentos retornados pela API, com ação de download por item.
export default function DocumentList({ documents, owner }) {
  if (documents.length === 0) {
    return <p>Nenhum documento enviado ainda.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Dono</th>
          <th>Tamanho</th>
          <th>Enviado em</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.originalName}</td>
            <td>{doc.owner}</td>
            <td>{doc.size} bytes</td>
            <td>{new Date(doc.uploadedAt).toLocaleString('pt-BR')}</td>
            <td>
              <DownloadButton documentId={doc.id} fileName={doc.originalName} owner={owner} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
