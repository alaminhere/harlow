const StatusBar = ({ status }) => {
  return (
    <div className="flex items-center justify-between bg-background px-5 py-3">
      <p className="font-semibold text-text">{status}</p>
    </div>
  );
};

export default StatusBar;
