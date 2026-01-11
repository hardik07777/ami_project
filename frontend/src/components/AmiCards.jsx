import StatusBadge from "./StatusBadge";
import LifecycleStepper from "./LifecycleStepper";

export default function AmiCard({ ami, onPublish, onRetry }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 20,
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "transform 0.2s ease, box-shadow 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 18px 35px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.08)";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: "#111827"
          }}
        >
          {ami.ami_id}
        </span>
        <StatusBadge status={ami.status} />
      </div>

      {/* Metadata */}
      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          lineHeight: 1.6
        }}
      >
        <div><b>Version:</b> {ami.version}</div>
        <div><b>OS:</b> {ami.osType}</div>
        <div>
          <b>Created:</b>{" "}
          {new Date(ami.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Lifecycle */}
      <LifecycleStepper status={ami.status} />

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "#e5e7eb",
          marginTop: 4
        }}
      />

      {/* Actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10
        }}
      >
        {ami.status === "AVAILABLE" && (
          <button
            onClick={() => onPublish(ami.ami_id)}
            style={{
              padding: "6px 12px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Publish
          </button>
        )}

        {ami.status === "FAILED" && (
          <button
            onClick={() => onRetry(ami.ami_id)}
            style={{
              padding: "6px 12px",
              background: "#fee2e2",
              color: "#dc2626",
              border: "1px solid #fecaca",
              borderRadius: 6,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Retry Build
          </button>
        )}

        {ami.status === "BUILDING" && (
          <span
            style={{
              color: "#f59e0b",
              fontWeight: 600,
              fontSize: 13
            }}
          >
            ⏳ Building…
          </span>
        )}

        {ami.status === "PUBLISHED" && (
          <span
            style={{
              color: "#16a34a",
              fontWeight: 600,
              fontSize: 13
            }}
          >
            ✔ Published
          </span>
        )}
      </div>
    </div>
  );
}
