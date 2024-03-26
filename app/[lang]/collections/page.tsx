import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import CollectionsTableContainer from "@/components/Molecules/Container/Table/Collections";
import CollectionForm from "@/components/Molecules/Form/Collection";
import SearchInput from "@/components/Molecules/Input/Search";
import Header from "@/components/Organisms/Header";
import TableSkeleton from "@/components/Organisms/Skeleton/Table";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

const CollectionsPage = async ({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { search: string };
}) => {
  const { lang } = params;
  const { search } = searchParams;
  const [dict, session] = await Promise.all([getDictionary(lang), auth()]);

  return (
    <section className="grow grid content-start gap-8">
      <Header title={dict.component.header.collections}>
        <SearchInput dict={dict} />
        {session && <CollectionForm type="create" dict={dict} />}
      </Header>

      <Suspense fallback={<TableSkeleton />}>
        <CollectionsTableContainer lang={params.lang} search={search} />
      </Suspense>
    </section>
  );
};

export default CollectionsPage;
