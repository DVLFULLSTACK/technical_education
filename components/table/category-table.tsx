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
import categoryAction from "@/app/actions/categoryAction"

import { Category } from "@prisma/client"

import { BaseTable } from "./base-table"
import toast from "react-hot-toast"




const   DEFAULT_PAGE_LIMIT = 10
export function CategoryTable() {
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
    isLoading, error, data: category, refetch,
  } = useQuery({
    queryKey: [
      "getCategory",
    ],
    queryFn: () => categoryAction.getAll(),
  })


  const columns = useMemo<ColumnDef<Category>[]>(
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
        header: "Tên danh mục",
        meta: {
          columnName: "name",
        },
        accessorKey: "name",



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
            onClick={() => handleDeleteCategory(row.original.id)}>
              <Trash />
            </Button>
            <Button
            variant={"ghost"}
            className="hover:bg-blue-300 hover:text-blue-500 size-max p-2"
            asChild>
              <Link href={`/admin/category/${row.original.id}`}>
              <Eye />
              </Link>
            </Button>
          </div>
      )

      },
    ], [

    ]
  )

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await categoryAction.delete(id)
      toast.success('Xóa category thành công')
      refetch()
    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại")
    }
  }
  return (
    <BaseTable
      data={category?.data || []}
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
