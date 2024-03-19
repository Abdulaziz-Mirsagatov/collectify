import { getDictionary } from "@/app/dictionaries";
import RegularTable from "@/components/Organisms/Table/Regular";
import Link from "next/link";
import { CollectionRow, CollectionsTableContainerProps } from "./types";
import { getCollections } from "@/services/fetch/collections";
import { getUser } from "@/services/fetch/users";
import { getCategory } from "@/services/fetch/categories";

const CollectionsTableContainer = async ({
  lang,
}: CollectionsTableContainerProps) => {
  const collectionRows: CollectionRow[] = [];
  const buttons: React.ReactNode[] = [];

  const [collections, dict] = await Promise.all([
    getCollections(),
    getDictionary(lang),
  ]);
  await Promise.all(
    collections.map(async (collection) => {
      const [user, category] = await Promise.all([
        getUser(collection.userId),
        getCategory(collection.categoryId),
      ]);

      collectionRows.push({
        id: collection.id,
        name: collection.name,
        category: category.name,
        author: user.username,
      });
      buttons.push(
        <Link
          className="button button-info"
          href={`collections/${collection.id}`}
          key={collection.id}
        >
          {dict.component.button.view}
        </Link>
      );
    })
  );

  return (
    <div className="overflow-x-auto">
      <RegularTable
        rows={collectionRows}
        columns={["name", "category", "author"]}
        dict={dict.component.table.collections}
        buttons={buttons}
      />
    </div>
  );
};

export default CollectionsTableContainer;
