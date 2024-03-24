import { getDictionary } from "@/app/dictionaries";
import { CommentsContainerProps } from "./types";
import { auth } from "@/auth";
import { getItemComments } from "@/services/fetch/comments";
import CommentsList from "../../List/Comments";

const CommentsContainer = async ({ lang, itemId }: CommentsContainerProps) => {
  const [dict, session, comments] = await Promise.all([
    getDictionary(lang),
    auth(),
    getItemComments(itemId),
  ]);

  return (
    <div className="grid gap-4">
      <h1 className="text-3xl">{dict.component.container.comments.title}</h1>
      <CommentsList
        initialComments={comments}
        userId={session?.user?.userId}
        itemId={itemId}
        dict={dict}
      />
    </div>
  );
};

export default CommentsContainer;
