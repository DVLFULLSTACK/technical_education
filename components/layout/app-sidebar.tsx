import { LayoutDashboard, Home, UserRound, Inbox, Search, Settings, User, BookMarked, ArrowRightLeft , ChartSpline    } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Courses",
    url: "/admin/courses",
    icon: BookMarked,
  },
  {
    title: "Categories",
    url: "/admin/category",
    icon: LayoutDashboard,
  },
  {
    title: "Purchases",
    url: "/admin/purchases",
    icon: ArrowRightLeft,
  },
  {
    title: "Forum",
    url: "/admin/posts",
    icon: UserRound,
  },
  {
    title: "Statistic",
    url: "/admin/statistic",
    icon: ChartSpline,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },

]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>Technical Education</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
