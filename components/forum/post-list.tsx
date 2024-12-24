"use client"

import { Post } from "@/components/forum/post"
import { useQuery } from "@tanstack/react-query"
import postAction from "@/app/actions/postAction";
import { Spin } from "../ui/loader";

export function PostList() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: postAction.getAll,
  });

  if (isLoading)
    return (
        <div className="flex justify-center items-center py-10">
          <Spin />
        </div>
    );

  return (
      <div className="space-y-6">
        {posts?.data.map(
            (post) =>
                post.isActive && (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                      <Post post={post} />
                    </div>
                )
        )}
      </div>
  );
}

