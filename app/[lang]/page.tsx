import Header from "@/components/Organisms/Header";
import { Locale } from "@/i18n-config";
import { getDictionary } from "../dictionaries";
import Link from "next/link";
import { Suspense } from "react";
import CollectionsTableContainer from "@/components/Molecules/Container/Table/Collections";
import TableSkeleton from "@/components/Organisms/Skeleton/Table";

const HomePage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <section className="grow grid content-start gap-8 ">
      <Header title={dict.component.header.welcome}>
        <Link href={`/${lang}/collections`} className="button button-info">
          {dict.component.button.explore}
        </Link>
      </Header>

      <Header title={dict.component.header.largestCollections} />
      <Suspense fallback={<TableSkeleton />}>
        <CollectionsTableContainer lang={lang} limit="5" sort="desc" />
      </Suspense>
    </section>
  );
};

export default HomePage;
