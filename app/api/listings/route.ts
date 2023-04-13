import { NextResponse, userAgent } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    category,
    location,
    roomCount,
    guestCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  Object.keys(body).forEach((value: unknown) => {
    if (typeof value === "string" && body[value] == null) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      roomCount,
      guestCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
