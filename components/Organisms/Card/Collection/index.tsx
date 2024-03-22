import { getCollection } from "@/services/fetch/collections";
import { CollectionCardProps } from "./types";
import { getCustomFieldsByCollection } from "@/services/fetch/customFields";
import { getDictionary } from "@/app/dictionaries";
import { getUser } from "@/services/fetch/users";
import { getCategory } from "@/services/fetch/categories";

const CollectionCard = async ({ collectionId, lang }: CollectionCardProps) => {
  const [collection, customFields, dict] = await Promise.all([
    getCollection(collectionId),
    getCustomFieldsByCollection(collectionId),
    getDictionary(lang),
  ]);
  const [user, category] = await Promise.all([
    getUser(collection.userId),
    getCategory(collection.categoryId),
  ]);

  const fields = customFields.map((field) => field.name);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">{collection.name}</h1>
        <h2 className="text-2xl">
          {dict.component.card.collection.author}: {user.username}
        </h2>
      </div>

      <p>
        {dict.component.card.customFields}:{" "}
        {customFields.length
          ? fields.join(", ")
          : dict.component.card.collection.none}
      </p>

      <p>
        {dict.component.card.collection.category}:{" "}
        {dict.categories[category.name as keyof typeof dict.categories]}
      </p>

      <p className="text-xl">
        {dict.component.card.collection.description}: {collection.description}
      </p>
    </div>
  );
};

export default CollectionCard;
