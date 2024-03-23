"use client";

import RegularModal from "@/components/Organisms/Modal/Regular";
import { useEffect, useState } from "react";
import { ItemFormProps } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemSchema, ItemSchemaType } from "@/schemas/items";
import { getCustomFieldsByCollection } from "@/services/actions/customFields";
import TagsInput from "../../Input/Tags";
import { CustomField, Item, ItemCustomFieldValue } from "@/types/env";
import { addItem, getItem, updateItem } from "@/services/actions/items";
import { addTag, getTagsByItem, updateItemTags } from "@/services/actions/tags";
import {
  addItemCustomFieldValue,
  getItemCustomFieldValuesByItem,
  updateItemCustomFieldValue,
} from "@/services/actions/itemCustomFieldValues";
import { CUSTOM_FIELD_TYPES } from "@/constants/customFields";

const ItemForm = ({
  dict,
  type,
  id,
  collectionId,
  trigger = (
    <button
      className={`button ${
        type === "create" ? "button-success" : "button-info"
      } min-w-32`}
    >
      {dict.component.button[type]}
    </button>
  ),
}: ItemFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // initialize form
  useEffect(() => {
    getCustomFieldsByCollection(collectionId)
      .then((customFields) => {
        setCustomFields(customFields);

        if (type === "edit" && id) {
          // Fetch item data
          getItem(id).then((res) => {
            if (Object.hasOwn(res, "error")) {
              setServerError(true);
              return;
            }
            const item = res as Item;

            reset({
              name: item.name,
            });

            getItemCustomFieldValuesByItem(item.id).then((res) => {
              if (Object.hasOwn(res, "error")) {
                setServerError(true);
                return;
              }
              const customFieldValues = res as ItemCustomFieldValue[];

              customFields.forEach((field, i) => {
                const customFieldValue = customFieldValues.find(
                  (value) => value.customFieldId === field.id
                );

                switch (field.type) {
                  case CUSTOM_FIELD_TYPES.TEXT:
                    reset({
                      [`customField${(i + 1).toString()}`]:
                        customFieldValue?.stringValue,
                    });
                    break;
                  case CUSTOM_FIELD_TYPES.NUMBER:
                    reset({
                      [`customField${(i + 1).toString()}`]:
                        customFieldValue?.intValue,
                    });
                    break;
                  case CUSTOM_FIELD_TYPES.DATE:
                    reset({
                      [`customField${(i + 1).toString()}`]:
                        customFieldValue?.dateValue,
                    });
                    break;
                  case CUSTOM_FIELD_TYPES.BOOLEAN:
                    reset({
                      [`customField${(i + 1).toString()}`]:
                        customFieldValue?.booleanValue,
                    });
                    break;
                  case CUSTOM_FIELD_TYPES.MULTILINE:
                    reset({
                      [`customField${(i + 1).toString()}`]:
                        customFieldValue?.multilineValue,
                    });
                    break;
                }
              });
            });
          });

          // Fetch tags
          getTagsByItem(id).then((res) => {
            if (Object.hasOwn(res, "error")) {
              setServerError(true);
              return;
            }
            const tags = res.map((tag) => tag.name);
            setTags(tags);
          });
        }
      })
      .catch(() => setServerError(true));
  }, [isModalOpen]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemSchemaType>({
    resolver: zodResolver(ItemSchema),
  });

  const onSubmit = async (data: ItemSchemaType) => {
    if (type === "create") {
      const resItem = await addItem({
        name: data.name,
        collectionId,
      });
      if (Object.hasOwn(resItem, "error")) {
        setServerError(true);
        return;
      }
      const item = resItem as Item;

      if (data.customField1) {
        const res = await addCustomFieldValue(data.customField1, item.id, 0);
        if (!res) return;
      }
      if (data.customField2) {
        const res = await addCustomFieldValue(data.customField2, item.id, 1);
        if (!res) return;
      }
      if (data.customField3) {
        const res = await addCustomFieldValue(data.customField3, item.id, 2);
        if (!res) return;
      }

      await Promise.allSettled(
        tags.map((tag) =>
          addTag({
            name: tag,
            itemId: item.id,
          })
        )
      );

      reset();
      setTags([]);
      setIsModalOpen(false);
    } else if (id) {
      const resItem = await updateItem(id, { name: data.name });
      if (Object.hasOwn(resItem, "error")) {
        setServerError(true);
        return;
      }
      const item = resItem as Item;

      getItemCustomFieldValuesByItem(item.id).then(async (res) => {
        if (Object.hasOwn(res, "error")) {
          setServerError(true);
          return;
        }
        const itemCustomFieldValues = res as ItemCustomFieldValue[];

        if (data.customField1) {
          const res = await updateCustomFieldValue(
            itemCustomFieldValues.find(
              (value) => value.customFieldId === customFields[0].id
            )?.id || "",
            data.customField1,
            0
          );
          if (!res) return;
        }
        if (data.customField2) {
          const res = await updateCustomFieldValue(
            itemCustomFieldValues.find(
              (value) => value.customFieldId === customFields[1].id
            )?.id || "",
            data.customField2,
            1
          );
          if (!res) return;
        }
        if (data.customField3) {
          const res = await updateCustomFieldValue(
            itemCustomFieldValues.find(
              (value) => value.customFieldId === customFields[2].id
            )?.id || "",
            data.customField3,
            2
          );
          if (!res) return;
        }
      });

      await updateItemTags(item.id, tags);

      reset();
      setTags([]);
      setIsModalOpen(false);
    }
  };

  const addCustomFieldValue = async (
    value: string,
    itemId: string,
    i: number
  ) => {
    const resCustomFieldValue = await addItemCustomFieldValue({
      itemId,
      customFieldId: customFields[i].id,
      stringValue:
        customFields[i].type === CUSTOM_FIELD_TYPES.TEXT ? value : undefined,
      intValue:
        customFields[i].type === CUSTOM_FIELD_TYPES.NUMBER
          ? Number(value)
          : undefined,
      dateValue:
        customFields[i].type === CUSTOM_FIELD_TYPES.DATE
          ? new Date(value)
          : undefined,
      booleanValue:
        customFields[i].type === CUSTOM_FIELD_TYPES.BOOLEAN
          ? Boolean(value)
          : undefined,
      multilineValue:
        customFields[i].type === CUSTOM_FIELD_TYPES.MULTILINE
          ? value
          : undefined,
    });
    if (Object.hasOwn(resCustomFieldValue, "error")) {
      setServerError(true);
      return false;
    }
    return true;
  };

  const updateCustomFieldValue = async (
    customFieldValueId: string,
    value: string,
    i: number
  ) => {
    const resCustomFieldValue = await updateItemCustomFieldValue(
      customFieldValueId,
      {
        customFieldId: customFields[i].id,
        stringValue:
          customFields[i].type === CUSTOM_FIELD_TYPES.TEXT ? value : undefined,
        intValue:
          customFields[i].type === CUSTOM_FIELD_TYPES.NUMBER
            ? Number(value)
            : undefined,
        dateValue:
          customFields[i].type === CUSTOM_FIELD_TYPES.DATE
            ? new Date(value)
            : undefined,
        booleanValue:
          customFields[i].type === CUSTOM_FIELD_TYPES.BOOLEAN
            ? Boolean(value)
            : undefined,
        multilineValue:
          customFields[i].type === CUSTOM_FIELD_TYPES.MULTILINE
            ? value
            : undefined,
      }
    );
    if (Object.hasOwn(resCustomFieldValue, "error")) {
      setServerError(true);
      return false;
    }
    return true;
  };

  const renderCustomField = (field: CustomField, i: number) => {
    switch (field.type) {
      case "multiline":
        return (
          <textarea
            key={field.id}
            placeholder={field.name}
            className={`input`}
            {...register(
              `customField${(i + 1).toString()}` as
                | "customField1"
                | "customField2"
                | "customField3"
            )}
          />
        );
      case "boolean":
        return (
          <div className="flex items-center gap-4">
            <label htmlFor={`customField${(i + 1).toString()}`}>
              {field.name}
            </label>
            <input
              key={field.id}
              type="checkbox"
              className={`input`}
              {...register(
                `customField${(i + 1).toString()}` as
                  | "customField1"
                  | "customField2"
                  | "customField3"
              )}
            />
          </div>
        );
      default:
        return (
          <input
            key={field.id}
            type={field.type}
            placeholder={field.name}
            className={`input`}
            {...register(
              `customField${(i + 1).toString()}` as
                | "customField1"
                | "customField2"
                | "customField3"
            )}
          />
        );
    }
  };

  return (
    <RegularModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={dict.component.form.item[type]}
      trigger={
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen((open) => !open);
          }}
        >
          {trigger}
        </div>
      }
    >
      <form
        className="w-[500px] p-2 grid gap-4 max-h-96 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder={dict.component.form.item.name}
          className={`input ${errors.name ? "error" : ""}`}
          {...register("name")}
        />

        <TagsInput tags={tags} setTags={setTags} dict={dict} />

        {customFields.map((field, i) => renderCustomField(field, i))}

        {serverError && <p className="text-warning-red">{dict.serverError}</p>}

        <button
          className={`button ${
            type === "create" ? "button-success" : "button-info"
          } mt-4 ${isSubmitting ? "submitting" : ""}`}
          disabled={isSubmitting}
        >
          {type === "create"
            ? dict.component.button.create
            : dict.component.button.edit}
        </button>
      </form>
    </RegularModal>
  );
};

export default ItemForm;
