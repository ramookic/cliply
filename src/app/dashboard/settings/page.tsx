import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import getUser from "@/lib/auth/get-user";

const Page = async () => {
  const { user } = await getUser();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-semibold">Basic</h4>
      <div className="flex items-center justify-between font-bold text-sm">
        <h4>Name:</h4>
        <p>{user?.user_metadata.name}</p>
        <Button variant="outline" fit small>
          Edit
        </Button>
      </div>
      <Divider />
      <div className="flex items-center justify-between font-bold text-sm">
        <h4>Email:</h4>
        <p>{user?.user_metadata.email}</p>
        <Button variant="outline" fit small>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Page;
