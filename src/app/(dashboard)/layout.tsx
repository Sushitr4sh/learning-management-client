"use client";

import AppSidebar from "@/components/AppSidebar";
import Loading from "@/components/Loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  /* Handle use effect iscoursePage */

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          {/* TODO: SIDEBAR CHAPTER */}
          <div
            className={cn("dashboard__main")}
            style={{ height: "100vh" }}
          ></div>
          <main className="dashboard__body">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
