import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavSecondary } from "@/components/nav-secondary"
import {
  Briefcase,
  Users,
  Plane,
  MoreHorizontal,
  User2,
  ChevronDown,
  ChevronUp,
  LogOut,
  Bell,
  CreditCard,
  Settings,
  LifeBuoy,
  MessageCircle,
  Star,
  GalleryVerticalEnd,
  ArrowUpRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const projects = [
  { name: "Design Engineering", url: "/projects/design", icon: Briefcase },
  { name: "Sales & Marketing", url: "/projects/sales", icon: Users },
  { name: "Travel", url: "/projects/travel", icon: Plane },
];

const data = {navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: MessageCircle,
    },
  ]}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="bg-black rounded-lg w-8 h-8 flex items-center justify-center text-white text-xl font-bold">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">Mydecorly</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarTrigger className="ml-2" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <a href={project.url}>
                      <project.icon className="mr-2" />
                      <span>{project.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <NavSecondary items={data.navSecondary} className="mt-auto" />
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted transition">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>SH</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium leading-tight">shadcn</div>
                <div className="text-xs text-muted-foreground">m@example.com</div>
              </div>
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-64">
            <div className="flex items-center gap-3 p-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>SH</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">shadcn</div>
                <div className="text-xs text-muted-foreground">m@example.com</div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ArrowUpRight className="mr-2 w-4 h-4" /> Upgrade to Pro
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User2 className="mr-2 w-4 h-4" /> Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 w-4 h-4" /> Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 w-4 h-4" /> Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 w-4 h-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}