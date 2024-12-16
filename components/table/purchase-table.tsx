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
import purchaseAction from "@/app/actions/purchaseAction"

import { Purchase } from "@prisma/client"
import { type User } from "@clerk/nextjs/server"
import { BaseTable } from "./base-table"
import toast from "react-hot-toast"
import { Course } from "@prisma/client"
import { PurchaseCustom } from "@/types/purchase"



const   DEFAULT_PAGE_LIMIT = 10
export function PurchaseTable() {
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
    isLoading, error, data: purchases, refetch,
  } = useQuery({
    queryKey: [
      "getPurchase",
    ],
    queryFn: () => purchaseAction.getAll(),
  })


  const columns = useMemo<ColumnDef<PurchaseCustom>[]>(
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
        header: "Tên khách hàng",
        meta: {
          columnName: "user",
        },
        accessorKey: "user",
        cell: ({row}) => (
          <span>{row.original.customer.lastName + " " +row.original.customer.firstName}</span>
        )



      },
      {
        header: "Giá",
        meta: {
          columnName: "course",
        },
        accessorKey: "course.price",

      },

      {
        header: "Tên khóa học",
        meta: {
          columnName: "courseName",
        },
        accessorKey: "course.name",

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
            onClick={() => handleDeletePurchase(row.original.id)}>
              <Trash />
            </Button>
            <Button
            variant={"ghost"}
            className="hover:bg-blue-300 hover:text-blue-500 size-max p-2"
            asChild>
              <Link href={`/admin/purchases/${row.original.id}`}>
              <Eye />
              </Link>
            </Button>
          </div>
      )

      },
    ], [

    ]
  )

  const handleDeletePurchase = async (id: string) => {
    try {
      const response = await purchaseAction.delete(id)
      toast.success('Xóa purchase thành công')
      refetch()
    } catch (error) {
      toast.error((error as Error).message || "Yêu cầu thất bại")
    }
  }
  return (
    <BaseTable
      data={purchases?.data || []}
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
