import { getUser } from "@/services/fetch/users";
import { UserCardProps } from "./types";
import { getDictionary } from "@/app/dictionaries";
import Image from "next/image";
import placeholder from "@/public/images/user_placeholder.png";
import Header from "../../Header";
import DeleteModal from "@/components/Molecules/Modal/Delete";
import { deleteUser } from "@/services/actions/users";
import UserForm from "@/components/Molecules/Form/User";

const UserCard = async ({ userId, lang }: UserCardProps) => {
  const [user, dict] = await Promise.all([
    getUser(userId),
    getDictionary(lang),
  ]);

  return (
    <div className="grid gap-8 max-w-[850px]">
      <Header title={dict.component.header.personalPage}>
        <div className="flex items-center gap-2">
          <UserForm userId={userId} dict={dict} lang={lang} />
          <DeleteModal
            type="account"
            name={user.username ?? user.name}
            deleteHandler={deleteUser}
            id={userId}
            dict={dict}
            redirectPath={`/${lang}/login`}
            imageUrl={user.image}
          />
        </div>
      </Header>
      <div className="grid gap-8">
        <div className="flex flew-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {dict.component.card.user.name}
            </h1>
            <p className="text-2xl">{user.name}</p>
          </div>
          <Image
            src={user.image !== "" && user.image ? user.image : placeholder}
            alt="user image"
            width={100}
            height={100}
            className="rounded-full aspect-square object-cover"
          />
        </div>
        <div className="flex flex-wrap items-center gap-16">
          <div>
            <h2 className="text-2xl font-bold">
              {dict.component.card.user.username}
            </h2>
            <p className="text-xl">{user.username ?? "-"}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {dict.component.card.user.email}
            </h2>
            <p className="text-xl">{user.email}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {dict.component.card.user.role}
            </h2>
            <p className="text-xl">{dict.role[user.role]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
