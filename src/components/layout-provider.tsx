
"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AreaChart,
  BrainCircuit,
  CalendarCheck,
  FolderKanban,
  LayoutGrid,
  QrCode,
  Ticket,
  User,
  Vote,
} from 'lucide-react';
import { UserNav } from './user-nav';

const navItems = [
  { href: '/', label: 'Discovery Feed', icon: LayoutGrid },
  { href: '/agenda', label: 'My Agenda', icon: CalendarCheck },
  { href: '/ticketing', label: 'Events', icon: Ticket },
  { href: '/resources', label: 'Resource Hub', icon: FolderKanban },
  { href: '/live', label: 'Live Q&A', icon: Vote },
  { href: '/scanner', label: 'Badge Scanner', icon: QrCode },
  { href: '/dashboard', label: 'Organizer View', icon: AreaChart },
];

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <BrainCircuit className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-primary">AIxMeet</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: 'right' }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
               <SidebarMenuButton
                 asChild
                 isActive={pathname === '/profile'}
                 tooltip={{ children: 'My Profile', side: 'right' }}
               >
                 <Link href="/profile">
                   <User />
                   <span>My Profile</span>
                 </Link>
               </SidebarMenuButton>
             </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger />
          <UserNav />
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
