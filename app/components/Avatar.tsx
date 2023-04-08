"use client";

import Image from "next/image";

type AvatarProps = {
  src?: string | null;
};

export const Avatar = (props: AvatarProps) => {
  return (
    <Image
      src={props.src != null ? props.src : "/images/placeholder.jpg"}
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      priority
    />
  );
};
