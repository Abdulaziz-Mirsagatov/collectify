import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import AccessDeniedError from "@/components/Atoms/Error/AccessDenied";
import UserCollectionsTableContainer from "@/components/Molecules/Container/Table/UserCollections";
import CollectionForm from "@/components/Molecules/Form/Collection";
import SearchInput from "@/components/Molecules/Input/Search";
import UserCard from "@/components/Organisms/Card/User";
import Header from "@/components/Organisms/Header";
import CardSkeleton from "@/components/Organisms/Skeleton/Card";
import TableSkeleton from "@/components/Organisms/Skeleton/Table";
import { USER_ROLES } from "@/constants/users";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

const PersonalPage = async ({
  params,
  searchParams,
}: {
  params: { lang: Locale; userId: string };
  searchParams: { search: string };
}) => {
  const { lang, userId } = params;
  const { search } = searchParams;
  const [dict, session] = await Promise.all([getDictionary(lang), auth()]);

  // if not logged in or user is not the same as the one in the URL and is not an admin
  if (
    !session ||
    (session.user?.userId !== userId && session.user?.role !== USER_ROLES.ADMIN)
  )
    return <AccessDeniedError dict={dict} />;

  return (
    <section className="grow grid content-start gap-8 ">
      <Suspense fallback={<CardSkeleton />}>
        <UserCard userId={userId} lang={lang} />
      </Suspense>

      <Header title={dict.component.header.myCollections}>
        <SearchInput dict={dict} />
        <CollectionForm type="create" dict={dict} userId={userId} />
      </Header>
      <Suspense fallback={<TableSkeleton />}>
        <UserCollectionsTableContainer
          lang={lang}
          userId={userId}
          search={search}
        />
      </Suspense>
    </section>
  );
};

export default PersonalPage;
