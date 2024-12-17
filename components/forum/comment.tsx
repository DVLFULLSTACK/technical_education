import { Card } from "../ui/card";
import { UserCard } from "../form/user-card";

import { useUser } from "@clerk/nextjs";

import { type Comment } from "@prisma/client";
import { Trash} from "lucide-react"
import { format } from "date-fns";
import commentAction from "@/app/actions/commentAction";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
export function Comment({ comment }: { comment : Comment & { author: any } }) {

  const { user} = useUser()

  // const {data: likes, refetch} = useQuery({
  //   queryKey: ["getLikesByComment", comment.id],
  //   queryFn: () => likeAction.getByCommentId(comment.id)
  // })

  const handleDeleteComment = async () => {
    try {
      const response = await commentAction.delete(comment.id)
      toast.success('Xóa comment thành công')
      window.location.reload()

    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại")
    }
  }

  console.log('Comment',comment)
  return (
    <div className="grid grid-cols-[1fr_5fr] gap-2">
      <UserCard user={comment.author} />
      <Card className="px-4 py-16 relative">
      <div className="absolute top-4 right-4 text-gray-400">
          {format(comment.updatedAt,"dd/MM/yyyy")}
        </div>
        <div dangerouslySetInnerHTML={{ __html: comment.content }} className="min-h-32"/>
        <div className="absolute bottom-2 right-4 flex items-center gap-4 mt-4">


          {(user?.id === comment.authorId || user?.unsafeMetadata.role === "admin") &&
            <Button
             variant={"ghost"}
             onClick={handleDeleteComment}
            >
            <Trash />
          </Button>}
        </div>

      </Card>
    </div>
  );
}
