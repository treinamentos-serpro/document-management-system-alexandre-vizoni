import DownloadButton from './DownloadButton';

// Lista os documentos retornados pela API, com ação de download por item.
export default function DocumentList({ documents }) {
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
        {documents.map((document) => (
          <tr key={document.id}>
            <td>{document.originalName}</td>
            <td>{document.owner}</td>
            <td>{document.size} bytes</td>
            <td>{new Date(document.uploadedAt).toLocaleString('pt-BR')}</td>
            <td>
              <DownloadButton documentId={document.id} fileName={document.originalName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
