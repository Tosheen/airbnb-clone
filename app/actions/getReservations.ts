import prisma from "@/app/libs/prismadb";

type Params = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export default async function getReservations(params: Params) {
  const { listingId, userId, authorId } = params;

  try {
    const query: Record<string, string | {}> = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = {
        userId: authorId,
      };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations.map((r) => {
      return {
        ...r,
        createdAt: r.createdAt.toISOString(),
        startDate: r.startDate.toISOString(),
        endDate: r.endDate.toISOString(),
        listing: {
          ...r.listing,
          createdAt: r.listing.createdAt.toISOString(),
        },
      };
    });
  } catch (error) {
    throw new Error("Something went wrong inside getReservations");
  }
}
