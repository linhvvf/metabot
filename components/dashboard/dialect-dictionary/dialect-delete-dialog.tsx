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

interface DialectDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  dialect?: any
}

export function DialectDeleteDialog({ isOpen, onClose, dialect }: DialectDeleteDialogProps) {
  const handleDelete = () => {
    // Xử lý xóa biệt ngữ
    console.log("Deleting dialect:", dialect?.id)
    onClose()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa biệt ngữ</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa biệt ngữ &quot;{dialect?.term}&quot;? Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
