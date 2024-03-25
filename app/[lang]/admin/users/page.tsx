import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import UsersTableContainer from "@/components/Molecules/Container/Table/Users";
import SearchInput from "@/components/Molecules/Input/Search";
import Header from "@/components/Organisms/Header";
import { USER_ROLES } from "@/constants/users";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

const UsersPage = async ({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: { search: string };
}) => {
  const { lang } = params;
  const { search } = searchParams;
  const [dict, session] = await Promise.all([getDictionary(lang), auth()]);

  if (!session || session.user?.role !== USER_ROLES.ADMIN)
    return <div>Forbidden</div>;

  return (
    <section className="grow grid content-start gap-8">
      <Header title={dict.component.header.users}>
        <SearchInput dict={dict} />
      </Header>

      <Suspense fallback={<div>Loading...</div>}>
        <UsersTableContainer lang={lang} search={search} />
      </Suspense>
    </section>
  );
};

export default UsersPage;
