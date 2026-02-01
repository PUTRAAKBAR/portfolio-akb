"use client";

import { useState, useEffect } from "react";
import { Home, User, Folder, Settings, Mail, Briefcase, Cpu } from "lucide-react";
import Link from "next/link";

export default function DockNavigation() {
    const [isDockHovered, setIsDockHovered] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    // --- 1. CONFIGURATION ---
    const navItems = [
        { id: "home", icon: <Home size={20} />, label: "Home", href: "#home" },
        { id: "about", icon: <User size={20} />, label: "About", href: "#about" },
        { id: "projects", icon: <Folder size={20} />, label: "Projects", href: "#projects" },
        { id: "skills", icon: <Settings size={20} />, label: "Skills", href: "#skills" },
        { id: "contact", icon: <Mail size={20} />, label: "Contact", href: "#contact" },
    ];

    // --- 2. SCROLL SPY LOGIC + URL UPDATE ---
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const item of navItems) {
                const element = document.getElementById(item.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;

                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(item.id);
                        if (window.location.hash !== `#${item.id}`) {
                            window.history.replaceState(null, "", `#${item.id}`);
                        }
                    }
                }
            }

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                setActiveSection("contact");
                if (window.location.hash !== "#contact") {
                    window.history.replaceState(null, "", "#contact");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-50">
            <div
                onMouseEnter={() => setIsDockHovered(true)}
                onMouseLeave={() => setIsDockHovered(false)}
                className={`
                    flex items-center gap-3 px-4 py-3 
                    bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_20px_rgba(109,18,195,0.15)]
                    transition-all duration-500 ease-out origin-bottom
                    ${isDockHovered ? "scale-100 opacity-100 translate-y-0" : "scale-75 opacity-50 translate-y-4"}
                `}
            >
                {navItems.map((item) => (
                    <DockItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        isActive={activeSection === item.id}
                        onClick={() => setActiveSection(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}

// --- SUB-COMPONENT ---
function DockItem({ icon, href, label, isActive, onClick }: { icon: React.ReactNode; href: string; label: string; isActive: boolean; onClick: () => void }) {
    return (
        <Link href={href} onClick={onClick}>
            <div className="group relative flex flex-col items-center">
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-2 py-1 bg-black/90 rounded text-[10px] text-white font-poppins border border-white/10 whitespace-nowrap">
                        {label}
                    </div>
                </div>
                <div className={`
                    p-3 rounded-xl cursor-pointer transition-all duration-300 
                    hover:scale-125 hover:mx-1 hover:-translate-y-2 hover:bg-white/10
                    ${isActive ? "text-white bg-white/10 scale-110" : "text-gray-400 hover:text-white"}
                `}>
                    {icon}
                    {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C174FF] rounded-full shadow-[0_0_5px_#C174FF]" />
                    )}
                </div>
            </div>
        </Link>
    );
}