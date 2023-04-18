import * as React from "react";

import { Container } from "./components/Container";
import { EmptyListings } from "./components/EmptyListings";
import getListings, { ListingsParams } from "./actions/getListings";
import { ListingCard } from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

type HomeProps = {
  searchParams: ListingsParams;
};

export default async function Home(props: HomeProps) {
  const listings = await getListings(props.searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyListings showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {listings.map((l) => {
          return <ListingCard key={l.id} currentUser={currentUser} data={l} />;
        })}
      </div>
    </Container>
  );
}
