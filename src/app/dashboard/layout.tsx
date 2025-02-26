import Logo from "@/components/ui/logo";
import Navbar from "@/components/ui/navbar";
import getUser from "@/lib/auth/get-user";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user, error } = await getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="w-full min-h-screen max-h-screen h-screen bg-zinc-100 dark:bg-zinc-900">
      <header className="absolute w-full h-20 px-4 md:px-0">
        <div className="container mx-auto h-full flex items-center justify-between bg-white dark:bg-zinc-800 rounded-full mt-4 px-6">
          <div className="flex gap-4">
            <Logo size={28} className="text-xl mr-2" />
            <div className="border-r border-zinc-200 dark:border-zinc-700"></div>
            <Navbar />
          </div>
          <div className="mr-12 md:mr-0 flex items-center gap-2">
            <div className="">
              <h4 className="text-sm font-semibold">
                {user.user_metadata.name}
              </h4>
              <p className="text-sm text-zinc-500 hidden lg:block">
                {user.user_metadata.email}
              </p>
            </div>
            <Image
              className="rounded-full h-[40px] object-cover"
              src={user.user_metadata.avatar || "/default-avatar.jpg"}
              alt="profile-avatar"
              width={40}
              height={40}
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto w-full px-4 md:px-8 pt-32 min-h-screen max-h-screen h-screen overflow-y-scroll no-scrollbar">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;
