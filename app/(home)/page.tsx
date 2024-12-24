import {db} from "@/lib/db";
import getCoursesByCategory from "../actions/getCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import HeroSection from "@/components/hero/HeroSection";
import ElectricBackground from "@/components/custom/ElectricBackground";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "TechNical Education",
    description: "Thực học - Thực danh - Thực nghiệp",
};
export default async function Home() {
    // Truy vấn danh mục từ cơ sở dữ liệu
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
        include: {
            subCategories: {
                orderBy: {
                    name: "asc",
                },
            },
        },
    });

    // Lấy danh sách khóa học
    const courses = await getCoursesByCategory(null);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Nội dung chính */}

            <div>
                {/* Hero Section */}
                <HeroSection />
            </div>

            <main className="md:mt-5 md:px-10 xl:px-16 pb-16 space-y-16 flex-1">
                {/* Danh sách khóa học Pro */}
                <section>
                    <div className="flex items-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight flex items-center">
                            Khóa học Pro
                            <span
                                className="ml-3 inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white text-xs font-semibold py-1 px-2.5 rounded-lg shadow-md transform transition-transform hover:scale-105">
                                MỚI
                            </span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <CourseCard key={course.id} course={course}/>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center col-span-full">
                                Hiện tại không có khóa học nào.
                            </p>
                        )}
                    </div>
                </section>


                {/* Danh mục khóa học Miễn phí */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Khóa học Miễn phí
                        </h2>
                        <span
                            className="bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-semibold py-1 px-3 rounded shadow-lg">
                        MIỄN PHÍ
                    </span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <CourseCard key={course.id} course={course}/>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">
                                Hiện tại không có khóa học miễn phí nào.
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
