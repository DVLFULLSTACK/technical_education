import {
  type ComponentProps, type MouseEventHandler, type ReactElement,
} from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type IDoc = {
  title: string
  descriptions: string
  cancel?: string
  action: string
}

export interface BaseAlertDialogProps extends ComponentProps<typeof AlertDialog> {
  onAction?: MouseEventHandler<HTMLButtonElement>
  TriggerComponent?: ReactElement
  doc?: Partial<IDoc>
}

export function BaseAlertDialog({
  onAction, TriggerComponent, doc, ...props
}: BaseAlertDialogProps) {
  return (
    <AlertDialog {...props}>
      {
        TriggerComponent
          ? <AlertDialogTrigger asChild>{TriggerComponent}</AlertDialogTrigger>
          : null
      }

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{doc?.title}</AlertDialogTitle>

          <AlertDialogDescription>{doc?.descriptions}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{doc?.cancel || "Đóng"}</AlertDialogCancel>

          <AlertDialogAction
            onClick={onAction}
            className="bg-destructive hover:bg-destructive"
          >
            {doc?.action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
