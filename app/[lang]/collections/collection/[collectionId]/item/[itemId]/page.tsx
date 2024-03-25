import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import CommentsContainer from "@/components/Molecules/Container/Comments";
import ItemForm from "@/components/Molecules/Form/Item";
import DeleteModal from "@/components/Molecules/Modal/Delete";
import ItemCard from "@/components/Organisms/Card/Item";
import Header from "@/components/Organisms/Header";
import { hasEditAccess } from "@/helpers/hasEditAccess";
import { Locale } from "@/i18n-config";
import { deleteItem } from "@/services/actions/items";
import { getCollection } from "@/services/fetch/collections";
import { getItem } from "@/services/fetch/items";
import { Suspense } from "react";

const ItemPage = async ({
  params,
}: {
  params: { lang: Locale; itemId: string; collectionId: string };
}) => {
  const { lang, itemId, collectionId } = params;
  const [dict, session, item, collection] = await Promise.all([
    getDictionary(lang),
    auth(),
    getItem(itemId),
    getCollection(collectionId),
  ]);

  const hasAccess = hasEditAccess(session, collection);

  return (
    <section className="grow grid content-start gap-12">
      <Suspense fallback={<div>Loading...</div>}>
        <ItemCard
          lang={lang}
          itemId={itemId}
          collectionId={collectionId}
          hasAccess={hasAccess}
        />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <CommentsContainer lang={lang} itemId={itemId} />
      </Suspense>
    </section>
  );
};

export default ItemPage;
