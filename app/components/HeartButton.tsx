"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import classNames from "classnames";
import { useFavorite } from "../hooks/useFavorite";

type HeartButtonProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export const HeartButton = (props: HeartButtonProps) => {
  const favorite = useFavorite({
    listingId: props.listingId,
    currentUser: props.currentUser,
  });

  return (
    <button
      onClick={favorite.toggleFavorite}
      className="relative hover:opacity-80 transition"
    >
      <span>
        <AiOutlineHeart
          size={28}
          className="fill-white absolute -top-0.5 -right-0.5"
        />
        <AiFillHeart
          size={24}
          className={classNames(
            favorite.hasFavorited() ? "fill-rose-500" : "fill-neutral-500/70"
          )}
        />
      </span>
    </button>
  );
};
