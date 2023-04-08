"use client";

import classNames from "classnames";
import React from "react";

import type { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  icon?: IconType;
};

export const Button = (props: ButtonProps) => {
  const Icon = props.icon;
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={classNames(
        "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full",
        props.outlined
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white",
        props.small
          ? "py-1 text-sm font-light border"
          : "py-3 text-md font-semibold border-2"
      )}
    >
      {Icon != null && <Icon size={24} className="absolute left-4 top-3" />}
      {props.label}
    </button>
  );
};
