import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import { useLoginModal } from "./useLoginModal";

type UseFavorite = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export function useFavorite(params: UseFavorite) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = () => {
    const list = params.currentUser?.favoriteIds || [];

    return list.includes(params.listingId);
  };

  const toggleFavorite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (params.currentUser == null) {
      return loginModal.onOpen();
    }

    try {
      if (hasFavorited()) {
        await axios.delete(`/api/favourites/${params.listingId}`);
      } else {
        await axios.post(`/api/favourites/${params.listingId}`);
      }

      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return {
    hasFavorited,
    toggleFavorite,
  };
}
