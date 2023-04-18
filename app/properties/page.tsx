import { EmptyListings } from "../components/EmptyListings";

import { ClientOnly } from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import { Properties } from "./Properties";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return (
      <ClientOnly>
        <EmptyListings title="Unauthorized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyListings
          title="No properties found"
          subTitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return <Properties listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
