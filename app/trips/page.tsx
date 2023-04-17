import { EmptyListings } from "../components/EmptyListings";

import { ClientOnly } from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import { Trips } from "./Trips";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return (
      <ClientOnly>
        <EmptyListings title="Unauthorized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyListings
          title="No trips found"
          subTitle="Looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }

  return <Trips reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
