"use client";

import classNames from "classnames";
import { IconType } from "react-icons";

type CategoryInputProps = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

export const CategoryInput = (props: CategoryInputProps) => {
  const Icon = props.icon;
  return (
    <button
      onClick={() => {
        props.onClick(props.label);
      }}
      className={classNames(
        "w-full rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer",
        props.selected ? "border-black" : "border-neutral-200"
      )}
    >
      <Icon size={30} />
      <div className="font-semibold">{props.label}</div>
    </button>
  );
};
