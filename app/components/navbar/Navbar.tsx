"use client";

import { SafeUser } from "@/app/types";
import { Container } from "../Container";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { UserMenu } from "./UserMenu";
import { Categories } from "./Categories";

type NavbarProps = {
  currentUser?: SafeUser | null;
};

export const Navbar = (props: NavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={props.currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
