import * as React from "react";

import { EmptyListings } from "../components/EmptyListings";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import { ClientOnly } from "../components/ClientOnly";
import { Reservations } from "./Reservations";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return (
      <ClientOnly>
        <EmptyListings title="Unauthorized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyListings
          title="No reservations found"
          subTitle="Looks like you have no reservations on your properties"
        />
      </ClientOnly>
    );
  }

  return <Reservations reservations={reservations} currentUser={currentUser} />;
};

export default ReservationsPage;
