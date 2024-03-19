import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import CollectionsTableContainer from "@/components/Molecules/Container/Table/Collections";
import CollectionForm from "@/components/Molecules/Form/Collection";
import Header from "@/components/Organisms/Header";
import { Locale } from "@/i18n-config";

const CollectionsPage = async ({ params }: { params: { lang: Locale } }) => {
  const session = await auth();
  const dict = await getDictionary(params.lang);

  return (
    <section className="grow py-8 px-24 grid content-start gap-8">
      <Header title="Collections">
        {session && <CollectionForm dict={dict} />}
      </Header>
      <CollectionsTableContainer lang={params.lang} />
    </section>
  );
};

export default CollectionsPage;
