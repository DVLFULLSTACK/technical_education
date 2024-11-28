"use client";

export default function ElectricBackground() {
    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-white">
            {/* Hiệu ứng nền gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-100 opacity-90"></div>

            {/* Hệ thống galaxy */}
            <div className="absolute inset-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 800 800"
                    className="w-full h-full"
                >
                    {/* Gradient màu galaxy */}
                    <defs>
                        <linearGradient id="galaxy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff4d4d">
                                <animate
                                    attributeName="stop-color"
                                    values="#ff4d4d; #ff884d; #ffd84d; #4dff4d; #4dd5ff; #a64dff; #ff4dd5; #ff4d4d"
                                    dur="8s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="50%" stopColor="#4dd5ff">
                                <animate
                                    attributeName="stop-color"
                                    values="#4dd5ff; #4d4dff; #a64dff; #ff4dd5; #ff4d4d; #4dd5ff"
                                    dur="8s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="100%" stopColor="#4d4dff">
                                <animate
                                    attributeName="stop-color"
                                    values="#4d4dff; #a64dff; #ff4dd5; #ff4d4d; #4dd5ff; #4d4dff"
                                    dur="8s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                        </linearGradient>
                    </defs>

                    {/* Vành đai lớn */}
                    <circle
                        cx="400"
                        cy="400"
                        r="360"
                        stroke="url(#galaxy-gradient)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-[spin_20s_linear_infinite]"
                    />

                    {/* Vành đai trung bình */}
                    <circle
                        cx="400"
                        cy="400"
                        r="300"
                        stroke="url(#galaxy-gradient)"
                        strokeWidth="1.5"
                        fill="none"
                        className="animate-[spin_25s_reverse_linear_infinite]"
                    />

                    {/* Vành đai nhỏ */}
                    <circle
                        cx="400"
                        cy="400"
                        r="240"
                        stroke="url(#galaxy-gradient)"
                        strokeWidth="1"
                        fill="none"
                        className="animate-[spin_30s_linear_infinite]"
                    />

                    {/* Ngôi sao (dấu chấm lấp lánh) */}
                    {[...Array(50)].map((_, i) => (
                        <circle
                            key={i}
                            cx={Math.random() * 800} // Ngẫu nhiên tọa độ X
                            cy={Math.random() * 800} // Ngẫu nhiên tọa độ Y
                            r={Math.random() * 2 + 1} // Kích thước ngẫu nhiên
                            fill="white"
                            opacity="0.8"
                            className="animate-[twinkle_3s_infinite]"
                        />
                    ))}
                </svg>
            </div>

            {/* Nội dung */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1
                    className="text-5xl md:text-7xl font-extrabold mb-4 leading-snug bg-clip-text text-transparent"
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, #ff4d4d, #ff884d, #ffd84d, #4dff4d, #4dd5ff, #a64dff, #ff4dd5, #ff4d4d)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        animation: "gradientMove 6s linear infinite",
                    }}
                >
                    Vietnam Web <br /> Dev Playground
                </h1>
                <p className="text-base md:text-lg max-w-3xl mb-6 leading-relaxed text-gray-700">
                    Đây là một Group Facebook học tập và chia sẻ kiến thức về lập trình web miễn phí
                    của Dược. Tại đây bạn có thể xem trước các video mình public trên Youtube 10
                    ngày và nhận được voucher giảm giá cho các khóa học của mình.
                </p>
                <button className="bg-black text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-gray-800 transition">
                    Tham gia ngay
                </button>
            </div>
        </div>
    );
}
