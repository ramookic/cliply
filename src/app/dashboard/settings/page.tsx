import Button from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import getUser from "@/lib/auth/get-user";
import Image from "next/image";

const Page = async () => {
  const { user } = await getUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-center">
        <div>
          <h4 className="font-semibold">Your photo</h4>
          <p className="text-zinc-500 text-sm">
            This will be displayed on your profile.
          </p>
        </div>
        <div className="flex items-center">
          <Image
            className="rounded-full h-[54px] object-cover"
            src={user?.user_metadata.avatar}
            alt="profile-avatar"
            width={54}
            height={54}
          />
        </div>
        <Button small fit variant="outline">
          Update
        </Button>
      </div>
      <Divider />
      <div className="flex items-center justify-between font-bold text-sm">
        <div className="flex gap-2">
          <h4>Username:</h4>
          <p>{user?.user_metadata.name}</p>
        </div>
        <Button variant="outline" fit small>
          Edit
        </Button>
      </div>
      <div className="flex items-center justify-between font-bold text-sm">
        <div className="flex gap-2">
          <h4>Email:</h4>
          <p>{user?.user_metadata.email}</p>
        </div>
        <Button variant="outline" fit small>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default Page;
