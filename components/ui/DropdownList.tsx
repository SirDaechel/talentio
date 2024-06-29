import { MouseEvent } from "react";

type DropdownListProps = {
  setShowListItems: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedListItem: React.Dispatch<React.SetStateAction<string>>;
  listData: string[];
};

const DropdownList = ({
  setShowListItems,
  setSelectedListItem,
  listData,
}: DropdownListProps) => {
  const selectItem = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const item = e.currentTarget.textContent;
    setSelectedListItem(item ? item : "");
    setShowListItems(false);
  };

  return (
    <section className="absolute custom-scrollbar h-48 bg-white border border-gray-400 drop-shadow-lg overflow-y-scroll">
      <div>
        {listData.map((item, index) => (
          <button
            type="button"
            key={index}
            className="w-full text-left border-b border-b-gray-300 py-4 px-2 hover:bg-gray-100"
            onClick={(e) => selectItem(e)}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
};

export default DropdownList;
