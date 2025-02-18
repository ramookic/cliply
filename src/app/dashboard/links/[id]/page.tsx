import UpdateLinkForm from "@/components/forms/update-link-form";
import { getUserLink } from "@/lib/data-service";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const { data, error } = await getUserLink(Number(id));

  if (error) {
    return (
      <div className="min-h-[600px] h-full w-full flex flex-col items-center justify-center gap-2">
        <p>Something went wrong.</p>
        <Link href="/dashboard/links">Return back to links</Link>
      </div>
    );
  }

  if (!data || !data) {
    return (
      <div className="min-h-[600px] h-full w-full flex flex-col items-center justify-center gap-2">
        <h4 className="text-xl font-semibold">Link not found</h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{data.short_code}</h1>
          <p className="text-sm text-zinc-500">Manage your link here.</p>
        </div>
        <Link href={`/dashboard/analytics/${data.id}`}>Analytics</Link>
      </div>
      <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded-3xl">
        <div className="bg-white dark:bg-zinc-900/70 p-4 rounded-2xl">
          <UpdateLinkForm linkData={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
