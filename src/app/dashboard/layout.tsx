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
            <Image src="./logo.svg" width={28} height={28} alt="logo" />
            <Link
              href="/dashboard"
              className="text-zinc-800 text-xl font-bold no-underline"
            >
              Cliply
            </Link>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/dashboard">Home</Link>
            <Link href="/dashboard/links">Links</Link>
            <Link href="/dashboard/analytics">Analytics</Link>
            <Link href="/dashboard/settings">Settings</Link>
          </div>
          <div>
            <h4 className="text-sm">{user.user_metadata.name}</h4>
          </div>
        </div>
      </header>
      <main className="container mx-auto w-full pt-28">{children}</main>
    </div>
  );
};

export default Layout;
