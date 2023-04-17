"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import { format } from "date-fns";
import Image from "next/image";
import { HeartButton } from "../HeartButton";
import { Button } from "../Button";

type ListingCardProps = {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
};

export const ListingCard = (props: ListingCardProps) => {
  const router = useRouter();
  const countries = useCountries();

  const location = countries.getByValue(props.data.locationValue);

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (props.disabled || props.actionId == null) {
      return;
    }

    props.onAction?.(props.actionId);
  };

  const price = props.reservation
    ? props.reservation.totalPrice
    : props.data.price;

  const reservationDate =
    props.reservation == null
      ? null
      : {
          start: format(new Date(props.reservation.startDate), "PP"),
          end: format(new Date(props.reservation.endDate), "PP"),
        };

  return (
    <div
      onClick={() => router.push(`/listings/${props.data.id}`)}
      className="col-span-1 group cursor-pointer"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt="listing"
            fill
            sizes="(max-width: 768px) 300px, 300px"
            src={props.data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={props.data.id}
              currentUser={props.currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate != null
            ? `${reservationDate.start} - ${reservationDate.end}`
            : props.data.category}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!props.reservation && <div className="font-light">night</div>}
        </div>
        {props.onAction && props.actionLabel && (
          <Button
            disabled={props.disabled}
            small
            label={props.actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
