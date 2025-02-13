import Navbar from "@/components/ui/navbar/navbar";
import getUser from "@/lib/auth/get-user";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user, error } = await getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="w-full h-screen">
      <header className="fixed w-full h-20 px-4 md:px-0">
        <div className="container mx-auto h-full flex items-center justify-between">
          <div className="flex gap-1">
            <Image src="/logo.svg" width={28} height={28} alt="logo" />
            <Link
              href="/dashboard"
              className="text-zinc-800 text-xl font-bold no-underline"
            >
              Cliply
            </Link>
          </div>
          <Navbar />
          <div className="mr-12 md:mr-0">
            <h4 className="text-sm">{user.user_metadata.name}</h4>
          </div>
        </div>
      </header>
      <main className="container mx-auto w-full px-4 md:px-0 pt-28">
        {children}
      </main>
    </div>
  );
};

export default Layout;
