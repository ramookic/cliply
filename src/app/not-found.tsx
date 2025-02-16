import Logo from "@/components/ui/logo";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 mt-6 md:mt-8 px-6 md:px-8 flex justify-between w-full">
        <Logo />
        <div className="flex mt-2 gap-2 text-sm font-semibold">
          <Link href="/login">Login</Link>
          <p className="font-medium text-sm">or</p>
          <Link href="/register">Register</Link>
        </div>
      </div>
      <div className="w-fit flex flex-col items-center gap-2 text-center">
        <p className="bg-secondary-light/20 dark:bg-secondary-dark/20 text-orange-500 px-4 py-2 text-sm font-semibold rounded-full">
          404 Error
        </p>
        <h1 className="text-zinc-800 dark:text-zinc-100 font-bold text-4xl md:text-5xl mt-4">
          We&apos;ve lost this page
        </h1>
        <p className="max-w-[480px] text-zinc-500 px-4 mt-2">
          This is a 404 error, which means you&apos;ve clicked on a bad link or
          entered an invalid URL. P.S Our links are case sensitive.
        </p>
      </div>
      <p className="absolute text-zinc-500 text-sm bottom-4">
        © {new Date().getFullYear()} Cliply - All Rights Reserved
      </p>
    </div>
  );
};

NotFound.theme = "light";

export default NotFound;
