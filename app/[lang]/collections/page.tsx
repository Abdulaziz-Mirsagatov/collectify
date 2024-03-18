import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/auth";
import Header from "@/components/Organisms/Header";
import RegularTable from "@/components/Organisms/Table/Regular";
import { Locale } from "@/i18n-config";
import Link from "next/link";

const CollectionsPage = async ({ params }: { params: { lang: Locale } }) => {
  const rows = [
    {
      name: "Magic books",
      topic: "Books",
    },
    {
      name: "Golden coins",
      topic: "Collectables",
    },
  ];
  const columns = ["name", "topic"];
  const { lang } = params;
  const dict = await getDictionary(lang);
  const session = await auth();

  return (
    <section className="grow py-8 px-24 grid content-start gap-8">
      <Header title="Collections">
        {session && (
          <button className="button button-success w-32">
            {dict.component.button.create}
          </button>
        )}
      </Header>
      <div className="overflow-x-auto">
        <RegularTable
          rows={rows}
          columns={columns}
          dict={dict.component.table.collections}
          button={
            <Link href={"collections/id"} className="button button-info w-32">
              {dict.component.button.view}
            </Link>
          }
        />
      </div>
    </section>
  );
};

export default CollectionsPage;
