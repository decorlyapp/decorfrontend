'use client';

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {showSidebar && <AppSidebar />}
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4">
          {showSidebar && <SidebarTrigger className="absolute top-3 left-3" />}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}