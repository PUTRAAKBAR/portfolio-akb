"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, ArrowUp, Heart } from "lucide-react";
import portfolio from "../../data/portfolio.json";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const getSocialIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case "github": return <Github size={20} />;
            case "linkedin": return <Linkedin size={20} />;
            case "instagram": return <Instagram size={20} />;
            default: return <ExternalLink size={20} />;
        }
    };

    const { ExternalLink } = require("lucide-react");

    return (
        <footer className="relative w-full bg-[#050505] border-t border-white/10 pt-16 pb-8 overflow-hidden">
            <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#6D12C3] opacity-20 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* KOLOM 1: BRANDING */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-jakarta font-bold text-white">
                            Putra<span className="text-[#C174FF]"> Akbar.</span>
                        </h2>
                        <p className="text-gray-400 font-poppins text-sm leading-relaxed max-w-xs">
                            Membangun pengalaman digital yang imersif melalui kode dan kreativitas visual.
                        </p>
                    </div>

                    {/* KOLOM 2: QUICK LINKS */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-jakarta font-bold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm font-poppins text-gray-400">
                            <li><Link href="#home" className="hover:text-[#C174FF] transition-colors">Home</Link></li>
                            <li><Link href="#about" className="hover:text-[#C174FF] transition-colors">About</Link></li>
                            <li><Link href="#projects" className="hover:text-[#C174FF] transition-colors">Projects</Link></li>
                            <li><Link href="#" className="hover:text-[#C174FF] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* KOLOM 3: SOCIALS */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-jakarta font-bold text-white">Connect</h3>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={`mailto:${portfolio.contact.info.email}`}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#6D12C3] hover:border-[#6D12C3] transition-all duration-300"
                            >
                                <Mail size={18} />
                            </a>

                            {portfolio.contact.info.socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#6D12C3] hover:border-[#6D12C3] transition-all duration-300"
                                    title={social.name}
                                >
                                    {getSocialIcon(social.name)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-poppins text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} Mohammad Putra Akbar Rafsanjani. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-[#6D12C3] hover:text-white transition-all duration-300 group"
                    >
                        <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer >
    );
}