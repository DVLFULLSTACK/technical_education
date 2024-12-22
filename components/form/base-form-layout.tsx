"use client"

import {
  Fragment,
  type ReactNode,
} from "react"

import {
  format,
} from "date-fns"
import {
  Check,
  Ellipsis,
  Plus,
  Save,
  Undo2,
} from "lucide-react"
import {
  useFormContext,
} from "react-hook-form"

import {
  DeleteAlertDialog,
} from "@/components/ui/delete-alert-log"
import {
  ErrorMessage,
} from "@/components/ui/error-message"
import {
  Button,
  ButtonSpin,
} from "@/components/ui/button"
import {
  Card, CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Separator,
} from "@/components/ui/separator"
import {
  cn,
} from "@/lib/utils"
import {
  type ApiResponse,
} from "@/types/api"
import {
  type Author,
} from "@/types/share"

interface BaseFormLayoutProps<T extends Record<string, unknown>> {
  name: string
  isCreate?: boolean
  data?: ApiResponse<T>
  onDelete?: ({ _id }: { _id: string | number }) => Promise<unknown>
  onDeleteSuccess?: () => void
  children?: ReactNode
  hasPublish?: boolean
  isPublished?: boolean
  onPublish?: () => void
  onSubmit?: () => void
  isInDialog?: boolean
}

export function BaseFormLayout<T extends Record<string, unknown>>({
  name, isCreate, data, onDelete, onDeleteSuccess, children, hasPublish, isPublished, onPublish, onSubmit, isInDialog,
}: BaseFormLayoutProps<T>) {
  const { formState } = useFormContext()

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-9">
        <Card>
          <CardHeader className="p-3 md:p-5">
            {children}
          </CardHeader>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <div className={
          cn(
            "space-y-6 lg:sticky", isInDialog ? "top-0" : "top-20"
          )
        }
        >
          {
            formState.errors.root?.message ? (
              <ErrorMessage
                variant="destructive"
                message={formState.errors.root?.message}
              />
            ) : null
          }

          <div className="space-y-3">
            {
              hasPublish ? (
                <div className="flex gap-3">
                  <Button
                    disabled={isPublished || (!formState.isDirty && isCreate)}
                    onClick={onPublish}
                    type="button"
                    variant={isPublished ? "secondary" : "default"}
                    className="grow"
                  >
                    <ButtonSpin as={<Check />} />

                    {isPublished ? "Đã xuất bản" : "Xuất bản" }
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                      >
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={onPublish}
                        disabled={!isPublished || isCreate}
                      >
                        <Undo2 className="size-4 mr-2" />
                        Ngừng xuất bản
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : null
            }

            <Button
              onClick={() => onSubmit?.()}
              isLoading={formState.isSubmitting}
              disabled={!formState.isDirty}
              variant={hasPublish && !isPublished ? "secondary" : "default"}
              type="submit"
              className="w-full"
            >
              <ButtonSpin as={isCreate ? <Plus /> : <Save />} />

              {isCreate ? `Tạo ${name}` : `Cập nhật ${name}`}
            </Button>
          </div>

          {
            isCreate
              ? (
                <Card>
                  <CardHeader className="gap-2">
                    <CardTitle>Thông tin</CardTitle>

                    <Separator />

                    <div className="flex justify-between">
                      <p className="text-sm">Ngày tạo:</p>

                      <p className="text-sm text-muted-foreground">Bây giờ</p>
                    </div>

                    {/* <div className="justify-between">
                      <p className="text-sm">Người tạo:</p>

                      <p className="text-sm text-muted-foreground">-</p>
                    </div> */}

                    <div className="flex justify-between">
                      <p className="text-sm">Ngày cập nhật:</p>

                      <p className="text-sm text-muted-foreground">Bây giờ</p>
                    </div>
                  </CardHeader>
                </Card>
              )
              : data && (
                <Fragment>
                  <Card>
                    <CardHeader className="gap-2">
                      <CardTitle>Thông tin</CardTitle>

                      <Separator />

                      {
                        data?.data?.created_date
                          ? (
                            <div className="flex justify-between items-center gap-3">
                              <p className="text-sm">Ngày tạo:</p>

                              <p className="text-xs text-muted-foreground">
                                {
                                  format(
                                    new Date(data.data.created_date as string), "dd/MM/yyyy, HH:mm"
                                  )
                                }
                              </p>
                            </div>
                          )
                          : null
                      }

                      {
                        data?.data?.author ? (
                          <div className="flex justify-between items-center gap-3">
                            <p className="text-sm">Người tạo:</p>

                            <p className="text-xs text-muted-foreground">
                              {(data?.data?.author as Author)?.full_name || "-"}
                            </p>
                          </div>
                        ) : null
                      }

                      {
                        data?.data?.updated_date
                          ? (
                            <div className="flex justify-between items-center gap-3">
                              <p className="text-sm">Cập nhật:</p>

                              <p className="text-xs text-muted-foreground">
                                {
                                  format(
                                    new Date(data?.data?.updated_date as string), "dd/MM/yyyy, HH:mm"
                                  )
                                }

                              </p>
                            </div>
                          )
                          : null
                      }
                    </CardHeader>
                  </Card>

                  {
                    onDelete instanceof Function ? (
                      <DeleteAlertDialog
                        onDelete={
                          () => onDelete({
                            _id: data?.data?._id as string | number,
                          })
                        }
                        onDeleteSuccess={onDeleteSuccess}
                        TriggerComponent={
                          (
                            <Button
                              disabled={!data.data?.author_id}
                              type="button"
                              variant="outline"
                              className="w-full border-destructive !text-destructive !bg-destructive/20"
                            >
                              Xóa
                              {" "}

                              {name}
                            </Button>
                          )
                        }
                      />
                    ) : null
                  }
                </Fragment>
              )
          }
        </div>
      </div>
    </div>
  )
}
