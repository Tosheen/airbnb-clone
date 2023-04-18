"use client";

import { useSearchModal } from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

export const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={searchModal.onOpen}
      className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hiddem sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
          Any week
        </div>
        <div className="text-sm pl-6 pr-3 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">Add guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
