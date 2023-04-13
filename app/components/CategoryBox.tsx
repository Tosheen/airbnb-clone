"use client";

import classNames from "classnames";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

type CategoryBoxProps = {
  icon: IconType;
  label: string;
  description: string;
  selected?: boolean;
};

export const CategoryBox = (props: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const Icon = props.icon;

  const handleClick = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: Record<string, string> = {
      ...currentQuery,
      category: props.label,
    };

    if (params?.get("category") === props.label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <button
      className={classNames(
        "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
        props.selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      )}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{props.label}</div>
    </button>
  );
};
