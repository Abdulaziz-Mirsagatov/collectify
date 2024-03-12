import RegularInput from "@/components/Atoms/Input/Regular";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="w-11/12 bg-light-gray dark:bg-dark-gray p-8 rounded-2xl grid gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px]">
      <h1 className="text-3xl font-bold text-center">Register</h1>

      <form className="grid gap-3">
        <RegularInput type="text" placeholder="Name" required />
        <RegularInput type="email" placeholder="Email" required />
        <RegularInput type="text" placeholder="Username" required />
        <RegularInput type="password" placeholder="Password" required />
        <RegularInput type="password" placeholder="Confirm Password" required />

        <button type="submit" className="button button-success mt-4">
          Register
        </button>
      </form>

      <p className="text-center text-sm text-light-gray">
        Already have an account?{" "}
        <Link
          href={`login`}
          className="text-info-blue underline hover:text-info-blue/70 transition-colors"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
