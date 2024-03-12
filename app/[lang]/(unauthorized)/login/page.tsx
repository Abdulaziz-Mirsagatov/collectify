import RegularInput from "@/components/Atoms/Input/Regular";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-11/12 bg-light-gray dark:bg-dark-gray p-8 rounded-2xl grid gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px]">
      <h1 className="text-3xl font-bold text-center">Login</h1>

      <form className="grid gap-3">
        <RegularInput type="text" placeholder="Username" required />
        <RegularInput type="password" placeholder="Password" required />

        <button type="submit" className="button button-info mt-4">
          Login
        </button>
      </form>

      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={`register`}
          className="text-info-blue underline hover:text-info-blue/70 transition-colors"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
