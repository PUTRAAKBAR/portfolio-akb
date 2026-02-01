"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000); // 2000ms = 2 detik

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white overflow-hidden"
            initial={{ y: 0 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />

            <div className="relative w-full max-w-7xl px-6 lg:px-12 h-screen flex flex-col justify-between py-12">

                {/* Bagian Atas: Brand Kecil */}
                <div className="flex justify-start">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-2 h-2 bg-[#6D12C3] rounded-full animate-pulse" />
                        <span className="font-jakarta font-bold text-sm tracking-widest text-gray-400">PORTFOLIO</span>
                    </motion.div>
                </div>

                {/* Bagian Tengah: Nama Besar */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                    <motion.h1
                        className="font-jakarta font-bold text-4xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Putra Akbar
                    </motion.h1>
                    <motion.div
                        className="mt-4 font-poppins text-gray-500 tracking-[0.3em] text-xs md:text-lg uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Developer & Creative
                    </motion.div>
                </div>

                {/* Bagian Bawah: Spinner di Pojok Kanan */}
                <div className="absolute bottom-12 right-6 lg:right-12 flex items-center gap-3">
                    <span className="text-xs font-poppins text-gray-500 tracking-widest uppercase">Loading</span>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                        <Loader2 className="w-5 h-5 text-[#C174FF]" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}