const Loading = () => {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div
        className={`animate-spin inline-block size-8 border-[6px] border-current border-t-transparent text-zinc-800 dark:text-white rounded-full`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
