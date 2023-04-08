"use client";

import classNames from "classnames";

type HeadingProps = {
  title: string;
  subTitle?: string;
  center?: boolean;
};

export const Heading = (props: HeadingProps) => {
  return (
    <div className={classNames(props.center ? "text-center" : "text-start")}>
      <div className="text-2xl font-bold">{props.title}</div>
      <div className="font-light text-neutral-500 mt-2">{props.subTitle}</div>
    </div>
  );
};
