"use client";

import { useSearchModal } from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { useCountries } from "@/app/hooks/useCountries";
import { differenceInDays } from "date-fns";

export const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const countries = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = locationValue
    ? countries.getByValue(locationValue)?.label
    : "Anywhere";
  const durationLabel =
    startDate && endDate
      ? {
          start: new Date(startDate),
          end: new Date(endDate),
          diff: `${differenceInDays(
            new Date(endDate),
            new Date(startDate)
          )} Days`,
        }
      : {
          diff: "Any Week",
        };

  const guestLabel = guestCount ? `${guestCount} Guests` : "Add Guests";

  return (
    <div
      onClick={searchModal.onOpen}
      className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hiddem sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
          {durationLabel.diff}
        </div>
        <div className="text-sm pl-6 pr-3 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
