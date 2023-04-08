"use client";

type MenuItemProps = {
  onClick: () => void;
  label: string;
};

export const MenuItem = (props: MenuItemProps) => {
  return (
    <button
      onClick={props.onClick}
      className="w-full text-left px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {props.label}
    </button>
  );
};
