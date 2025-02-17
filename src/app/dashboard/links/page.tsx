import Button from "@/components/ui/button";
import LinkList from "@/components/ui/link-list";

const Page = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Links</h1>
          <p className="text-sm text-zinc-500">Manage your links here.</p>
        </div>
        <Button fit variant="dark">
          Add new link
        </Button>
      </div>
      <LinkList />
    </div>
  );
};

export default Page;
