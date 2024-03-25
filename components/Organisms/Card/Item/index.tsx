import { getDictionary } from "@/app/dictionaries";
import { ItemCardProps } from "./types";
import { getItem } from "@/services/fetch/items";
import { getCustomFieldsByCollection } from "@/services/actions/customFields";
import { getTagsByItem } from "@/services/fetch/tags";
import { getItemCustomFieldValuesByItem } from "@/services/fetch/itemCustomFieldValues";
import { CUSTOM_FIELD_TYPES } from "@/constants/customFields";
import { getCollection } from "@/services/fetch/collections";
import Header from "../../Header";
import ItemForm from "@/components/Molecules/Form/Item";
import DeleteModal from "@/components/Molecules/Modal/Delete";
import { deleteItem } from "@/services/actions/items";

const ItemCard = async ({
  lang,
  itemId,
  collectionId,
  hasAccess,
}: ItemCardProps) => {
  const [dict, item, customFields, collection] = await Promise.all([
    getDictionary(lang),
    getItem(itemId),
    getCustomFieldsByCollection(collectionId),
    getCollection(collectionId),
  ]);

  const [tags, customFieldValues] = await Promise.all([
    getTagsByItem(itemId),
    getItemCustomFieldValuesByItem(itemId),
  ]);

  const values = customFields.map((field) => {
    const value = customFieldValues.find(
      (value) => value.customFieldId === field.id
    );

    switch (field.type) {
      case CUSTOM_FIELD_TYPES.TEXT:
        return {
          name: field.name,
          value: value?.stringValue,
        };
      case CUSTOM_FIELD_TYPES.NUMBER:
        return {
          name: field.name,
          value: value?.intValue,
        };
      case CUSTOM_FIELD_TYPES.DATE:
        return {
          name: field.name,
          value: value?.dateValue,
        };
      case CUSTOM_FIELD_TYPES.BOOLEAN:
        return {
          name: field.name,
          value: value?.booleanValue,
        };
      case CUSTOM_FIELD_TYPES.MULTILINE:
        return {
          name: field.name,
          value: value?.multilineValue,
        };
    }
  });

  const renderCustomValue = (value: any) => {
    if (typeof value === "boolean")
      return value ? dict.global.yes : dict.global.no;
    if (typeof value === "object") return value?.toString().split("T")[0];
    if (typeof value === "number") return value.toString();

    return value ?? dict.global.none;
  };

  return (
    <div className="grid gap-4 lg:gap-8 max-w-[850px]">
      <Header title={dict.component.header.item}>
        {hasAccess && (
          <div className="flex items-center gap-2">
            <ItemForm
              type="edit"
              dict={dict}
              collectionId={collectionId}
              id={itemId}
            />
            <DeleteModal
              type="item"
              name={item.name}
              dict={dict}
              deleteHandler={deleteItem}
              id={itemId}
              redirectPath={`/${lang}/collections/collection/${collectionId}`}
            />
          </div>
        )}
      </Header>
      <div className="grow grid content-start gap-6 max-w-[850px]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {dict.component.card.item.name}
            </h1>
            <p className="text-xl md:text-2xl">{item.name}</p>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {dict.component.card.item.fromCollection}
            </h1>
            <p className="text-xl md:text-2xl">{collection.name}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold">
            {dict.component.card.item.tags}:
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <>
                  <p
                    key={tag.id}
                    className="py-1 px-2 dark:bg-dark-gray rounded-md"
                  >
                    {tag.name}
                  </p>
                </>
              ))
            ) : (
              <p key={"none"} className="text-xl pt-0.5">
                {dict.component.card.item.none}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          {values.map((value) => (
            <div key={value?.name}>
              <h2 className="text-2xl font-bold">{value?.name}</h2>
              <p className="text-xl">{renderCustomValue(value?.value)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
