'use client';

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSidebarPaths = ['/', '/sign-in', '/sign-up', '/verify-signup-link'];
  const showSidebar = !hideSidebarPaths.includes(pathname);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {showSidebar && <AppSidebar />}
        <main className={`flex-1 w-full ${showSidebar ? 'flex flex-col' : 'flex flex-col'}`}>
          {showSidebar && <SidebarTrigger className="absolute top-3 left-3" />}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
