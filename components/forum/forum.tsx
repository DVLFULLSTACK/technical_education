import { NewPostForm } from "../form/new-post-form"
import { PostList } from "./post-list"

export default function Forum () {
  return (
    <div className="w-full">
      <NewPostForm />
      <PostList />
    </div>
  )
}
