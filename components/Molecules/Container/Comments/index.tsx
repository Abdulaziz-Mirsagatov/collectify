import { getDictionary } from "@/app/dictionaries";
import { CommentsContainerProps } from "./types";
import { auth } from "@/auth";
import { getItemComments } from "@/services/fetch/comments";
import CommentsList from "../../List/Comments";
import SearchInput from "../../Input/Search";
import { getUser } from "@/services/fetch/users";

const CommentsContainer = async ({
  lang,
  itemId,
  search,
  limit,
  sort,
}: CommentsContainerProps) => {
  const [dict, session, comments] = await Promise.all([
    getDictionary(lang),
    auth(),
    getItemComments(itemId, search, limit, sort),
  ]);
  const users = await Promise.all(
    comments.map((comment) => getUser(comment.userId))
  );

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-2 flex-wrap max-w-[850px]">
        <h1 className="text-3xl">{dict.component.container.comments.title}</h1>
        <SearchInput dict={dict} />
      </div>
      <CommentsList
        initialComments={comments}
        users={users}
        userId={session?.user?.userId}
        itemId={itemId}
        dict={dict}
      />
    </div>
  );
};

export default CommentsContainer;
