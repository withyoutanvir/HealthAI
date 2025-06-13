export default function ReportCard({ report }) {
  if (!report || !report.length) return null;

  const { label, score, description } = report[0];

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
