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
import CustomFieldInput from "@/components/Atoms/Input/CustomField";
import getCustomFieldValue from "@/helpers/getCustomFielValue";
import InputSkeleton from "@/components/Organisms/Skeleton/Input";

const DEFAULT_CUSTOM_FIELD_VALUE: ItemCustomFieldValue = {
  customFieldId: "",
  itemId: "",
  stringValue: "",
  intValue: 0,
  dateValue: new Date(),
  booleanValue: false,
  multilineValue: "",
} as ItemCustomFieldValue;

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
  const [customFieldValues, setCustomFieldValues] = useState<
    ItemCustomFieldValue[]
  >([]);
  const [tags, setTags] = useState<string[]>([]);
  const [formReady, setFormReady] = useState(false);
  const [customFieldsReady, setCustomFieldsReady] = useState(false);

  // initialize form
  useEffect(() => {
    if (!isModalOpen) return;

    setServerError(false);
    setFormReady(false);
    setCustomFieldsReady(false);
    getCustomFieldsByCollection(collectionId)
      .then((customFields) => {
        setCustomFields(customFields);

        const initialValues: ItemCustomFieldValue[] = [];
        customFields.forEach(() => {
          initialValues.push(DEFAULT_CUSTOM_FIELD_VALUE);
        });
        setCustomFieldValues(initialValues);
        setCustomFieldsReady(true);

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

              const values: ItemCustomFieldValue[] = [];
              customFields.forEach((field) => {
                const customFieldValue = customFieldValues.find(
                  (value) => value.customFieldId === field.id
                );

                values.push(customFieldValue ?? DEFAULT_CUSTOM_FIELD_VALUE);
              });
              setCustomFieldValues(values);
              setCustomFieldsReady(true);

              // Fetch tags
              getTagsByItem(id).then((res) => {
                if (Object.hasOwn(res, "error")) {
                  setServerError(true);
                  return;
                }
                const tags = res.map((tag) => tag.name);
                setTags(tags);

                setFormReady(true);
              });
            });
          });
        } else setFormReady(true);
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

      let errorFlag = false;
      customFieldValues.forEach(async (fieldValue, i) => {
        const value = getCustomFieldValue(customFields[i], fieldValue);

        const res = await addItemCustomFieldValue({
          itemId: item.id,
          customFieldId: customFields[i].id,
          stringValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.TEXT
              ? (value as string)
              : undefined,
          intValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.NUMBER
              ? Number(value)
              : undefined,
          dateValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.DATE
              ? new Date(value as string)
              : undefined,
          booleanValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.BOOLEAN
              ? Boolean(value)
              : undefined,
          multilineValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.MULTILINE
              ? (value as string)
              : undefined,
        });

        if (!res) {
          errorFlag = true;
          return;
        }
      });
      if (errorFlag) return;

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

      let errorFlag = false;
      customFieldValues.forEach(async (fieldValue, i) => {
        const value = getCustomFieldValue(customFields[i], fieldValue);
        if (value === null || value === undefined) return;

        const res = await updateItemCustomFieldValue(fieldValue.id, {
          stringValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.TEXT
              ? (value as string)
              : undefined,
          intValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.NUMBER
              ? Number(value)
              : undefined,
          dateValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.DATE
              ? new Date(value as string)
              : undefined,
          booleanValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.BOOLEAN
              ? Boolean(value)
              : undefined,
          multilineValue:
            customFields[i].type === CUSTOM_FIELD_TYPES.MULTILINE
              ? (value as string)
              : undefined,
        });

        if (Object.hasOwn(res, "error")) {
          errorFlag = true;
          return;
        }
      });
      if (errorFlag) {
        setServerError(true);
        return;
      }

      await updateItemTags(item.id, tags);

      reset();
      setTags([]);
      setIsModalOpen(false);
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
        className="w-full md:w-[500px] p-2 grid gap-4 max-h-96 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formReady ? (
          <input
            type="text"
            placeholder={dict.component.form.item.name}
            className={`input ${errors.name ? "error" : ""}`}
            {...register("name")}
          />
        ) : (
          <InputSkeleton />
        )}

        {formReady ? (
          <TagsInput tags={tags} setTags={setTags} dict={dict} />
        ) : (
          <InputSkeleton />
        )}

        {formReady && customFieldsReady
          ? customFields.map((field, i) => (
              <CustomFieldInput
                key={field.id}
                customField={field}
                value={getCustomFieldValue(field, customFieldValues[i])}
                onChange={(value) =>
                  setCustomFieldValues((prev) => {
                    const newValues = [...prev];
                    newValues[i] = {
                      ...newValues[i],
                      stringValue:
                        field.type === CUSTOM_FIELD_TYPES.TEXT
                          ? value
                          : undefined,
                      intValue:
                        field.type === CUSTOM_FIELD_TYPES.NUMBER
                          ? Number(value)
                          : undefined,
                      dateValue:
                        field.type === CUSTOM_FIELD_TYPES.DATE
                          ? new Date(value as string)
                          : undefined,
                      booleanValue:
                        field.type === CUSTOM_FIELD_TYPES.BOOLEAN
                          ? Boolean(value)
                          : undefined,
                      multilineValue:
                        field.type === CUSTOM_FIELD_TYPES.MULTILINE
                          ? value
                          : undefined,
                    };
                    return newValues;
                  })
                }
              />
            ))
          : [...Array(customFields.length)].map((_, i) => (
              <InputSkeleton key={i} />
            ))}

        {serverError && <p className="text-warning-red">{dict.serverError}</p>}

        <button
          className={`button ${
            type === "create" ? "button-success" : "button-info"
          } mt-4 ${isSubmitting ? "submitting" : ""}`}
          disabled={isSubmitting || !formReady || !customFieldsReady}
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
