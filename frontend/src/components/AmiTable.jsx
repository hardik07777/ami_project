export default function AmiTable({ amis }) {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>AMI ID</th>
          <th>Status</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        {amis.map((ami) => (
          <tr key={ami.ami_id}>
            <td>{ami.ami_id}</td>
            <td>{ami.status}</td>
            <td>{ami.version}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
