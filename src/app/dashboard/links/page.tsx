import Button from "@/components/ui/button/button";

const Page = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Links</h1>
        <Button fit variant="dark">
          Add new link
        </Button>
      </div>
    </div>
  );
};

export default Page;
