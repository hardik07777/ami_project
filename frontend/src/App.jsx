import { useEffect, useState } from "react";
import axios from "axios";
import AmiCards from "./components/AmiCards";

const API = "http://localhost:4000/api";

export default function App() {
  const [amis, setAmis] = useState([]);

  const loadAmis = async () => {
    const res = await axios.get(`${API}/ami`);
    setAmis(res.data);
  };

  const buildAmi = async () => {
    await axios.post(`${API}/ami/build`);
    loadAmis();
  };

  const publishAmi = async (id) => {
    await axios.post(`${API}/ami/publish`, { id });
    loadAmis();
  };

  const retryAmi = async (id) => {
    await axios.post(`${API}/ami/retry`, { id });
    loadAmis();
  };

  useEffect(() => {
    loadAmis();
    const timer = setInterval(loadAmis, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 24, background: "#f1f5f9", minHeight: "100vh" }}>
      {/* Header */}
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    padding: "16px 20px",
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  }}
>
  <h2 style={{ margin: 0, fontSize: 20, color: "#111827" }}>
    AMI Automation Dashboard
  </h2>

  <button
    style={{
      padding: "10px 16px",
      background: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      fontWeight: 600,
      cursor: "pointer"
    }}
  >
    + Build AMI
  </button>
</div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",gap: 24, marginTop: 24}}>
        {amis.map((ami) => (
          <AmiCards
            key={ami.ami_id}
            ami={ami}
            onPublish={publishAmi}
            onRetry={retryAmi}
          />
        ))}
      </div>
    </div>
  );
}
