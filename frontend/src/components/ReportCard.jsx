export default function ReportCard({ report }) {
  if (!report || (Array.isArray(report) && report.length === 0)) return null;

  const result = Array.isArray(report) ? report[0] : report;

  const label = result.label || "N/A";
  const score = result.score || 0;
  const description =
    result.description ||
    (label === "POSITIVE"
      ? "Symptoms seem mild. No urgent concern."
      : label === "NEGATIVE"
      ? "Symptoms may be severe. Consider medical advice."
      : "No reliable prediction.");

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-md text-gray-900">
      <h2 className="text-xl font-bold mb-3">AI Prediction</h2>
      <p>
        <strong>Label:</strong> {label} <br />
        <strong>Confidence:</strong> {(score * 100).toFixed(2)}% <br />
      </p>
      <p className="mt-2">
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
}
