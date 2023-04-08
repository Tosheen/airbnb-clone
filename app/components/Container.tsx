"use client";

import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = (props: ContainerProps) => {
  return (
    <div className="max-w-[2520px] mx-auto px-4 sm:px-2 md:px-10 xl:px-20 ">
      {props.children}
    </div>
  );
};
