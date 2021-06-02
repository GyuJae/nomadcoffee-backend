import { Category } from ".prisma/client";
import client from "../client";

export default async (name: string): Promise<Category> => {
  const categoryName = name.trim().toLowerCase();
  const categorySlug = categoryName.replace(/ /g, "-");
  let category = await client.category.findFirst({
    where: {
      slug: categorySlug,
    },
  });
  if (!category) {
    category = await client.category.create({
      data: {
        name: categoryName,
        slug: categorySlug,
      },
    });
  }
  return category;
};
