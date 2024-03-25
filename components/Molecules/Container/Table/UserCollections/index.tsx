import { getCollectionsByUser } from "@/services/fetch/collections";
import { UserCollectionRow, UserCollectionsTableContainerProps } from "./types";
import { getDictionary } from "@/app/dictionaries";
import RegularTable from "@/components/Organisms/Table/Regular";
import { getUser } from "@/services/fetch/users";
import { getCategory } from "@/services/fetch/categories";
import Link from "next/link";

const UserCollectionsTableContainer = async ({
  lang,
  userId,
}: UserCollectionsTableContainerProps) => {
  const [collections, dict, user] = await Promise.all([
    getCollectionsByUser(userId),
    getDictionary(lang),
    getUser(userId),
  ]);

  const collectionsCategories = await Promise.all(
    collections.map(async (collection) => {
      const category = await getCategory(collection.categoryId);
      return category.name;
    })
  );

  const buttons: React.ReactNode[] = [];
  const collectionRows: UserCollectionRow[] = collections.map(
    (collection, index) => {
      buttons.push(
        <Link
          className="button button-info"
          href={`/${lang}/collections/collection/${collection.id}`}
          key={collection.id}
        >
          {dict.component.button.view}
        </Link>
      );

      return {
        ...collection,
        category: collectionsCategories[index],
      };
    }
  );

  const columns = ["name", "category", "createdAt"];

  return (
    <RegularTable
      rows={collectionRows}
      columns={columns}
      dict={dict}
      lang={lang}
      buttons={buttons}
    />
  );
};

export default UserCollectionsTableContainer;