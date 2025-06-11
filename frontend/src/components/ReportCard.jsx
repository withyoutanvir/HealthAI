export default function ReportCard({ report }) {
  if (!report || !report.length) return null;

  const { label, score } = report[0];

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-md">
      <h2 className="text-xl font-bold mb-3">Sentiment Analysis Result</h2>
      <p className="text-gray-700">
        Sentiment: <strong>{label}</strong> <br />
        Confidence: <strong>{(score * 100).toFixed(2)}%</strong>
      </p>
    </div>
  );
}
