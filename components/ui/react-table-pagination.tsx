import {
  type ReactNode,
  type HTMLAttributes,
  createContext,
  useContext,
} from "react"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"

import {
  useControllableState,
} from "@/app/hooks/use-controllable-state"

import {
  chain,
} from "@/lib/chain"

import {
  Button,
  type ButtonProps,
} from "@/components/ui/button"
import {
  useReactTableContext,
} from "@/components/ui/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  cn,
} from "@/lib/utils"

type UseTablePaginationValue = {
  pageSize?: number
  pageCount?: number
  setPageSize?: (value: number) => void
  pagination?: {
    active: number
    setPage: (pageNumber: number) => void
    next: () => void
    previous: () => void
    first: () => void
    last: () => void
    total: number
    canPrevious: boolean
    canNext: boolean
  }
}

const TablePaginationContext = createContext<UseTablePaginationValue | null>(null)

const useTablePagination = () => {
  const context = useContext(TablePaginationContext)
  if (!context) {
    throw new Error("useTablePagination must be used within a TablePaginationProvider")
  }
  return context
}

const DEFAULT_PAGE_LIMIT = 10

function TablePaginationProvider({
  children,
  className,
  onPageChange,
  onPageSizeChange,
  page,
  pageCount = 1,
  pageSize,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  page?: number
  pageCount?: number
  pageSize?: number
}) {
  const [
    limit,
    setLimit,
  ] = useControllableState({
    defaultProp: DEFAULT_PAGE_LIMIT,
    prop: pageSize,
    onChange: onPageSizeChange,
  })

  const [
    activePage,
    setActivePage,
  ] = useControllableState({
    defaultProp: 1,
    prop: page,
    onChange: onPageChange,
  })

  const total = Math.max(
    Math.trunc(pageCount), 0
  )

  const setPage = (newPage: number) => {
    setActivePage(newPage <= 0 ? 1 : Math.min(
      newPage, total
    ))
  }

  const next = () => setPage(activePage + 1)
  const previous = () => setPage(activePage - 1)
  const first = () => setPage(1)
  const last = () => setPage(total)
  const canPrevious = !(activePage === 1)
  const canNext = !(activePage === total)

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <TablePaginationContext.Provider
      value={
        {
          pageSize: limit,
          setPageSize: setLimit,
          pagination: {
            active: activePage,
            setPage,
            next,
            previous,
            first,
            last,
            total,
            canPrevious,
            canNext,
          },
          pageCount,
        }
      }
    >
      <div
        className={
          cn(
            "flex w-full lg:items-center justify-between gap-3 overflow-auto p-1",
            className
          )
        }
        {...props}
      >
        {children}
      </div>
    </TablePaginationContext.Provider>
  )
}

function TableSelectedText({
  className, ...props
}: HTMLAttributes<HTMLDivElement>) {
  const table = useReactTableContext()
  return (
    <div
      className={
        cn(
          "text-sm text-muted-foreground", className
        )
      }
      {...props}
    >
      {table.getFilteredSelectedRowModel().rows.length}

      {" "}
      của

      {" "}

      {table.getFilteredRowModel().rows.length}

      {" "}
      đã chọn.
    </div>
  )
}

const PAGE_SIZE_OPTIONS = [
  10,
  20,
  25,
  35,
  50,
]

function TablePageSize({
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  className,
}: {
  pageSizeOptions?: number[]
  className?: string
}) {
  const {
    pageSize,
    setPageSize,
  } = useTablePagination()

  return (
    <div className={
      cn(
        "flex lg:items-center space-x-2", className
      )
    }
    >
      <p className="text-sm text-muted-foreground hidden lg:block">Giới hạn</p>

      <Select
        value={String(pageSize)}
        onValueChange={
          (value) => {
            setPageSize?.(Number(value))
          }
        }
      >
        <SelectTrigger className="h-8 w-[4.5rem]">
          <SelectValue placeholder={pageSize} />
        </SelectTrigger>

        <SelectContent side="top">
          {
            pageSizeOptions.map(pageSize => (
              <SelectItem
                key={pageSize}
                value={String(pageSize)}
              >
                {pageSize}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}

function TablePaginationText({
  className, ...props
}: HTMLAttributes<HTMLDivElement>) {
  const {
    pagination,
    pageCount,
  } = useTablePagination()
  return (
    <p
      className={
        cn(
          "text-sm text-muted-foreground", className
        )
      }
      {...props}
    >
      Trang
      {" "}

      {pagination?.active}

      {" "}
      của

      {" "}

      {pageCount}
    </p>
  )
}

function TablePaginationGroup({
  className, ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={
        cn(
          "flex items-center gap-2", className
        )
      }
      {...props}
    />
  )
}

function TablePaginationFirst({
  className,
  onClick,
  icon,
  ...props
}: ButtonProps & { icon?: ReactNode }) {
  const { pagination } = useTablePagination()

  return (
    <Button
      aria-label="Go to first page"
      onClick={
        chain(
          onClick, () => pagination?.first()
        )
      }
      disabled={!pagination?.canPrevious}
      size="icon"
      variant="outline"
      className={
        cn(
          "hidden size-8 p-0 lg:flex", className
        )
      }
      {...props}
    >
      {
        icon || (
          <DoubleArrowLeftIcon
            aria-hidden="true"
          />
        )
      }
    </Button>
  )
}

function TablePaginationPrevious({
  className,
  onClick,
  icon,
  ...props
}: ButtonProps & { icon?: ReactNode }) {
  const { pagination } = useTablePagination()

  return (
    <Button
      aria-label="Go to previous page"
      onClick={
        chain(
          onClick, () => pagination?.previous()
        )
      }
      disabled={!pagination?.canPrevious}
      size="icon"
      variant="outline"
      className={
        cn(
          "size-8", className
        )
      }
      {...props}
    >
      {
        icon || (
          <ChevronLeftIcon
            aria-hidden="true"
          />
        )
      }
    </Button>
  )
}

function TablePaginationNext({
  className,
  onClick,
  icon,
  ...props
}: ButtonProps & { icon?: ReactNode }) {
  const { pagination } = useTablePagination()

  return (
    <Button
      aria-label="Go to next page"
      onClick={
        chain(
          onClick, () => pagination?.next()
        )
      }
      disabled={!pagination?.canNext}
      size="icon"
      variant="outline"
      className={
        cn(
          "size-8", className
        )
      }
      {...props}
    >
      {
        icon || (
          <ChevronRightIcon
            aria-hidden="true"
          />
        )
      }
    </Button>
  )
}

function TablePaginationLast({
  className,
  onClick,
  icon,
  ...props
}: ButtonProps & { icon?: ReactNode }) {
  const { pagination } = useTablePagination()

  return (
    <Button
      aria-label="Go to last page"
      onClick={
        chain(
          onClick, () => pagination?.last()
        )
      }
      disabled={!pagination?.canNext}
      size="icon"
      variant="outline"
      className={
        cn(
          "hidden size-8 lg:flex", className
        )
      }
      {...props}
    >
      {
        icon || (
          <DoubleArrowRightIcon
            aria-hidden="true"
          />
        )
      }
    </Button>
  )
}

export {
  TablePaginationProvider,
  TableSelectedText,
  TablePageSize,
  TablePaginationText,
  TablePaginationGroup,
  TablePaginationFirst,
  TablePaginationPrevious,
  TablePaginationNext,
  TablePaginationLast,
  useTablePagination,
}
