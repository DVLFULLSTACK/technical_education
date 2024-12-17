"use client"

import {
  useMemo,
  useState,
} from "react"
import { Trash, Eye } from "lucide-react"

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
import userAction from "@/app/actions/userAction"

import type { User } from '@clerk/nextjs/server';

import { BaseTable } from "./base-table"
import toast from "react-hot-toast"




const   DEFAULT_PAGE_LIMIT = 10
export function UsersTable() {
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
    isLoading, error, data: users, refetch,
  } = useQuery({
    queryKey: [
      "getUsers",
    ],
    queryFn: () => userAction.getAll(),
  })


  const columns = useMemo<ColumnDef<User>[]>(
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
        header: "Username",
        meta: {
          columnName: "Username",
        },
        accessorKey: "username",
        cell: ({
          row, getValue,
        }) => (
          <div className="flex gap-3 items-center">
            <Image
              src={row.original.imageUrl || "/images/profile/user-1.jpg"}
              alt="logo"
              height="100"
              width="100"
              className="rounded-full size-10"
            />

            <p>{getValue<string>()}</p>
          </div>
        ),

      },

      {
        header: "Họ và tên",
        meta: {
          columnName: "Tên đầy đủ",
        },
        accessorKey: "firstName",

        cell: ({row}) => (
          <div className="">
            <span>{row.original.lastName} {row.original.firstName}</span>
          </div>
        )
      },
      {
        header: "Chức vụ",
        meta: {
          columnName: "Chức vụ"
        },
        accessorKey: "unsafeMetadata",

        cell: ({row}) => (
          <div className="">
            {row.original.unsafeMetadata.role as string}
          </div>
        )
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
            onClick={() => handleDeleteUser(row.original.id)}>
              <Trash />
            </Button>
            <Button
            variant={"ghost"}
            className="hover:bg-blue-300 hover:text-blue-500 size-max p-2"
            asChild>
              <Link href={`/admin/users/${row.original.id}`}>
              <Eye />
              </Link>
            </Button>
          </div>
      )

      },
    ], [

    ]
  )

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await userAction.delete(id)
      toast.success('Xóa user thành công')
      refetch()
    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại")
    }
  }
  return (
    <BaseTable
      data={users?.data || []}
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
