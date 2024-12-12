import Footer from "@/components/layout/Footer";
import Topbar from "@/components/layout/Topbar";
import StudentSidebar from "@/components/layout/StudentSidebar"; // Import StudentSidebar

export default function LearningPathPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Topbar */}
      <Topbar />

      {/* Content wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {/*  className="w-1/4 bg-gray-100 p-6 sticky top-0 h-screen" */}
        <div>
            <StudentSidebar />
        </div>

        {/* Main Content */}
        <main className="w-3/4 p-8">
          {/* Tiêu đề phần mô tả lộ trình học */}
          <section className="bg-gray-50 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Lộ trình học lập trình Fullstack
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Học lập trình Fullstack không chỉ dừng lại ở việc biết một vài
              ngôn ngữ lập trình. Bạn cần phải biết cách kết hợp các công nghệ
              frontend và backend để xây dựng một ứng dụng hoàn chỉnh. Chúng tôi
              sẽ hướng dẫn bạn qua các bước học từng phần một cách chi tiết.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Xem chi tiết lộ trình
            </button>
          </section>

          {/* Các khóa học */}
          <section className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Các khóa học trong lộ trình
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Khóa học 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="/web_development.jpg"
                  alt="Web Development"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Khóa học Web Development
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Học HTML, CSS, JavaScript và các framework frontend như
                    React.js và Vue.js để xây dựng giao diện người dùng mạnh mẽ.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Bắt đầu khóa học
                  </button>
                </div>
              </div>

              {/* Khóa học 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="/Nutrition Banner.png"
                  alt="Fullstack"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Khóa học Fullstack
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Học cách kết nối frontend với backend, sử dụng Node.js,
                    Express và MongoDB để xây dựng một ứng dụng đầy đủ chức
                    năng.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Bắt đầu khóa học
                  </button>
                </div>
              </div>

              {/* Khóa học 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="/web_development.jpg"
                  alt="Backend Development"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Khóa học Backend Development
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tìm hiểu cách xây dựng API, làm việc với cơ sở dữ liệu và
                    triển khai ứng dụng trên các nền tảng đám mây.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Bắt đầu khóa học
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Lộ trình chi tiết */}
          <section className="bg-gray-50 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Lộ trình chi tiết học lập trình Fullstack
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Để học lập trình Fullstack, bạn cần đi qua một số bước cơ bản.
              Dưới đây là lộ trình chi tiết cho bạn:
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Bước 1: Học HTML, CSS và JavaScript
                  </h3>
                  <p className="text-gray-600">
                    Làm quen với các công nghệ cơ bản để xây dựng giao diện
                    người dùng.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Bước 2: Học React.js và Node.js
                  </h3>
                  <p className="text-gray-600">
                    Tìm hiểu cách xây dựng ứng dụng frontend với React.js và
                    backend với Node.js.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Bước 3: Học cách kết nối Frontend và Backend
                  </h3>
                  <p className="text-gray-600">
                    Kết nối frontend và backend qua các API RESTful hoặc
                    GraphQL.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Bước 4: Triển khai và quản lý dự án
                  </h3>
                  <p className="text-gray-600">
                    Triển khai ứng dụng lên server, học cách sử dụng Docker và
                    CI/CD để quản lý dự án hiệu quả.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
