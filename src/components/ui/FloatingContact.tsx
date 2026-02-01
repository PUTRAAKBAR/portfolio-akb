"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail, Copy, Check, ExternalLink, Send } from "lucide-react";
import Link from "next/link";

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const [isVisible, setIsVisible] = useState(false);

    const email = "putraakbarrafsanjani@gmail.com";

    useEffect(() => {
        const contactSection = document.getElementById("contact");

        if (!contactSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (!entry.isIntersecting) {
                    setIsOpen(false);
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(contactSection);
        return () => {
            observer.unobserve(contactSection);
        };
    }, []);


    // Logic Copy Email
    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 z-[60]">

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="absolute bottom-20 right-0 w-[300px] p-5 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(109,18,195,0.3)] overflow-hidden"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-white font-jakarta font-bold text-lg">Quick Connect</h3>
                                        <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e] animate-pulse" />
                                    </div>

                                    <p className="text-gray-400 text-xs font-poppins mb-4">
                                        Pilih metode di bawah untuk terhubung langsung dengan saya.
                                    </p>

                                    <div className="space-y-3">
                                        <a
                                            href={`mailto:${email}?subject=Halo%20Putra%2C%20Lets%20Collaborate!`}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#6D12C3] border border-white/5 hover:border-[#6D12C3] transition-all group cursor-pointer"
                                        >
                                            <div className="p-2 bg-white/10 rounded-lg text-[#C174FF] group-hover:text-white group-hover:bg-white/20 transition-colors">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-semibold">Send Email</p>
                                                <p className="text-gray-500 group-hover:text-gray-200 text-[10px]">Open Mail App</p>
                                            </div>
                                            <ExternalLink size={14} className="ml-auto text-gray-500 group-hover:text-white" />
                                        </a>

                                        <button
                                            onClick={handleCopy}
                                            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                                        >
                                            <div className="p-2 bg-white/10 rounded-lg text-gray-300 group-hover:text-white transition-colors">
                                                {isCopied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-white text-sm font-semibold">{isCopied ? "Copied!" : "Copy Email"}</p>
                                                <p className="text-gray-500 text-[10px] truncate max-w-[150px]">{email}</p>
                                            </div>
                                        </button>

                                        <Link
                                            href="https://wa.me/6285257585676"
                                            target="_blank"
                                            className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 transition-all group"
                                        >
                                            <div className="p-2 bg-green-500/20 rounded-lg text-green-400 group-hover:text-green-300">
                                                <Send size={18} />
                                            </div>
                                            <div>
                                                <p className="text-green-400 text-sm font-semibold group-hover:text-green-300">WhatsApp</p>
                                                <p className="text-green-500/60 text-[10px]">Fast Response</p>
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>


                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`
                  relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center 
                  bg-[#6D12C3] text-white shadow-[0_0_20px_rgba(109,18,195,0.5)] 
                  hover:bg-[#570EA0] hover:scale-110 hover:shadow-[0_0_30px_rgba(109,18,195,0.8)]
                  transition-all duration-300 z-50
                  ${isOpen ? "rotate-90" : "rotate-0"}
              `}
                        >
                            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
                            {!isOpen && (
                                <span className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-50 pointer-events-none" />
                            )}
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}