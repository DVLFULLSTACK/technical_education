"use client";

export default function ProfilePage() {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="relative h-48 w-full bg-gradient-to-r from-blue-400 to-pink-400 rounded-b-lg shadow-lg">
                <h1 className="absolute top-8 left-8 text-white text-3xl font-semibold">
                    document.write('Hello, World!');
                </h1>
                {/* Avatar đan xen */}
                <div className="absolute -bottom-12 left-10 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                        src="/avatar_placeholder.jpg"
                        alt="Profile Avatar"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto mt-16 px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side - Profile Info */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        Sơn Đặng{" "}
                        <span className="text-blue-500 ml-2">✔</span>
                    </h2>
                    <p className="italic text-gray-600 mb-4">Stop thinking, start doing!</p>
                    <ul className="text-blue-500 space-y-2">
                        <li>🔗 <a href="#">https://fullstack.edu.vn</a></li>
                        <li>🔗 <a href="#">https://github.com/sondnpt00343</a></li>
                        <li>🔗 <a href="#">https://facebook.com/sondnf8</a></li>
                        <li>🔗 <a href="#">https://youtube.com/F8VNOfficial</a></li>
                        <li>🔗 <a href="#">https://tiktok.com/@f8official</a></li>
                    </ul>
                </div>

                {/* Right Side - Courses and Activities */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Courses */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Các khóa học đã tham gia</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: "JavaScript Pro", color: "bg-yellow-100" },
                                { title: "Ngôn ngữ Sass", color: "bg-pink-100" },
                                { title: "HTML CSS Pro", color: "bg-blue-100" },
                                { title: "WSL Ubuntu", color: "bg-purple-100" },
                            ].map((course, idx) => (
                                <div
                                    key={idx}
                                    className={`${course.color} p-4 rounded-lg shadow hover:scale-105 transition-transform duration-300`}
                                >
                                    <h4 className="font-bold text-gray-700">{course.title}</h4>
                                    <p className="text-sm mt-2 text-gray-600">
                                        Khóa học nâng cao kỹ năng lập trình của bạn.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Hoạt động gần đây</h3>
                        <ul className="space-y-4">
                            {Array(4)
                                .fill(0)
                                .map((_, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start space-x-4 hover:bg-gray-100 p-3 rounded-lg transition duration-300"
                                    >
                                        <img
                                            src="/avatar_placeholder.jpg"
                                            alt="Avatar"
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            <span className="font-bold">Sơn Đặng</span> đã trả lời câu hỏi của{" "}
                                            <span className="text-blue-500">Việt Bắc</span>: "Hi em, Anh đã ở đó
                                            rồi, nó là tự động ạ."
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
