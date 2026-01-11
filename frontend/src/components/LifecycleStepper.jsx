export default function LifecycleStepper({ status }) {
  const steps = ["BUILDING", "AVAILABLE", "PUBLISHED"];
  const isFailed = status === "FAILED";


  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
  {steps.map((step, index) => {
    const completed =
      steps.indexOf(step) <
      steps.indexOf(isFailed ? "BUILDING" : status);

    const active = step === status && !isFailed;

    return (
      <div key={step} style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            padding: "4px 10px",
            borderRadius: 16,
            fontSize: 12,
            fontWeight: 600,
            background: completed
              ? "#16a34a"
              : active
              ? "#2563eb"
              : "#e5e7eb",
            color: completed || active ? "#fff" : "#6b7280"
          }}
        >
          {step}
        </div>

        {index < steps.length - 1 && (
          <span style={{ margin: "0 6px", color: "#cbd5e1" }}>→</span>
        )}
      </div>
    );
  })}

  {isFailed && (
    <div
      style={{
        padding: "4px 10px",
        borderRadius: 16,
        background: "#dc2626",
        color: "#fff",
        fontSize: 12,
        fontWeight: 600
      }}
    >
      FAILED
    </div>
  )}
</div>

  );
}
