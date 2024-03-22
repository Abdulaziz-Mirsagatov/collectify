import RegularTable from "@/components/Organisms/Table/Regular";
import { ItemRow, ItemsTableContainerProps } from "./types";
import { getItemsByCollection } from "@/services/fetch/items";
import { getDictionary } from "@/app/dictionaries";
import { getCustomFieldsByCollection } from "@/services/fetch/customFields";
import { getTagsByItem } from "@/services/fetch/tags";
import { getItemCustomFieldValuesByItem } from "@/services/fetch/itemCustomFieldValues";

const ItemsTableContainer = async ({
  lang,
  collectionId,
}: ItemsTableContainerProps) => {
  const [items, dict, customFields] = await Promise.all([
    getItemsByCollection(collectionId),
    getDictionary(lang),
    getCustomFieldsByCollection(collectionId),
  ]);

  const columns = ["name", "tags"];
  customFields.forEach((field) => columns.push(field.name));

  const itemRows: ItemRow[] = [];

  const itemsTags = await Promise.all(
    items.map((item) => getTagsByItem(item.id))
  );
  const itemsCustomFieldValues = await Promise.all(
    items.map((item) => getItemCustomFieldValuesByItem(item.id))
  );

  items.forEach((item, index) => {
    const itemRow: ItemRow = {
      id: item.id,
      name: item.name,
      tags: [],
    };

    const tags = itemsTags[index].map((tag) => tag.name);
    itemRow.tags = tags;

    const itemCustomFieldValues = itemsCustomFieldValues[index];
    customFields.map((field) => {
      const itemCustomFieldValue = itemCustomFieldValues.find(
        (value) => value.customFieldId === field.id
      );

      switch (field.type) {
        case "text":
          itemRow[field.name] = itemCustomFieldValue?.stringValue;
          return;
        case "number":
          itemRow[field.name] = itemCustomFieldValue?.intValue;
          return;
        case "date":
          itemRow[field.name] = itemCustomFieldValue?.dateValue;
          return;
        case "boolean":
          itemRow[field.name] = itemCustomFieldValue?.booleanValue;
          return;
        case "multiline":
          itemRow[field.name] = itemCustomFieldValue?.multilineValue;
          return;
      }
    });

    itemRows.push(itemRow);
  });

  return (
    <RegularTable
      rows={itemRows}
      columns={columns}
      dict={dict.component.table.items}
      lang={lang}
    />
  );
};

export default ItemsTableContainer;
