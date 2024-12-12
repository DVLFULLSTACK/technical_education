import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/getCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import HeroSection from "@/components/hero/HeroSection";
import ElectricBackground from "@/components/custom/ElectricBackground";

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
        <div className="flex flex-col min-h-screen">
            {/* Nội dung chính */}

            <div className="">
                {/* Hero Section */}
                <HeroSection />
            </div>

            <main className="md:mt-5 md:px-10 xl:px-16 pb-16 space-y-10 flex-1">


                {/* Danh sách khóa học */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Khóa học nổi bật
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-center">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))
                        ) : (
                            <p className="text-gray-500">
                                Hiện tại không có khóa học nào.
                            </p>
                        )}
                    </div>
                </section>

                {/* Danh mục khóa học */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Danh mục khóa học
                    </h2>
                    <Categories categories={categories} selectedCategory={null} />
                    <ElectricBackground />
                </section>
            </main>
        </div>
    );
}
