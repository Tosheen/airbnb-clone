"use client";

import * as React from "react";
import { Container } from "@/app/components/Container";
import { ListingHead } from "@/app/components/listings/ListingHead";
import { ListingInfo } from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import type { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingReservation } from "@/app/components/listings/ListingReservation";
import type { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type ListingItemProps = {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

export const ListingItem = (props: ListingItemProps) => {
  const { listing, reservations = [] } = props;

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = React.useMemo(() => {
    const dates: Date[] = [];
    reservations.forEach((r) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      });

      dates.push(...range);
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(listing.price);
  const [dateRange, setDateRange] = React.useState<Range>(initialDateRange);

  const category = categories.find((c) => c.label === listing.category);

  const onCreateReservation = () => {
    if (!props.currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (daysCount && listing.price) {
        setTotalPrice(daysCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={props.currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
