import { useOverlayStore } from "@/lib/store/OverlayStore";
import Image from "next/image";
import Link from "next/link";

type SavedJobsTableBodyProps = {
  jobs: Job[];
  checkedItems: CheckedItems;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleJobToBeDeleted: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

const SavedJobsTableBody = ({
  jobs,
  checkedItems,
  handleCheckboxChange,
  setShowDeleteModal,
  setSingleJobToBeDeleted,
}: SavedJobsTableBodyProps) => {
  const openDeleteModal = (jobId: string) => {
    useOverlayStore.setState({ overlay: true });
    setShowDeleteModal(true);
    setSingleJobToBeDeleted(jobId);
  };

  return (
    <tbody className="border border-gray-300">
      {jobs.map((job) => (
        <tr key={job._id}>
          <th className="p-3">
            <input
              className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
              type="checkbox"
              value={job._id}
              checked={checkedItems[job._id] || false}
              onChange={handleCheckboxChange}
            />
          </th>
          <td className="text-sm p-3 underline">
            <Link href={`/job/${job._id}`}>
              <p className="w-max">{job.title}</p>
            </Link>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.type}</p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.level}</p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.salary}</p>
          </td>
          <td>
            <p className="text-sm w-max p-3">{job.location}</p>
          </td>
          <td>
            <div className="flex items-center gap-3 w-max">
              <Image
                src={job.companylogo}
                width={20}
                height={20}
                alt="img"
                className="sm:hidden"
              />
              <p className="text-sm w-max p-3">{job.company}</p>
            </div>
          </td>
          <td className="text-sm w-max p-3">
            <p>
              {job.applied} / {job.capacity}
            </p>
          </td>
          <td className="text-sm p-3">
            <button
              type="button"
              className="w-max"
              onClick={() => openDeleteModal(job._id)}
            >
              <Image src="/trash.svg" width={20} height={20} alt="delete" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SavedJobsTableBody;
