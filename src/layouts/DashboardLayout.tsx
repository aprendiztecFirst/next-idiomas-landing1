import { Outlet } from "react-router-dom";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="lg:ml-72 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
