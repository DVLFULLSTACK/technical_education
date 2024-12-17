import { PostDetail } from "@/components/forum/post-detail"
import { CommentList } from "@/components/forum/comment-list"
export const metadata = {
  title: "Chi tiết bài viết"
}

export default function PostPage({params} : { params: { id: string}}) {
  return (
    <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16 space-y-4">

      <PostDetail id={params.id}/>

      <CommentList postId={params.id}/>
    </div>
  )
}
