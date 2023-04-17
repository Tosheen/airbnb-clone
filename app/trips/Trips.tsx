"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../components/listings/ListingCard";

type TripsProps = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

export const Trips = (props: TripsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const onCancel = (id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
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
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
      />
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
