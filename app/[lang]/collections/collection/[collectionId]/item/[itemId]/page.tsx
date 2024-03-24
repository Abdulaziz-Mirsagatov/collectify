import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import CommentsContainer from "@/components/Molecules/Container/Comments";
import ItemForm from "@/components/Molecules/Form/Item";
import DeleteModal from "@/components/Molecules/Modal/Delete";
import ItemCard from "@/components/Organisms/Card/Item";
import Header from "@/components/Organisms/Header";
import { Locale } from "@/i18n-config";
import { deleteItem } from "@/services/actions/items";
import { getItem } from "@/services/fetch/items";
import { Suspense } from "react";

const ItemPage = async ({
  params,
}: {
  params: { lang: Locale; itemId: string; collectionId: string };
}) => {
  const { lang, itemId, collectionId } = params;
  const [dict, session, item] = await Promise.all([
    getDictionary(lang),
    auth(),
    getItem(itemId),
  ]);

  return (
    <section className="grow grid content-start gap-12">
      <Header title={dict.component.header.item}>
        {session && (
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
      <Suspense fallback={<div>Loading...</div>}>
        <ItemCard lang={lang} itemId={itemId} collectionId={collectionId} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <CommentsContainer lang={lang} itemId={itemId} />
      </Suspense>
    </section>
  );
};

export default ItemPage;
