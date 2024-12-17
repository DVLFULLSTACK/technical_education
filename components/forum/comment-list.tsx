"use client"

import { Comment } from "@/components/forum/comment"
import { useQuery } from "@tanstack/react-query"
import commentAction from "@/app/actions/commentAction";
import NewCommentForm from "../form/comment-form";
import { Spin } from "../ui/loader";
export function CommentList ({postId} : {postId: string}) {
  const { data: comments, isLoading, refetch } = useQuery({
    queryKey: ["getComments"],
    queryFn: () =>  commentAction.getByPostId(postId),
  });
  if (isLoading) return <Spin />
  return (
    <div className="py-8 space-y-8">
      {
        comments?.data.map((comment:any) => (
          <Comment key={comment.id} comment={comment}/>
        ))
      }
      <NewCommentForm refetch={refetch}/>


    </div>
  )
}
