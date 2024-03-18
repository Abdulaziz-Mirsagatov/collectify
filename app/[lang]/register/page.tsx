import { getDictionary } from "@/app/dictionaries";
import RegisterForm from "@/components/Organisms/Form/Register";
import { Locale } from "@/i18n-config";
import Link from "next/link";

const RegisterPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { register } = dict.page;

  return (
    <div className="w-full grow relative">
      <div className="w-11/12 bg-light-gray dark:bg-dark-gray p-8 rounded-2xl grid gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] shadow-md">
        <h1 className="text-3xl font-bold text-center">{register.title}</h1>
        <RegisterForm dict={register} />
        <p className="text-center text-sm">
          {register.footer}{" "}
          <Link
            href={`login`}
            className="text-info-blue underline hover:text-info-blue/70 transition-colors"
          >
            {register.login}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
