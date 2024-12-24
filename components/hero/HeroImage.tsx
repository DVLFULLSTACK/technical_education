import Image from "next/image";

export default function HeroImage() {
    return (
        <Image
            src="/public/Marketing Banner.png"
            alt="TechNical"
            className="w-80 h-auto rounded-lg shadow-md"
        />
    );
}
