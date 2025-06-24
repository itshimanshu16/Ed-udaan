const ProgressBar = ({ value = 0, max = 100, showLabel = true }) => {
  const percent = max > 0 ? ((value / max) * 100).toFixed(1) : 0;

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="text-sm text-white">
          Leads: {value} / {max} ({percent}%)
        </div>
      )}
      <div className="w-full bg-gray-600 h-4 rounded-full overflow-hidden">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
