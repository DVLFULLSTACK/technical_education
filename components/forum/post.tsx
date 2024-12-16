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
import Link from "next/link";
import { Comment} from "@prisma/client"
import { format} from "date-fns"
import postAction from "@/app/actions/postAction";
import { Spin } from "../ui/loader";

export function Post({ post }: { post: Post & { author: any } }) {
  const { user} = useUser()
  const [liked,setLiked] = useState<Like>()
  const {data: likes, refetch} = useQuery({
    queryKey: ["getLikesByPost", post.id],
    queryFn: () => likeAction.getByPostId(post.id)
  })
  const handleLike = async () => {

    try {
      if (!liked)
      {
        await likeAction.create({
        userId: user?.id || "",
        postId: post.id
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



  useEffect(() => {
    if (likes?.data && user)
    {
      let like =  likes?.data.find(item => item.userId === user.id)
      setLiked(like)
    }

  },[likes?.data])


  const handleDeletePost = async () => {
    try {
      const response = await postAction.delete(post.id)
      toast.success('Xóa post thành công')
      window.location.reload()

    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại")
    }
  }

  if (!user) return <Spin />
  return (
    <div className="space-y-2">
    <div className="bg-white p-4 rounded-lg flex justify-between">
      <Link  href={`/forum/${post.id}`} className="font-black ">{post.postName}</Link>
      <div className=" text-gray-400">
          {format(post.createdAt,"dd/MM/yyyy")}
        </div>
      </div>
    <div className="grid grid-cols-[1fr_5fr] gap-2">
      <UserCard user={post.author} />
      <Card className="p-4 relative">
        <div dangerouslySetInnerHTML={{ __html: post.content }} className="min-h-32"/>
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
          asChild

          >
            <Link href={`/forum/${post.id}`}>
            <MessageSquare />
            </Link>
          </Button>

          {(user.id === post.authorId || user?.unsafeMetadata.role === "admin") &&
            <Button
             variant={"ghost"}
             onClick={handleDeletePost}
            >
            <Trash />
          </Button>}
        </div>
      </Card>
    </div>
    </div>
  );
}
