"use client";

import { IconType } from "react-icons";

type ListingCategoryProps = {
  icon: IconType;
  label: string;
  description: string;
};

export const ListingCategory = (props: ListingCategoryProps) => {
  const Icon = props.icon;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{props.label}</div>
          <p className="text-neutral-500 font-light">{props.description}</p>
        </div>
      </div>
    </div>
  );
};
