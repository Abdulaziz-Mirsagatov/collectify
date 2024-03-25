import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import ItemsTableContainer from "@/components/Molecules/Container/Table/Items";
import CollectionForm from "@/components/Molecules/Form/Collection";
import ItemForm from "@/components/Molecules/Form/Item";
import DeleteModal from "@/components/Molecules/Modal/Delete";
import CollectionCard from "@/components/Organisms/Card/Collection";
import Header from "@/components/Organisms/Header";
import { hasEditAccess } from "@/helpers/hasEditAccess";
import { Locale } from "@/i18n-config";
import {
  deleteCollection,
  getCollection,
} from "@/services/actions/collections";
import { Collection } from "@/types/env";
import { Suspense } from "react";

const CollectionPage = async ({
  params,
}: {
  params: { lang: Locale; collectionId: string };
}) => {
  const { lang, collectionId } = params;
  const [dict, session] = await Promise.all([getDictionary(lang), auth()]);
  const collection = (await getCollection(collectionId)) as Collection;

  const hasAccess = hasEditAccess(session, collection);

  return (
    <section className="grow grid content-start gap-12">
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
      <Suspense fallback={<div>Loading...</div>}>
        <CollectionCard collectionId={collectionId} lang={lang} />
      </Suspense>

      <Header title={dict.component.header.items}>
        {hasAccess && (
          <ItemForm type="create" dict={dict} collectionId={collectionId} />
        )}
      </Header>
      <Suspense fallback={<div>Loading...</div>}>
        <ItemsTableContainer collectionId={collectionId} lang={lang} />
      </Suspense>
    </section>
  );
};

export default CollectionPage;
