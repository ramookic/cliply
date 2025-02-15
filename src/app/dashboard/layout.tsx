import Logo from "@/components/ui/logo/logo";
import Navbar from "@/components/ui/navbar/navbar";
import getUser from "@/lib/auth/get-user";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user, error } = await getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="w-full h-screen">
      <header className="fixed w-full h-20 px-4 md:px-0 bg-white dark:bg-zinc-900">
        <div className="container mx-auto h-full flex items-center justify-between">
          <div className="flex gap-1">
            <Logo size={28} className="text-xl" />
          </div>
          <Navbar />
          <div className="mr-12 md:mr-0">
            <h4 className="text-sm font-semibold">{user.user_metadata.name}</h4>
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
