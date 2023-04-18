import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

type Params = {
  listingId?: string;
};

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (listingId == null || typeof listingId !== "string") {
    throw new Error("Invalid listing ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
