"use client"

import {
  useMemo,
  useState,
} from "react"
import { Trash, Eye } from "lucide-react"
import { Switch } from "@/components/ui/switch"

import Image from "next/image"
import Link from "next/link"
import {
  useQuery,
} from "@tanstack/react-query"
import {
  type VisibilityState,
  type ColumnDef,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import {
  useUrlParams,
} from "@/app/hooks/use-url-params"
import postAction from "@/app/actions/postAction"

import { Post } from "@prisma/client"
import { type User } from "@clerk/nextjs/server"
import { BaseTable } from "./base-table"
import toast from "react-hot-toast"
import { Course } from "@prisma/client"
import emailAction from "@/app/actions/emailAction"


const   DEFAULT_PAGE_LIMIT = 10
export function PostTable() {

  const [
    columnVisibility,
    setColumnVisibility,
  ] = useState<VisibilityState>({
    _id: false,
  })


  const [getParam] = useUrlParams()

  const page = getParam(
    "page", 1
  )
  const limit = getParam(
    "limit", DEFAULT_PAGE_LIMIT
  )
  const key = getParam(
    "key", ""
  )
  const status = getParam(
    "status", -1
  )



  const {
    isLoading, error, data: posts, refetch,
  } = useQuery({
    queryKey: [
      "getPost",
    ],
    queryFn: () => postAction.getAll(),
  })


  const columns = useMemo<ColumnDef<Post & {author: any}>[]>(
    () => [
      {
        header: "ID",
        meta: {
          columnName: "ID",
        },
        accessorKey: "id",

        cell: ({row}) => (
          <span className="text-sm text-gray-500">{row.original.id}</span>
        )
      },
      {
        header: "Tên tác giả",
        meta: {
          columnName: "author",
        },
        accessorKey: "author",
        cell: ({row}) => (
          <span>{row.original.author.lastName + " " +row.original.author.firstName}</span>
        )



      },
      {
        header: "Tiêu đề",
        meta: {
          columnName: "Tiêu đề",
        },
        accessorKey: "postName",

      },





      {
        id: "actions",
        header: () => <p className="text-center">T.Tác</p>,
        meta: {
          columnName: "T.Tác",
          allowClick: false,
        },
        size: 50,
        enableHiding: false,
        cell: ({row}) => (
          <div className="flex flex-row justify-center gap-2">
            <Button
            variant={"ghost"}
            className="hover:bg-red-300 hover:text-red-500 size-max p-2"
            onClick={() => handleDeletePost(row.original.id)}>
              <Trash />
            </Button>
            {/* <Button
            variant={"ghost"}
            className="hover:bg-blue-300 hover:text-blue-500 size-max p-2"
            asChild>
              <Link href={`/forum/${row.original.id}`}>
              <Eye />
              </Link>
            </Button> */}
            <Switch checked={row.original.isActive} onClick={() => handleUpdatePost(row.original.id,row.original)}/>
          </div>
      )

      },
    ], [

    ]
  )
  const handleUpdatePost = async (id: string, post: Post & { author: any }) => {
    try {
      const { author, ...newpost } = post;

      // Cập nhật trạng thái bài viết
      const updatedPost = {
        ...newpost,
        isActive: !post.isActive,
      };

      await postAction.updateActive(id, updatedPost);

      // Gửi email dựa trên trạng thái
      const emailContent = updatedPost.isActive
        ? {
            subject: "Bài viết của bạn đã được duyệt!",
            text: `Chào ${author.firstName}, bài viết "${post.postName}" của bạn đã được duyệt. Xin cảm ơn đã đóng góp. Link bài viết: http://localhost:3000/forum/${post.id}`,
          }
        : {
            subject: "Bài viết của bạn đã bị từ chối",
            text: `Chào ${author.firstName}, rất tiếc bài viết "${post.postName}" của bạn đã không được duyệt. Vui lòng kiểm tra lại nội dung.`,
          };

      await emailAction.send({
        to: author.emailAddresses[0].emailAddress,
        subject: emailContent.subject,
        text: emailContent.text,
      });

      refetch();
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Yêu cầu thất bại");
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await postAction.delete(id)
      toast.success('Xóa post thành công')

    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại")
    }
  }
  return (
    <BaseTable
      data={posts?.data || []}
      total={0}
      isLoading={isLoading}
      error={error}
      columns={columns}
      initialState={
        {
          columnPinning: {
            right: ["actions"],
          },
        }
      }
      onColumnVisibilityChange={setColumnVisibility}
      state={
        {
          columnVisibility,
        }
      }

    />

  )
}
