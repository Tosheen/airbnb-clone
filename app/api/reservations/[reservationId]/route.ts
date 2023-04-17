import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

type Params = {
  reservationId?: string;
};

export async function DELETE(
  _request: Request,
  { params }: { params: Params }
) {
  const { reservationId } = params;

  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return NextResponse.error();
  }

  if (reservationId == null || typeof reservationId !== "string") {
    throw new Error("Invalid id");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        {
          userId: currentUser.id,
        },
        {
          listing: {
            userId: currentUser.id,
          },
        },
      ],
    },
  });

  return NextResponse.json(reservation);
}
