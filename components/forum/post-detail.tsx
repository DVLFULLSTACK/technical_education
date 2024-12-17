"use client"

import { type Post } from "@prisma/client";
import { Card } from "../ui/card";
import { UserCard } from "../form/user-card";
import { Love } from "./love";
import { MessageSquare, Trash } from "lucide-react"
import { BiLike, BiSolidLike } from "react-icons/bi";

import { Button } from "../ui/button";
import likeAction from "@/app/actions/likeAction";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Like } from "@prisma/client";
import postAction from "@/app/actions/postAction";
import commentAction from "@/app/actions/commentAction";
import { format} from "date-fns"
import { useRouter } from "next/navigation"



export function PostDetail({ id }: { id: string}) {
  const { user} = useUser()
  const router = useRouter()
  const [liked,setLiked] = useState<Like>()
  const { data: post, refetch: refetchPost} = useQuery({
    queryKey: ["getPost"],
    queryFn: () => postAction.getById(id)
  })
  const {data: likes, refetch} = useQuery({
    queryKey: ["getLikesByPost", id],
    queryFn: () => likeAction.getByPostId(id || ""),
  })

  const handleLike = async () => {

    try {
      if (!liked)
      {
        await likeAction.create({
        userId: user?.id || "",
        postId: post?.data.id || ""
      })
      }
      else {
        await likeAction.delete(liked.id)
      }
      refetch()
    } catch (error) {
      toast.error("Lỗi xảy ra!")
    }
  };

  const handleComment = () => {
    console.log("Comment on post", post?.data.id);
  };
  const handleDeletePost = async () => {
    try {
      const response = await postAction.delete(id)
      toast.success('Xóa post thành công')

      router.push('/forum')
    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại")
    }
  }

  useEffect(() => {
    if (likes?.data && user)
    {
      let like =  likes?.data.find(item => item.userId === user.id)
      setLiked(like)
    }

  },[likes?.data])
  if (!user || !post) return
  return (
    <>
    <h1 className="text-2xl font-bold">
   {post.data.postName}
  </h1>
    <div className="grid grid-cols-[1fr_5fr] gap-2">
      <UserCard user={post?.data.author} />
      <Card className="px-4 py-16 relative">
        <div className="absolute top-4 right-4 text-gray-400">
          {format(post?.data.updatedAt,"dd/MM/yyyy")}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post?.data.content || "" }} className="min-h-32"/>
        <div className="absolute bottom-2 right-4 flex items-center gap-4 mt-4">
          <Button
          variant={"ghost"}
            onClick={handleLike}
          >
            <span>{likes?.data ? likes?.data.length : 0}</span>
            {
              liked ?
              <BiSolidLike />
              :
              <BiLike/>
            }
          </Button>
          <Button
          variant={"ghost"}
            onClick={handleComment}

          >
            <MessageSquare />
          </Button>
          {user.id === post.data.authorId &&
            <Button
             variant={"ghost"}
             onClick={handleDeletePost}
            >
            <Trash />
          </Button>}
        </div>
      </Card>
    </div>
    </>
  );
}
