"use client";

import { Icon } from "@iconify/react";
import { LikeButtonProps } from "./types";
import { useEffect, useState } from "react";
import { Like } from "@/types/env";
import { pusherClient } from "@/pusher/client";

const LikeButton = ({
  likes,
  itemId,
  userId,
  onLike,
  onUnlike,
  isDisabled = false,
}: LikeButtonProps) => {
  const [userLike, setUserLike] = useState<Like | null>(null);
  const [numLikes, setNumLikes] = useState<number>(likes.length);
  const [disabled, setDisabled] = useState<boolean>(isDisabled);

  useEffect(() => {
    setUserLike(
      likes.find((like) => like.userId === userId && like.itemId === itemId) ||
        null
    );

    const channel = pusherClient.subscribe("like-channel");

    channel.bind("like-event", (like: { itemId: string; likes: number }) => {
      if (like.itemId === itemId) setNumLikes(like.likes);
    });

    return () => {
      pusherClient.unsubscribe("like-channel");
    };
  }, []);

  const handleLike = async () => {
    if (disabled) return;

    setDisabled(true);
    if (!userLike) {
      const like = await onLike({ itemId, userId });
      setUserLike(like);
      setNumLikes((prev) => prev + 1);
    } else {
      await onUnlike(userLike.id);
      setUserLike(null);
      setNumLikes((prev) => prev - 1);
    }
    setDisabled(false);
  };

  return (
    <div className="flex flex-col gap-1 translate-y-2 select-none">
      <Icon
        icon={`icon-park-solid:like`}
        className={`${
          userLike ? "text-warning-red" : "text-light/30"
        } text-3xl cursor-pointer grow`}
        onClick={handleLike}
      />
      <small className="text-center text-light/30">{numLikes}</small>
    </div>
  );
};

export default LikeButton;
