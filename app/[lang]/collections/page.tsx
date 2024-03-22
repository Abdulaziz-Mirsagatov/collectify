import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import CollectionsTableContainer from "@/components/Molecules/Container/Table/Collections";
import CollectionForm from "@/components/Molecules/Form/Collection";
import Header from "@/components/Organisms/Header";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

const CollectionsPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const [dict, session] = await Promise.all([getDictionary(lang), auth()]);

  return (
    <section className="grow grid content-start gap-8">
      <Header title={dict.component.header.collections}>
        {session && <CollectionForm type="create" dict={dict} />}
      </Header>

      <Suspense fallback={<div>Loading...</div>}>
        <CollectionsTableContainer lang={params.lang} />
      </Suspense>
    </section>
  );
};

export default CollectionsPage;
