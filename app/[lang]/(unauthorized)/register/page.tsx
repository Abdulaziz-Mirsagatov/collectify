import { getDictionary } from "@/app/dictionaries";
import RegularInput from "@/components/Atoms/Input/Regular";
import { Locale } from "@/i18n-config";
import Link from "next/link";

const RegisterPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const { register } = dict.page;

  return (
    <div className="w-11/12 bg-light-gray dark:bg-dark-gray p-8 rounded-2xl grid gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] shadow-md">
      <h1 className="text-3xl font-bold text-center">{register.title}</h1>

      <form className="grid gap-3">
        <RegularInput type="text" placeholder={register.title} required />
        <RegularInput type="email" placeholder={register.email} required />
        <RegularInput type="text" placeholder={register.username} required />
        <RegularInput
          type="password"
          placeholder={register.password}
          required
        />
        <RegularInput
          type="password"
          placeholder={register.confirmPassword}
          required
        />

        <button type="submit" className="button button-info mt-4">
          {register.register}
        </button>
      </form>

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
  );
};

export default RegisterPage;
