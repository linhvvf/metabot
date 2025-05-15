"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteTemplateDialogProps {
  template: {
    id: string
    title: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteTemplateDialog({ template, open, onOpenChange }: DeleteTemplateDialogProps) {
  const handleDelete = () => {
    // Thực hiện xóa mẫu tin nhắn
    // Sau đó đóng dialog
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa mẫu tin nhắn</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa mẫu tin nhắn &quot;{template.title}&quot;? Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
