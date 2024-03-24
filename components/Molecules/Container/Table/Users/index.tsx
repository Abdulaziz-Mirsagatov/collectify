import RegularTable from "@/components/Organisms/Table/Regular";
import { getUsers } from "@/services/fetch/users";
import { UsersTableContainerProps } from "./types";
import { getDictionary } from "@/app/dictionaries";
import KebabMenu from "@/components/Atoms/Menu/Kebab";
import DeleteModal from "@/components/Molecules/Modal/Delete";
import { deleteUser, updateUser } from "@/services/actions/users";
import { auth } from "@/auth";
import { USER_ROLES } from "@/constants/users";

const UsersTableContainer = async ({ lang }: UsersTableContainerProps) => {
  const [users, dict] = await Promise.all([
    getUsers(),
    getDictionary(lang),
    auth(),
  ]);
  const columns = ["name", "username", "email", "role"];

  const buttons: React.ReactNode[] = [];
  users.forEach((user) => {
    const button = (
      <KebabMenu
        options={[
          {
            label: (
              <button className="w-48 py-2 px-4 bg-light dark:bg-dark hover:bg-light-gray dark:hover:bg-dark-gray rounded-t-md">
                {dict.component.button.grantAdmin}
              </button>
            ),
            onClick: updateUser,
            args: [user.id, { role: USER_ROLES.ADMIN }],
          },
          {
            label: (
              <button className="w-48 py-2 px-4 text-warning-yellow bg-light dark:bg-dark hover:bg-light-gray dark:hover:bg-dark-gray rounded-t-md">
                {dict.component.button.removeAdmin}
              </button>
            ),
            onClick: updateUser,
            args: [user.id, { role: USER_ROLES.USER }],
          },

          {
            label: (
              <DeleteModal
                type="user"
                name={user.username ?? user.email}
                deleteHandler={deleteUser}
                id={user.id}
                dict={dict}
                trigger={
                  <button className="w-full py-2 px-4 bg-light dark:bg-dark text-warning-red hover:bg-light-gray dark:hover:bg-dark-gray rounded-b-md">
                    {dict.component.button.delete}
                  </button>
                }
              />
            ),
          },
        ]}
      />
    );

    buttons.push(button);
  });

  return (
    <RegularTable
      rows={users}
      columns={columns}
      lang={lang}
      dict={dict.component.table.users}
      buttons={buttons}
    />
  );
};

export default UsersTableContainer;
