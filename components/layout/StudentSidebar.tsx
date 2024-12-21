"use client";

import { Home, GraduationCap, Edit, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StudentSidebar = () => {
    const pathname = usePathname();

    // Các route trong sidebar (kết hợp thay đổi từ cả HEAD và admin)
    const sidebarRoutes = [
        { icon: <Home />, label: "Trang chủ", path: "/" },
        {
            icon: <GraduationCap />,
            label: "Lộ trình học",
            path: "/student/learning-path",
        },
        { icon: <Edit />, label: "Bài viết", path: "/student/articles" },
        { icon: <UsersRound />, label: "Diễn đàn", path: "/forum" },
    ];

    return (
        <div className="max-sm:hidden flex flex-col w-64 border-r shadow-lg px-6 my-4 gap-6 text-sm font-medium bg-white text-gray-800 h-full">
            {sidebarRoutes.map((route) => (
                <Link
                    href={route.path}
                    key={route.path}
                    className={`flex items-center gap-4 p-4 rounded-lg hover:bg-[#FDAB04] hover:text-white transition-colors duration-300
                      ${
                        pathname === route.path
                            ? "bg-[#FDAB04] text-white"
                            : "text-gray-700"
                    }`}
                >
                    {route.icon} {route.label}
                </Link>
            ))}
        </div>
    );
};

export default StudentSidebar;
