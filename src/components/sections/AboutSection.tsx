"use client";

import { User, Clock, Download, GraduationCap, Briefcase, Calendar, Code, Users } from "lucide-react";
import { motion } from "framer-motion";
import portfolio from "../../data/portfolio.json";

export default function AboutSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="relative w-full py-20 px-6 lg:px-12 bg-[#050505] overflow-hidden" id="about">
            <div className="absolute left-[-10%] bottom-[20%] w-[500px] h-[500px] bg-[#6D12C3] opacity-20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute right-[-5%] top-[10%] w-[400px] h-[400px] bg-[#C174FF] opacity-10 blur-[100px] rounded-full pointer-events-none" />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto relative z-10"
            >
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.h2
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-jakarta font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500"
                        dangerouslySetInnerHTML={{ __html: portfolio.about.title }}
                    />
                    <div className="w-24 h-1.5 bg-[#6D12C3] mt-4 rounded-full shadow-[0_0_15px_#6D12C3]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-[#6D12C3]/20 rounded-xl border border-[#6D12C3]/50 shadow-[0_0_15px_rgba(109,18,195,0.3)]">
                                <User className="text-[#C174FF] w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-jakarta font-bold text-white">{portfolio.about.whoAmI.title}</h3>
                        </div>

                        <div className="p-8 rounded-[30px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative group hover:border-[#6D12C3]/50 transition-colors duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#6D12C3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[30px]" />
                            <div className="relative z-10 space-y-6">
                                <p
                                    className="font-poppins text-gray-300 leading-relaxed text-sm md:text-base"
                                    dangerouslySetInnerHTML={{ __html: portfolio.about.whoAmI.description }}
                                />
                                <div className="border-l-4 border-[#C174FF] pl-4 py-1 bg-white/5 rounded-r-lg">
                                    <p className="font-jakarta italic text-gray-400">{portfolio.about.whoAmI.quote}</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="/cv.pdf"
                            download="CV_Putra_Akbar.pdf"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6D12C3] to-[#570EA0] text-white font-jakarta font-bold rounded-xl shadow-[0_0_20px_rgba(109,18,195,0.4)] hover:shadow-[0_0_35px_rgba(109,18,195,0.6)] hover:scale-105 transition-all duration-300 w-fit justify-center cursor-pointer"
                        >
                            {portfolio.about.whoAmI.buttonText} <Download className="w-5 h-5" />
                        </a>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <div className="p-3 bg-[#6D12C3]/20 rounded-xl border border-[#6D12C3]/50 shadow-[0_0_15px_rgba(109,18,195,0.3)]">
                                <Clock className="text-[#C174FF] w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-jakarta font-bold text-white">{portfolio.about.educationAndExperience.title}</h3>
                        </motion.div>

                        <div className="relative pl-2 max-h-[500px] overflow-y-auto pr-4 
                            [&::-webkit-scrollbar]:w-[6px]
                            [&::-webkit-scrollbar-track]:bg-white/5
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-[#6D12C3]
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            hover:[&::-webkit-scrollbar-thumb]:bg-[#8b2be2]"
                        >
                            <motion.div
                                className="space-y-8 pb-4 relative"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <div className="absolute left-[11px] top-2 bottom-0 w-[2px] h-full bg-gradient-to-b from-[#6D12C3] via-[#6D12C3] to-transparent" />

                                {portfolio.about.educationAndExperience.items.map((item, index) => (
                                    <TimelineItem
                                        key={index}
                                        variants={itemVariants}
                                        role={item.role}
                                        place={item.place}
                                        year={item.year}
                                        desc={item.desc}
                                        type={item.type}
                                        icon={
                                            item.type === "Education" ? <GraduationCap size={16} /> :
                                                item.type === "Experience" ? <Briefcase size={16} /> :
                                                    item.type === "Work" ? <Code size={16} /> :
                                                        <Users size={16} />
                                        }
                                    />
                                ))}

                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function TimelineItem({ role, place, year, desc, type, icon, variants }: any) {
    return (
        <motion.div variants={variants} className="relative pl-10 group">
            <div className="absolute left-0 top-1.5 w-6 h-6 flex items-center justify-center bg-[#050505] border border-[#6D12C3] rounded-full z-10 shadow-[0_0_10px_rgba(109,18,195,0.5)] group-hover:scale-125 transition-transform duration-300">
                <div className="w-2 h-2 bg-[#C174FF] rounded-full animate-pulse" />
            </div>

            <div className="p-5 bg-[#1a1a1a]/60 backdrop-blur-md border border-white/5 rounded-2xl hover:border-[#6D12C3]/40 transition-all duration-300 hover:bg-[#1a1a1a] hover:-translate-y-1">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                    <h3 className="text-lg font-jakarta font-bold text-white group-hover:text-[#C174FF] transition-colors">{role}</h3>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-[#6D12C3]/20 rounded-full border border-[#6D12C3]/30 text-[10px] text-[#C174FF] font-medium">
                        <Calendar size={10} /> {year}
                    </div>
                </div>
                <p className="text-[#C174FF] font-semibold text-xs mb-2">{place}</p>
                <p className="text-gray-400 text-xs md:text-sm font-poppins leading-relaxed mb-3">{desc}</p>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                    <span className="p-1 bg-white/5 rounded-md text-gray-300">{icon}</span> {type}
                </div>
            </div>
        </motion.div>
    );
}