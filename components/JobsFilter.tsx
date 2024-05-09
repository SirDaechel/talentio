import Image from "next/image";
import { ChangeEvent } from "react";

type JobsFilterProps = {
  filter: {
    title: string;
    frequency: JobsFilterFrequency[];
    toggleShowFilter: () => void;
    showFilter: boolean | JobsFilterFrequency[];
    type: string;
  };
  handleFilter: (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
    filter: string
  ) => Promise<void>;
};

const JobsFilter = ({ filter, handleFilter }: JobsFilterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span
        className="flex items-center justify-between cursor-pointer"
        onClick={filter.toggleShowFilter}
      >
        <h2 className="text-lg font-semibold">{filter.title}</h2>
        <Image
          src="/arrow-up.svg"
          width={22}
          height={22}
          alt={filter.title}
          className={`${
            filter.showFilter
              ? "rotate-180 transition duration-150"
              : "transition duration-150"
          }`}
        />
      </span>
      {filter.showFilter &&
        filter.frequency.map((f, index) => (
          <label key={index} className="flex items-center gap-4">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer"
              onChange={(e) => handleFilter(e, filter.type, f._id)}
            />
            <p>
              {f._id} ({f.count})
            </p>
          </label>
        ))}
    </div>
  );
};

export default JobsFilter;