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
import courseAction from "@/app/actions/courseAction"

import { Course } from "@prisma/client"

import { BaseTable } from "./base-table"
import toast from "react-hot-toast"




const   DEFAULT_PAGE_LIMIT = 10
export function CourseTable() {
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
    isLoading, error, data: courses, refetch,
  } = useQuery({
    queryKey: [
      "getCourse",
    ],
    queryFn: () => courseAction.getAll(),
  })


  const columns = useMemo<ColumnDef<Course>[]>(
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
        header: "Tên khóa học",
        meta: {
          columnName: "title",
        },
        accessorKey: "title",



      },
      {
        header: "Level",
        meta: {
          columnName: "level",
        },
        accessorKey: "level.name",



      },
      {
        header: "Giá",
        meta: {
          columnName: "price",
        },
        accessorKey: "price",

      },
      {
        header: "Danh mục",
        meta: {
          columnName: "category",
        },
        accessorKey: "category.name",

      },
      {
        header: "Danh mục phụ",
        meta: {
          columnName: "subCategory",
        },
        accessorKey: "subCategory.name",

      },

      {
        header: "Người tạo",
        meta: {
          columnName: "instructor",
        },
        accessorKey: "instructor.username",

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
            onClick={() => handleDeleteCourse(row.original.id)}>
              <Trash />
            </Button>
            <Button
            variant={"ghost"}
            className="hover:bg-blue-300 hover:text-blue-500 size-max p-2"
            asChild>
              <Link href={`/admin/courses/${row.original.id}`}>
              <Eye />
              </Link>
            </Button>
          </div>
      )

      },
    ], [

    ]
  )

  const handleDeleteCourse = async (id: string) => {
    try {
      const response = await courseAction.delete(id)
      toast.success('Xóa course thành công')
      refetch()
    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại")
    }
  }
  return (
    <BaseTable
      data={courses?.data || []}
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
