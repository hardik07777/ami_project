import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:4000/api";

function App() {
  const [amis, setAmis] = useState([]);

  const loadAmis = async () => {
    const res = await axios.get(`${API}/ami`);
    setAmis(res.data);
  };

  const buildAmi = async () => {
    await axios.post(`${API}/ami/build`);
    loadAmis();
  };

  useEffect(() => {
    loadAmis();
    const timer = setInterval(loadAmis, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>AMI Automation Dashboard</h2>

      <button onClick={buildAmi}>Build AMI</button>

      <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
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
    </div>
  );
}

export default App;
