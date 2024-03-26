import { getCollection } from "@/services/fetch/collections";
import { CollectionCardProps } from "./types";
import { getCustomFieldsByCollection } from "@/services/fetch/customFields";
import { getDictionary } from "@/app/dictionaries";
import { getUser } from "@/services/fetch/users";
import { getCategory } from "@/services/fetch/categories";
import Image from "next/image";
import placeholder from "@/public/images/placeholder2.jpg";
import Markdown from "react-markdown";
import Header from "../../Header";
import CollectionForm from "@/components/Molecules/Form/Collection";
import DeleteModal from "@/components/Molecules/Modal/Delete";
import { deleteCollection } from "@/services/actions/collections";

const CollectionCard = async ({
  collectionId,
  lang,
  hasAccess,
}: CollectionCardProps) => {
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
    <div className="grid gap-4 lg:gap-8 max-w-[850px]">
      <Header title={dict.component.header.collection}>
        {hasAccess && (
          <div className="flex gap-2">
            <CollectionForm type="edit" id={collectionId} dict={dict} />
            <DeleteModal
              type="collection"
              name={collection.name}
              dict={dict}
              deleteHandler={deleteCollection}
              id={collectionId}
              imageUrl={
                collection.image !== "" && collection.image
                  ? collection.image
                  : undefined
              }
              redirectPath={`/${lang}/collections`}
            />
          </div>
        )}
      </Header>
      <div className="grid gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {dict.component.card.collection.name}
            </h1>
            <p className="text-xl md:text-2xl">{collection.name}</p>
          </div>

          <Image
            src={
              collection.image === "" || !collection.image
                ? placeholder
                : collection.image
            }
            alt={collection.name}
            width={100}
            height={100}
            className="rounded-full aspect-square object-cover"
          />
        </div>

        <div className="flex flex-wrap items-center gap-y-8 gap-x-16 lg:gap-y-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {dict.component.card.collection.author}
            </h2>
            <p className="text-xl md:text-2xl">{user.username ?? user.name}</p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {dict.component.card.collection.category}
            </h2>
            <p className="text-xl md:text-2xl">
              {dict.categories[category.name as keyof typeof dict.categories]}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold">
            {dict.component.card.customFields}:{" "}
          </h2>
          <p className="text-lg md:text-xl">
            {customFields.length
              ? fields.join(", ")
              : dict.component.card.collection.none}
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-xl md:text-2xl font-bold">
            {dict.component.card.collection.description}
          </h2>
          <p>
            <Markdown className={"markdown"}>{collection.description}</Markdown>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
