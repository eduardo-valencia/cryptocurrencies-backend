import FavoriteRepo from "../Favorite";

import Favorite from "@supercoder.dev/cryptocurrencies-common/src/collections/Favorite";

interface FavoriteTestData {
  favorite: Favorite;
  expectedFavorite: Omit<Favorite, "id">;
}

const addFavorite = async (): Promise<FavoriteTestData> => {
  const userId: string = "hello";
  const currency: string = "currency";
  const favorite = await FavoriteRepo.add(userId, currency);
  return {
    favorite,
    expectedFavorite: {
      userId: userId,
      currency,
    },
  };
};

describe("find by user", () => {
  it("Should return an empty array if it did not find results", async () => {
    const rows = await FavoriteRepo.findByUser("user");
    expect(rows).toHaveLength(0);
  });

  it("Should return the list of favorites", async () => {
    const { favorite } = await addFavorite();
    const favorites = await FavoriteRepo.findByUser(favorite.userId);
    expect(favorites[0]).toEqual(favorite);
  });
});

describe("Adding favorite", () => {
  it("Should return the favorite", async () => {
    const { favorite, expectedFavorite } = await addFavorite();
    expect(favorite).toHaveProperty("userId", expectedFavorite.userId);
    expect(favorite).toHaveProperty("currency", expectedFavorite.currency);
  });
});

describe("Deleting favorite", () => {
  it("Should remove the favorite", async () => {
    const { favorite } = await addFavorite();
    await FavoriteRepo.delete(favorite.id);
    const favorites = await FavoriteRepo.findByUser(favorite.userId);
    expect(favorites).toHaveLength(0);
  });
});
