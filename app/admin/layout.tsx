"use client";

import { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        console.log(user);
        if (user && user.unsafeMetadata.role != "admin") {
            router.push("/");
        }
    }, [user, router]); // Thêm `router` vào mảng dependencies

    return (
        <SidebarProvider>
            <AppSidebar />

            <main className="w-full p-8">
                <SidebarTrigger />

                {children}
            </main>
        </SidebarProvider>
    );
}
