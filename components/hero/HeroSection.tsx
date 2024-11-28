"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import mũi tên từ react-icons
import styles from "./hero.module.css";

// Dữ liệu slide
const slides = [
    {
        title: "Học HTML CSS cho người mới 👑",
        description: "Thực hành dự án với Figma, hàng trăm bài tập và thử thách, hướng dẫn 100%.",
        buttonText: "HỌC THỬ MIỄN PHÍ",
        imageUrl: "/web_development.jpg",
    },
    {
        title: "Lập trình Fullstack 🚀",
        description: "Trở thành lập trình viên Fullstack chuyên nghiệp với lộ trình chi tiết.",
        buttonText: "KHÁM PHÁ KHÓA HỌC",
        imageUrl: "/Nutrition Banner.png",
    },
    {
        title: "Học từ xa 🌏",
        description: "Học lập trình từ bất kỳ đâu với các khóa học chất lượng cao từ TechNical.",
        buttonText: "BẮT ĐẦU NGAY",
        imageUrl: "/web_development.jpg",
    },
];

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    // <button
    //     onClick={onClick}
    //     className="z-10 absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition"
    // >
    <button
        onClick={onClick}
        className="absolute top-1"
    >
        <FaArrowLeft className="text-black text-lg"/>
    </button>
);

const NextArrow = ({onClick}: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition"
    >
        <FaArrowRight className="text-black text-lg" />
    </button>
);

export default function HeroSection() {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        appendDots: (dots: React.ReactNode) => (
            <div className="custom-dots flex items-center gap-4 relative">
                {dots}
            </div>
        ),
        customPaging: () => (
            <div className="w-8 h-2 rounded-full bg-gray-300 transition-transform duration-300 ease-in-out"></div>
        ),
    };

    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-[400px]">
                        <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8 text-white">
                            <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                            <p className="mb-4">{slide.description}</p>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                {slide.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );

}

