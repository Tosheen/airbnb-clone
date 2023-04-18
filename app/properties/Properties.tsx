"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Container } from "../components/Container";
import { Heading } from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../components/listings/ListingCard";

type PropertiesProps = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export const Properties = (props: PropertiesProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const onCancel = (id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted");
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
      <Heading title="Properties" subTitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {props.listings.map((l) => {
          return (
            <ListingCard
              key={l.id}
              data={l}
              actionId={l.id}
              onAction={onCancel}
              disabled={deletingId === l.id}
              actionLabel="Delete property"
              currentUser={props.currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};
