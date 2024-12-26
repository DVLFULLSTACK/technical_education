"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import mũi tên từ react-icons
import "./customSlider.css";
// import "../../public/css/CustomSliderDot.css";

// Dữ liệu slide
const slides = [
    { imageUrl: "/Slider/1.png" },
    { imageUrl: "/Slider/2.png" },
    { imageUrl: "/Slider/3.png" },
    { imageUrl: "/Slider/4.png" },
    { imageUrl: "/Slider/5.png" },
    { imageUrl: "/Slider/6.png" },
    { imageUrl: "/Slider/7.png" },
];

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute z-20 top-1/2 p-3 rounded-full bg-white left-11 shadow-md"
    >
        <FaArrowLeft className="text-black text-lg" />
    </button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute z-20 top-1/2 p-3 rounded-full bg-white right-11 shadow-md"
    >
        <FaArrowRight className="text-black text-lg" />
    </button>
);

export default function HeroSection() {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        appendDots: (dots: React.ReactNode) => (
            <div>
                <div className="w-10 h-8 gap-5 flex absolute -bottom-5 slider-dots">
                    {dots}
                </div>
            </div>
        ),
        customPaging: () => (
            <div className="w-8 h-2 rounded-full bg-gray-300 transition-all duration-300 ease-in-out custom-dot-active"></div>
        ),
    };

    return (
        <div className="w-full h-[430px] rounded-lg overflow-hidden">
            <Slider {...settings} className="md:px-10 xl:px-16">
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-[400px]">
                        <img
                            src={slide.imageUrl}
                            alt={`Slide ${index + 1}`}
                            className="object-cover w-full h-full rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
