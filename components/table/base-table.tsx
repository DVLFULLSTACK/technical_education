"use client"

import React, {
  type ReactElement,
  type ReactNode,
} from "react"

import {
  type RowData,
  type Row,
} from "@tanstack/react-table"
import {
  Check, Settings2,
} from "lucide-react"

import {
  useUrlParams,
} from "@/app/hooks/use-url-params"

import {
  ErrorMessage,
} from "@/components/ui/error-message"
import {
  Button,
} from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ReactTable,
  Table,
  TableBody,
  TableCell,
  TableRowExpanded,
  TableHead,
  TableHeader,
  TableHeadGroup,
  TableRow,
  TableBodyEmpty,
  useReactTableContext,
  type ReactTableProps,
} from "@/components/ui/react-table"
import {
  TablePageSize,
  TablePaginationFirst,
  TablePaginationGroup,
  TablePaginationLast,
  TablePaginationNext,
  TablePaginationPrevious,
  TablePaginationProvider,
  TablePaginationText,
  TableSelectedText,
} from "@/components/ui/react-table-pagination"
import {
  SearchBarInput,
  SearchBarButton,
  SearchBar,
  SearchBarBox,
  SearchBarClear,
} from "@/components/ui/search-bar"
import {
  Spin,
} from "@/components/ui/loader"

import {
  cn,
} from "@/lib/utils"

interface BaseTableProps<T> extends ReactTableProps<T> {
  error?: Error | null
  ErrorComponent?: ReactNode
  ExpandedComponent?: ReactElement | ((row: Row<RowData>) => ReactElement)
  FiltersComponent?: ReactNode
  isLoading?: boolean
  LoadingComponent?: ReactNode
  onRowClick?: (row: Row<RowData>) => void
  total?: number
  totalPages?: number
  className?: string
}
const DEFAULT_PAGE_LIMIT = 10
export function BaseTable<T>({
  data = [],
  error,
  ErrorComponent,
  ExpandedComponent,
  FiltersComponent,
  isLoading,
  LoadingComponent,
  onRowClick,
  total = 0,
  totalPages,
  className,
  ...props
}: BaseTableProps<T>) {
  const [
    getParam,
    setParam,
  ] = useUrlParams()

  const page = getParam(
    "page", 1
  )
  const limit = getParam(
    "limit", DEFAULT_PAGE_LIMIT
  )
  const key = getParam(
    "key", ""
  )

  return (
    <ReactTable
      data={error ? [] : data}
      {...props}
    >

      <div className="flex flex-wrap justify-between md:items-center gap-3 mb-6 md:flex-row flex-col">
        <SearchBar
          defaultValue={key}
          onSearchChange={
            key => setParam(
              key, "key"
            )
          }
        >
          <SearchBarBox>
            <SearchBarInput
              placeholder="Tìm kiếm"
            />

            <SearchBarClear />
          </SearchBarBox>

          <SearchBarButton />
        </SearchBar>

        <div className="flex gap-3 items-center justify-end">
          {FiltersComponent}

          <TableColumnVisible />
        </div>
      </div>

      <div className={
        cn(
          "max-h-[72vh] w-full overflow-auto rounded-md border", className
        )
      }
      >
        <Table className="text-sm">
          <TableHeader
            className="sticky top-0 z-10 border-b bg-muted shadow-[0px_-3px_3px_-3px_hsl(var(--border))_inset]"
          >
            <TableHeadGroup>
              <TableHead
                className="p-2 text-left align-middle font-medium data-[pinned=true]:bg-muted"
              />
            </TableHeadGroup>
          </TableHeader>

          <TableBodyEmpty>
            {
              isLoading ? (LoadingComponent || (
                <div className="grid place-content-center py-6">
                  <Spin />
                </div>
              )) : error ? ErrorComponent || (
                <div className="grid place-content-center py-6">
                  <ErrorMessage error={error} />
                </div>
              ) : "Không tìm thấy kết quả nào!"
            }
          </TableBodyEmpty>

          <TableBody>
            {
              row => (
                <React.Fragment>
                  <TableRow
                    row={row}
                    className="group/tableRow border-b hover:bg-accent/10 hover:text-accent-foreground bg-background data-[selected=true]:bg-muted"
                  >
                    {
                      (cell) => {
                        const allowClick = cell.column.columnDef.meta?.allowClick ?? true
                        return (
                          <TableCell
                            cell={cell}
                            className={
                              cn(
                                "px-2 py-2 align-middle group-hover/tableRow:border-secondary group-hover/tableRow:!bg-accent/10 data-[pinned=true]:bg-background group-data-[selected=true]/tableRow:!bg-light-primary group-data-[selected=true]/tableRow:!text-primary",
                                allowClick && onRowClick && "cursor-pointer"
                              )
                            }
                            onClick={
                              () => {
                                if (allowClick) {
                                  onRowClick?.(row)
                                }
                              }
                            }
                          />
                        )
                      }
                    }
                  </TableRow>

                  <TableRowExpanded row={row}>
                    {ExpandedComponent}
                  </TableRowExpanded>
                </React.Fragment>
              )
            }
          </TableBody>
        </Table>
      </div>

      <TablePaginationProvider
        onPageChange={
          page => setParam(
            page, "page"
          )
        }
        onPageSizeChange={
          limit => setParam(
            limit, "limit"
          )
        }
        page={page}
        pageCount={totalPages || Math.ceil((total || limit) / limit)}
        pageSize={limit}
        className="mt-4"
      >
        <TableSelectedText />

        <div className="flex lg:items-center gap-3 lg:gap-6">
          <TablePageSize />

          <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-6 lg:items-center">
            <TablePaginationText />

            <TablePaginationGroup>
              <TablePaginationFirst />

              <TablePaginationPrevious />

              <TablePaginationNext />

              <TablePaginationLast />
            </TablePaginationGroup>
          </div>
        </div>
      </TablePaginationProvider>
    </ReactTable>
  )
}

function TableColumnVisible() {
  const table = useReactTableContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          className="hidden lg:flex"
        >
          <Settings2 />
          Ẩn/Hiện
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-52 p-0"
      >
        <Command shouldFilter={false}>
          <div className="max-h-[300px] overflow-auto">
            <CommandList className="max-h-full">
              <CommandGroup>
                <CommandItem
                  onSelect={
                    () => {
                      table.toggleAllColumnsVisible()
                    }
                  }
                >
                  <Check
                    className={
                      cn(
                        "mr-2 h-4 w-4",
                        table.getIsAllColumnsVisible() ? "opacity-100" : "opacity-0"
                      )
                    }
                  />
                  Chuyển đổi tất cả
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup>
                {
                  table.getAllLeafColumns().map((column) => {
                    return (
                      <CommandItem
                        key={column.id}
                        value={column.id}
                        onSelect={
                          () => {
                            column.toggleVisibility()
                          }
                        }
                        disabled={!column.getCanHide()}
                      >
                        <Check
                          className={
                            cn(
                              "mr-2 h-4 w-4",
                              column.getIsVisible() ? "opacity-100" : "opacity-0"
                            )
                          }
                        />

                        {column.columnDef.meta?.columnName || column.id}
                      </CommandItem>
                    )
                  })
                }
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
