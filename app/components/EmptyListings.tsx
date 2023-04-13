"use client";

import { useRouter } from "next/navigation";
import { Heading } from "./Heading";
import { Button } from "./Button";

type EmptyListingsProps = {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
};

export const EmptyListings = (props: EmptyListingsProps) => {
  const {
    title = "No exact matches",
    subTitle = "Try changing or removing some of your filters",
  } = props;
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subTitle} center />
      <div className="w-48 mt-4">
        {props.showReset && (
          <Button
            outlined
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};
