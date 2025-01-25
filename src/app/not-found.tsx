import Button from "@/components/ui/button/button";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-fit flex flex-col items-center gap-2 text-center">
        <p className="bg-primary/10 text-primary px-4 py-2 text-sm font-semibold rounded-xl">
          404 Error
        </p>
        <h2 className="text-zinc-800 font-bold text-4xl">
          We&apos;ve lost this page
        </h2>
        <p className="text-sm text-zinc-500">
          Sorry, the page your are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex mt-4 gap-2">
          <Button linkTo="/login">Login</Button>
          <Button variant="dark" linkTo="/register">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
