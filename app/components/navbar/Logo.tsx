"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

export const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      src="/images/logo.png"
      alt="Logo"
      className="hidden md:block cursor-pointer h-auto"
      width={100}
      height={31}
      priority
    />
  );
};
