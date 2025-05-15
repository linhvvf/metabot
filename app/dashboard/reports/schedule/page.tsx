import ScheduledReportsList from "@/components/dashboard/reports/scheduled-reports-list"

export const metadata = {
  title: "Lịch báo cáo | Metabot.vn",
  description: "Quản lý các báo cáo được lập lịch gửi tự động",
}

export default function SchedulePage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lịch báo cáo</h1>
        <p className="text-muted-foreground">Quản lý các báo cáo được lập lịch gửi tự động</p>
      </div>

      <ScheduledReportsList />
    </div>
  )
}
