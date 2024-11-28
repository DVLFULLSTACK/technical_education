"use client";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Row chính */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Logo và thông tin liên hệ */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-4">
                            Học Lập Trình Để Đi Làm
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li>Điện thoại: 0901 6574 98</li>
                            <li>Email: laptrinhvien.fullstacki@gmail.com</li>
                            <li>135/8 Thạnh Xuân 21, Q12, TP Hồ Chí Minh</li>
                        </ul>
                        <div className="mt-4">
                            <img src="/dmca_protected.png" alt="DMCA" className="w-16" />
                        </div>
                    </div>

                    {/* Về TechNical */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-4">Về TechNical</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Giới thiệu</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Bảo mật</a></li>
                        </ul>
                    </div>

                    {/* Công cụ */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-4">Công cụ</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Tạo CV xin việc</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Rút gọn link</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Clip-path maker</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">CSS Grid Generator</a></li>
                        </ul>
                    </div>

                    {/* Sản phẩm */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-4">Sản phẩm</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Game Nester</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Game CSS Designer</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Game UI Tools</a></li>
                        </ul>
                    </div>
                </div>

                {/* Dòng bản quyền và icon mạng xã hội */}
                <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
                    <p className="text-sm text-center md:text-left">
                        © 2024 TechNical. Nền tảng học lập trình hàng đầu Việt Nam
                    </p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                            <i className="fab fa-facebook-f text-lg"></i>
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                            <i className="fab fa-instagram text-lg"></i>
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-white transition-colors">
                            <i className="fab fa-youtube text-lg"></i>
                        </a>
                        <a href="#" aria-label="TikTok" className="hover:text-white transition-colors">
                            <i className="fab fa-tiktok text-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
