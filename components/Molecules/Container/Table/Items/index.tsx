import RegularTable from "@/components/Organisms/Table/Regular";
import { ItemRow, ItemsTableContainerProps } from "./types";
import { getItemsByCollection } from "@/services/fetch/items";
import { getDictionary } from "@/app/dictionaries";
import { getCustomFieldsByCollection } from "@/services/fetch/customFields";
import { getTagsByItem } from "@/services/fetch/tags";
import { getItemCustomFieldValuesByItem } from "@/services/fetch/itemCustomFieldValues";
import KebabMenu from "@/components/Atoms/Menu/Kebab";
import ItemForm from "@/components/Molecules/Form/Item";
import DeleteModal from "@/components/Molecules/Modal/Delete";
import { deleteItem } from "@/services/actions/items";
import { auth } from "@/auth";

const ItemsTableContainer = async ({
  lang,
  collectionId,
}: ItemsTableContainerProps) => {
  const [items, dict, customFields, session] = await Promise.all([
    getItemsByCollection(collectionId),
    getDictionary(lang),
    getCustomFieldsByCollection(collectionId),
    auth(),
  ]);

  const columns = ["name", "tags"];
  customFields.forEach((field) => columns.push(field.name));

  const itemRows: ItemRow[] = [];
  const buttons: React.ReactNode[] = [];

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

    const button: React.ReactNode = (
      <KebabMenu
        outsideClickHandling={false}
        options={[
          {
            label: (
              <ItemForm
                type="edit"
                id={item.id}
                dict={dict}
                collectionId={collectionId}
                trigger={
                  <p className="py-2 px-4 text-center dark:bg-dark bg-light rounded-t-md cursor-pointer hover:bg-light-gray dark:hover:bg-dark-gray transition-colors">
                    {dict.component.button.edit}
                  </p>
                }
              />
            ),
          },
          {
            label: (
              <DeleteModal
                type="item"
                name={item.name}
                dict={dict}
                deleteHandler={deleteItem}
                id={item.id}
                trigger={
                  <p className="py-2 px-4 text-center dark:bg-dark bg-light text-warning-red rounded-b-md cursor-pointer hover:bg-light-gray dark:hover:bg-dark-gray transition-colors">
                    {dict.component.button.delete}
                  </p>
                }
              />
            ),
          },
        ]}
      />
    );
    buttons.push(button);
  });

  return (
    <RegularTable
      rows={itemRows}
      columns={columns}
      dict={dict.component.table.items}
      lang={lang}
      buttons={session ? buttons : undefined}
      hasImage={false}
    />
  );
};

export default ItemsTableContainer;
