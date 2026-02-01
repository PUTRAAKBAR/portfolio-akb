"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Code2, Palette, Globe, Cpu, Database, Layout, Video, Camera, Mic, Terminal
} from "lucide-react";
import portfolio from "../../data/portfolio.json";

export default function SkillsSection() {
    return (
        <section className="relative w-full py-24 bg-[#050505] overflow-hidden" id="skills">

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#6D12C3] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mb-20">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-jakarta font-bold text-white"
                        dangerouslySetInnerHTML={{ __html: portfolio.skills.title }}
                    />
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#6D12C3] to-transparent mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolio.skills.categories.map((category, index) => (
                        <SkillCard key={index} data={category} index={index} />
                    ))}
                </div>

            </div>

            <div className="relative w-full py-10 border-t border-white/5 bg-[#0A0A0A]/50 backdrop-blur-sm">

                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />

                <div className="flex flex-col gap-6">
                    {/* Baris 1: Tech Stack */}
                    <MarqueeRow items={portfolio.skills.marquee.top} direction="left" speed={40} />

                    {/* Baris 2: Creative Tools */}
                    <MarqueeRow items={portfolio.skills.marquee.bottom} direction="right" speed={40} />
                </div>
            </div>

        </section>
    );
}


// --- SUB-COMPONENT: SKILL CARD (HUD) ---
function SkillCard({ data, index }: any) {
    const getCategoryIcon = (cat: string) => {
        if (cat.includes("Tech")) return <Terminal size={24} className="text-[#C174FF]" />;
        if (cat.includes("Creative")) return <Palette size={24} className="text-[#C174FF]" />;
        return <Globe size={24} className="text-[#C174FF]" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative p-8 rounded-[30px] bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 hover:border-[#6D12C3]/30 transition-all duration-500 overflow-hidden"
        >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#6D12C3] opacity-0 group-hover:opacity-20 blur-[50px] transition-all duration-500 rounded-full" />
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300 text-[#C174FF]">
                    {getCategoryIcon(data.category)}
                </div>
                <div>
                    <h3 className="text-xl font-jakarta font-bold text-white group-hover:text-[#C174FF] transition-colors">
                        {data.category}
                    </h3>
                    <p className="text-xs text-gray-500 font-poppins">{data.description}</p>
                </div>
            </div>
            <div className="space-y-5">
                {data.items.map((item: any, idx: number) => {
                    let ItemIcon = <Code2 size={16} />;
                    if (item.name.includes("Java")) ItemIcon = <Cpu size={16} />;
                    else if (item.name.includes("HTML")) ItemIcon = <Layout size={16} />;
                    else if (item.name.includes("Database")) ItemIcon = <Database size={16} />;
                    else if (item.name.includes("Premiere") || item.name.includes("Video")) ItemIcon = <Video size={16} />;
                    else if (item.name.includes("Photo") || item.name.includes("Camera")) ItemIcon = <Camera size={16} />;
                    else if (item.name.includes("Mic") || item.name.includes("Bahasa")) ItemIcon = <Mic size={16} />;
                    else if (item.name.includes("Globe") || item.name.includes("English")) ItemIcon = <Globe size={16} />;

                    return (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="flex items-center gap-2 text-gray-300 font-medium font-poppins">
                                    <span className="text-gray-600">{ItemIcon}</span>{item.name}
                                </span>
                                <span className="text-xs text-gray-500 font-mono">{item.level}/5</span>
                            </div>
                            <div className="flex gap-1 h-1.5 w-full">
                                {[1, 2, 3, 4, 5].map((segment) => (
                                    <div key={segment} className={`flex-1 rounded-full transition-colors duration-500 ${segment <= item.level ? "bg-gradient-to-r from-[#C174FF] to-[#6D12C3] shadow-[0_0_5px_#C174FF]" : "bg-white/10"}`} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}


// --- SUB-COMPONENT: MARQUEE ROW (Updated for Images) ---
function MarqueeRow({ items, direction = "left", speed = 20 }: { items: any[], direction?: "left" | "right", speed?: number }) {
    return (
        <div className="relative flex overflow-hidden">
            <motion.div
                initial={{ x: direction === "left" ? "0%" : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : "0%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: speed }}
                className="flex gap-4 px-4 flex-nowrap"
            >
                {[...items, ...items, ...items].map((tool, idx) => (
                    <div
                        key={idx}
                        className="
                            flex items-center gap-3 px-5 py-3 rounded-full 
                            bg-white/5 border border-white/10 backdrop-blur-md
                            group hover:bg-[#6D12C3]/20 hover:border-[#6D12C3]/50 transition-all duration-300
                            shrink-0 cursor-default min-w-[140px]
                        "
                    >
                        <div className="relative w-6 h-6 shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                            <Image
                                src={tool.src}
                                alt={tool.name}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <span className="text-gray-300 font-jakarta font-medium text-sm group-hover:text-white transition-colors whitespace-nowrap">
                            {tool.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}