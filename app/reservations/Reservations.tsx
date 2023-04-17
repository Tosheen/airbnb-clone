"use client";

import * as React from "react";
import { SafeReservation, SafeUser } from "../types";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { ListingCard } from "../components/listings/ListingCard";

type ReservationsProps = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

export const Reservations = (props: ReservationsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const onCancel = (id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservations cancelled");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {props.reservations.map((r) => {
          return (
            <ListingCard
              key={r.id}
              data={r.listing}
              reservation={r}
              actionId={r.id}
              onAction={onCancel}
              disabled={deletingId === r.id}
              actionLabel="Cancel Reservation"
              currentUser={props.currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};
