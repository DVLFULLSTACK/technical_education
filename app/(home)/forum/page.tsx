import Forum from "@/components/forum/forum"

export const metadata = {
  title: "Diễn đàn"
}

export default function ForumPage() {
  return (
    <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16 space-y-4">
      <h1 className="text-2xl font-bold">
        Diễn đàn
      </h1>
      <Forum />
    </div>
  )
}
