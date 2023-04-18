"use client";

import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { ListingCard } from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

type FavoritesProps = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export const Favorites = (props: FavoritesProps) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places you have favorited" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {props.listings.map((l) => {
          return (
            <ListingCard
              key={l.id}
              data={l}
              actionLabel="Cancel Reservation"
              currentUser={props.currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};
