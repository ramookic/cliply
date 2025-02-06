const Loader = () => {
  return (
    <div
      className={`animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-primary rounded-full`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
