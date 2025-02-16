import Tabs from "@/components/ui/tabs";

const tabs = [
  {
    title: "General",
    href: "/dashboard/settings",
  },
  {
    title: "Profile",
    href: "/dashboard/settings/profile",
  },
  {
    title: "Password",
    href: "/dashboard/settings/password",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1 className="text-xl font-semibold">Settings</h1>
      <p className="text-sm text-zinc-500">
        Manage your details and personal preferences here.
      </p>
      <div className="mt-4 mb-8 overflow-x-scroll no-scrollbar">
        <Tabs tabs={tabs} />
      </div>
      <div className="px-4">{children}</div>
    </div>
  );
};

export default Layout;
