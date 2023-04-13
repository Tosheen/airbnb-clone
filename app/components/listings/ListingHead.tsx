"use client";

import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Heading } from "../Heading";
import Image from "next/image";
import { HeartButton } from "../HeartButton";

type ListingHeadProps = {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
};

export const ListingHead = (props: ListingHeadProps) => {
  const countries = useCountries();

  const location = countries.getByValue(props.locationValue);

  return (
    <>
      <Heading
        title={props.title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          priority
          alt="image"
          src={props.imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={props.id} currentUser={props.currentUser} />
        </div>
      </div>
    </>
  );
};
