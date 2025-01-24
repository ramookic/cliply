import Sidebar from "@/components/ui/sidebar/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-4 w-full h-screen">
      <aside className="max-w-[60px] w-full">
        <Sidebar />
      </aside>
      <main className="bg-zinc-100 w-full">{children}</main>
    </div>
  );
};

export default Layout;
