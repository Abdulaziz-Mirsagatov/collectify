import { getDictionary } from "@/app/dictionaries";
import CommentsContainer from "@/components/Molecules/Container/Comments";
import ItemCard from "@/components/Organisms/Card/Item";
import CardSkeleton from "@/components/Organisms/Skeleton/Card";
import CommentsSkeleton from "@/components/Organisms/Skeleton/Comments";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

const ItemPage = async ({
  params,
  searchParams,
}: {
  params: { lang: Locale; itemId: string; collectionId: string };
  searchParams: { search: string; limit: string; sort: string };
}) => {
  const { search, limit, sort } = searchParams;
  const { lang, itemId, collectionId } = params;
  const dict = await getDictionary(lang);

  return (
    <section className="grow grid content-start gap-12">
      <Suspense fallback={<CardSkeleton />}>
        <ItemCard lang={lang} itemId={itemId} collectionId={collectionId} />
      </Suspense>

      <Suspense fallback={<CommentsSkeleton dict={dict} />}>
        <CommentsContainer
          lang={lang}
          itemId={itemId}
          search={search}
          limit={limit}
          sort={sort as "asc" | "desc"}
        />
      </Suspense>
    </section>
  );
};

export default ItemPage;
