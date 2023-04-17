import prisma from "@/app/libs/prismadb";

type Params = {
  listingId?: string;
};

export default async function getListing(params: Params) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (listing == null) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString(),
      },
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
