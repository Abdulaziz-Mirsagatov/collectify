"use client";

import RegularModal from "@/components/Organisms/Modal/Regular";
import { useEffect, useState } from "react";
import { CollectionFormProps, FIELD_TYPE } from "./types";
import { getCategories } from "@/services/actions/categories";
import { Category, Collection } from "@/types/env";
import RegularSelectInput from "@/components/Atoms/Input/Select/Regular";
import { addCollection } from "@/services/actions/collections";
import { useForm } from "react-hook-form";
import { CollectionSchema, CollectionSchemaType } from "@/schemas/collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCustomField } from "@/services/actions/customFields";

const MAX_CUSTOM_FIELDS = 3;
const FIELD_TYPES = [
  { name: "text" },
  { name: "number" },
  { name: "date" },
  { name: "boolean" },
  { name: "multiline" },
];

const CollectionForm = ({ dict, userId }: CollectionFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  const [customFieldCount, setCustomFieldCount] = useState(0);
  const [selectedFieldType1, setSelectedFieldType1] = useState<FIELD_TYPE>(
    FIELD_TYPES[0]
  );
  const [selectedFieldType2, setSelectedFieldType2] = useState<FIELD_TYPE>(
    FIELD_TYPES[0]
  );
  const [selectedFieldType3, setSelectedFieldType3] = useState<FIELD_TYPE>(
    FIELD_TYPES[0]
  );

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
      setSelectedCategory(categories[0]);
    });
  }, []);

  const {
    reset,
    register,
    unregister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CollectionSchemaType>({
    resolver: zodResolver(CollectionSchema),
  });

  const onSubmit = async (data: CollectionSchemaType) => {
    const res = await addCollection({
      name: data.name,
      description: data.description,
      userId,
      categoryId: selectedCategory!.id,
    });
    if (Object.hasOwn(res, "error")) return;
    const collection = res as Collection;

    const addCustomFieldRequests = [];
    if (data.fieldName1)
      addCustomFieldRequests.push(
        addCustomField({
          name: data.fieldName1,
          type: selectedFieldType1.name,
          collectionId: collection.id,
        })
      );
    if (data.fieldName2)
      addCustomFieldRequests.push(
        addCustomField({
          name: data.fieldName2,
          type: selectedFieldType2.name,
          collectionId: collection.id,
        })
      );
    if (data.fieldName3)
      addCustomFieldRequests.push(
        addCustomField({
          name: data.fieldName3,
          type: selectedFieldType3.name,
          collectionId: collection.id,
        })
      );

    await Promise.allSettled(addCustomFieldRequests);

    setIsModalOpen(false);
    reset();
  };

  const getDispatcher = (i: number) => {
    switch (i) {
      case 1:
        return setSelectedFieldType1;
      case 2:
        return setSelectedFieldType2;
      case 3:
        return setSelectedFieldType3;
      default:
        return setSelectedFieldType1;
    }
  };

  const getState = (i: number) => {
    switch (i) {
      case 1:
        return selectedFieldType1;
      case 2:
        return selectedFieldType2;
      case 3:
        return selectedFieldType3;
      default:
        return selectedFieldType1;
    }
  };

  return (
    <RegularModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title="Create Collection"
      trigger={
        <button
          className="button button-success w-32"
          onClick={() => setIsModalOpen(true)}
        >
          {dict.component.button.create}
        </button>
      }
    >
      <form
        className="w-[500px] p-2 grid gap-4 max-h-96 overflow-y-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder={dict.component.form.collection.name}
          className={`input ${errors.name ? "error" : ""}`}
          {...register("name")}
        />
        {categories && selectedCategory && (
          <div className="grid gap-1">
            <p>{dict.component.form.collection.category}</p>
            <RegularSelectInput
              options={categories}
              selected={selectedCategory!}
              setSelected={setSelectedCategory}
              labelKey="name"
              dict={dict}
              dictKey="categories"
            />
          </div>
        )}
        <textarea
          placeholder={dict.component.form.collection.description}
          className="input"
          {...register("description")}
        />

        {Array.from({ length: customFieldCount }).map((_, i) => (
          <>
            <input
              key={i}
              type="text"
              placeholder={dict.component.form.collection.fieldName}
              className={`input ${
                errors[
                  `fieldName${(i + 1).toString()}` as
                    | "fieldName1"
                    | "fieldName2"
                    | "fieldName3"
                ]
                  ? "error"
                  : ""
              }`}
              {...register(
                `fieldName${(i + 1).toString()}` as
                  | "fieldName1"
                  | "fieldName2"
                  | "fieldName3"
              )}
            />
            <div className="grid gap-1">
              <p>{dict.component.form.collection.fieldType}</p>
              <RegularSelectInput
                options={FIELD_TYPES}
                selected={getState(i + 1)}
                setSelected={getDispatcher(i + 1)}
                labelKey="name"
                dict={dict}
                dictKey="fieldTypes"
              />
            </div>
          </>
        ))}
        <div className="flex justify-between">
          {customFieldCount < MAX_CUSTOM_FIELDS && (
            <p
              className="cursor-pointer"
              onClick={() => setCustomFieldCount((prev) => prev + 1)}
            >
              Add Field +
            </p>
          )}
          {customFieldCount > 0 && (
            <p
              className="text-warning-red cursor-pointer"
              onClick={() => {
                setCustomFieldCount((prev) => prev - 1);
                unregister(
                  `fieldName${customFieldCount}` as
                    | "fieldName1"
                    | "fieldName2"
                    | "fieldName3"
                );
              }}
            >
              Remove Field -
            </p>
          )}
        </div>

        <button
          className={`button button-success mt-4 ${
            isSubmitting ? "submitting" : ""
          }`}
        >
          {dict.component.button.create}
        </button>
      </form>
    </RegularModal>
  );
};

export default CollectionForm;
