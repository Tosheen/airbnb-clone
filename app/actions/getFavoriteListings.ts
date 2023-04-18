import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser == null) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites.map((f) => {
      return { ...f, createdAt: f.createdAt.toISOString() };
    });
  } catch (error) {
    throw new Error("Something went wrong in getFavoriteListings");
  }
}
