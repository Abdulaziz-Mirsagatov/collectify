import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import UsersTableContainer from "@/components/Molecules/Container/Table/Users";
import Header from "@/components/Organisms/Header";
import { USER_ROLES } from "@/constants/users";
import { Locale } from "@/i18n-config";
import { Suspense } from "react";

const UsersPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const [dict, session] = await Promise.all([getDictionary(lang), auth()]);

  if (!session || session.user?.role !== USER_ROLES.ADMIN)
    return <div>Forbidden</div>;

  return (
    <section className="grow grid content-start gap-8">
      <Header title={dict.component.header.users}></Header>

      <Suspense fallback={<div>Loading...</div>}>
        <UsersTableContainer lang={lang} />
      </Suspense>
    </section>
  );
};

export default UsersPage;
