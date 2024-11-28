import HeroButton from "./HeroButton";

export default function HeroContent() {
    return (
        <div className="max-w-lg text-white">
            <h1 className="text-4xl font-bold mb-4">TechNical "Nơi cho mọi người học tập"</h1>
            <p className="text-lg mb-6">
                TechNical được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có
                những con người yêu thích lập trình, TechNical sẽ ở đó.
            </p>
            {/* Nút hành động */}
            <HeroButton />
        </div>
    );
}
