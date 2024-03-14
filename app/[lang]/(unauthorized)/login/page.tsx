import { getDictionary } from "@/app/dictionaries";
import RegularInput from "@/components/Atoms/Input/Regular";
import { Locale } from "@/i18n-config";
import Link from "next/link";

const LoginPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { login } = dict.page;

  return (
    <div className="w-11/12 bg-light-gray dark:bg-dark-gray p-8 rounded-2xl grid gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px]">
      <h1 className="text-3xl font-bold text-center">{login.title}</h1>

      <form className="grid gap-3">
        <RegularInput type="text" placeholder={login.username} required />
        <RegularInput type="password" placeholder={login.password} required />

        <button type="submit" className="button button-info mt-4">
          {login.login}
        </button>
      </form>

      <p className="text-center text-sm">
        {login.footer}{" "}
        <Link
          href={`register`}
          className="text-info-blue underline hover:text-info-blue/70 transition-colors"
        >
          {login.register}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
