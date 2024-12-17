"use client"

import { Post } from "@/components/forum/post"
import { useQuery } from "@tanstack/react-query"
import postAction from "@/app/actions/postAction";
import { Spin } from "../ui/loader";

export function PostList () {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: postAction.getAll,
  });
  if (isLoading) return

    <Spin className="mt-4"/>

  return (
    <div className="py-8 space-y-8">
      {
        posts?.data.map(post => (
          post.isActive &&
          <Post key={post.id} post={post}/>
        ))
      }


    </div>
  )
}
