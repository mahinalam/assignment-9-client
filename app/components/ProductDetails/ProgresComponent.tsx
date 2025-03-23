const ProgressBar = ({ percentage }: any) => {
  return (
    <div className="relative h-4 w-full bg-gray-200 rounded-md">
      <div
        className="absolute top-0 left-0 h-4 bg-[#E21B70] rounded-md"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
