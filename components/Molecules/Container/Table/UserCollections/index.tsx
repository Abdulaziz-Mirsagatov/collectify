import { getCollectionsByUser } from "@/services/fetch/collections";
import { UserCollectionRow, UserCollectionsTableContainerProps } from "./types";
import { getDictionary } from "@/app/dictionaries";
import RegularTable from "@/components/Organisms/Table/Regular";
import { getCategory } from "@/services/fetch/categories";
import Link from "next/link";

const UserCollectionsTableContainer = async ({
  lang,
  userId,
  search,
  limit,
  sort,
}: UserCollectionsTableContainerProps) => {
  const [collections, dict] = await Promise.all([
    getCollectionsByUser(userId, search, limit, sort),
    getDictionary(lang),
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
    <div className="overflow-x-auto">
      <RegularTable
        rows={collectionRows}
        columns={columns}
        dict={dict.component.table.collections}
        lang={lang}
        buttons={buttons}
      />
    </div>
  );
};

export default UserCollectionsTableContainer;
