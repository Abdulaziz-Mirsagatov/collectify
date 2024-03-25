import { getCollection } from "@/services/fetch/collections";
import { CollectionCardProps } from "./types";
import { getCustomFieldsByCollection } from "@/services/fetch/customFields";
import { getDictionary } from "@/app/dictionaries";
import { getUser } from "@/services/fetch/users";
import { getCategory } from "@/services/fetch/categories";
import Image from "next/image";
import placeholder from "@/public/images/placeholder2.jpg";
import Markdown from "react-markdown";

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
          {dict.component.card.collection.author}: {user.username ?? user.name}
        </h2>
      </div>

      <div className="w-full flex items-start justify-between">
        <div className="grid gap-4 content-start">
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
        </div>

        <Image
          src={
            collection.image === "" || !collection.image
              ? placeholder
              : collection.image
          }
          alt={collection.name}
          width={200}
          height={200}
        />
      </div>

      <div>
        <h2 className="text-2xl">
          {dict.component.card.collection.description}
        </h2>
        <p>
          <Markdown className={"markdown"}>{collection.description}</Markdown>
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;
