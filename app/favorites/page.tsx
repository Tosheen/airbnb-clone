import { EmptyListings } from "../components/EmptyListings";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import { Favorites } from "./Favorites";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyListings
        title="No favorites found"
        subTitle="Looks like you have no favorite listings"
      />
    );
  }
  return <Favorites listings={listings} currentUser={currentUser} />;
};

export default ListingPage;
