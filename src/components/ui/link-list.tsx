import { getUserLinks } from "@/lib/data-service";
import Button from "./button";

const LinkList = async () => {
  const { data, error } = await getUserLinks();

  if (error) {
    return (
      <div className="h-full w-full">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[600px] h-full w-full flex flex-col items-center justify-center gap-2">
        <h4 className="text-xl font-semibold">Not found</h4>
        <p className="text-sm text-zinc-500 text-center max-w-[380px]">
          You dont have any links created yet, to create one click on{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">
            Add new link
          </strong>{" "}
          button.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-3xl no-scrollbar bg-white dark:bg-zinc-800 overflow-hidden px-4 pt-4">
      <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
        <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 rounded-tl-full rounded-bl-full"
            >
              Original URL
            </th>
            <th scope="col" className="px-6 py-4">
              Short code
            </th>
            <th scope="col" className="px-6 py-4">
              Created at
            </th>
            <th
              scope="col"
              className="px-6 py-4 rounded-tr-full rounded-br-full"
            >
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr
              key={el.id}
              className="bg-white border-b dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
            >
              <th
                scope="row"
                className="px-6 py-6 font-medium text-zinc-900 whitespace-nowrap dark:text-white max-w-[260px] truncate overflow-hidden"
              >
                <a
                  href={el.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {el.original_url}
                </a>
              </th>
              <td className="px-6 py-6 font-semibold text-zinc-900 dark:text-white">
                {el.short_code}
              </td>
              <td className="px-6 py-6">
                {new Date(el.created_at!).toLocaleDateString()}
              </td>
              <td className="px-6 py-6 text-right flex justify-end">
                <Button
                  linkTo={`/dashboard/links/${el.id}`}
                  variant="outline"
                  small
                  fit
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkList;
