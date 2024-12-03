import StudentSidebar from "@/components/layout/StudentSidebar"; // Sử dụng StudentSidebar
import Topbar from "@/components/layout/Topbar";
import Footer from "@/components/layout/Footer";


const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-col">
            {/* Topbar */}
            <Topbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-64 h-full">
                    <StudentSidebar /> {/* Thay thế Sidebar bằng StudentSidebar */}
                </div>

                {/* Nội dung chính */}
                <div className="flex-1 overflow-auto p-4 bg-gray-50">
                    {children}
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;
