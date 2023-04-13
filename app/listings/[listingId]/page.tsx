import { ClientOnly } from "@/app/components/ClientOnly";
import getListing from "../../actions/getListing";
import getCurrentUser from "../../actions/getCurrentUser";
import { EmptyListings } from "@/app/components/EmptyListings";
import { ListingItem } from "./ListingItem";

type ListingPage = {
  listingId?: string;
};

export default async function ListingPage({ params }: { params: ListingPage }) {
  const listing = await getListing({
    listingId: params.listingId,
  });

  const currentUser = await getCurrentUser();

  if (listing == null) {
    return (
      <ClientOnly>
        <EmptyListings />
      </ClientOnly>
    );
  }

  return <ListingItem listing={listing} currentUser={currentUser} />;
}
