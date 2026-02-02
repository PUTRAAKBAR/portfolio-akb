import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProfileCard from "../ui/ProfileCard";
import portfolio from "../../data/portfolio.json";
import LiquidEther from "@/components/LiquidEther";
import ShinyText from "@/components/ShinyText";
import TextType from "@/components/TextType";

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 lg:py-0 overflow-hidden bg-[#050505]">

            <div className="absolute inset-0 w-full h-full z-0">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            <div className="z-10 w-full max-w-7xl px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none">

                <div className="space-y-6 order-2 lg:order-1 pointer-events-auto">
                    <div className="space-y-2">
                        <h2 className="font-jakarta font-bold text-2xl md:text-3xl">
                            <ShinyText
                                text={portfolio.hero.greeting}
                                speed={2}
                                delay={0}
                                color="#C174FF"
                                shineColor="#6D12C3"
                                spread={120}
                                direction="left"
                                yoyo={false}
                                pauseOnHover={false}
                                disabled={false}
                            />
                        </h2>
                        <h1
                            className="font-jakarta font-bold text-2xl md:text-4xl leading-tight bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent"
                            dangerouslySetInnerHTML={{ __html: portfolio.hero.name }}
                        />
                    </div>

                    <div className="border-l-4 border-[#6D12C3] pl-4 py-1 mt-6">
                        <div className="font-poppins font-light text-gray-300 text-sm md:text-base leading-relaxed max-w-lg">
                            <TextType
                                text={portfolio.hero.bio}
                                typingSpeed={50}
                                pauseDuration={10000}
                                showCursor
                                cursorCharacter="_"
                                cursorBlinkDuration={0.5}
                            />
                        </div>
                    </div>

                    <Link
                        href="#projects"
                        className="group mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#6D12C3] hover:bg-[#570EA0] text-white font-jakarta font-semibold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(109,18,195,0.4)] hover:shadow-[0_0_30px_rgba(109,18,195,0.6)] cursor-pointer"
                    >
                        {portfolio.hero.buttonText}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                <div className="flex justify-center lg:justify-end order-1 lg:order-2 pointer-events-auto">
                    <ProfileCard />
                </div>
            </div>
        </section>
    );
}