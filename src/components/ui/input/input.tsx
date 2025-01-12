import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-zinc-800">
          {label}
        </label>
      )}
      <input
        id={props.id}
        {...props}
        className={clsx(
          "w-full px-4 py-2 bg-zinc-100 text-zinc-800 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-200",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
