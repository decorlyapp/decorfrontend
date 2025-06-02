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
  Coins,
  User2,
  ChevronUp,
  LogOut,
  Bell,
  LifeBuoy,
  MessageCircle,
  GalleryVerticalEnd,
  LogIn,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabaseUserId } from "@/utils/get-supabase-user";

interface Space {
  name: string;
  url: string;
}

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
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true);
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const capitalize = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : '';

  useEffect(() => {
    const fetchUserAndSpaces = async () => {
      if (!isSignedIn || !user) {
        setSpaces([]);
        setIsLoadingSpaces(false);
        setAvatarUrl(null);
        return;
      }

      try {
        // Set avatar URL
        setAvatarUrl(user.externalAccounts[0]?.imageUrl || null);
        
        // First get the Supabase user ID
        const userId = await getSupabaseUserId(user.id);
        setSupabaseUserId(userId);

        if (!userId) {
          setSpaces([]);
          return;
        }

        // Then fetch spaces using the Supabase user ID
        const response = await fetch(`/api/get-spaces?userId=${userId}`);
        const data = await response.json();
        setSpaces(data.spaces || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSpaces([]);
      } finally {
        setIsLoadingSpaces(false);
      }
    };

    fetchUserAndSpaces();
  }, [isSignedIn, user]);

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  if (!isLoaded) {
    return null;
  }

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
          <SidebarGroupLabel>Spaces</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoadingSpaces ? (
                <SidebarMenuItem>
                </SidebarMenuItem>
              ) : spaces.length === 0 ? (
                <SidebarMenuItem>
                </SidebarMenuItem>
              ) : (
                spaces.map((space) => (
                  <SidebarMenuItem key={space.name}>
                    <SidebarMenuButton asChild>
                      <a href={space.url}>
                        <Briefcase className="mr-2" />
                        <span>{space.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <NavSecondary items={data.navSecondary} className="mt-auto" />
      <SidebarFooter>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted transition">
                <Avatar className="w-8 h-8">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={`${initials}`} />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium leading-tight">
                    {capitalize(user.firstName || '')} {capitalize(user.lastName || '')}
                  </div>
                </div>
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-64">
              <div className="flex items-center gap-3 p-3">
                <Avatar className="w-10 h-10">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={`${initials}`} />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium">{capitalize(user.firstName || '')} {capitalize(user.lastName || '')}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Coins className="mr-2 w-4 h-4" /> Buy Credits
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User2 className="mr-2 w-4 h-4" /> Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 w-4 h-4" /> Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 w-4 h-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => handleSignIn()}>
                <LogIn className="ml-1 w-4 h-4" />
                <span className="font-semibold text-sm ml-1">Login</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}