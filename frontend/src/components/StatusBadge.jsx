export default function StatusBadge({ status }) {
  const colors = {
    BUILDING: "#facc15",
    AVAILABLE: "#3b82f6",
    PUBLISHED: "#22c55e",
    FAILED: "#ef4444"
  };

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 12,
        background: colors[status] || "#ccc",
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold"
      }}
    >
      {status}
    </span>
  );
}
