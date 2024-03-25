import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import UserCollectionsTableContainer from "@/components/Molecules/Container/Table/UserCollections";
import CollectionForm from "@/components/Molecules/Form/Collection";
import UserCard from "@/components/Organisms/Card/User";
import Header from "@/components/Organisms/Header";
import { USER_ROLES } from "@/constants/users";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

const PersonalPage = async ({
  params,
}: {
  params: { lang: Locale; userId: string };
}) => {
  const { lang, userId } = params;
  const [dict, session] = await Promise.all([getDictionary(lang), auth()]);

  // if not logged in or user is not the same as the one in the URL and is not an admin
  if (
    !session ||
    (session.user?.userId !== userId && session.user?.role !== USER_ROLES.ADMIN)
  )
    return <div>Forbidden</div>;

  return (
    <section className="grow grid content-start gap-8 ">
      <Suspense fallback={<div>Loading...</div>}>
        <UserCard userId={userId} lang={lang} />
      </Suspense>

      <Header title={dict.component.header.myCollections}>
        <CollectionForm type="create" dict={dict} />
      </Header>
      <Suspense fallback={<div>Loading...</div>}>
        <UserCollectionsTableContainer lang={lang} userId={userId} />
      </Suspense>
    </section>
  );
};

export default PersonalPage;
